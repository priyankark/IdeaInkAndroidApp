import React, {Component} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import { NavigationBar, Heading, Divider, Title, Button, Row } from '@shoutem/ui';
import CardTitle from './Components/CardTitle';
import Icon from 'react-native-vector-icons/FontAwesome';
import Viewer from './Components/Viewer';
import TextEdit from './Components/TextEdit';
import ListItems from './Components/listItems';

export default class App extends Component{

state={
  toggleIcon:false,
  animateDirection:'normal',
  iconName: 'plus'
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



toggler()
{

  let {toggleIcon,iconName} =this.state;
  if(toggleIcon===false)
  {toggleIcon=true;
    iconName='minus'
  }
  else {
    toggleIcon=false;
    iconName='plus';
  }
  this.setState({toggleIcon,iconName});

}

render()
{
  return(
    <View style={{flex:1}} >
      <NavigationBar centerComponent={<Heading>Idea Ink</Heading>} />
      <Divider />
      <View style={{marginTop:50, flexDirection:"row"}}>
          <Button onPress={this.toggler.bind(this)} style={{height:25}}  >
            <Icon name={this.state.iconName} size={25} />
          </Button>

          <View>
            <CardTitle icon={this.state.iconName} />
          </View>

      </View>
      <Divider/>
      <Viewer/>



    </View>
  );
}



}
