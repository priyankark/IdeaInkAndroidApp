import React,{Component} from 'react';
import {View, Text} from 'react-native';
import {Row, Caption, Button} from '@shoutem/ui';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class ListItems extends Component{

render()
{
return(
  <Row>
    <Caption> {this.props.title} </Caption>
    <Button>
      <Icon name="pencil" size={15} />
    </Button>
    <Button>
     <Icon name="eye" size={15} />
    </Button>
    <Button>
     <Icon name="trash" size={15} />
    </Button>
  </Row>
);
}
}
