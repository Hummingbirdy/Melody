import React from 'react'
import {View, Text, StyleSheet, Pressable} from 'react-native'
import { Entypo } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
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
    random : "random",
    recent : "recent",
    added: "added"

}
export default function PlayerTitle(props: TitleProps){
    const colorScheme = useColorScheme();
    return(
        <View style={{ flex: 2, flexDirection: 'column', justifyContent: 'center', alignContent: 'center', width: 'auto' }}>
            <View style={{ flex: 4, justifyContent: 'center', alignContent: 'center' }}>
            <Text style={styles.title}>{props.tracks[props.trackIndex].title}</Text>
            <Text style={styles.artist}>{props.tracks[props.trackIndex].artist}</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', margin: 10}}>
            <View style={{ flex: 1}}></View>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color: 'white'}}>{props.tracks.length}</Text>
            </View>
            <Pressable style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                {({ pressed }) => (
                <Entypo
                    name={props.showingUntagged ? 'star' : 'star-outlined'}
                    size={50}
                    color='grey'
                    onPress={() => props.showUntagged}
                />
                )}
            </Pressable>
            <Pressable style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                {({ pressed }) => (
                <Entypo
                    name="shuffle"
                    size={50}
                    color={props.orderBy == OrderBy.random ? 'white' : 'grey'}
                    onPress={() => props.toggleShuffle}
                />
                )}
            </Pressable>
            <Link href={{ pathname: "/tagModal", params: { id: props.tracks[props.trackIndex].id } }} style={{flex: 1, flexDirection: 'row', alignItems: 'center'}} asChild>
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
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 50,
        fontWeight: 'bold',
        color: 'white'
    },
    artist: {
        fontSize: 30,
        fontWeight: 'thin',
        color: 'white'
    },
});