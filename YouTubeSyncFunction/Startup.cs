using MelodyContext;
using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Repositories;
using Repositories.Interfaces;
using Services;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using YouTubeAPI;
using YouTubeAPI.Interfaces;

[assembly: FunctionsStartup(typeof(YouTubeSyncFunction.Startup))]
namespace YouTubeSyncFunction
{
    public class Startup: FunctionsStartup
    {
        public override void Configure(IFunctionsHostBuilder builder)
        {
            var _connectionString = System.Environment.GetEnvironmentVariable("ConnectionString");
                                    //System.Configuration.ConfigurationManager.ConnectionStrings["AzureMelodyDb"].ConnectionString;
            builder.Services.AddScoped<IPlaylist, PlaylistAPI>();
            builder.Services.AddScoped<ISync, Sync>();
            builder.Services.AddScoped<ISong, SongAPI>();
            builder.Services.AddScoped<ISongRepository, SongRepository>();
            builder.Services.AddScoped<IPlaylistRepository, PlaylistRepository>();
            builder.Services.AddScoped<IPlaylistSongMappingRepository, PlaylistSongMappingRepository>();    
            builder.Services.AddScoped<ILogRepository, LogRepository>();
            builder.Services.AddScoped<IOrchestratorHelpers, OrchestratorHelpers>();
            builder.Services.AddDbContext<MelodyDbContext>(options =>
                options.UseSqlServer(_connectionString));
        }
    }
}
