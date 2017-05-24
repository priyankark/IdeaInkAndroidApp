import React, {Component} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import { NavigationBar, Heading, Divider, Title, Button, Row } from '@shoutem/ui';
import CardTitle from './Components/CardTitle';
import Icon from 'react-native-vector-icons/FontAwesome';
import Viewer from './Components/Viewer';


export default class App extends Component{

state={
  toggleIcon:false,
  animateDirection:'normal',
  iconName: 'plus'
};


toggler()
{

  let {toggleIcon,iconName} =this.state;
  if(toggleIcon===false)
  {toggleIcon=true;
    iconName='minus';
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
    <NavigationBar
    centerComponent={<Heading>Idea Ink</Heading>}
    />

<Divider />

<View style={{marginTop:50, flexDirection:"row"}}>

  <Button onPress={this.toggler.bind(this)} style={{height:25}}  >
    <Icon name={this.state.iconName} size={25} />
  </Button>
  <View>
  <CardTitle icon={this.state.iconName} />
  </View>

</View>

<Viewer />

</View>
  );
}



}
