using MelodyContext.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.Interfaces
{
    public interface ISongRepository
    {
        List<Song> GetAll();
        void UpdateAzureFlag(string youTubeId);
        void FlagFailure(string youTubeId);
        Task<string> UpdateSongs(List<Song> songs);
    }
}
