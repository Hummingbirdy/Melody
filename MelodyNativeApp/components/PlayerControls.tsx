import React from 'react';
import {View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import MelodyStyles, { Colors } from '../assets/styles/MelodyStyles';

type PlayerProps = {
    isPlaying: boolean,
    PlayPrevious: Function,
    Pause: Function,
    Play: Function,
    PlayNext: Function
}

export default function PlayerControls(props: PlayerProps){
    return(
        <View style={MelodyStyles.playerControls}>
          <View style={[MelodyStyles.centeredColumn, MelodyStyles.flexOne, {marginLeft: 40}]}>
            <TouchableOpacity style={MelodyStyles.playerSideButton} onPress={() => props.PlayPrevious()}>
              <Icon name="backward-step" size={15} color="white" />
            </TouchableOpacity>
          </View>
          <View style={[MelodyStyles.flexTwo, MelodyStyles.centeredColumn]}>
            {
              props.isPlaying ? (
                <TouchableOpacity style={MelodyStyles.playerMainButton} onPress={() => props.Pause()}>
                  <Icon name="pause" size={30} color={Colors.background} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={MelodyStyles.playerMainButton} onPress={() => props.Play()}>
                  <Icon name="play" size={30} color={Colors.background}/>
                </TouchableOpacity>
              )
            }
          </View>
          <View style={[MelodyStyles.centeredColumn, MelodyStyles.flexOne, {marginLeft: 40}]}>
            <TouchableOpacity style={MelodyStyles.playerSideButton} onPress={() => props.PlayNext()}>
              <Icon name="forward-step" size={15} color="white" />
            </TouchableOpacity>
          </View>
        </View>
    )
}
