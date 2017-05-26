import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {RichTextEditor,RichTextToolbar} from 'react-native-zss-rich-text-editor';
import WebViewBridge from 'react-native-webview-bridge';
import {Button} from '@shoutem/ui';

export default class TextEdit extends Component{

onEditorInitialized()
{
  alert("Hello world");
}

richtext="";

render()
{
  
  return(
    <View style={{flex:1}}>
    <Button onPress={()=>alert(JSON.stringify(this.richtext.getTitleText()))} >
    <Text> Press
    </Text>
    </Button>
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
);
}

}
