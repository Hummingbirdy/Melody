using MelodyContext.Models;
using Services.Interfaces;
using YouTubeAPI.Interfaces;

namespace Services
{
    public class Sync(IPlaylist playlist, ISong song) : ISync
    {
        private readonly IPlaylist _playlist = playlist;
        private readonly ISong _song = song;
        private readonly string _channelId = "UCIhj3E461Y8hPMMj-FOE_WQ";

        public async Task<List<Playlist>> AllSongs()
        {
            var playlists = await _playlist.GetAll(_channelId);
            foreach (var playlist in playlists)
            {
                if (playlist.PlaylistId != null)
                {
                    var songsInPlayList = await _song.SongsInPlaylist(playlist.PlaylistId);
                    playlist.Songs = songsInPlayList;
                }

            }

          //  var songsInPlayList = await _song.SongsInPlaylist(playlists[0].PlaylistId);
            return playlists;
        }

    }
}