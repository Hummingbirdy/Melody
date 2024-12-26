import { ActivityIndicator, FlatList, StyleSheet, Button, TouchableOpacity, Pressable, ScrollView } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useEffect, useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import TrackPlayer, { AppKilledPlaybackBehavior, Capability, useTrackPlayerEvents, Event } from 'react-native-track-player';
import { SearchBar } from '@rneui/themed';
import { Link } from 'expo-router';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { SafeAreaView } from 'react-native-safe-area-context';
import SongCarousel from '@/components/SongCarousel';
import PlayerControls from '@/components/PlayerControls';
import SongSearch from '@/components/SongSearch';
import PlayerTitle from '@/components/PlayerTitle';

type Song = {
  youTubeId: string,
  songName: string,
  artist: string,
  createdDate: Date,
  isValid: boolean,
  inAzure: boolean,
  uploadFailed: boolean,
  tags: number[]
}

type Track = {
  url: string,
  title: string,
  artist: string,
  album: string,
  genre: string,
  date: string,
  artwork: string,
  duration: number,
  id: string
}

type DropdownData = {
  label: string,
  value: number
}

type Tag = {
  tagId: number,
  tagName: string,
  color: string
}

const OrderBy = {
  random : "random",
  recent : "recent",
  added: "added"
}

const events = [
  Event.PlaybackState,
  Event.PlaybackError,
];


export default function TabOneScreen() {
  const [isLoading, setLoading] = useState(true);
  //const [songs, setSongs] = useState<Song[]>([]);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [trackIndex, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [dropdownData, setDropdownData] = useState<DropdownData[]>();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const colorScheme = useColorScheme();
  const [orderBy, setOrderBy] = useState(OrderBy.recent);
  const [showingUntagged, setShowingUntagged] = useState(false);


  // useTrackPlayerEvents(events, (event) => {
  //   console.log("here");
  //   console.log(event.type)
  //   if(event.type == Event.PlaybackActiveTrackChanged){
  //     console.log(event.type);
  //     var startIndex = event.index ?? 0;
  //     const interval = setInterval((startIndex) => {
  //       var currentIndex = TrackPlayer.getActiveTrackIndex();
  //       console.log(startIndex + " - " + currentIndex);
  //       if(startIndex == currentIndex){
  //         console.log("same song");           
  //       }
  //       else{
  //         console.log("different song")
  //       }
  //     }, 5000);
  //     //return () => clearInterval(interval);
  //   }
  // });

  const getSongs = async () => {
    try {
      let URL = `https://melodyapi.azurewebsites.net/api/song?orderBy=${orderBy}`
      if(selectedTags.length > 0){
        URL = URL + `&tags=${selectedTags}`
      }
      const response = await fetch(URL);
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
          artwork: require('../../assets/images/icon.png'),
          duration: 10,
          id: song.youTubeId
        });
      });
      setTracks(trackList);
      // setSongs(songJson);
      await TrackPlayer.setQueue(trackList);
      console.log(trackList.length)
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    };
  }

  const getTags = async () => {
    const tagResponse = await fetch('https://melodyapi.azurewebsites.net/api/tag/');
    let tagDropdowns = new Array<DropdownData>();
    let tagResult: Tag[] = await tagResponse.json();
    tagResult.forEach(tag => {
      tagDropdowns.push({
        label: tag.tagName,
        value: tag.tagId
      });
    });
    setDropdownData(tagDropdowns);
  }

  const setup = async () => {
    await TrackPlayer.setupPlayer();
    TrackPlayer.updateOptions({
      android: {
        appKilledPlaybackBehavior: AppKilledPlaybackBehavior.ContinuePlayback
      },
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

    // useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], async event => {
    //   console.log("start");
    //   if (event.type === Event.PlaybackActiveTrackChanged) {
    //     console.log(event.type);
    //     var startIndex = event.index ?? 0;
    //     const interval = setInterval((startIndex) => {
    //       var currentIndex = TrackPlayer.getActiveTrackIndex();
    //       console.log(startIndex + " - " + currentIndex)
    //       if(startIndex == currentIndex){          
    //         console.log("same song")
    //       }
    //       else{
    //         console.log("different song")
    //       }
    //     }, 5000);
    //   }
    // });
  }

  useEffect(() => {
    setup();
    getSongs();
    getTags();
  }, [orderBy]);

  const Play = async () => {
    TrackPlayer.play();
    setIsPlaying(true);
    let trackIndex = await TrackPlayer.getActiveTrackIndex();
    if (trackIndex != undefined) {
      setIndex(trackIndex);
    }
  }

  const Pause = async () => {
    TrackPlayer.pause();
    setIsPlaying(false);
  }

  const PlayNext = async () => {
    await TrackPlayer.skipToNext();
    let trackIndex = await TrackPlayer.getActiveTrackIndex();
    if (trackIndex != undefined) {
      setIndex(trackIndex);
    }
  }

  const PlayPrevious = async () => {
    await TrackPlayer.skipToPrevious();
    let trackIndex = await TrackPlayer.getActiveTrackIndex();
    if (trackIndex != undefined) {
      setIndex(trackIndex);
    }
  }

  const PlayAtIndex = async (index: number) => {
    await TrackPlayer.skip(index);
    let trackIndex = await TrackPlayer.getActiveTrackIndex();
    if (trackIndex != undefined) {
      setIndex(trackIndex);
    }
  }

  const Search = async () => {
    console.log(selectedTags);
    try {
      const response = await fetch(`https://melodyapi.azurewebsites.net/api/song?orderBy=${orderBy}&tags=${selectedTags}`);
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
          artwork: require('../../assets/images/icon.png'),
          duration: 10,
          id: song.youTubeId
        });
      });
      setTracks(trackList);
      // setSongs(songJson);
      await TrackPlayer.setQueue(trackList);
    } catch (error) {
      console.error(error);
    }
  }

  const toggleShuffle = async () => {
    if(orderBy == OrderBy.random){
      setOrderBy(OrderBy.recent);
    }
    else{
      setOrderBy(OrderBy.random);
    }
  }

  const showUntagged = async () => {
    try {
      if (showingUntagged){
        getSongs;
        setShowingUntagged(false);
      }
      else{
        const response = await fetch(`https://melodyapi.azurewebsites.net/api/song/getUnsorted`);
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
            artwork: require('../../assets/images/icon.png'),
            duration: 10,
            id: song.youTubeId
          });
        });
        setTracks(trackList);
        // setSongs(songJson);
        await TrackPlayer.setQueue(trackList);
        setShowingUntagged(true);
      }
      
    } catch (error) {
      console.error(error);
    }
  }

  return (

    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View>
          <View style={{ flex: 10 }}>
            <SongSearch dropdownData={dropdownData} selectedTags={selectedTags} setSelectedTags={setSelectedTags} Search={Search} />
            <PlayerTitle tracks={tracks} trackIndex={trackIndex} showingUntagged={showingUntagged} showUntagged={showUntagged} orderBy={orderBy} toggleShuffle={toggleShuffle}/>
            <SongCarousel tracks={tracks} trackIndex={trackIndex} playAtIndex={PlayAtIndex}/>
          </View>
          <PlayerControls isPlaying={isPlaying} PlayPrevious={PlayPrevious} Pause={Pause} Play={Play} PlayNext={PlayNext} />
        </View>
      )}
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black'
  }
});
