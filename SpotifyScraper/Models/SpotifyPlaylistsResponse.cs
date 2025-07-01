//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Text.Json.Serialization;
//using System.Threading.Tasks;

//namespace SpotifyScraper.Classes
//{
//    public class SpotifyPlaylistsResponse
//    {
//        [JsonPropertyName("href")]
//        public string Href { get; set; }

//        [JsonPropertyName("limit")]
//        public int Limit { get; set; }

//        [JsonPropertyName("next")]
//        public string Next { get; set; }

//        [JsonPropertyName("offset")]
//        public int Offset { get; set; }

//        [JsonPropertyName("previous")]
//        public string Previous { get; set; }

//        [JsonPropertyName("total")]
//        public int Total { get; set; }

//        [JsonPropertyName("items")]
//        public List<PlaylistItem> Items { get; set; }
//    }

//    public class PlaylistItem
//    {
//        [JsonPropertyName("collaborative")]
//        public bool Collaborative { get; set; }

//        [JsonPropertyName("description")]
//        public string Description { get; set; }

//        [JsonPropertyName("external_urls")]
//        public ExternalUrls ExternalUrls { get; set; }

//        [JsonPropertyName("href")]
//        public string Href { get; set; }

//        [JsonPropertyName("id")]
//        public string Id { get; set; }

//        [JsonPropertyName("images")]
//        public List<Image> Images { get; set; }

//        [JsonPropertyName("name")]
//        public string Name { get; set; }

//        [JsonPropertyName("owner")]
//        public Owner Owner { get; set; }

//        [JsonPropertyName("public")]
//        public bool Public { get; set; }

//        [JsonPropertyName("snapshot_id")]
//        public string SnapshotId { get; set; }

//        [JsonPropertyName("tracks")]
//        public Tracks Tracks { get; set; }

//        [JsonPropertyName("type")]
//        public string Type { get; set; }

//        [JsonPropertyName("uri")]
//        public string Uri { get; set; }

//        [JsonPropertyName("primary_color")]
//        public string PrimaryColor { get; set; }
//    }

//    public class ExternalUrls
//    {
//        [JsonPropertyName("spotify")]
//        public string Spotify { get; set; }
//    }

//    public class Image
//    {
//        [JsonPropertyName("url")]
//        public string Url { get; set; }

//        [JsonPropertyName("height")]
//        public int? Height { get; set; }

//        [JsonPropertyName("width")]
//        public int? Width { get; set; }
//    }

//    public class Owner
//    {
//        [JsonPropertyName("external_urls")]
//        public ExternalUrls ExternalUrls { get; set; }

//        [JsonPropertyName("href")]
//        public string Href { get; set; }

//        [JsonPropertyName("id")]
//        public string Id { get; set; }

//        [JsonPropertyName("type")]
//        public string Type { get; set; }

//        [JsonPropertyName("uri")]
//        public string Uri { get; set; }

//        [JsonPropertyName("display_name")]
//        public string DisplayName { get; set; }
//    }

//    public class Tracks
//    {
//        [JsonPropertyName("href")]
//        public string Href { get; set; }

//        [JsonPropertyName("total")]
//        public int Total { get; set; }
//    }
//}
