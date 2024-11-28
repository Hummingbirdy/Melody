import { ActivityIndicator, FlatList, StyleSheet, Button, TouchableOpacity, Pressable, ScrollView } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useEffect, useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import TrackPlayer, { AppKilledPlaybackBehavior, Capability } from 'react-native-track-player';
import { SearchBar } from '@rneui/themed';
import { Link } from 'expo-router';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { MultiSelect } from 'react-native-element-dropdown';
import { SafeAreaView } from 'react-native-safe-area-context';
import { random } from 'lodash';

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
  const [trackCount, setTrackCount] = useState(0);


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
            <ScrollView style={{ flex: 1 }}>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 1, flexDirection: 'column' }}>
                  {dropdownData != undefined ? (
                    <MultiSelect
                      style={styles.dropdown}
                      data={dropdownData}
                      placeholder='Tags...'
                      placeholderStyle={{ color: '#a9a9a9', fontSize: 20 }}
                      value={selectedTags}
                      search
                      onChange={item => {
                        setSelectedTags(item);
                      }}
                      labelField="label"
                      valueField="value"
                      selectedTextStyle={{ color: 'white', fontSize: 20 }}
                    />
                  ) : (<View></View>)}
                </View>
                <View>
                  <FontAwesome.Button style={styles.searchButton} name="search" backgroundColor='purple' onPress={() => Search()}></FontAwesome.Button>
                </View>
              </View>
            </ScrollView>
            <View style={{ flex: 2, flexDirection: 'column', justifyContent: 'center', alignContent: 'center', width: 'auto' }}>
              <View style={{ flex: 4, justifyContent: 'center', alignContent: 'center' }}>
                <Text style={styles.title}>{tracks[trackIndex].title}</Text>
                <Text style={styles.artist}>{tracks[trackIndex].artist}</Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', margin: 10}}>
                <View style={{ flex: 1}}></View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                  <Text>{tracks.length}</Text>
                </View>
                <Pressable style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                  {({ pressed }) => (
                    <Entypo
                      name={showingUntagged ? 'star' : 'star-outlined'}
                      size={50}
                      color='grey'
                      onPress={showUntagged}
                    />
                  )}
                </Pressable>
                <Pressable style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                  {({ pressed }) => (
                    <Entypo
                      name="shuffle"
                      size={50}
                      color={orderBy == OrderBy.random ? 'white' : 'grey'}
                      onPress={toggleShuffle}
                    />
                  )}
                </Pressable>
                <Link href={{ pathname: "/tagModal", params: { id: tracks[trackIndex].id } }} style={{flex: 1, flexDirection: 'row', alignItems: 'center'}} asChild>
                  <Pressable style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
                    {({ pressed }) => (
                      <FontAwesome
                        name="plus-circle"
                        size={25}                     
                        color={Colors[colorScheme ?? 'light'].text}
                      />
                    )}
                  </Pressable>
                </Link>
              </View>
            </View>
            <View style={{ flex: 2, padding: 24 }}>
              <FlatList
                data={tracks}
                keyExtractor={({ url }) => url}
                renderItem={({ item, index }) => (
                  <TouchableOpacity onPress={() => PlayAtIndex(index)}>
                    <View style={index == trackIndex ? styles.playingSongBubble : styles.songBubble}>
                      <Text style={styles.songTitle}>
                        {item.title} - {item.artist}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
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
      )}
    </SafeAreaView>

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
  artist: {
    fontSize: 30,
    fontWeight: 'thin'
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
    alignItems: 'center',
    height: 100
  },
  playButton: {
    width: 75,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: 300,
    color: 'white',
    marginBottom: 20,
    marginRight: 10
  },
  searchButton: {
    width: 50,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});
