using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MelodyContext.Models
{
    public partial class Tag
    {
        public int TagId { get; set; }
        public string? TagName { get; set; }
        public string? Color { get; set;}
        public int? FavoriteOrder { get; set; }
        public bool IsAIGenerated { get; set; }
    }
}
