﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MelodyContext.Models
{
    public partial class ListenRecord
    {
        public int RecordId { get; set; }
        public string SongId { get; set; }
        public DateTime ListenTime { get; set; }
        public virtual Song Song { get; set; }
    }
}
