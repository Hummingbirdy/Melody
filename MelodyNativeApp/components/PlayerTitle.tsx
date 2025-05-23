import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome6';
import { useColorScheme } from '@/components/useColorScheme';

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
    const colorScheme = useColorScheme();
    return (
        <View style={{ flex: 4, backgroundColor: '#00010D', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', width: 'auto' }}>
            <View style={{ flex: 5, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.title}>{props.tracks[props.trackIndex].title}</Text>
                <Text style={styles.artist}>{props.tracks[props.trackIndex].artist}</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#2D0140' }}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <TouchableOpacity style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        <Icon
                            name="shuffle"
                            size={20}
                            color={props.orderBy == OrderBy.random ? 'white' : 'grey'}
                            onPress={() => props.toggleShuffle()}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Icon
                            name='tag'
                            size={20}
                            color={props.showingUntagged ? 'white' : 'grey'}
                            onPress={() => props.showUntagged()}
                        />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 3, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginHorizontal: 15 }}>
                    <Text style={{ color: 'white' }}>{props.trackIndex + 1}/{props.tracks.length}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'white'
    },
    artist: {
        fontSize: 25,
        fontWeight: 'thin',
        color: 'grey'
    },
});