import React,{Component} from 'react';
import {View, Text} from 'react-native';
import {Row, Caption, Button} from '@shoutem/ui';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import {RichTextEditor,RichTextToolbar} from 'react-native-zss-rich-text-editor';
import WebViewBridge from 'react-native-webview-bridge';

export default class ListItems extends Component{

state={
  visibleModal: null
};

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





  </View>






);
}
}
