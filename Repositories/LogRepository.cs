using MelodyContext.Models;
using MelodyContext;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Repositories.Interfaces;

namespace Repositories
{
    public class LogRepository : BaseDB, ILogRepository
    {
        private readonly MelodyDbContext _context;
        public LogRepository(MelodyDbContext context)
        {
            _context = context;
        }
        public void AddError(string message)
        {
            var logEntry = new UploadLog { ErrorMessage = message, TimeOfError = DateTime.Now };
            _context.UploadLogs.Add(logEntry);
            _context.SaveChanges();
        }
    }
}
