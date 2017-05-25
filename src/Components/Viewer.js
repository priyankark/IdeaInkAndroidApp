import React, {Component} from 'react';
import {View, AsyncStorage, ScrollView} from 'react-native';
import ListItems from './listItems';
import Spin from './Spin';
import {Button, Caption} from '@shoutem/ui';
import Icon from 'react-native-vector-icons/FontAwesome';


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
let value =JSON.parse(store[i][1]);
items.push(value);
 }); }); });

this.setState({items:items});
}

refresh()
{
  let items=[];
  AsyncStorage.getAllKeys((err, keys) => {
     AsyncStorage.multiGet(keys, (err, stores) => { stores.map((result, i, store) => {  // get at each store's key/value so you can work with it
let key = store[i][0];
let value =JSON.parse(store[i][1]);
items.push(value);
 }); }); });

this.setState({items:items});

}

renderItems()
{
  /* <ListItems key={item.title} title={item.title}/> */

       return this.state.items.map((item)=>{

          return(

              <ListItems key={item.title} title={item.title}/>

            );
        }
     );
}


render()
{

  return(
    <View style={{flex:1, flexDirection:'column'}}>

      <Button onPress={this.refresh.bind(this)}>
          <Icon name="refresh" size={25} />
          <Caption> Refresh </Caption>
      </Button>

      <ScrollView>
        {this.renderItems()}
      </ScrollView>

    </View>

  );
}


}
