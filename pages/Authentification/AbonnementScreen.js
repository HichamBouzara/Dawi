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
import {subscribeUser} from '../../actions/authActions';
import Loading from '../Loading';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  normalize,
} from '../../utils/responsive-helper';

class AbonnementScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {enteredCode: '', attempts: 0};
  }
  render() {
    return (
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          paddingBottom: hp(8),
        }}>
        <Image
          style={styles.logo}
          source={require('../../assets/images/logo.png')}
        />
        <Text style={styles.subtext}>Entrez votre code</Text>
        <TextInput
          maxLength={16}
          style={[styles.input]}
          placeholder="Code"
          onChangeText={enteredCode => this.setState({enteredCode})}
          value={this.state.enteredCode}
          textContentType="oneTimeCode"
        />
        <View style={{marginTop: hp(5)}}>
          <Button
            title="Entrer"
            titleStyle={styles.buttonTitle}
            buttonStyle={{
              backgroundColor: '#f5448e',
              width: '100%',
            }}
            onPress={() =>
              this.props.subscribeUser(
                {
                  code16: this.state.enteredCode,
                },
                this.props.navigation,
                false,
              )
            }
          />
        </View>
        <View style={{marginTop: hp(5)}}>
          <Button
            title="Je n'ai pas de code"
            titleStyle={styles.buttonTitle}
            buttonStyle={{
              backgroundColor: '#f5448e',
              width: '100%',
            }}
            onPress={() => this.props.navigation.navigate('UserInfo')}
          />
        </View>
      </ScrollView>
    );
  }

  // _verify = async () => {
  //   const {enteredCode, attempts} = this.state,
  //     {code} = this.props.user;
  //   if (code === enteredCode && code !== '' && enteredCode !== '') {
  //     this.props.confirmUser({status: 1}, this.props.navigation);
  //   } else if (attempts < 5) {
  //     alert(
  //       `Le code que vous avez entré est erroné ! Vous avez ${5 -
  //         attempts} autres tentatives.`,
  //     );
  //     this.setState({attempts: attempts + 1});
  //   } else {
  //     this.setState({attempts: 0});
  //     this.props.confirmUser({status: 0}, this.props.navigation);
  //   }
  // };
}
const styles = StyleSheet.create({
  logo: {
    flexDirection: 'row',
    width: wp(35.5), //'35.5%',
    height: wp(50.4), //'21.4%',
    opacity: 0.78,
    alignSelf: 'center',
    marginTop: hp(5), //'11.9%',
    marginBottom: hp(6), // '13.5%',
  },
  input: {
    width: '90%',
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
    marginBottom: '6%',
    alignSelf: 'center',
    fontSize: normalize(20),
    fontFamily: 'Poppins-Regular',
    letterSpacing: 4.47,
  },
  buttonTitle: {
    color: '#fdfdfd',
    fontFamily: 'Poppins-Regular',
    fontSize: normalize(25),
    fontWeight: '500',
    letterSpacing: 4.47,
  },
  subtext: {
    opacity: 0.85,
    color: '#158298',
    fontFamily: 'Poppins-Regular',
    fontSize: normalize(16),
    textAlign: 'center',
    marginBottom: '7.6%',
  },
});

AbonnementScreen.propTypes = {
  subscribeUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(
  mapStateToProps,
  {subscribeUser},
)(AbonnementScreen);
