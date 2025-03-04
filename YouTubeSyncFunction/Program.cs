using MelodyContext;
using Microsoft.Azure.Functions.Worker.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Repositories.Interfaces;
using Repositories;
using Services.Interfaces;
using Services;
using YouTubeAPI.Interfaces;
using YouTubeAPI;
using YouTubeSyncFunction;
using Microsoft.EntityFrameworkCore;

//var builder = FunctionsApplication.CreateBuilder(args);

//builder.ConfigureFunctionsWebApplication();

//// Application Insights isn't enabled by default. See https://aka.ms/AAt8mw4.
//// builder.Services
////     .AddApplicationInsightsTelemetryWorkerService()
////     .ConfigureFunctionsApplicationInsights();

//var _connectionString = System.Environment.GetEnvironmentVariable("ConnectionString");
//builder.Services.AddScoped<IPlaylist, PlaylistAPI>();
//builder.Services.AddScoped<ISync, Sync>();
//builder.Services.AddScoped<ISong, SongAPI>();
//builder.Services.AddScoped<ISongRepository, SongRepository>();
//builder.Services.AddScoped<IPlaylistRepository, PlaylistRepository>();
//builder.Services.AddScoped<IPlaylistSongMappingRepository, PlaylistSongMappingRepository>();
//builder.Services.AddScoped<ILogRepository, LogRepository>();
//builder.Services.AddScoped<IOrchestratorHelpers, OrchestratorHelpers>();
//builder.Services.AddDbContext<MelodyDbContext>(options =>
//    options.UseSqlServer(_connectionString));

//builder.Build().Run();

var _connectionString = System.Environment.GetEnvironmentVariable("ConnectionString");

var host = new HostBuilder()
    .ConfigureFunctionsWebApplication()
    //.ConfigureFunctionsWebApplication()
    .ConfigureServices(s =>
    {
        s.AddScoped<IPlaylist, PlaylistAPI>();
        s.AddScoped<ISync, Sync>();
        s.AddScoped<ISong, SongAPI>();
        s.AddScoped<ISongRepository, SongRepository>();
        s.AddScoped<IPlaylistRepository, PlaylistRepository>();
        s.AddScoped<IPlaylistSongMappingRepository, PlaylistSongMappingRepository>();
        s.AddScoped<ILogRepository, LogRepository>();
        s.AddScoped<IOrchestratorHelpers, OrchestratorHelpers>();
        s.AddDbContext<MelodyDbContext>(options =>
            options.UseSqlServer(_connectionString));
    })
    .Build();

await host.RunAsync();
