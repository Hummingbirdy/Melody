using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SpotifyScraper.Classes
{
    public class SpotifyPlaylist
    {
        public bool Collaborative { get; set; }
        public string Description { get; set; }
        public ExternalUrls External_Urls { get; set; }
        public Followers Followers { get; set; }
        public string Href { get; set; }
        public string Id { get; set; }
        public List<Image> Images { get; set; }
        public string Name { get; set; }
        public Owner Owner { get; set; }
        public string Primary_Color { get; set; }
        public bool Public { get; set; }
        public string Snapshot_Id { get; set; }
        public TrackCollection Tracks { get; set; }
        public string Type { get; set; }
        public string Uri { get; set; }
    }

    public class ExternalUrls
    {
        public string Spotify { get; set; }
    }

    public class Followers
    {
        public string Href { get; set; }
        public int Total { get; set; }
    }

    public class Image
    {
        public int Height { get; set; }
        public string Url { get; set; }
        public int Width { get; set; }
    }

    public class Owner
    {
        public string Display_Name { get; set; }
        public ExternalUrls External_Urls { get; set; }
        public string Href { get; set; }
        public string Id { get; set; }
        public string Type { get; set; }
        public string Uri { get; set; }
    }

    public class TrackCollection
    {
        public string Href { get; set; }
        public List<TrackItem> Items { get; set; }
    }

    public class TrackItem
    {
        public string Added_At { get; set; }
        public AddedBy Added_By { get; set; }
        public bool Is_Local { get; set; }
        public string Primary_Color { get; set; }
        public Track Track { get; set; }
        public VideoThumbnail Video_Thumbnail { get; set; }
    }

    public class AddedBy
    {
        public ExternalUrls External_Urls { get; set; }
        public string Href { get; set; }
        public string Id { get; set; }
        public string Type { get; set; }
        public string Uri { get; set; }
    }

    public class VideoThumbnail
    {
        public string Url { get; set; }
    }

    public class Track
    {
        public string Preview_Url { get; set; }
        public List<string> Available_Markets { get; set; }
        public bool Explicit { get; set; }
        public string Type { get; set; }
        public Album Album { get; set; }
        public List<Artist> Artists { get; set; }
        public int Disc_Number { get; set; }
        public int Track_Number { get; set; }
        public int Duration_Ms { get; set; }
        public ExternalIds External_Ids { get; set; }
        public ExternalUrls External_Urls { get; set; }
        public string Href { get; set; }
        public string Id { get; set; }
        public string Name { get; set; }
        public int Popularity { get; set; }
        public string Uri { get; set; }
        public bool Is_Local { get; set; }
    }

    public class Album
    {
        public List<string> Available_Markets { get; set; }
        public string Type { get; set; }
        public string Album_Type { get; set; }
        public string Href { get; set; }
        public string Id { get; set; }
        public List<Image> Images { get; set; }
        public string Name { get; set; }
        public string Release_Date { get; set; }
        public string Release_Date_Precision { get; set; }
        public string Uri { get; set; }
        public List<Artist> Artists { get; set; }
        public ExternalUrls External_Urls { get; set; }
        public int Total_Tracks { get; set; }
    }

    public class Artist
    {
        public ExternalUrls External_Urls { get; set; }
        public string Href { get; set; }
        public string Id { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public string Uri { get; set; }
    }

    public class ExternalIds
    {
        public string Isrc { get; set; }
    }



}
