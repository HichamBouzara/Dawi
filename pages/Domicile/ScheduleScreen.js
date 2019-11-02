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
  ScrollView,
} from 'react-native';
import {Button} from 'react-native-elements';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {confirmUser} from '../../actions/authActions';
import Loading from '../Loading';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  normalize,
} from '../../utils/responsive-helper';

class ConfirmationScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {code: '', enteredCode: '', attempts: 0};
  }
  render() {
    const {loading, user, code} = this.props.user;
    if (!user || loading) {
      return <Loading />;
    } else {
      return (
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            flex: 1,
            justifyContent: 'flex-end',
          }}>
          <Text style={styles.subtext}>Planifier un rendez-vous.</Text>

          <View
            style={[
              styles.buttonView,
              {marginTop: hp(2), marginBottom: hp(8)},
            ]}>
            <Button
              title="Vérifier"
              titleStyle={styles.buttonTitle}
              buttonStyle={styles.button}
              onPress={this._verify}
            />
          </View>
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

  _verify = async () => {
    const {enteredCode, attempts} = this.state,
      {code} = this.props.user;
    if (code === enteredCode && code !== '' && enteredCode !== '') {
      this.props.confirmUser({status: 1}, this.props.navigation);
    } else if (attempts < 5) {
      alert(
        `Le code que vous avez entré est erroné ! Vous avez ${5 -
          attempts} autres tentatives.`,
      );
      this.setState({attempts: attempts + 1});
    } else {
      this.setState({attempts: 0});
      this.props.confirmUser({status: 0}, this.props.navigation);
    }
  };
}
const styles = StyleSheet.create({
  buttonView: {marginTop: hp(0), alignSelf: 'center'},
  buttonTitle: {
    color: '#fdfdfd',
    fontFamily: 'SegoeUI-Regular',
    fontSize: normalize(12),
    fontWeight: '500',
  },
  button: {
    borderRadius: 66,
    backgroundColor: '#4043b4',
    width: wp(28),
  },
  logo: {
    width: '100%', //'35.5%',
    height: hp(35), //'21.4%',
    opacity: 0.78,
  },
  input: {
    width: wp(50),
    height: 55,
    shadowColor: 'rgba(0, 0, 0, 0.05)',
    shadowOffset: {width: 2, height: 0},
    shadowRadius: 5,
    borderRadius: 25,
    borderColor: '#ececec',
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: '#ffffff',
    textAlign: 'center',
    marginBottom: hp(6),
    alignSelf: 'center',
    fontSize: normalize(20),
    fontFamily: 'Poppins-Regular',
    letterSpacing: 4.47,
  },
  subtext: {
    opacity: 0.85,
    color: '#158298',
    fontFamily: 'Poppins-Regular',
    fontSize: normalize(16),
    textAlign: 'center',
    marginBottom: hp(3),
  },
});

ConfirmationScreen.propTypes = {
  confirmUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(
  mapStateToProps,
  {confirmUser},
)(ConfirmationScreen);
