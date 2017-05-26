import React, {Component} from 'react';
import {View, AsyncStorage, ScrollView, FlatList} from 'react-native';
import ListItems from './listItems';
import Spin from './Spin';
import {Button, Caption} from '@shoutem/ui';
import Icon from 'react-native-vector-icons/FontAwesome';


export default class Viewer extends Component{

  state={
    items:[],
    loading:false

  };




  refresh()
  {
    let items=[];
    this.setState({loading:true});
    AsyncStorage.getAllKeys((err, keys) => {
       AsyncStorage.multiGet(keys, (err, stores) => { stores.map((result, i, store) => {  // get at each store's key/value so you can work with it
  let key = store[i][0];
  let value =JSON.parse(store[i][1]);
  items.push(value);
  this.setState({items:items,loading:false});
  }); });
  });


}

renderItems()
{
  /* <ListItems key={item.title} title={item.title}/> */

       return this.state.items.map((item)=>{

          return(

              <ListItems key={item.title} title={item.title} content={item.content}/>

            );
        }
     );
}

showOrNot()
{
  if(this.state.loading===true)
  return(<Spin/>);
  else {
    return(
      <View style={{flex:1}}>
      <ScrollView>
        {this.renderItems()}
      </ScrollView>
      </View>
    );
  }
}


render()
{


  return(

    <View style={{flex:1, flexDirection:'column'}}>
    <Button onPress={this.refresh.bind(this)} styleName="dark">
        <Icon name="history" size={25} />
        <Caption> View And Edit Ideas/Refresh </Caption>
    </Button>
    {this.showOrNot()}
    </View>

  );
}


}
