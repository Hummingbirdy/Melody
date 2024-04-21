import { ActivityIndicator, FlatList, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useEffect, useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import TrackPlayer, { AppKilledPlaybackBehavior, Capability } from 'react-native-track-player';

type Song = {
  youTubeId: string,
  songName: string,
  artist: string,
  createdDate: Date,
  isValid: boolean,
  inAzure: boolean,
  uploadFailed: boolean
}

type Track = {
  url: string,
  title: string,
  artist: string,
  album: string,
  genre: string,
  date: string,
  artwork: string,
  duration: number
}

export default function TabOneScreen() {
  const [isLoading, setLoading] = useState(true);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [trackIndex, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const getSongs = async () => {
    try {
      const response = await fetch('https://melodyapi.azurewebsites.net/api/song');
      let songJson: Song[] = await response.json();
      let trackList = new Array<Track>();
      songJson.forEach(song => {
        trackList.push({
          url: 'https://melodymusic.blob.core.windows.net/mp4storage/' + song.youTubeId + '.mp3',
          title: song.songName,
          artist: song.artist,
          album: "",
          genre: "",
          date: "",
          artwork: require('../../assets/images/favicon.png'),
          duration: 10
        });
      });
      setTracks(trackList);
      await TrackPlayer.add(trackList);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    };

  }

  const setup = async () => {
    await TrackPlayer.setupPlayer();
    TrackPlayer.updateOptions({
      android: {
          // This is the default behavior
          appKilledPlaybackBehavior: AppKilledPlaybackBehavior.ContinuePlayback
      },
      // Media controls capabilities
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.Stop,
      ],

      // Capabilities that will show up when the notification is in the compact form on Android
      compactCapabilities: [Capability.Play, Capability.Pause, Capability.SkipToNext, Capability.SkipToPrevious],
    });
  }

  useEffect(() => {
    setup();
    getSongs(); 
  }, []);

  const Play = async () => {
    TrackPlayer.play();
    setIsPlaying(true);
    let trackIndex = await TrackPlayer.getActiveTrackIndex();
    if(trackIndex != undefined){
      setIndex(trackIndex);
    }  
  }

  const Pause = async() => {
    TrackPlayer.pause();
    setIsPlaying(false);
  }

  const PlayNext = async () => {
    await TrackPlayer.skipToNext();
    let trackIndex = await TrackPlayer.getActiveTrackIndex();
    if(trackIndex != undefined){
      setIndex(trackIndex);
    }     
  }

  const PlayPrevious = async () => {
    await TrackPlayer.skipToPrevious();
    let trackIndex = await TrackPlayer.getActiveTrackIndex();
    if(trackIndex != undefined){
      setIndex(trackIndex);
    }  
  }

  const PlayAtIndex = async (index: number) => {
    await TrackPlayer.skip(index);
    let trackIndex = await TrackPlayer.getActiveTrackIndex();
    if(trackIndex != undefined){
      setIndex(trackIndex);
    }  
  }

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View style={{flex: 10}}>
          <View style={{ flex: 3, justifyContent: 'center', alignContent: 'center' }}>
            <Text style={styles.title}>{tracks[trackIndex].title}</Text>
          </View>
          <View style={{ flex: 2, padding: 24 }}>
            <FlatList
              data={tracks}
              keyExtractor={({ url }) => url}
              renderItem={({ item, index }) => (
                <TouchableOpacity onPress={() => PlayAtIndex(index)}>              
                  <View style={index == trackIndex ? styles.playingSongBubble : styles.songBubble}>
                    <Text style={styles.songTitle}>
                      {item.title}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      )}
      <View style={styles.controls}>
        <FontAwesome.Button style={styles.directionButton} name="backward" backgroundColor="purple" onPress={() => PlayPrevious()}></FontAwesome.Button>
        {
          isPlaying ? (
            <FontAwesome.Button style={styles.playButton} name="pause" backgroundColor="purple" onPress={() => Pause()}></FontAwesome.Button>
          ) : (
            <FontAwesome.Button style={styles.playButton} name="play" backgroundColor="purple" onPress={() => Play()}></FontAwesome.Button>
          )
        }         
        <FontAwesome.Button style={styles.directionButton} name="forward" backgroundColor="purple" onPress={() => PlayNext()}></FontAwesome.Button>
      </View>
    </View>
  );



}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
  },
  songTitle: {
    fontSize: 18,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  playingSongBubble: {
    flex: 1,
    padding: 5,
    margin: 5,
    height: 35,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'white',
    backgroundColor: 'light purple'
  },
  songBubble: {
    flex: 1,
    padding: 5,
    margin: 5,
    height: 35,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'purple'
  },
  controls: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'center'
  },
  directionButton: {
    width: 50,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  playButton: {
    width: 75,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
