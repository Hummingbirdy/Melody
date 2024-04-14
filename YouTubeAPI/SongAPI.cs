using MelodyContext.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using YouTubeAPI.Interfaces;

namespace YouTubeAPI
{
    public class SongAPI : BaseYouTubeService, ISong
    {
        public async Task<List<Song>> SongsInPlaylist(string playlistId)
        {
            var service = YouTubeService();
            var results = service.PlaylistItems.List("contentDetails, snippet");
            results.PlaylistId = playlistId;
            List<Song> songList = new();
            var nextPageToken = "";

            while (nextPageToken != null)
            {
                results.PageToken = nextPageToken;
                var songResponse = await results.ExecuteAsync();

                songResponse.Items.ToList().ForEach(s =>
                {
                    var item = new Song
                    {
                        YouTubeId = s.ContentDetails.VideoId,
                        SongName = s.Snippet.Title,
                        YouTubeAddedDate = s.Snippet.PublishedAt
                    };
                    songList.Add(item);
                });

                nextPageToken = songResponse.NextPageToken;
            }
            return songList;
        }
    }
}
