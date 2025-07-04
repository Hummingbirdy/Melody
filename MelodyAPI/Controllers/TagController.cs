﻿using MelodyContext;
using MelodyContext.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MelodyAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TagController(MelodyDbContext context) : ControllerBase
    {
        private readonly MelodyDbContext _context = context;

        // GET: api/<TagController>
        [HttpGet]
        public List<Tag> Get()
        {
            var tags =  _context.Tags.OrderBy(t => t.IsAIGenerated).ThenBy(t => t.FavoriteOrder == null).ThenBy(t => t.FavoriteOrder).ThenBy(t => t.TagName).ToList();
            return tags;
        }

        // GET api/<TagController>/5
        [HttpGet("{id}")]
        public Tag Get(int id)
        {
            return _context.Tags.FirstOrDefault(t => t.TagId == id);
        }

        // POST api/<TagController>
        [HttpPost]
        public Tag Create([FromBody] Tag tag)
        {
            _context.Add(tag);
            _context.SaveChanges();
            return _context.Tags.Where(t => t.TagName == tag.TagName).FirstOrDefault();
        }

        // PUT api/<TagController>/5
        [HttpPut("{id}")]
        public void Update(int id, [FromBody] Tag tag)
        {
            var contextTag = _context.Tags.FirstOrDefault(t => t.TagId == id);
            contextTag = tag;
            _context.SaveChanges();
            
        }

        // DELETE api/<TagController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
