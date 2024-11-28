using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MelodyContext.Models
{
    public partial class Song
    {
        public string? YouTubeId { get; set; }
        public string? SongName { get; set; }
        public string? Artist { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? YouTubeAddedDate { get; set; }
        public bool IsValid { get; set; }
        public bool InAzure { get; set; }
        public bool UploadFailed { get; set; }
        [NotMapped]
        public int[]? Tags { get; set; }
    }
}
