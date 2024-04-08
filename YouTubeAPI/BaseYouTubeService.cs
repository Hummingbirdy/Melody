using Google.Apis.Services;
using Google.Apis.YouTube.v3;
namespace YouTubeAPI
{
    public class BaseYouTubeService
    {
        public YouTubeService YouTubeService()
        {
            return new YouTubeService(new BaseClientService.Initializer
            {
                ApplicationName = "Melody",
                ApiKey = "AIzaSyCDoc3KU2a7RaoDLoQAGX8D-N-DKsaYI9M",
            });
        }

    }
}