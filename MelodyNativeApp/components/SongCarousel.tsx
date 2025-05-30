import React from 'react';
import {FlatList, TouchableOpacity, View, Text, Pressable } from 'react-native';
import { Link } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome6';
import MelodyStyles, { Colors } from '../assets/styles/MelodyStyles';

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
    <View style={MelodyStyles.carouselContainer}>
      <FlatList
        data={props.tracks}
        keyExtractor={({ url }) => url}
        renderItem={({ item, index }) => (
          <View style={index == props.trackIndex ? MelodyStyles.playingSongBubble : MelodyStyles.songBubble}>
            <TouchableOpacity style={[MelodyStyles.flexNine, MelodyStyles.column]} onPress={() => props.playAtIndex(index)}>
              <Text style={index == props.trackIndex ? MelodyStyles.playingSongTitle : MelodyStyles.songTitle}>
                {item.title}
              </Text>
              <Text style={index == props.trackIndex ? MelodyStyles.playingArtist : MelodyStyles.artist}>
                {item.artist}
              </Text>
            </TouchableOpacity>
            <Link href={{ pathname: "/tagModal", params: { id: props.tracks[index].id } }} style={[MelodyStyles.centeredRow, MelodyStyles.flexOne]} asChild>
              <Pressable style={[MelodyStyles.flexOne, MelodyStyles.rightRow]}>
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

