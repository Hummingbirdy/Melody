using MelodyContext;
using MelodyContext.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MelodyAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TagSongMappingController : ControllerBase
    {
        private readonly MelodyDbContext _context;
        public TagSongMappingController(MelodyDbContext context)
        {
            _context = context;   
        }
        // GET: api/<TagSongMappingController>
        [HttpGet]
        public List<TagSongMapping> Get()
        {
            return _context.TagSongMappings.ToList();
        }

        // GET api/<TagSongMappingController>/5
        [HttpGet("{id}")]
        public TagSongMapping Get(int id)
        {
            return _context.TagSongMappings.FirstOrDefault(m => m.MappingId == id);
        }

        // POST api/<TagSongMappingController>
        [HttpPost]
        public void Create([FromBody] Tag tag)
        {
            _context.Add(tag);
            _context.SaveChanges();
        }

        // PUT api/<TagSongMappingController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<TagSongMappingController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var contextTag = _context.TagSongMappings.FirstOrDefault(m => m.MappingId == id);
            _context.Remove(contextTag);
            _context.SaveChanges();
        }
    }
}
