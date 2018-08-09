import React, { Component } from 'react';
import {StyleSheet, Linking, Text, View, Image, ActivityIndicator, TouchableNativeFeedback} from 'react-native'
import moment from 'moment'

export default class DataHolder extends Component {
  render(){
    return(
      <TouchableNativeFeedback
        onPress={() => Linking.openURL(this.props.data.url)}
        >
        <View style={styles.listItem}>
          <View style={styles.imageWrapper}>
            <Image
              style={{ width: 70, height: 70 }}
              source={{
                uri: this.props.data.urlToImage === null || this.props.data.urlToImage === ''
                ? 'https://www.csd.uwo.ca/people/gradstudents/zwang688/empty.png'
                : this.props.data.urlToImage
              }}
              />
          </View>
          <View style={{flex: 1, flexDirection: 'column'}}>
            <Text style={{paddingLeft: 6, fontSize: 18, fontWeight: 'bold'}}>{this.props.data.title}</Text>
            <Text style={{fontSize: 11, paddingLeft: 6, color: 'gray'}}>{moment(this.props.data.publishedAt).format('MMM DD \'YY - HH:mm')}</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.subtitle}>
                {this.props.data.description}
              </Text>
            </View>
          </View>
        </View>
      </TouchableNativeFeedback>
    )
  }
}

const styles = StyleSheet.create({
  listItem: {
    flex: 1,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#d6d7da",
    padding: 6
  },
  imageWrapper: {
    padding: 5
  },
  title: {
    fontSize: 20,
    textAlign: "left",
    margin: 6
  },
  subtitle: {
    fontSize: 10,
    textAlign: "left",
    margin: 6
  }
})
