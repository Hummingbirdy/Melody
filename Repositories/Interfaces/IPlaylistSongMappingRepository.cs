using MelodyContext.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.Interfaces
{
    public interface IPlaylistSongMappingRepository
    {
        Task<string> UpdatePlaylistMappings(List<Playlist> playlists);
    }
}
