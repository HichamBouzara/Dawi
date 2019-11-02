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
import {registerUser} from '../../actions/authActions';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  normalize,
} from '../../utils/responsive-helper';

class SignUpScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {username: '', password: '', password2: ''};
    this.pwInput1 = React.createRef();
    this.pwInput2 = React.createRef();
  }
  render() {
    const {loading, user} = this.props.user;
    // if (!user || loading) {
    //   return <Loading />;
    // } else {
    return (
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'space-between',
          paddingTop: hp(8),
        }}>
        <View style={styles.inputView}>
          <Text style={styles.subtitle}>Email:</Text>
          <TextInput
            style={[styles.input, {marginBottom: hp(2)}]}
            placeholder="Email Professionnel ou Personnel"
            onChangeText={username => this.setState({username})}
            value={this.state.username}
            autoCompleteType="username"
            keyboardType="email-address"
            returnKeyType="next"
            onSubmitEditing={() => this.pwInput1.current.focus()}
            textContentType="emailAddress"
          />
        </View>
        <View style={styles.inputView}>
          <Text style={styles.subtitle}>Mot de Passe:</Text>
          <TextInput
            ref={this.pwInput1}
            style={[styles.input, {marginBottom: hp(2)}]}
            placeholder="Mot de Passe"
            onChangeText={password => this.setState({password})}
            value={this.state.password}
            secureTextEntry={true}
            autoCompleteType="password"
            textContentType="password"
            returnKeyType="next"
            onSubmitEditing={() => this.pwInput2.current.focus()}
          />
        </View>
        <View style={styles.inputView}>
          <Text style={styles.subtitle}>Confirmer mot de passe:</Text>
          <TextInput
            ref={this.pwInput2}
            style={[styles.input, {marginBottom: hp(2)}]}
            placeholder="Confirmer mot de passe"
            onChangeText={password2 => this.setState({password2})}
            value={this.state.password2}
            secureTextEntry={true}
            autoCompleteType="password"
            textContentType="password"
          />
        </View>
        <View style={[styles.buttonView, {marginTop: hp(2)}]}>
          <Button
            title="Inscription"
            titleStyle={styles.buttonTitle}
            buttonStyle={styles.button}
            onPress={this._signup}
          />
        </View>
        <View
          style={[
            styles.buttonView,
            {
              flexDirection: 'row',
              marginTop: hp(2),
              justifyContent: 'space-between',
            },
          ]}>
          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor: '#4267b2',
                marginLeft: 10,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}
            onPress={this._signin}>
            <Icon name="facebook" size={14} color="#fff" />
            <Text style={styles.buttonTitle}>{`  `}Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor: '#dd4b39',
                marginLeft: 10,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}
            onPress={this._signin}>
            <Icon name="google" size={14} color="#fff" />
            <Text style={styles.buttonTitle}>{`  `}Google</Text>
          </TouchableOpacity>
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
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: hp(5),
            marginBottom: hp(8),
          }}>
          <Text style={styles.subtext}>
            {
              "En continuant,\nVous acceptez les termes & conditions d'utilisations"
            }
          </Text>
        </TouchableOpacity>
      </ScrollView>
    );
    // }
  }
  _signup = async () => {
    const {username, password, password2} = this.state;
    if (username !== '' && password !== '' && password === password2) {
      console.log('Registering in screen');
      const user = {
        email: this.state.username,
        password: this.state.password,
      };
      this.props.registerUser(user, this.props.navigation);
      //this.props.navigation.navigate('App');
    } else {
      if (password !== password2)
        alert('Les mots de passe ne correspondent pas.');
      else alert('Veuillez remplir tous les champs.');
    }
  };
}
const styles = StyleSheet.create({
  inputView: {
    marginBottom: hp(1),
    width: wp(76.8),
    alignSelf: 'center',
  },
  subtitle: {
    alignSelf: 'flex-start',
    marginBottom: hp(1),
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
    height: 30,
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
    // '5%',
    alignSelf: 'center',
    fontSize: normalize(14),
  },
  subtext: {
    opacity: 0.87,
    color: '#898a8f',
    fontFamily: 'Poppins-Bold',
    fontSize: normalize(11),
    fontWeight: '700',
    textAlign: 'center',
  },
});

SignUpScreen.propTypes = {
  registerUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(
  mapStateToProps,
  {registerUser},
)(SignUpScreen);
