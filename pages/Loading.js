//This is an example code for Bottom Navigation//
import React from 'react';
//import react in our code.
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import * as Progress from 'react-native-progress';

export default class Loading extends React.Component {
  static navigationOptions = {
    header: null,
  };
  //Detail Screen to show from any Open detail button
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Progress.CircleSnail
          thickness={7}
          size={100}
          indeterminate={true}
          color={'#f5448e'}
        />
      </View>
    );
  }
}
