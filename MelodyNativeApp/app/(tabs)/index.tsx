import { ActivityIndicator, FlatList, StyleSheet, Button } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useEffect, useState } from 'react';
import { Audio } from "expo-av"

type Song = {
  youTubeId: string,
  songName: string,
  artist: string,
  createdDate: Date,
  isValid: boolean,
  inAzure: boolean,
  uploadFailed: boolean
}


export default function TabOneScreen() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<Song[]>([]);
  const sound = new Audio.Sound();

  const getSongs = async () => {
    try{
      const response = await fetch('https://melodyapi.azurewebsites.net/api/song');
      const songJson = await response.json();
      setData(songJson);
    }catch(error){
      console.error(error);
    } finally {
      setLoading(false);
    };
    
  }

  useEffect(() => {
    getSongs();
  }, []);
  
  async function PlaySong(youTubeId: string): Promise<void> {
    let Uri = 'https://melodymusic.blob.core.windows.net/mp4storage/'+ youTubeId +'.mp3'
    await sound.loadAsync({
      uri: Uri
    });
    await sound.playAsync();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Song List</Text>
      <View style={{flex: 1, padding: 24}}>
        {isLoading ? (
          <ActivityIndicator />
        ): (
          <FlatList
            data={data}
            keyExtractor={({youTubeId}) => youTubeId}
            renderItem={({item}) => (
              <View style={styles.songBubble}>
                <Text style={styles.songTitle}>
                  {item.songName}
                </Text>
                <Button
                  title="Play"
                  color= "purple"
                  onPress={() => PlaySong(item.youTubeId)}
                />
              </View>
            )}
          />
        )}
      </View>
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
    fontSize: 20,
    fontWeight: 'bold',
  },
  songTitle: {
    fontSize: 18,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  songBubble: {
    flex: 1,
    padding: 50
  }
});
