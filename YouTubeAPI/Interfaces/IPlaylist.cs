using MelodyContext.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace YouTubeAPI.Interfaces
{
    public interface IPlaylist
    {
        Task<List<Playlist>> GetAll(string channelId);
    }
}
