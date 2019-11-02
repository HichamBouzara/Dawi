//This is an example code for Bottom Navigation//
import React from 'react';
//import react in our code.
import {
  AsyncStorage,
  TextInput,
  Image,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Alert,
  ScrollView,
} from 'react-native';
import Loading from '../Loading';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  normalize,
} from '../../utils/responsive-helper';

class AuthScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {username: '', password: ''};
  }
  render() {
    const {loading, user} = this.props.user;
    if (loading) {
      return <Loading />;
    } else {
      return (
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            flex: 1,
            justifyContent: 'flex-end',
            paddingTop: hp(12),
          }}>
          <TouchableOpacity
            style={[styles.largeButton]}
            onPress={() => this.props.navigation.navigate('SignUp')}>
            <Text style={styles.largeButtonText}>Inscription</Text>
          </TouchableOpacity>
          <View style={{height: hp(2)}}></View>
          <TouchableOpacity
            style={[styles.largeButton]}
            onPress={() => this.props.navigation.navigate('SignIn')}>
            <Text style={styles.largeButtonText}>Connexion</Text>
          </TouchableOpacity>
          <View
            style={{
              justifyContent: 'flex-end',
            }}>
            <Image
              style={styles.logo}
              source={require('../../assets/images/dawi.png')}
            />
          </View>
        </ScrollView>
      );
    }
  }
}

const styles = StyleSheet.create({
  logo: {
    width: '100%', //'35.5%',
    height: hp(35), //'21.4%',
    opacity: 0.78,
    marginTop: hp(15),
  },
  largeButton: {
    alignSelf: 'center',
    width: wp(76.8),
    height: 35,
    shadowColor: 'rgba(0, 0, 0, 0.05)',
    shadowOffset: {width: 2, height: 0},
    shadowRadius: 5,
    borderRadius: 25,
    borderColor: '#ececec',
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  largeButtonText: {
    color: '#f5448e',
    fontFamily: 'Poppins-Regular',
    fontSize: normalize(15),
    fontWeight: '500',
  },
});

AuthScreen.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(
  mapStateToProps,
  {},
)(AuthScreen);
