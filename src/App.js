import React, {Component} from 'react';
import {View, TouchableOpacity, Text, AsyncStorage} from 'react-native';
import { NavigationBar, Heading, Divider, Title, Button, Row, Caption } from '@shoutem/ui';
import CardTitle from './Components/CardTitle';
import Icon from 'react-native-vector-icons/FontAwesome';
import Viewer from './Components/Viewer';
import TextEdit from './Components/TextEdit';
import ListItems from './Components/listItems';
import CardManager from './Components/CardManager';

export default class App extends Component{

render()
{

  return(
    <View style={{flex:1}} >
      <NavigationBar centerComponent={<Heading>Idea Ink</Heading>} />
      <Divider />
      <CardManager />
      <Divider/>

      <View style={{flex:1}}>
      <Viewer/>
      </View>



    </View>
  );
}

}
