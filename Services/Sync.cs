using MelodyContext.Models;
using Services.Interfaces;
using YouTubeAPI.Interfaces;

namespace Services
{
    public class Sync : ISync
    {
        private readonly IPlaylist _playlist;
        private readonly ISong _song;
        private readonly string _channelId = "UCIhj3E461Y8hPMMj-FOE_WQ";

        public Sync(IPlaylist playlist, ISong song)
        {
            _playlist = playlist;
            _song = song;
        }

        public async Task<List<Playlist>> AllSongs()
        {
            var playlists = await _playlist.GetAll(_channelId);
            // string[] allSongs = new string[0];
            foreach (var playlist in playlists)
            {
                var songsInPlayList = await _song.SongsInPlaylist(playlist.PlaylistId);
                //allSongs = allSongs.Concat(songsInPlayList).ToArray();
                playlist.Songs = songsInPlayList;
            }

            return playlists;
        }

    }
}