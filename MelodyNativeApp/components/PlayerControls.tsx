import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';

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
          <View style={[styles.bubble, {marginLeft: 40, flex: 1}]}>
            <TouchableOpacity style={styles.sideButton} onPress={() => props.PlayPrevious()}>
              <Icon name="backward-step" size={15} color="white" />
            </TouchableOpacity>
          </View>
          <View style={[{flex: 2}, styles.bubble]}>
            {
              props.isPlaying ? (
                <TouchableOpacity style={styles.mainButton} onPress={() => props.Pause()}>
                  <Icon name="pause" size={30} color="#00010D" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={styles.mainButton} onPress={() => props.Play()}>
                  <Icon name="play" size={30} color="#00010D" />
                </TouchableOpacity>
              )
            }
          </View>
          <View style={[styles.bubble, {marginRight: 40, flex: 1}]}>
            <TouchableOpacity style={styles.sideButton} onPress={() => props.PlayNext()}>
              <Icon name="forward-step" size={15} color="white" />
            </TouchableOpacity>
          </View>
        </View>
    )
}

const styles = StyleSheet.create({
    controls: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: '#00010D'
      },
      bubble: {
        justifyContent: 'center',
        alignItems: 'center',
       // margin: 7
      },
      sideButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00010D',
        width: '50%'
      },
      mainButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#A305A6',
        width: '50%',
        //height: '75%',
        borderRadius: 75,
        marginTop: 10,
        marginBottom: 10
      }
});