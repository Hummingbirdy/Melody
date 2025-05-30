import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Platform, Keyboard, TouchableWithoutFeedback, Button, TextInput, Text, View, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import DropDownPicker from 'react-native-dropdown-picker';
import { GestureDetector, Gesture, Directions } from 'react-native-gesture-handler'
import { runOnJS } from 'react-native-reanimated'
import { useEffect, useState } from 'react';
import MelodyStyles, { Colors } from '../assets/styles/MelodyStyles';
import { Entypo } from '@expo/vector-icons'; // or 'react-native-vector-icons/FontAwesome'



type Song = {
  youTubeId: string,
  songName: string,
  artist: string,
  createdDate: Date,
  isValid: boolean,
  inAzure: boolean,
  uploadFailed: boolean,
  tags: number[]
}

type Tag = {
  tagId: number,
  tagName: string,
  color: string,
  favoriteOrder: number | null
}

type DropdownData = {
  label: string,
  value: string
}

type Mapping = {
  tagId: number,
  songId: string | undefined
}
export default function AddTag() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [song, setSong] = useState<Song>();
  const [tagList, setTagList] = useState<Tag[]>();
  const [newTag, setNewTag] = useState<Tag>();
  const [open, setOpen] = useState(false);
  const [values, setValue] = useState<string[]>([]);
  const [items, setItems] = useState([
    { label: '', value: '' },
  ]);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    getData();
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const getData = async () => {
    const songResponse = await fetch('https://melodyapi.azurewebsites.net/api/song/' + id);
    let songResult: Song = await songResponse.json();
    setSong(songResult);
    const tagResponse = await fetch('https://melodyapi.azurewebsites.net/api/tag/');
    let tagDropdowns = new Array<DropdownData>();
    let tagResult: Tag[] = await tagResponse.json();
    tagResult.forEach(tag => {
      tagDropdowns.push({
        label: tag.tagName,
        value: tag.tagId.toString()
      })
    });
    // setDropdownData(tagDropdowns);
    setTagList(tagResult);
    // setLoading(false);
    setItems(tagDropdowns);
  }

  const tagBubble = (tagId: number) => {
    var tag = tagList?.find(t => t.tagId == tagId) || { tagId: 0, tagName: "", color: "" };
    return (
      <View style={MelodyStyles.tagBubble} key={tag.tagId}>
        <Text style={MelodyStyles.tagText}>{tag.tagName}</Text>
      </View>
    )
  }

  const tagInput = (name: string) => {
    let x: Tag = {
      tagId: 0,
      tagName: name,
      color: '00000',
      favoriteOrder: null
    }
    setNewTag(x);
  }

  const saveNewTag = () => {
    fetch('https://melodyapi.azurewebsites.net/api/tag/', {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTag),
    })
      .then((response) => response.json())
      .then((responseData: Tag) => {
        console.log(JSON.stringify(responseData));
        const newMapping: Mapping = {
          tagId: responseData.tagId,
          songId: song?.youTubeId,
        }
        fetch('https://melodyapi.azurewebsites.net/api/tagSongMapping/', {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newMapping),
        }).then(() => {
          console.log('saved');
          setNewTag(undefined);
          getData();
        });
      })

  }

  const saveTag = () => {
    console.log('savingTag')
    if (values.length > 0) {
      const newMappings: Mapping[] = [];
      values.map((value) => {
        const newMapping: Mapping = {
          tagId: parseInt(value),
          songId: song?.youTubeId
        }
        newMappings.push(newMapping);
      });
      fetch('https://melodyapi.azurewebsites.net/api/tagSongMapping/CreateBatch', {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMappings),
      }).then((response) => console.log(response)).then(() => {
        console.log('saved');
        // setSelectedTag(undefined);
        // setLoading(true);
        getData();
      });
    }
    else {
      console.log('undefined')
    }
  }

  const swipeGesture = Gesture.Fling()
    .direction(Directions.RIGHT)
    .onEnd((event) => {
      runOnJS(router.navigate)('/');
    });

  const dismissDropdown = () => {
    if (open) {
      setOpen(false);
    }
    Keyboard.dismiss();
  };

  return (
    <GestureDetector gesture={swipeGesture}>
      <TouchableWithoutFeedback onPress={dismissDropdown}>
        <View style={[MelodyStyles.container, { padding: 25 }]}>
          <View style={MelodyStyles.flexOne}>
            {!keyboardVisible && (
              <View style={[MelodyStyles.centeredColumn, MelodyStyles.flexTwo]}>
                <Text style={MelodyStyles.title}>{song?.songName}</Text>
                <View style={MelodyStyles.row}>
                  {song?.tags.map(tag => tagBubble(tag))}
                </View>
              </View>)}
            <View style={[MelodyStyles.tagInputRow, { zIndex: 1 }]}>
              <TextInput
                placeholder='Create New Tag'
                value={newTag?.tagName}
                onChangeText={value => tagInput(value)}
                placeholderTextColor='grey'
                underlineColorAndroid='transparent'
                style={MelodyStyles.tagInput}
              />
              <View style={MelodyStyles.tagSelectButtonRow}>
                <Button title="Create" color={Colors.pink} onPress={saveNewTag} />
              </View>
            </View>
            <View style={[MelodyStyles.tagInputRow, { zIndex: 2 }]}>
              <DropDownPicker
                open={open}
                value={values}
                items={items}
                // renderListItem={props => {
                //   const fullItem = tagList?.find(t => t.tagId == props.item.value);
                //   return (
                //     <TouchableOpacity activeOpacity={0.5} onPress={() => props.onPress(props.item.value!)}>
                //       <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 15 }}>
                //         <Text style={{ color: 'white', fontSize: 16 }}>{props.item.label}</Text>
                //         {fullItem?.favoriteOrder != null && (
                //           <Entypo name="star-outlined" size={16} color={Colors.pink} style={{ marginLeft: 10 }} />
                //         )}
                //       </View>
                //     </TouchableOpacity>
                //   )
                // }}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                multiple={true}
                listMode='MODAL'
                mode="BADGE"
                searchable={true}
                placeholder="Select Tags"
                placeholderStyle={{ color: 'grey' }}
                searchPlaceholder='Search for tags'
                style={MelodyStyles.tagDropdown}
                dropDownContainerStyle={MelodyStyles.tagDropdownContainer}
                modalContentContainerStyle={MelodyStyles.tagModalContainer}
                textStyle={MelodyStyles.colorWhite}
                listItemLabelStyle={MelodyStyles.colorWhite}
                badgeTextStyle={{ color: Colors.background }}
                closeOnBackPressed={true}
                searchTextInputStyle={MelodyStyles.tagSearchText}
                zIndex={5000}
                zIndexInverse={7000}

              />
              <View style={MelodyStyles.tagSelectButtonRow}>
                <Button title="Add" color={Colors.pink} onPress={saveTag} />
              </View>

            </View>
          </View>

          {/* Use a light status bar on iOS to account for the black space above the modal */}
          <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        </View>
      </TouchableWithoutFeedback>
    </GestureDetector>
  );


}

