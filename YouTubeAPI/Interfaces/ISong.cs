using MelodyContext.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace YouTubeAPI.Interfaces
{
    public interface ISong
    {
        Task<List<Song>> SongsInPlaylist(string playlistId);
    }
}
