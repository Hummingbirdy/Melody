import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Platform, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Dropdown } from 'react-native-element-dropdown';
import { Input, Button } from '@rneui/themed';
import { Divider } from '@rneui/themed';

//import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { useEffect, useState } from 'react';


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
  color: string
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
    const {id} = useLocalSearchParams<{id: string}>();
    const [isLoading, setLoading] = useState(true);
    const [song, setSong] = useState<Song>();
    const [tagList, setTagList] = useState<Tag[]>();
    const [dropdownData, setDropdownData] = useState<DropdownData[]>();
    const [selectedTag, setSelectedTag] = useState<DropdownData>();
    const [newTag, setNewTag] = useState<Tag>();
    console.log('YoutubeId: ' + id);

    useEffect(() =>{
      getData();
    }, []);

    const getData = async () => {
      const songResponse = await fetch('https://melodyapi.azurewebsites.net/api/song/'+ id);
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
      setDropdownData(tagDropdowns);
      setTagList(tagResult);
      setLoading(false);
    }

    const tagBubble = (tagId:number) =>{
      var tag = tagList?.find(t => t.tagId == tagId) || {tagId: 0, tagName: "", color: ""};
      return(
        <View style={styles.tagBubble} key={tag.tagId}>
          <Text>{tag.tagName}</Text>
        </View>
      )
    }

    const tagInput = (name:string) => {
      let x : Tag = {
        tagId: 0,
        tagName: name,
        color: '00000'
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
        const newMapping:Mapping = {
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
          setLoading(true);
          getData();
        });
      })
      
    }

    const saveTag = () => {
      console.log('savingTag')
      if(selectedTag != undefined){
        const newMapping:Mapping = {
          tagId: parseInt(selectedTag.value),
          songId: song?.youTubeId
        }
        console.log(newMapping);
        fetch('https://melodyapi.azurewebsites.net/api/tagSongMapping', {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newMapping),
        }).then((response) => console.log(response)).then(() => {
          console.log('saved');
          setSelectedTag(undefined);
          setLoading(true);
          getData();
        });
      }
      else{
        console.log('undefined')
      }
    }

  return (
    <View style={styles.container}>     
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View style={{display: 'flex'}}>
          <View style={{display: 'flex', flex: 4, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={styles.title}>{song?.songName}</Text>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              {song?.tags.map(tag => tagBubble(tag))}
            </View>
          </View>
          <View style={styles.inputRow}>
          {dropdownData != undefined ? (
            <Dropdown
              style={styles.dropdown}
              data={dropdownData}
              placeholder='Add Existing Tag'
              placeholderStyle={{color: '#a9a9a9', fontSize: 20}}
              value={selectedTag}
              onChange={item => {
                setSelectedTag(item);
              }}
              labelField="label"
              valueField="value"
              selectedTextStyle={{color: 'white', fontSize: 20}}
            />
          ) : (<View></View>)}
          <Button
            title='Save'
            onPress={() => saveTag()}
            color='secondary'
            buttonStyle={styles.button}
          />
          </View>
          <View style={styles.inputRow}>
            <Input
              placeholder='Create New Tag'
              value={newTag?.tagName}
              onChangeText={value => tagInput(value)} 
              inputContainerStyle={styles.input}  
              inputStyle={{fontSize: 20, color: 'white'}}   
              placeholderTextColor='#a9a9a9'             
              underlineColorAndroid='transparent'
            />
            <Button
              title='Save'
              onPress={() => saveNewTag()}
              color='secondary'
              buttonStyle={styles.button}
            />
        </View>
        </View>
      )}

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
    borderColor: 'white',
    backgroundColor: 'white',
    color: 'white'
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
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: 300,
    color: 'white'
  },
  tagBubble: {
    height: 30,
    backgroundColor: 'purple',
    margin: 5,
    padding: 5
  },
  inputRow: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: '#222222',
    borderRadius: 5,
    margin: 10,
    padding: 10
  }, 
  button : {
    width: '18%', 
    borderRadius: 7
  }
});
