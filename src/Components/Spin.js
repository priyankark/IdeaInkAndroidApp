import React,{Component} from 'react';
import {View, ActivityIndicator} from 'react-native';

export default class Spin extends Component{



render()
{
  const styles={
  spnnerStyle:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }

  };
return (<View style={styles.spinnerStyle}>
     <ActivityIndicator size={this.props.size} animating={this.props.spin} />
      </View>);
}

}
