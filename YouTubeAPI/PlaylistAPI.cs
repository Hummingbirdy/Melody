using MelodyContext.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using YouTubeAPI.Interfaces;

namespace YouTubeAPI
{
    public class PlaylistAPI : BaseYouTubeService, IPlaylist
    {
        public async Task<List<Playlist>> GetAll(string channelId)
        {
            var service = YouTubeService();

            var results = service.Playlists.List("id, snippet");
            results.ChannelId = channelId;
            results.MaxResults = 500;
            var playlistResult = await results.ExecuteAsync();
            List<Playlist> playlist = [];

            playlistResult.Items.ToList().ForEach(p =>
            {
                Playlist item = new()
                {
                    PlaylistId = p.Id,
                    PlaylistName = p.Snippet.Title,
                };
                playlist.Add(item);
            });
            return playlist;

        }
    }
}
