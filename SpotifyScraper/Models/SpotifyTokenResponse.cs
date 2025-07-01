using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace SpotifyScraper.Classes
{
    public class SpotifyTokenResponse
    {
        [JsonPropertyName("access_token")]
        public required string AccessToken { get; set; }

        [JsonPropertyName("token_type")]
        public required string TokenType { get; set; }

        [JsonPropertyName("expires_in")]
        public int ExpiresIn { get; set; }
    }
}
