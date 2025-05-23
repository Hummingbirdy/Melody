import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';
//import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import { GestureDetector, Gesture, Directions } from 'react-native-gesture-handler'
import { runOnJS } from 'react-native-reanimated'

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
  const [value, setValue] = useState([]); // value is an array for multi-select
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
    const encodedTagList = encodeURIComponent(JSON.stringify(value));
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

  const tapGesture = Gesture.Tap().onStart(() => {
    // if (open) {
    //   setOpen(false);
    // }
    runOnJS(setOpen)(false);
  });

  return (
    <GestureDetector gesture={swipeGesture}>
      <TouchableWithoutFeedback style={{ borderStyle: 'solid', borderWidth: 5, backgroundColor: 'yellow' }} onPress={dismissDropdown}>
        <View style={styles.container}>
          <View style={{ flex: 5 }}>
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              multiple={true}
              mode="BADGE"
              placeholder="Select Tags"
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
              textStyle={{ color: 'white' }}
              listItemLabelStyle={{ color: 'white' }}
              badgeTextStyle={{ color: '#00010D' }}
              closeOnBackPressed={true}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Button title="Search" color='#A305A6' onPress={Search} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 50,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#00010D',
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    color: '#444',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 10,
    height: 40,
    fontSize: 16,
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dateButton: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 12,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: '#ccc',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
  dropdown: {
    borderColor: '#A305A6',
    color: 'white',
    backgroundColor: '#010326',
    zIndex: 1000
  },
  dropdownContainer: {
    borderColor: '#A305A6',
    color: 'white',
    backgroundColor: '#010326'
  },
  selectedText: {
    marginTop: 20,
    fontSize: 16,
    color: 'white'
  }
});
