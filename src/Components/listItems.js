import React,{Component} from 'react';
import {View, Text, AsyncStorage} from 'react-native';
import {Row, Caption, Button, RichMedia, Title, NavigationBar, Divider} from '@shoutem/ui';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import {RichTextEditor,RichTextToolbar,actions} from 'react-native-zss-rich-text-editor';
import WebViewBridge from 'react-native-webview-bridge';


export default class ListItems extends Component{

state={
  visibleModal: null
};

richText="";

modalEdit()
{
  return(
<Modal isVisible={this.state.visibleModal === 1}>
  <View style={{flex:1}}>
  <RichTextEditor
  ref={(r) => this.richtext = r}
  initialTitleHTML={'Enter Title.'}
  initialContentHTML={'Enter Content. Start storing your ideas away.'}
  editorInitializedCallback={() => this.onEditorInitialized() }
  style={{height:900,marginTop:20}}
/>
<RichTextToolbar
getEditor={() => this.richtext}
/>
</View>
</Modal>
);
}

handleModals()
{
  if(this.state.visibleModal===1)
  return handleModals();

}


storeData= async ()=>
{
  AsyncStorage.removeItem('@IdeaInk:'+this.props.title);
  let obj={"title":'',"content":''};
  obj.title=await this.richtext.getTitleText();
  obj.content=await this.richtext.getContentHtml();


  try {
    const value = await AsyncStorage.getItem('@IdeaInk:'+obj.title);
    if (value !== null){
      // We have data!!
      alert('An idea with the same title already exists! Choose a unique title.')
    }
    else {
      try {


        let stringObj=JSON.stringify(obj);
      await AsyncStorage.setItem('@IdeaInk:'+obj.title, stringObj);
      alert("Saved!");
    } catch (error) {
      // Error saving data
      alert(error);
    }

    }
  } catch (error) {
    // Error retrieving data
    alert("Your idea couldn't be stored. Try again later.")
  }

}

removeIt()
{
  AsyncStorage.removeItem('@IdeaInk:'+this.props.title);
  alert('Item removed! Please refresh.');
}







render()
{
return(

  <View>
  <Row>
    <Caption> {this.props.title} </Caption>
    <Button onPress={()=>this.setState({visibleModal:1})}>
      <Icon name="pencil" size={15} />
    </Button>
    <Button onPress={()=>this.setState({visibleModal:2})}>
     <Icon name="eye" size={15} />
    </Button>
    <Button onPress={this.removeIt.bind(this)} >
     <Icon name="trash" size={15} />
    </Button>
  </Row>


  <Modal isVisible={this.state.visibleModal === 1} >
    <View style={{flex:1}}>
    <View style={{flexDirection:'row'}}>
    <NavigationBar
  centerComponent={<Caption>Edit and refresh!</Caption>}
  rightComponent={(
    <Button onPress={this.storeData}>
      <Icon name="save" size={20} />
    </Button>
  )}
/>

    </View>
    <Divider/>
    <RichTextEditor
    ref={(r) => this.richtext = r}
    initialTitleHTML={this.props.title}
    initialContentHTML={this.props.content}
    editorInitializedCallback={() => this.onEditorInitialized() }
    style={{height:900,marginTop:20}}
  />
  <RichTextToolbar
  getEditor={() => this.richtext}
  actions={
    [
      actions.setBold,
      actions.setItalic,
      actions.insertBulletsList,
      actions.insertOrderedList,
      actions.insertLink


    ]
  }
  />
  </View>
  </Modal>

  <Modal isVisible={this.state.visibleModal === 2}>
    <View style={{flex:1}}>
      <NavigationBar centerComponent={<Caption>{this.props.title}</Caption>} />
      <Divider />
      <Divider />
      <RichMedia body={this.props.content} container={{marginTop:33,marginLeft:5}}/>
    </View>
  </Modal>

</View>
);
}
}
