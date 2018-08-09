import React, { Component } from 'react';
import {View, Text, StyleSheet, Image} from 'react-native'

export default class Source extends Component {
  render(){
    console.log(this.props);
    return(
      <View style={{flex: 1, flexDirection: 'row', backgroundColor:'red', height: 90}}>
        <View style={styles.iconWrapper}>
          <Image
            onPress={() => this.fetchBySource('https://newsapi.org/v2/everything?sources=axios&page=1&apiKey=6036b077870449409e6e5447d769d7db')} 
            style={{width: 30, height: 30}}
            source={{uri: 'https://icon-locator.herokuapp.com/icon?url=https://www.axios.com&size=70..120..200'}}
            />
          <Text style={{fontSize: 11}}>Axios</Text>
        </View>
        <View style={styles.iconWrapper}>
          <Image
            style={{width: 30, height: 30}}
            source={{uri: 'https://icon-locator.herokuapp.com/icon?url=http://us.cnn.com&size=70..120..200'}}
            />
          <Text style={{fontSize: 11, textAlign: 'center'}}>CNN</Text>
        </View>
        <View style={styles.iconWrapper}>
          <Image
            style={{width: 30, height: 30}}
            source={{uri: 'https://icon-locator.herokuapp.com/icon?url=http://www.mtv.com/news&size=70..120..200'}}
            />
          <Text style={{fontSize: 11, textAlign: 'center'}}>MTV</Text>
        </View>
        <View style={styles.iconWrapper}>
          <Image
            style={{width: 30, height: 30}}
            source={{uri: 'https://icon-locator.herokuapp.com/icon?url=https://www.reddit.com/r/all&size=70..120..200'}}
            />
          <Text style={{fontSize: 10}}>Reddit</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  iconWrapper: {
    height: 90,
    width: 90,
    padding: 30,
    backgroundColor: '#e5dbff'
  }
})
