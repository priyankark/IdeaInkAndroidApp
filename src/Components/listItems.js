import React,{Component} from 'react';
import {View, Text, AsyncStorage} from 'react-native';
import {Row, Caption, Button} from '@shoutem/ui';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import {RichTextEditor,RichTextToolbar} from 'react-native-zss-rich-text-editor';
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
  initialTitleHTML={'Title!!'}
  initialContentHTML={'Hello <b>World</b> <p>this is a new paragraph</p> <p>this is another new paragraph</p>'}
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
  alert(obj.title);
  obj.content=await this.richtext.getContentHtml();
  alert(obj.title + ' ' + obj.content)

  try {
    const value = await AsyncStorage.getItem('@IdeaInk:'+obj.title);
    if (value !== null){
      // We have data!!
      alert('An idea with the same title already exists! Choose a unique title.')
    }
    else {
      try {


        let stringObj=JSON.stringify(obj);
        alert(stringObj);
      await AsyncStorage.setItem('@IdeaInk:'+obj.title, stringObj);
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
    <Button onPress={()=>this.setState({visibleModal:3})}>
     <Icon name="trash" size={15} />
    </Button>
  </Row>


  <Modal isVisible={this.state.visibleModal === 1}>
    <View style={{flex:1}}>
    <Button onPress={this.storeData}>
    <Text>
      Save
    </Text>
    </Button>
    <RichTextEditor
    ref={(r) => this.richtext = r}
    initialTitleHTML={this.props.title}
    initialContentHTML={this.props.content}
    editorInitializedCallback={() => this.onEditorInitialized() }
    style={{height:900,marginTop:20}}
  />
  <RichTextToolbar
  getEditor={() => this.richtext}
  />
  </View>
  </Modal>





  </View>






);
}
}
