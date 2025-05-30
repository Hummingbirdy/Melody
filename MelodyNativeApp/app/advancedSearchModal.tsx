import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  View,
  Button,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { GestureDetector, Gesture, Directions } from 'react-native-gesture-handler'
import { runOnJS } from 'react-native-reanimated'
import MelodyStyles, { Colors } from '../assets/styles/MelodyStyles';

type DropdownData = {
  label: string,
  value: string
}
type Tag = {
  tagId: number,
  tagName: string,
  color: string
}

export default function AdvancedSearch() {
  const [open, setOpen] = useState(false);
  const [values, setValue] = useState([]); // value is an array for multi-select
  const [items, setItems] = useState([
    { label: '', value: '' },
  ]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const tagResponse = await fetch('https://melodyapi.azurewebsites.net/api/tag/');
    let tagDropdowns = new Array<DropdownData>();
    let tagResult: Tag[] = await tagResponse.json();
    tagResult.forEach(tag => {
      tagDropdowns.push({
        label: tag.tagName,
        value: tag.tagId.toString()
      });
    });
    setItems(tagDropdowns);
  }

  const Search = async () => {
    const encodedTagList = encodeURIComponent(JSON.stringify(values));
    router.push(`/?data=${encodedTagList}`);
  };

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
        <View style={[MelodyStyles.container,{padding: 50}]}>
          <View style={MelodyStyles.flexFive}>
            <DropDownPicker
              open={open}
              value={values}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              multiple={true}
              mode="BADGE"
              searchable={true}
              placeholder="Select Tags"
              searchPlaceholder='Search for tags'
              style={MelodyStyles.tagDropdown}
              dropDownContainerStyle={MelodyStyles.tagDropdownContainer}
              textStyle={MelodyStyles.colorWhite}
              listItemLabelStyle={MelodyStyles.colorWhite}
              badgeTextStyle={{ color: Colors.background}}
              closeOnBackPressed={true}
              searchTextInputStyle={MelodyStyles.tagSearchText}
            />
          </View>
          <View style={MelodyStyles.flexOne}>
            <Button title="Search" color={Colors.pink} onPress={Search} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </GestureDetector>
  );
}
