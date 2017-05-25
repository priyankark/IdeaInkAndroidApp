import React, {Component} from 'react';
import {View, AsyncStorage} from 'react-native';
import {Card, Title, TextInput, Row, Caption, Button} from '@shoutem/ui';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';
import Spin from './Spin';


export default class CardManager extends Component {

state={
  title:'',
  spin:false,
  iconName:'floppy-o',
  toggleButtonIcon:false,
  animateDirection:'normal',
  buttonIconName: 'plus'
};

toggler()
{

  let {toggleButtonIcon,buttonIconName} =this.state;
  if(toggleButtonIcon===false)
  {toggleButtonIcon=true;
    buttonIconName='minus'
  }
  else {
    toggleButtonIcon=false;
    buttonIconName='plus';
  }
  this.setState({toggleButtonIcon,buttonIconName});

}

storeData= async ()=>
{
  this.setState({spin:true});
  let obj={"title":'',"content":''};

  try {
    const value = await AsyncStorage.getItem('@IdeaInk:'+this.state.title);
    if (value !== null){
      // We have data!!
      alert('An idea with the same title already exists! Choose a unique title.')

    }
    else {
      try {
        obj.title=this.state.title;
        let stringObj=JSON.stringify(obj);
      await AsyncStorage.setItem('@IdeaInk:'+this.state.title, stringObj);
      this.setState({spin:false});
      this.setState({iconName:'check'});
    } catch (error) {
      // Error saving data
      alert(error);
    }

    }
  } catch (error) {
    // Error retrieving data
    alert("Your idea couldn't be stored. Try again later.")
  }

    setTimeout(()=>{ this.setState({iconName:'floppy-o'}) }, 500);

}

returnAnimatableView()
{
  if(this.state.buttonIconName==="minus")
  return(
  <Animatable.View animation="fadeInDown" style={{padding:2}}>
      <Row>
        <TextInput style={{height:55, width:200}} onChangeText={(value)=>this.setState({title:value})} />
        <Button onPress={this.storeData} style={{height:25}}  >
          <Icon name={this.state.iconName} size={25} />
        </Button>
      </Row>
    </Animatable.View>
  );
  else {
      return(<Caption> Press the + button to add a new idea! </Caption> );
  }
}



render()
{


return(
  <View style={{marginTop:50, flexDirection:"row"}}>
      <Button onPress={this.toggler.bind(this)} style={{height:25}}  >
        <Icon name={this.state.buttonIconName} size={25} />
      </Button>
      {this.returnAnimatableView()}
  </View>
);
}
}

/*if(this.props.icon==="minus")
return(


);
else {
  return(<Caption> Press the + button to add a new idea! </Caption> );
}

} */
