import React, {Component} from 'react';
import {View , StyleSheet, Image, ActivityIndicator, FlatList, TouchableOpacity} from 'react-native';
import request from 'superagent';
import {Header, Item, Input, Icon, Button, Text} from 'native-base';
import Source from './Source';
import DataHolder from './DataHolder';

export default class MainPage extends Component {
  constructor(props){
    super(props)
    this.state = {
      fetching: true,
      data: [],
      page: 1,
      nextPage: 1,
      dataUrl: 'https://newsapi.org/v2/everything?q=game&page=1&apiKey=6036b077870449409e6e5447d769d7db',
      query: 'game',
      handleInput: '',
      filter: '',
    }
  }

  componentDidMount(){
    var url = this.state.dataUrl;
    this.setState({fetching: true})
    return request
    .get(url)
    .set('Accept', 'application/json')
    .end((err, res) => {
      var data = JSON.parse(res.xhr._response)
      this.setState({data: data.articles, fetching: false})
    })
  }

  searching(){
    var url = this.state.dataUrl;
    var query = this.state.query;
    var input = this.state.handleInput;
    this.setState({query: input})
    var newUrl = url.replace(query, input)
    this.setState({handleInput: '', fetching: true, dataUrl: newUrl})
    return request
    .get(newUrl)
    .set('Accept', 'application/json')
    .end((err, res) => {
      var data = JSON.parse(res.xhr._response)
      this.setState({data: data.articles, fetching: false})
    })
  }

  fetchMore(){
    var page = this.state.page
    var url = this.state.dataUrl.replace(`page=${this.state.page}`, `page=${this.state.page + 1}`)
    this.setState({fetching: true, page: this.state.page + 1, dataUrl: url})
    return request
    .get(url)
    .set('Accept', 'application/json')
    .end((err, res) => {
      var data = JSON.parse(res.xhr._response)
      this.setState({data: this.state.data.concat(data.articles), fetching: false})
    })
  }

  fetchBySource(e){
    return request
    .get(e)
    .set('Accept', 'application/json')
    .end((err, res) => {
      var data = JSON.parse(res.xhr._response)
      this.setState({data: data.articles, fetching: false})
    })
  }


  render(){
    return(
      <View style={{flex: 1, flexDirection: 'column'}}>
        <View style={{backgroundColor: '#4d2e9b', height: 80}}>
          <Text style={styles.headerTitle}>IndoVTI News</Text>
        </View>
        <View>
          <Header searchBar rounded style={{backgroundColor: '#4d2e9b'}}>
            <Item>
              <Input value={this.state.handleInput} onChangeText={(e) => this.setState({handleInput: e})} placeholder="search news.." />
              <Icon onPress={this.searching.bind(this)}  name="ios-search" />
            </Item>
            <Button transparent>
              <Text>Search</Text>
            </Button>
          </Header>
          <View style={{height: 45, backgroundColor: '#4d2e9b'}}>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity style={styles.button} onPress={() => this.fetchBySource('https://newsapi.org/v2/everything?sources=axios&page=1&apiKey=6036b077870449409e6e5447d769d7db')}>
                <Text style={{color: '#4d2e9b', textAlign: 'center'}}>Axios</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => this.fetchBySource('https://newsapi.org/v2/everything?sources=cnn&page=1&apiKey=6036b077870449409e6e5447d769d7db')}>
                <Text style={{color: '#4d2e9b', textAlign: 'center'}}>CNN</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => this.fetchBySource('https://newsapi.org/v2/everything?sources=mtv-news&page=1&apiKey=6036b077870449409e6e5447d769d7db')}>
                <Text style={{color: '#4d2e9b', textAlign: 'center'}}>MTV</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => this.fetchBySource('https://newsapi.org/v2/everything?sources=redit-r-all&page=1&apiKey=6036b077870449409e6e5447d769d7db')}>
                <Text style={{color: '#4d2e9b', textAlign: 'center'}}>Reddit</Text>
              </TouchableOpacity>
            </View>
          </View>
          <FlatList
            data={this.state.data}
            renderItem={({item}) => (<DataHolder data={item} />)}
            keyExtractor={item => item.url}
            refreshing={this.state.fetching}
            onEndReachedThreshold={0.01}
            onEndReached={this.fetchMore.bind(this)}
            />
          {
            this.state.fetching &&
            <View style={styles.bottom}>
              <ActivityIndicator animating color='#4d2e9b' size="large" />
            </View>
          }
        </View>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  button: {
    backgroundColor: '#d4c4ff',
    width: '24%',
    borderRadius: 3,
    borderStyle: 'solid',
    borderColor: '#4d2e9b',
    borderWidth: 3,
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 23,
    paddingTop: 40,
    paddingLeft: 10,
    color: 'white',
  },
  bottom: {
    padding: 80,
  }
})
