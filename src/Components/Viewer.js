import React, {Component} from 'react';
import {View, AsyncStorage} from 'react-native';

export default class Viewer extends Component{

state={
  items:[]
};

componentWillMount()
{
  let items=[];
  AsyncStorage.getAllKeys((err, keys) => {
     AsyncStorage.multiGet(keys, (err, stores) => { stores.map((result, i, store) => {  // get at each store's key/value so you can work with it
let key = store[i][0];
let value = store[i][1];
items.push({key:value});
 }); }); });

this.setState({items:items});
}

refresh()
{
  let items=[];
  AsyncStorage.getAllKeys((err, keys) => {
     AsyncStorage.multiGet(keys, (err, stores) => { stores.map((result, i, store) => {  // get at each store's key/value so you can work with it
let key = store[i][0];
let value = store[i][1];
items.push({key:value});
 }); }); });

this.setState({items:items});

}


render()
{
  alert(this.state.items);
  return(
    <View/>
  )
}


}
