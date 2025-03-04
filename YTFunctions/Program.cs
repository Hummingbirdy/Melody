using MelodyContext;
using MelodyContext.Models;
using Microsoft.Azure.Functions.Worker.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Repositories;
using Repositories.Interfaces;
using Services;
using Services.Interfaces;
using YouTubeAPI;
using YouTubeAPI.Interfaces;
using YTFunctions;

var builder = FunctionsApplication.CreateBuilder(args);

builder.ConfigureFunctionsWebApplication();
var _connectionString = System.Environment.GetEnvironmentVariable("ConnectionString");

// Application Insights isn't enabled by default. See https://aka.ms/AAt8mw4.
// builder.Services
//     .AddApplicationInsightsTelemetryWorkerService()
//     .ConfigureFunctionsApplicationInsights();

builder.Services.AddScoped<IHelper, Helper>();
builder.Services.AddScoped<ISync, Sync>();
builder.Services.AddScoped<IPlaylist, PlaylistAPI>();
builder.Services.AddScoped<ISong, SongAPI>();
builder.Services.AddScoped<ISongRepository, SongRepository>();
builder.Services.AddScoped<IPlaylistRepository, PlaylistRepository>();
builder.Services.AddScoped<IPlaylistSongMappingRepository, PlaylistSongMappingRepository>();
builder.Services.AddScoped<ILogRepository, LogRepository>();
builder.Services.AddDbContext<MelodyDbContext>(options =>
    options.UseSqlServer(_connectionString));

builder.Build().Run();
