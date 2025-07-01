using MelodyContext;
using MelodyContext.Models;
using Microsoft.AspNetCore.Mvc;
using OpenAI;
using OpenAI.Chat;

namespace MelodyAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OpenAIController(MelodyDbContext context) : ControllerBase
    {
        private readonly string key = "replace-me";
        private readonly MelodyDbContext _context = context;

        [Route("GetSugestedTagging")]
        [HttpPost]
        public void GetSugestedTagging()
        {
            var songs = _context.Songs.Where(s => s.HasRanThroughTagAIGeneration == false && s.IsValid).ToList();

            
            ChatClient client = new(model: "gpt-4o", apiKey: key);

            songs.ForEach(song =>
            {
                ChatCompletion generes = client.CompleteChat($"List the 2 top generes you'd classify the song '{song.SongName}' by '{song.Artist}' as. I would like my results as a comma separated list");


                ChatCompletion moods = client.CompleteChat($"List the 2 top moods you'd classify the song '{song.SongName}' by '{song.Artist}' as. I would like my results as a comma separated list");

                var results = generes.Content[0].Text + ", " + moods.Content[0].Text;
                var newTags = results.Split(',').Select(s => s.Trim()).ToList();

                var currentTags = _context.Tags.ToList();
                newTags.ForEach(newTag =>
                {
                    if ((!currentTags.Any(t => t.TagName == newTag)) && newTag.Length < 100)
                    {
                        _context.Tags.Add(new Tag
                        {
                            TagName = newTag,
                            Color = null,
                            FavoriteOrder = null,
                            IsAIGenerated = true
                        });
                        _context.SaveChanges();
                    }
                    var id = _context.Tags.FirstOrDefault(t => t.TagName == newTag)?.TagId;
                    var mappings = _context.TagSongMappings.ToList();
                    if (id != null && song.YouTubeId != null && (!mappings.Any(m => m.TagId == id && m.SongId == song.YouTubeId)))
                    {
                        _context.TagSongMappings.Add(new TagSongMapping
                        {
                            TagId = (int)id,
                            SongId = song.YouTubeId,
                            CreatedDate = DateTime.Now,
                            IsAIGenerated = true
                        });
                        _context.SaveChanges();
                    }
                });
                song.HasRanThroughTagAIGeneration = true;
                _context.SaveChanges();
            });

            
          
            //return results;

        }
    }
}
