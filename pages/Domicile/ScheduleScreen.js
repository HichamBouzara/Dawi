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
import DatePicker from 'react-native-datepicker';

class ConfirmationScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {birthdate: '', firstname: '', lastname: '', phone: ''};
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
          <DatePicker
            style={[
              styles.birthdateInput,
              // {borderColor: '#000000', marginTop: 10},
            ]}
            date={this.state.birthdate}
            mode="date"
            placeholder="Date de rendez-vous"
            format="DD-MM-YYYY"
            minDate="01-01-1900"
            maxDate="01-01-2019"
            confirmBtnText="Confirmer"
            cancelBtnText="Annuler"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: wp(3),
              },
              dateText: {
                color: '#000000',
                fontFamily: 'Poppins-Regular',
                fontSize: normalize(12.5),
              },
              dateTouchBody: {
                shadowColor: 'rgba(0, 0, 0, 0.05)',
                shadowOffset: {width: 2, height: 0},
                shadowRadius: 5,
                borderRadius: 25,
                borderColor: '#ececec',
                borderStyle: 'solid',
                borderWidth: 1,
                backgroundColor: '#ffffff',
              },
              dateInput: {
                borderColor: '#f5448e',
                borderWidth: 0,
              },
              placeholderText: {
                color: '#a0a0a0',
                fontSize: normalize(12.5),
              },
            }}
            onDateChange={birthdate => {
              this.setState({birthdate});
            }}
          />
          <DatePicker
            style={[
              styles.birthdateInput,
              // {borderColor: '#000000', marginTop: 10},
            ]}
            iconSource={require('../../assets/images/accueil/clock.png')}
            date={this.state.birthdate}
            mode="time"
            placeholder="Heure de rendez-vous"
            format="DD-MM-YYYY"
            minDate="01-01-1900"
            maxDate="01-01-2019"
            confirmBtnText="Confirmer"
            cancelBtnText="Annuler"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: wp(3),
              },
              dateText: {
                color: '#000000',
                fontFamily: 'Poppins-Regular',
                fontSize: normalize(12.5),
              },
              dateTouchBody: {
                shadowColor: 'rgba(0, 0, 0, 0.05)',
                shadowOffset: {width: 2, height: 0},
                shadowRadius: 5,
                borderRadius: 25,
                borderColor: '#ececec',
                borderStyle: 'solid',
                borderWidth: 1,
                backgroundColor: '#ffffff',
              },
              dateInput: {
                borderColor: '#f5448e',
                borderWidth: 0,
              },
              placeholderText: {
                color: '#a0a0a0',
                fontSize: normalize(12.5),
              },
            }}
            onDateChange={birthdate => {
              this.setState({birthdate});
            }}
          />
          <View
            style={[
              styles.buttonView,
              {marginTop: hp(2), marginBottom: hp(8)},
            ]}>
            <Button
              title="Valider"
              titleStyle={styles.buttonTitle}
              buttonStyle={styles.button}
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
  birthdateInput: {
    width: wp(76.8), //'76.8%',
    height: 40, //'4.3%',
    // backgroundColor: '#ffffff',
    textAlign: 'center',
    marginBottom: hp(5), // '5%',
    alignSelf: 'center',
  },
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
