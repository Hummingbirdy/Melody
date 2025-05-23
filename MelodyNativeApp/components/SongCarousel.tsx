import React from 'react';
import { StyleSheet, FlatList, TouchableOpacity, View, Text, Pressable } from 'react-native';
import { Link } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome6';

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

type CarouselProps = {
  tracks: Track[],
  trackIndex: number,
  playAtIndex: Function
}

export default function SongCarousel(props: CarouselProps) {
  return (
    <View style={{ flex: 4, paddingLeft: 20, paddingRight: 20, paddingTop: 5, backgroundColor: '#00010D' }}>
      <FlatList
        data={props.tracks}
        keyExtractor={({ url }) => url}
        renderItem={({ item, index }) => (
          <View style={index == props.trackIndex ? styles.playingSongBubble : styles.songBubble}>
            <TouchableOpacity style={{ flex: 9, flexDirection: 'column' }} onPress={() => props.playAtIndex(index)}>
              <Text style={index == props.trackIndex ? styles.playingSongTitle : styles.songTitle}>
                {item.title}
              </Text>
              <Text style={index == props.trackIndex ? styles.playingArtist : styles.artist}>
                {item.artist}
              </Text>
            </TouchableOpacity>
            <Link href={{ pathname: "/tagModal", params: { id: props.tracks[index].id } }} style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }} asChild>
              <Pressable style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                {({ pressed }) => (
                  <Icon
                    name='plus'
                    size={15}
                    color='grey'
                  />
                )}
              </Pressable>
            </Link>
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  songTitle: {
    fontSize: 18,
    color: 'white'
  },
  playingSongTitle: {
    fontSize: 18,
    color: '#A305A6'
  },
  artist: {
    fontSize: 14,
    color: 'grey',
    fontWeight: 'thin'
  },
  playingArtist: {
    fontSize: 14,
    color: '#660273'
  },
  playingSongBubble: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    paddingLeft: 30,
    margin: 5,
    //height: 35,
    borderWidth: 1,
    color: '#660273',
    borderStyle: 'solid',
    borderColor: '#660273'
  },
  songBubble: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    paddingLeft: 30,
    margin: 5,
    // height: 35,
    borderWidth: 1,
    // borderStyle: 'solid',
    // borderColor: 'purple',
    backgroundColor: '#010326'
  }
});
