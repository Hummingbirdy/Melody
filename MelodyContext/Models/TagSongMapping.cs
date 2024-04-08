using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MelodyContext.Models
{
    public partial class TagSongMapping
    {
        public int MappingId { get; set; }
        public int TagId { get; set; }
        public string SongId { get; set; }  
        public DateTime CreatedDate { get; set; }
        public virtual Tag Tag { get; set; }
        public virtual Song Song { get; set; }
    }
}
