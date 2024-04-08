using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MelodyContext.Models
{
    public partial class UploadLog
    {
        public int LogId { get; set; }
        public string ErrorMessage { get; set; }
        public DateTime TimeOfError { get; set; }
    }
}
