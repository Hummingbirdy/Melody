using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MelodyContext.Models
{
    public partial class PlaylistSongMapping
    {
        public int MappingId { get; set; }
        public string PlaylistId { get; set; }
        public string SongId { get; set; }
        public DateTime CreatedDate { get; set; }

        public virtual Playlist Playlist { get; set; }
        public virtual Song Song { get; set; }
    }
}
