using Google.Apis.Services;
using Google.Apis.YouTube.v3;
using MelodyContext.Models;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.Identity.Client;
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
            var results = service.PlaylistItems.List("contentDetails, id, snippet, status");
            results.PlaylistId = playlistId;
            var songResults = await results.ExecuteAsync();

            results.PlaylistId = playlistId;
            List<Song> songList = [];
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
                        YouTubeAddedDate = s.Snippet.PublishedAt,
                        Artist = s.Snippet.VideoOwnerChannelTitle?.Replace(" - Topic", "") ?? string.Empty
                    };
                    songList.Add(item);
                });
                nextPageToken = songResponse.NextPageToken;
            }
            return songList;

        }
    }
}
