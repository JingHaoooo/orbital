import { Image, StyleSheet, Text, View } from 'react-native';


function Avatar(){
    return (
    <View style={styles.avatarContainer}>
      <Image
      style={styles.avatar}
      source={{uri: "https://static.wikia.nocookie.net/maplestory/images/9/9d/ClassArtwork_Battle_Mage_%28Black_Heaven%2C_Female%29.png/revision/latest?cb=20150320054154"}}/>
    </View>
    );
  }
  
  function Header({username}){
    return (
    <View style= {styles.headerContainer}>
      <Avatar />
      <Text>{username}</Text>
    </View>
    );
  }
  
  export function Post(props){
    const{username,image} = props;
    return(
      <View style= {styles.postContainer}>
        <Header username={username}/>
        <Image 
        style= {styles.postImage}
        source= {{uri: image}}/>
      </View>
    );
  }

  const styles = StyleSheet.create({
    avatar :{
    backgroundColor: 'green',
    width: 32,
    height: 32,
    borderRadius: 100 / 2,
    marginRight: 5,
    borderColor: 'red',
    borderWidth: 1,
    },
  
    headerContainer:{
      flexDirection: 'row',
      alignItems: 'center',
    },
  
    postContainer: {
      backgroundColor: 'gray',
    },

    postImage: {
      width: 200,
      height: 200,
    },
  });
  