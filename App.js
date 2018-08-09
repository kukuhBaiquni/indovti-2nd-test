import React from 'react';
import {Text, View} from 'react-native';
import MainPage from './Components/MainPage';

export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {loading: true}
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      kinkeefont: require("native-base/Fonts/kinkeefont.ttf"),
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
    });
    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) {
      return <Expo.AppLoading />
    }else{
      return (
        <MainPage />
      )
    }
  }
}
