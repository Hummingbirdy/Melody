import React from 'react';
import { StyleSheet, FlatList, TouchableOpacity, View, Text } from 'react-native';

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

export default function SongCarousel(props: CarouselProps){
    return (
        <View style={{ flex: 2, padding: 24 }}>
            <FlatList
                data={props.tracks}
                keyExtractor={({ url }) => url}
                renderItem={({ item, index }) => (
                  <TouchableOpacity onPress={() => props.playAtIndex(index)}>
                    <View style={index == props.trackIndex ? styles.playingSongBubble : styles.songBubble}>
                      <Text style={styles.songTitle}>
                        {item.title} - {item.artist}
                      </Text>
                    </View>
                  </TouchableOpacity>
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
    }
  });
  