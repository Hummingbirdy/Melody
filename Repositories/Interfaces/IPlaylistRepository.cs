using MelodyContext.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.Interfaces
{
    public interface IPlaylistRepository
    {
        Task<string> UpdatePlaylist(List<Playlist> playlists);
    }
}
