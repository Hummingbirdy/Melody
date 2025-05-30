import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
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

type TitleProps = {
    tracks: Track[],
    trackIndex: number,
    showingUntagged: boolean,
    showUntagged: Function,
    orderBy: string,
    toggleShuffle: Function
}

const OrderBy = {
    random: "random",
    recent: "recent",
    added: "added"

}
export default function PlayerTitle(props: TitleProps) {
    return (
        <View style={MelodyStyles.titleContainer}>
            <View style={[MelodyStyles.flexFive, MelodyStyles.centeredColumn]}>
                <Text style={MelodyStyles.title}>{props.tracks[props.trackIndex].title}</Text>
                <Text style={MelodyStyles.text}>{props.tracks[props.trackIndex].artist}</Text>
            </View>
            <View style={MelodyStyles.banner}>
                <View style={MelodyStyles.bannerLeft}>
                    <TouchableOpacity style={[MelodyStyles.centeredRow, MelodyStyles.flexOne]}>
                        <Icon
                            name="shuffle"
                            size={20}
                            color={props.orderBy == OrderBy.random ? 'white' : 'grey'}
                            onPress={() => props.toggleShuffle()}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={[MelodyStyles.centeredRow, MelodyStyles.flexOne]}>
                        <Icon
                            name='tag'
                            size={20}
                            color={props.showingUntagged ? 'white' : 'grey'}
                            onPress={() => props.showUntagged()}
                        />
                    </TouchableOpacity>
                </View>
                <View style={MelodyStyles.bannerRight}>
                    <Text style={MelodyStyles.colorWhite}>{props.trackIndex + 1}/{props.tracks.length}</Text>
                </View>
            </View>
        </View>
    )
}