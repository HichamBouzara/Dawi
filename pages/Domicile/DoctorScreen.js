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
            justifyContent: 'flex-end',
          }}>
          <Image
            style={{width: 200, height: 300, alignSelf: 'center'}}
            source={require('../../assets/images/accueil/doc.png')}
          />
          <Text style={styles.subtext}>Planifier un rendez-vous.</Text>
          <View style={{marginBottom: hp(7), marginLeft: wp(19)}}>
            <Text style={{fontFamily: 'Quicksand-Regular', fontSize: 20}}>
              <Text style={{fontWeight: 'bold', fontSize: 23}}>Nom:</Text>
              {'        '}
              Benmorad
            </Text>
            <Text style={{fontFamily: 'Quicksand-Regular', fontSize: 20}}>
              <Text style={{fontWeight: 'bold', fontSize: 23}}>Prénom:</Text>
              {'  '}
              Karim
            </Text>
          </View>
          <View
            style={[
              styles.buttonView,
              {marginTop: hp(2), marginBottom: hp(8), flexDirection: 'row'},
            ]}>
            <Button
              title="Accepter"
              titleStyle={styles.buttonTitle}
              buttonStyle={[styles.button, {marginRight: wp(4)}]}
              onPress={() => this.props.navigation.navigate('Validated')}
            />
            <Button
              title="Refuser"
              titleStyle={styles.buttonTitle}
              buttonStyle={[
                styles.button,
                {marginLeft: wp(4), backgroundColor: 'grey'},
              ]}
              onPress={() => this.props.navigation.navigate('Accueil')}
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
  subtext: {
    opacity: 0.85,
    color: '#158298',
    fontFamily: 'Poppins-Regular',
    fontSize: normalize(30),
    textAlign: 'center',
    marginBottom: hp(3),
    marginTop: hp(5),
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
