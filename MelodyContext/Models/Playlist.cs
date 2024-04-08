using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MelodyContext.Models
{
    public partial class Playlist
    {
        public string? PlaylistId { get; set; }
        public string? PlaylistName { get; set; }
        public string? PlaylistDescription { get; set; }
        public DateTime? CreatedDate { get; set; }

        [NotMapped]
        public List<Song>? Songs { get; set; }
    }
}

