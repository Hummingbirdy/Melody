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
        public SongController(MelodyDbContext context)
        {

            _context = context;

        }
        // GET: api/<SongController>
        [HttpGet]
        public List<Song> Get()
        {
            return _context.Songs.Where(s => s.IsValid == true && s.InAzure == true).ToList();
        }

        // GET api/<SongController>/5
        [HttpGet("{id}")]
        public Song Get(string id)
        {
            return _context.Songs.FirstOrDefault(s => s.YouTubeId == id);
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
