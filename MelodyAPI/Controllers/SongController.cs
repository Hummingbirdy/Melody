using MelodyContext;
using MelodyContext.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MelodyAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SongController : ControllerBase
    {
        private readonly MelodyDbContext _context;
        private readonly string random = "random";
        private readonly string recent = "recent";
        private readonly string added = "added";
        public SongController(MelodyDbContext context)
        {

            _context = context;

        }
        // GET: api/<SongController>
        [HttpGet]
        public List<Song> Get(string? orderBy = "recent", string? tags = null, string? term = null, string? playlistId = null)
        {
            var songs = _context.Songs.Where(s => s.IsValid == true && s.InAzure == true).ToList();
            var mappingsList = _context.TagSongMappings.ToList();
            // var tags = _context.Tags.ToList();
            songs.ForEach(song =>
            {
                song.Tags = mappingsList.Where(m => m.SongId == song.YouTubeId).Select(m => m.TagId).ToArray();
            });

            if (tags != null)
            {
                int[] tagArray = tags.Split(',').Select(t => Convert.ToInt32(t)).ToArray();
                songs = songs.Where(s => (s.Tags != null) && (s.Tags.Intersect(tagArray).Any())).ToList();
            }

            if (term != null)
            {
                songs = songs.Where(s => s.SongName.Contains(term)).ToList();
            }

            if (orderBy == added)
            {
                songs = songs.OrderBy(s => s.YouTubeAddedDate).ToList();
            }
            else if (orderBy == random)
            {
                Random rnd = new Random();
                songs = songs.OrderBy((item) => rnd.Next()).ToList();
            }
            else
            {
                songs = songs.OrderByDescending(s => s.YouTubeAddedDate).ToList();
            }

            //  songs = songs.Where(s => s.Tags == null || s.Tags.Length == 0).ToList();
            return songs;
        }

        // GET: api/<SongController>
        [HttpGet]
        [Route("GetUnsorted")]
        public List<Song> GetUnsorted()
        {
            var songs = _context.Songs.Where(s => s.IsValid == true && s.InAzure == true).ToList();
            var mappingsList = _context.TagSongMappings.ToList();
            // var tags = _context.Tags.ToList();
            songs.ForEach(song =>
            {
                song.Tags = mappingsList.Where(m => m.SongId == song.YouTubeId).Select(m => m.TagId).ToArray();
            });

            songs = songs.OrderByDescending(s => s.YouTubeAddedDate).ToList();


            songs = songs.Where(s => s.Tags == null || s.Tags.Length == 0).ToList();
            return songs;
        }

        // GET api/<SongController>/5
        [HttpGet("{id}")]
        public Song Get(string id)
        {
            var mappingsList = _context.TagSongMappings.ToList();
            var song = _context.Songs.FirstOrDefault(s => s.YouTubeId == id);
            song.Tags = mappingsList.Where(m => m.SongId == song.YouTubeId).Select(m => m.TagId).ToArray();
            return song;
        }

        [Route("MarkSongListen")]
        [HttpPost]
        public void MarkSongListen(string id)
        {
            var record = new ListenRecord()
            {
                SongId = id,
                ListenTime = DateTime.Now
            };
            _context.ListenRecords.Add(record);
            _context.SaveChanges();
        }

        // POST api/<SongController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<SongController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<SongController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
