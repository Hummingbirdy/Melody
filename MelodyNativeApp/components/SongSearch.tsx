import React from 'react';
import {View, Text, StyleSheet, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { MultiSelect } from 'react-native-element-dropdown';

type DropdownData = {
    label: string,
    value: number
  }

type SearchProps = {
    dropdownData: DropdownData[] | undefined,
    selectedTags: string[],
    setSelectedTags: Function,
    Search: Function
}

export default function SongSearch(props: SearchProps){
    return(
        <ScrollView style={{ flex: 1 }}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ flex: 1, flexDirection: 'column' }}>
                {props.dropdownData != undefined ? (
                <MultiSelect
                    style={styles.dropdown}
                    data={props.dropdownData}
                    placeholder='Tags...'
                    placeholderStyle={{ color: '#a9a9a9', fontSize: 20 }}
                    value={props.selectedTags}
                    search
                    onChange={item => {
                    props.setSelectedTags(item);
                    }}
                    labelField="label"
                    valueField="value"
                    selectedTextStyle={{ color: 'white', fontSize: 20 }}
                />
                ) : (<View></View>)}
            </View>
            <View>
                <FontAwesome.Button style={styles.searchButton} name="search" backgroundColor='purple' onPress={() => props.Search()}></FontAwesome.Button>
            </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    searchButton: {
        width: 50,
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
});