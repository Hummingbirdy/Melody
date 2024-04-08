﻿using MelodyContext.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Interfaces
{
    public interface ISync
    {
        Task<List<Playlist>> AllSongs();
    }
}
