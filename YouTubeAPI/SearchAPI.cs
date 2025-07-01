using Google.Apis.Services;
using Google.Apis.YouTube.v3;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using YouTubeAPI.Interfaces;

namespace YouTubeAPI
{
    public class SearchAPI: BaseYouTubeService, ISearch
    {
        public async Task<string> SearchSongAsync(string songTitle, string artistName)
        {
            var youtubeService = YouTubeService();

            var searchRequest = youtubeService.Search.List("snippet");
            searchRequest.Q = $"{songTitle} {artistName}";
            searchRequest.Type = "video";
            searchRequest.MaxResults = 1;

            var searchResponse = await searchRequest.ExecuteAsync();

            if (searchResponse.Items.Count > 0)
            {
                var video = searchResponse.Items[0];
                // return $"https://www.youtube.com/watch?v={video.Id.VideoId}";
                return video.Id.VideoId;
            }

            return null;
        }

    }
}
