﻿using Azure.Storage.Blobs;
using MelodyContext.Models;
using Microsoft.Extensions.Logging;
using Repositories.Interfaces;
using Services.Interfaces;
using YoutubeExplode;
using YoutubeExplode.Videos.Streams;

namespace YouTubeSyncFunction
{
    public interface IOrchestratorHelpers
    {
        Task<string> SyncYouTube(ILogger log);
        Task<string> YouTubeDownloader(ILogger log);
    }

    public class OrchestratorHelpers : IOrchestratorHelpers
    {
        internal readonly ISync _sync;
        internal readonly ISongRepository _songRepository;
        internal readonly IPlaylistRepository _playlistRepository;
        internal readonly IPlaylistSongMappingRepository _playlistSongMappingRepository;
        internal readonly ILogRepository _logRepo;

        public OrchestratorHelpers(ISync sync, ISongRepository songRepository, IPlaylistRepository playlistRepository,
                                    IPlaylistSongMappingRepository playlistSongMappingRepository, ILogRepository logRepository)
        {
            _sync = sync;
            _songRepository = songRepository;
            _playlistRepository = playlistRepository;
            _playlistSongMappingRepository = playlistSongMappingRepository;
            _logRepo = logRepository;
        }

        public async Task<string> SyncYouTube(ILogger log)
        {
            try
            {
                log.LogInformation("C# HTTP trigger function processed a request.");
                log.LogInformation("Starting Sync");
                log.LogInformation("====================");


                var playlists = await _sync.AllSongs();

                var playlistStatus = await _playlistRepository.UpdatePlaylist(playlists);
                List<Song> songs = playlists.SelectMany(p => p.Songs).ToList();
                var songStatus = await _songRepository.UpdateSongs(songs);
                var mappingsStatus = await _playlistSongMappingRepository.UpdatePlaylistMappings(playlists);

                //  var status = await _songDB.SaveSongs(songList);



                var status = "PLAYLIST: " + playlistStatus + Environment.NewLine
                    + "SONGS: " + songStatus + Environment.NewLine
                    + "MAPPINGS: " + mappingsStatus;

                return status;
            }
            catch (AggregateException ex)
            {
                foreach (var e in ex.InnerExceptions)
                {
                    log.LogInformation("ERROR: " + e.Message);
                }
                return ex.Message;
            }
        }

        public async Task<string> YouTubeDownloader(ILogger log)
        {
            try
            {
                 var songs = _songRepository.GetAll().Where(s => s.IsValid == true && s.InAzure == false).ToList();
                // var songs = _songRepo.GetAll().Where(s => s.YouTubeId == "-kBhum7f4rI").ToList();
                foreach (var s in songs)
                {

                    //log.LogInformation($"getting video: {s.YouTubeId} - {s.SongName}");
                    //var youTube = YouTube.Default;
                    //var video = youTube.GetVideo("https://www.youtube.com/watch?v=" + s.YouTubeId);

                    try
                    {

                        
                        var youtube = new YoutubeClient();
                        var video = await youtube.Videos.GetAsync(s.YouTubeId);

                        var streamManifest = await youtube.Videos.Streams.GetManifestAsync(s.YouTubeId);
                        var streamInfo = streamManifest.GetAudioOnlyStreams().GetWithHighestBitrate();
                        var stream = await youtube.Videos.Streams.GetAsync(streamInfo);

                        log.LogInformation($"uploading video: {s.SongName}");
                        var connectionString = Environment.GetEnvironmentVariable("BlobKey");
                        string containerName = "mp4storage";
                        var serviceClient = new BlobServiceClient(connectionString);
                        var containerClient = serviceClient.GetBlobContainerClient(containerName);
                        var blobClient = containerClient.GetBlobClient($"{s.YouTubeId}.mp3");

                        blobClient.Upload(stream);
                        _songRepository.UpdateAzureFlag(s.YouTubeId);
                        log.LogInformation($"upload finished: {s.SongName}");
                        //Thread.Sleep(180_000);

                    }
                    catch (Exception ex)
                    {

                        if (ex.Message.Contains("The specified blob already exists."))
                        {
                            _songRepository.UpdateAzureFlag(s.YouTubeId);
                            
                        }
                        else
                        {
                            log.LogInformation($"UNABLE TO UPLOAD: {ex.Message}");
                           // _songRepository.FlagFailure(s.YouTubeId);
                            _logRepo.AddError(ex.Message);

                        }
                        //Thread.Sleep(180_000);

                    }


                }

                return "done";
            }
            catch (AggregateException ex)
            {
                foreach (var e in ex.InnerExceptions)
                {
                    log.LogInformation("ERROR: " + e.Message);
                    _logRepo.AddError(ex.Message);
                }
                return ex.Message;
            }
        }
    }
}