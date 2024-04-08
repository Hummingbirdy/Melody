using MelodyContext;
using MelodyContext.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MelodyAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlaylistController : ControllerBase
    {
        private readonly MelodyDbContext _context; 
        public PlaylistController(MelodyDbContext context)
        {
            _context = context;
        }
        // GET: api/<PlaylistController>
        [HttpGet]
        public List<Playlist> Get()
        {
            return _context.Playlists.ToList();
        }

        // GET api/<PlaylistController>/5
        [HttpGet("{id}")]
        public Playlist Get(string id)
        {
            return _context.Playlists.FirstOrDefault(p => p.PlaylistId == id);
        }

        // POST api/<PlaylistController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<PlaylistController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<PlaylistController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
