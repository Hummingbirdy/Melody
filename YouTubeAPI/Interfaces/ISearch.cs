using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace YouTubeAPI.Interfaces
{
    public interface ISearch
    {
        Task<string> SearchSongAsync(string songTitle, string artistName);
    }
}
