import { StyleSheet } from 'react-native';
export const Colors = {
   background: '#00010D',
   darkBlue: '#010326',
   darkPurple: '#2D0140',
   purple: '#660273',
   pink: '#A305A6'
}

const MelodyStyles = StyleSheet.create({
   rootContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors.background
   },
   container: {
      padding: 50,
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      backgroundColor: Colors.background,
   },
   flexOne: {
      flex: 1
   },
   flexTwo: {
      flex: 2
   },
   flexThree: {
      flex: 3
   },
   flexFour: {
      flex: 4
   },
   flexFive: {
      flex: 5
   },
   flexNine: {
      flex: 9
   },
   flexTen: {
      flex: 10
   },
   title: {
      fontSize: 30,
      fontWeight: 'bold',
      color: 'white'
   },
   text: {
      fontSize: 25,
      fontWeight: 'thin',
      color: 'grey'
   },
   centeredColumn: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
   },
   column: {
      flexDirection: 'column'
   },
   centeredRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
   },
   rightRow: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center'
   },
   row: {
      flexDirection: 'row'
   },
   tagDropdown: {
      borderColor: Colors.pink,
      color: 'white',
      backgroundColor: Colors.darkBlue,
      zIndex: 1000, // ensure picker input is above header
      elevation: 1000,
      height: 50,
      zIndex: 5000
   },
   tagDropdownContainer: {
      borderColor: Colors.pink,
      color: 'white',
      backgroundColor: Colors.darkBlue,
      zIndex: 2000, // ensure dropdown menu is above everything
      elevation: 2000,
      position: 'absolute'
   },
   tagModalContainer: {
      color: 'white',
      backgroundColor: Colors.darkBlue,
   },
   colorWhite: {
      color: 'white'
   },
   tagSearchText: {
      paddingHorizontal: 10,
      height: 40,
      color: 'white',
      backgroundColor: Colors.darkBlue,
   },
   tagBubble: {
      height: 30,
      backgroundColor: Colors.darkPurple,
      margin: 5,
      padding: 5
   },
   tagText: {
      color: Colors.pink
   },
   tagInput: {
      borderColor: Colors.pink,
      backgroundColor: Colors.darkBlue,
      color: 'white',
      borderStyle: 'solid',
      borderWidth: 1,
      width: '100%',
      height: 50,
      paddingVertical: 12,
      paddingHorizontal: 10,
      marginTop: 20,
      borderRadius: 8
   },
   tagInputRow: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.darkPurple,
      borderRadius: 5,
      marginVertical: 10,
      padding: 10
   },
   tagSelectButtonRow: {
      flex: 1,
      alignSelf: 'flex-end',
      justifyContent: 'center',
      backgroundColor: Colors.darkPurple
   },
   playerControls: {
      flex: 1,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      backgroundColor: '#00010D'
   },
   playerSideButton: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#00010D',
      width: '50%'
   },
   playerMainButton: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#A305A6',
      width: '50%',
      //height: '75%',
      borderRadius: 75,
      marginTop: 10,
      marginBottom: 10
   },
   titleContainer: {
      flex: 4,
      backgroundColor: '#00010D',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: 'auto'
   },
   banner: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: '#2D0140'
   },
   bannerLeft: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center'
   },
   bannerRight: {
      flex: 3,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      marginHorizontal: 15
   },
   songBubble: {
      flex: 1,
      flexDirection: 'row',
      padding: 10,
      paddingLeft: 30,
      margin: 5,
      borderWidth: 1,
      backgroundColor: '#010326'
   },
   playingSongBubble: {
      flex: 1,
      flexDirection: 'row',
      padding: 10,
      paddingLeft: 30,
      margin: 5,
      borderWidth: 1,
      color: '#660273',
      borderStyle: 'solid',
      borderColor: '#660273'
   },
   songTitle: {
      fontSize: 18,
      color: 'white'
   },
   playingSongTitle: {
      fontSize: 18,
      color: '#A305A6'
   },
   artist: {
      fontSize: 14,
      color: 'grey',
      fontWeight: 'thin'
   },
   playingArtist: {
      fontSize: 14,
      color: '#660273'
   },
   carouselContainer: {
      flex: 4,
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 5,
      backgroundColor: '#00010D'
   }

});

export default MelodyStyles;