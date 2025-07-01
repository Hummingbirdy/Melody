using MelodyContext;
using MelodyContext.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Repositories;
using Repositories.Interfaces;
using SpotifyScraper.Classes;
using System;
using System.Globalization;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using YouTubeAPI;
using YouTubeAPI.Interfaces;

class Program
{
    private static string[] playlistIds =
    [
    ];

    static async Task Main(string[] args)
    {
        using IHost host = Host.CreateDefaultBuilder(args)
            .ConfigureServices((_, services) =>
            {
                services.AddScoped<ISearch, SearchAPI>();
                services.AddScoped<ISongRepository, SongRepository>();
                services.AddDbContext<MelodyDbContext>(options =>
                    options.UseSqlServer("REPLACE-ME"));
                // Add other services here  
            })
            .Build();

        var youTubeSearchService = host.Services.GetRequiredService<ISearch>();
        var songRepo = host.Services.GetRequiredService<ISongRepository>();
        Console.WriteLine("Starting API call...");

        using HttpClient client = new HttpClient();
        try
        {
            var clientId = "REPLACE-ME";
            var clientSecret = "REPLACE-ME";

            var postData = new StringContent(
                $"grant_type=client_credentials&client_id={Uri.EscapeDataString(clientId)}&client_secret={Uri.EscapeDataString(clientSecret)}",
                Encoding.UTF8,
                "application/x-www-form-urlencoded"
            );

            var tokenRequest = new HttpRequestMessage(HttpMethod.Post, "https://accounts.spotify.com/api/token")
            {
                Content = postData
            };

            var response = await client.SendAsync(tokenRequest);
            response.EnsureSuccessStatusCode();

            var responseBody = await response.Content.ReadAsStringAsync();

            var tokenInfo = JsonSerializer.Deserialize<SpotifyTokenResponse>(responseBody);
            foreach (var playlistId in playlistIds)
            {
                var currentSongs = songRepo.GetAllNoTracking();
                client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", tokenInfo?.AccessToken);
                var apiResponse = await client.GetAsync($"https://api.spotify.com/v1/playlists/{playlistId}");

                if (response.IsSuccessStatusCode)
                {
                    string body = await apiResponse.Content.ReadAsStringAsync();
                    var options = new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true
                    };
                    var playlistInfo = JsonSerializer.Deserialize<SpotifyPlaylist>(body, options);
                    var songs = new List<Song>();
                    playlistInfo.Tracks.Items.ForEach(track =>
                    {
                        if (currentSongs.Any(s => s.SongName == track.Track.Name && s.Artist == track.Track.Artists[0].Name))
                        {
                            Console.WriteLine($"Skipping existing track: {track.Track.Name} by {track.Track.Artists[0].Name}");
                            return;
                        }
                        Console.WriteLine($"Track Name: {track.Track.Name}, Artist: {track.Track.Artists[0].Name}");
                        try
                        {
                            var youtubeUrl = youTubeSearchService.SearchSongAsync(track.Track.Name, track.Track.Artists[0].Name).Result;
                            Console.WriteLine(youtubeUrl ?? "No YouTube URL found for this track.");
                            if (youtubeUrl != null & !(currentSongs.Any(s => s.YouTubeId == youtubeUrl)))
                            {
                                songRepo.AddSongFromSpotity(new Song
                                {
                                    YouTubeId = youtubeUrl,
                                    SongName = track.Track.Name,
                                    Artist = track.Track.Artists[0].Name,
                                    CreatedDate = DateTime.Now,
                                    YouTubeAddedDate = DateTime.TryParseExact(
                                                                   track.Added_At,
                                                                   "yyyy-MM-ddTHH:mm:ssZ", // Assuming the format is ISO 8601  
                                                                   CultureInfo.InvariantCulture,
                                                                   DateTimeStyles.AssumeUniversal,
                                                                   out var parsedDate) ? (DateTime?)parsedDate : null,
                                    IsValid = true,
                                    InAzure = false,
                                    UploadFailed = false,
                                    HasRanThroughTagAIGeneration = false,
                                    FromSpotify = true
                                });
                            }
                        }
                        catch
                        {
                            Console.WriteLine($"Error processing track: {track.Track.Name} by {track.Track.Artists[0].Name}");
                        }
                    });
                }
            }
        }
        catch (HttpRequestException e)
        {
            Console.WriteLine($"Request error: {e.Message}");
        }
    }
}
