import React from 'react';
import {View, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

type PlayerProps = {
    isPlaying: boolean,
    PlayPrevious: Function,
    Pause: Function,
    Play: Function,
    PlayNext: Function
}

export default function PlayerControls(props: PlayerProps){
    return(
        <View style={styles.controls}>
            <FontAwesome.Button style={styles.directionButton} name="backward" backgroundColor="purple" onPress={() => props.PlayPrevious()}></FontAwesome.Button>
            {
              props.isPlaying ? (
                <FontAwesome.Button style={styles.playButton} name="pause" backgroundColor="purple" onPress={() =>props.Pause()}></FontAwesome.Button>
              ) : (
                <FontAwesome.Button style={styles.playButton} name="play" backgroundColor="purple" onPress={() => props.Play()}></FontAwesome.Button>
              )
            }
            <FontAwesome.Button style={styles.directionButton} name="forward" backgroundColor="purple" onPress={() => props.PlayNext()}></FontAwesome.Button>
          </View>
    )
}

const styles = StyleSheet.create({
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
});