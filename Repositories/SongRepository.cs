using MelodyContext;
using MelodyContext.Models;
using Microsoft.IdentityModel.Tokens;
using Repositories.Interfaces;
using System.Data.Entity;

namespace Repositories
{
    public class SongRepository : BaseDB, ISongRepository
    {
        private readonly MelodyDbContext _context;
        public SongRepository(MelodyDbContext context)
        {
            _context = context;
        }
        public void FlagFailure(string youTubeId)
        {
            var song = _context.Songs.FirstOrDefault(s => s.YouTubeId == youTubeId);
            if (song != null)
            {
                song.UploadFailed = true;
                song.IsValid = false;
                _context.SaveChanges();
            }
        }

        public List<Song> GetAll()
        {
            return _context.Songs.ToList();
        }

        public List<Song> GetAllNoTracking()
        {
            return _context.Songs.AsNoTracking().ToList();
        }

        public void UpdateAzureFlag(string youTubeId)
        {
            var song = _context.Songs.FirstOrDefault(s => s.YouTubeId == youTubeId);
            if (song != null)
            {
                song.InAzure = true;
                song.UploadFailed = false;
                _context.SaveChanges();
            }
        }

        public async Task<string> UpdateSongs(List<Song> songs)
        {
            try
            {
                string[] columns = { "YouTubeId", "SongName", "Artist", "YouTubeAddedDate" };
                songs = songs.GroupBy(s => new { s.YouTubeId }).Select(s => s.FirstOrDefault()).ToList();
                string[] songIds = songs.Select(s => s.YouTubeId).ToArray();
                string[] songNames = songs.Select(s => s.SongName).ToArray();
                string[] dates = songs.Select(s => s.YouTubeAddedDate.ToString()).ToArray();
                string[] artists = songs.Select(s => s.Artist.ToString()).ToArray();
                string[][] data = new string[][] { songIds, songNames, artists, dates };
                var dataTable = CreateDataTable(columns, data);

                var status = await ExecuteSPAsync("storage.SongInsert", "@song", "storage.SongTableType", dataTable);
                return status;
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
        public void AddSongsFromSpotify(List<Song> song)
        {
            var existingIds = _context.Songs
                .Select(s => s.YouTubeId)
                .ToHashSet();
            var newSongs = song
                .Where(s => !existingIds.Contains(s.YouTubeId))
                .ToList();
            if (newSongs.Count > 0)
            {
                _context.Songs.AddRange(newSongs);
                _context.SaveChanges();
            }
        }

        public void AddSongFromSpotity(Song song)
        {
                _context.Songs.Add(song);
                _context.SaveChanges();
        }
    }
}