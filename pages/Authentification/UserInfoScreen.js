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
import Loading from '../Loading';
import {updateUser} from '../../actions/authActions';
import DatePicker from 'react-native-datepicker';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  normalize,
} from '../../utils/responsive-helper';

class UserInfoScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {birthdate: '', firstname: '', lastname: '', phone: ''};
    this.lastNameInput = React.createRef();
    this.phoneInput = React.createRef();
    this._updateUser = this._updateUser.bind(this);
  }

  focusPasswordInput() {
    this.passwordInput.current.focus();
  }

  _updateUser() {
    const {birthdate, firstname, lastname, phone} = this.state;
    if (
      birthdate === '' ||
      firstname === '' ||
      lastname === '' ||
      phone === ''
    ) {
      alert('Veuillez remplir tous les champs.');
    } else {
      const dateSplitted = birthdate.split('-'),
        dateConverted =
          birthdate !== ''
            ? dateSplitted[2] + '-' + dateSplitted[1] + '-' + dateSplitted[0]
            : '';
      this.props.updateUser(
        {
          first_name: firstname === '' ? null : firstname,
          last_name: lastname === '' ? null : lastname,
          phone: phone === '' ? null : phone,
          birthdate: dateConverted !== '' ? dateConverted : null,
        },
        this.props.navigation,
        'App',
      );
    }
  }
  onChangedPhone(text) {
    let newText = '';
    let numbers = '0123456789';

    for (var i = 0; i < text.length; i++) {
      if (numbers.indexOf(text[i]) > -1) {
        newText = newText + text[i];
      } else {
        // your call back function
        alert('Veuillez entrer un numéro de téléphone valide');
      }
    }
    this.setState({phone: newText});
  }
  render() {
    const {birthdate, firstname, lastname, phone} = this.state;
    console.log(birthdate, firstname, lastname, phone);
    const {loading, user} = this.props.user;
    // if (!user || loading) {
    //   return <Loading />;
    // } else {
    return (
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'flex-end',
        }}>
        <Text style={styles.subtext}>Entrez vos informations</Text>
        {/* birthdate, firstname, lastname, phone */}
        <TextInput
          style={[styles.input, {marginBottom: hp(2)}]}
          placeholder="Votre Prénom"
          onChangeText={firstname => this.setState({firstname})}
          value={this.state.firstname}
          autoCompleteType="username"
          returnKeyType="next"
          onSubmitEditing={() => this.lastNameInput.current.focus()}
          textContentType="name"
        />
        <TextInput
          ref={this.lastNameInput}
          style={[styles.input, {marginBottom: hp(2)}]}
          placeholder="Votre Nom"
          onChangeText={lastname => this.setState({lastname})}
          value={this.state.lastname}
          autoCompleteType="username"
          returnKeyType="next"
          onSubmitEditing={() => this.phoneInput.current.focus()}
          textContentType="familyName"
        />
        <TextInput
          ref={this.phoneInput}
          style={[styles.input, {marginBottom: hp(2)}]}
          onChangeText={phone => this.onChangedPhone(phone)}
          value={this.state.phone}
          placeholder="Votre Numéro de Téléphone"
          textContentType="telephoneNumber"
          keyboerdType="phone-pad"
          returnKeyType="next"
        />
        <DatePicker
          ref={this.birthdateInput}
          style={[
            styles.birthdateInput,
            // {borderColor: '#000000', marginTop: 10},
          ]}
          date={this.state.birthdate}
          mode="date"
          placeholder="Votre Date de Naissance"
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
          style={[styles.buttonView, {marginTop: hp(2), marginBottom: hp(8)}]}>
          <Button
            title="Entrer"
            titleStyle={styles.buttonTitle}
            buttonStyle={styles.button}
            onPress={this._updateUser}
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
  // }
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
    width: wp(76.8), //'76.8%',
    height: 40, //'4.3%',
    shadowColor: 'rgba(0, 0, 0, 0.05)',
    shadowOffset: {width: 2, height: 0},
    shadowRadius: 5,
    borderRadius: 25,
    borderColor: '#ececec',
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: '#ffffff',
    textAlign: 'center',
    marginBottom: hp(5), // '5%',
    alignSelf: 'center',
    fontSize: normalize(12.5),
  },
  birthdateInput: {
    width: wp(76.8), //'76.8%',
    height: 40, //'4.3%',
    // backgroundColor: '#ffffff',
    textAlign: 'center',
    marginBottom: hp(5), // '5%',
    alignSelf: 'center',
  },
  subtext: {
    opacity: 0.87,
    color: '#898a8f',
    fontFamily: 'Poppins-Regular',
    fontSize: normalize(16),
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: hp(4), //'7.6%',
  },
});

UserInfoScreen.propTypes = {
  updateUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(
  mapStateToProps,
  {updateUser},
)(UserInfoScreen);
