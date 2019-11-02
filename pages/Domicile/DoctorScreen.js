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
import {Button, Overlay} from 'react-native-elements';
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
import * as Progress from 'react-native-progress';

class DoctorScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {modalVisible: false, date: '', time: ''};
  }
  componentDidMount() {
    alert(this.props.user.rdv.time);
  }
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
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
            date={this.state.date}
            mode="date"
            placeholder="Date de rendez-vous"
            format="DD-MM-YYYY"
            minDate="02-11-2019"
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
            onDateChange={date => {
              this.setState({date});
            }}
          />
          <DatePicker
            style={[
              styles.birthdateInput,
              // {borderColor: '#000000', marginTop: 10},
            ]}
            iconSource={require('../../assets/images/accueil/clock.png')}
            date={this.state.time}
            mode="time"
            placeholder="Heure de rendez-vous"
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
            onDateChange={time => {
              this.setState({time});
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
              onPress={() =>
                this.state.date !== '' && this.state.time !== ''
                  ? this.trigger()
                  : alert('Veuillez remplir tous les champs.')
              }
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
          <Overlay
            isVisible={this.state.modalVisible}
            onBackdropPress={() => this.setModalVisible(false)}
            overlayStyle={styles.modal}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: hp(3),
              }}>
              <Progress.CircleSnail
                thickness={7}
                size={100}
                indeterminate={true}
                color={'#f5448e'}
              />
            </View>
            <Text style={styles.btnText}>Recherche de médecin en cours..</Text>
          </Overlay>
        </ScrollView>
      );
    }
  }
  trigger = () => {
    this.setModalVisible(true);
    let go = setInterval(() => {
      this.setModalVisible(false);
      alert('Worked');
      //this.props.navigation.navigate('Home');
      clearInterval(go);
    }, 2500);
  };

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
  btnText: {
    marginTop: hp(4),
    color: '#f5448e',
    fontFamily: 'Quicksand-Semibold',
    fontSize: normalize(21),
    textAlign: 'center',
  },
  modal: {
    width: wp(70),
    height: hp(36),
    backgroundColor: '#fdfdfd',
    borderRadius: 20,
    justifyContent: 'flex-start',
  },
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

DoctorScreen.propTypes = {
  confirmUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(
  mapStateToProps,
  {confirmUser},
)(DoctorScreen);
