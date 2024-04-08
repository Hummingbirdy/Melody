using MelodyContext.Models;
using Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories
{
    public class PlaylistRepository: BaseDB, IPlaylistRepository
    {
        public async Task<string> UpdatePlaylist(List<Playlist> playlists)
        {
            try
            {
                string[] columns = { "Id", "Name", "Description" };
                var ids = playlists.Select(p => p.PlaylistId).ToArray();
                var names = playlists.Select(p => p.PlaylistName).ToArray();
                var description = playlists.Select(p => "").ToArray();
                string[][] data = new string[][] { ids, names, description };
                var dataTable = CreateDataTable(columns, data);

                var status = await ExecuteSPAsync("storage.PlaylistInsert", "@playlist", "Storage.PlaylistTableType", dataTable);
                return status;
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
    }
}
