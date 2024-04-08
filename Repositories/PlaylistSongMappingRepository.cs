using MelodyContext.Models;
using Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories
{
    public class PlaylistSongMappingRepository: BaseDB, IPlaylistSongMappingRepository
    {
        public async Task<string> UpdatePlaylistMappings(List<Playlist> playlists)
        {
            try
            {
                List<string> playlistIds = new();
                List<string> songs = new();

                playlists.ForEach(p =>
                {
                    p.Songs.ForEach(s =>
                    {
                        playlistIds.Add(p.PlaylistId);
                        songs.Add(s.YouTubeId);
                    });
                });
                string[] columns = { "PlaylistId", "SongId" };
                string[][] data = new string[][] { playlistIds.ToArray(), songs.ToArray() };
                var dataTable = CreateDataTable(columns, data);

                var status = await ExecuteSPAsync("storage.PlaylistSongMappingInsert", "@mapping", "storage.MappingTableType", dataTable);
                return status;
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
    }
}
