import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Pressable } from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome6';

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


export default function Search(props: SearchProps) {
    return (
        <View style={styles.container}>
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
                        <TouchableOpacity onPress={() => props.Search()}>
                            <View style={{backgroundColor: '#A305A6'}}><Text>Search</Text></View>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
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