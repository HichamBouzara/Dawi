//This is an example code for Bottom Navigation//
import React from 'react';
//import react in our code.
import {Image, ImageBackground, View, StyleSheet} from 'react-native';
import Loading from '../Loading';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  normalize,
} from '../../utils/responsive-helper';
import {NavigationActions} from 'react-navigation';

export default class Validated extends React.Component {
  render() {
    let go = setInterval(() => {
      this.props.navigation.navigate('Home');
      clearInterval(go);
    }, 1500);

    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image style={styles.bggCircle} />
        <Image style={styles.bgCircle} />
        <Image style={styles.mdCircle} />
        <Image
          style={styles.check}
          source={require('../../assets/images/check.png')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modalText: {
    color: '#242c37',
    fontFamily: 'Poppins-Regular',
    fontSize: normalize(20),
    fontWeight: '700',
    marginLeft: wp(50),
    marginRight: wp(53),
  },
  mdCircle: {
    height: hp(19),
    width: hp(19),
    backgroundColor: '#f5448e',
    borderRadius: 180,
    position: 'absolute',
  },
  bgCircle: {
    height: hp(29),
    width: hp(28),
    backgroundColor: '#f5448e',
    borderRadius: 180,
    position: 'absolute',
    opacity: 0.06,
  },
  bggCircle: {
    height: hp(37),
    width: hp(36),
    backgroundColor: '#f5448e',
    borderRadius: 180,
    position: 'absolute',
    opacity: 0.03,
  },
  smmCircle: {
    height: hp(300),
    width: hp(300),
    backgroundColor: '#f5448e',
    borderRadius: 180,
    position: 'absolute',
    opacity: 0.03,
  },
  check: {
    height: hp(6.4),
    width: hp(6.6),
    position: 'absolute',
  },
});
