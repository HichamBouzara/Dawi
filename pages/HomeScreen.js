//This is an example code for Bottom Navigation//
import React from 'react';
import axios from 'axios';
//import react in our code.
import {
  Image,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  AsyncStorage,
  Platform,
  Linking,
} from 'react-native';
import {Button, Overlay} from 'react-native-elements';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {logoutUser} from '../actions/authActions';
import Loading from './Loading';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Card, ListItem} from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  normalize,
} from '../utils/responsive-helper';

class Header extends React.Component {
  render() {
    return (
      <View style={{alignSelf: 'center'}}>
        <Text style={styles.header}>{this.props.title}</Text>
        <Image
          style={[styles.rectangle, {marginBottom: 40}]}
          source={require('../assets/images/rectangle/Rectangle_739.png')}
        />
      </View>
    );
  }
}

class HomeScreen extends React.Component {
  state = {
    modalVisible: false,
  };
  static navigationOptions = {
    header: null,
  };
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  dialCall = () => {
    let phoneNumber = '';

    if (Platform.OS === 'android') {
      phoneNumber = 'tel:${0770178000}';
    } else {
      phoneNumber = 'telprompt:${0770178000}';
    }

    Linking.openURL(phoneNumber);
  };

  render() {
    const {user, loading} = this.props.user;
    const scheme = Platform.select({ios: 'maps:0,0?q=', android: 'geo:0,0?q='});
    const latLng = `36.7557724,3.0268744,21`;
    const label = `03, Chemin Val d'Hydra, Alger`;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: hp(1),
            marginBottom: hp(3),
            justifyContent: 'center',
          }}>
          <Image
            source={require('../assets/images/logo.png')}
            style={{width: wp(15), height: wp(18), marginLeft: wp(1.8)}}
          />
          <TouchableOpacity
            style={{
              marginLeft: wp(35),
              flexDirection: 'row',
            }}
            onPress={() => this.props.logoutUser(this.props.navigation)}>
            <Icon name="sign-in" size={20} color="#666" />
            <Text
              style={{
                fontFamily: 'Quicksand-SemiBold',
                fontSize: normalize(13),
                color: '#666666',
              }}>
              {' '}
              Déconnecter
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.name}>
          Bonjour, Mr{' '}
          {user.firstname &&
          user.lastname &&
          user.firstname !== '' &&
          user.lastname !== '' ? (
            <Text>
              {user.firstname} {user.lastname}
            </Text>
          ) : (
            <Text>{user.username}</Text>
          )}
        </Text>
        {!user.visit ? (
          <Text style={[styles.name, {fontSize: normalize(13)}]}>
            Vous avez un rendez-vous vidéo le {this.props.user.rdv.date} à{' '}
            {this.props.user.rdv.time}.
          </Text>
        ) : (
          <Text />
        )}

        <Text
          style={{
            fontFamily: 'Quicksand-Bold',
            fontSize: normalize(20),
            marginLeft: wp(4),
            marginTop: hp(2.5),
          }}>
          Categories
        </Text>
        <View style={styles.categories}>
          <TouchableOpacity
            onPress={() => {
              this.setModalVisible(true);
            }}>
            <Card
              containerStyle={[
                styles.card,
                {margin: 0, justifyContent: 'center'},
              ]}
              image={require('../assets/images/accueil/psy.png')}
              imageStyle={styles.image}>
              <Text style={[styles.textHeader]}>Psychologie</Text>
              <Text style={[styles.textSub]}>
                Consultation rapide.{`\n`}Prise de rendez-vous.
              </Text>
            </Card>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setModalVisible(true);
            }}>
            <Card
              image={require('../assets/images/accueil/cardio.png')}
              imageStyle={styles.image}
              containerStyle={[
                styles.card,
                {margin: 0, justifyContent: 'center'},
              ]}>
              <Text style={[styles.textHeader]}>Cardiologie</Text>
              <Text style={[styles.textSub]}>
                Consultation rapide.{`\n`}Prise de rendez-vous.
              </Text>
            </Card>
          </TouchableOpacity>
        </View>
        <View style={[styles.categories, {marginTop: hp(3)}]}>
          <TouchableOpacity
            onPress={() => {
              this.setModalVisible(true);
            }}>
            <Card
              containerStyle={[
                styles.card,
                {margin: 0, justifyContent: 'center'},
              ]}
              image={require('../assets/images/accueil/der.png')}
              imageStyle={styles.image}>
              <Text style={[styles.textHeader]}>Dermatologie</Text>
              <Text style={[styles.textSub]}>
                Consultation rapide.{`\n`}Prise de rendez-vous.
              </Text>
            </Card>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setModalVisible(true);
            }}>
            <Card
              image={require('../assets/images/accueil/ped.png')}
              imageStyle={styles.image}
              containerStyle={[
                styles.card,
                {margin: 0, justifyContent: 'center'},
              ]}>
              <Text style={[styles.textHeader]}>Pédiaterie</Text>
              <Text style={[styles.textSub]}>
                Consultation rapide.{`\n`}Prise de rendez-vous.
              </Text>
            </Card>
          </TouchableOpacity>
        </View>
        <Overlay
          isVisible={this.state.modalVisible}
          onBackdropPress={() => this.setModalVisible(false)}
          overlayStyle={styles.modal}>
          <Button
            title="Traitement à Domicile"
            titleStyle={styles.buttonTitle}
            buttonStyle={{
              backgroundColor: '#f5448e',
              width: '100%',
              height: hp(8),
              marginBottom: hp(4),
            }}
            onPress={() => {
              this.setModalVisible(false);
              this.props.navigation.navigate('Schedule');
            }}
          />
          <Button
            title="Consultation à Distance"
            titleStyle={styles.buttonTitle}
            buttonStyle={{
              backgroundColor: '#f5448e',
              width: '100%',
              height: hp(8),
            }}
          />
        </Overlay>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    width: wp(95),
    height: hp(36),
    backgroundColor: '#fdfdfd',
    borderRadius: 20,
    justifyContent: 'center',
  },
  buttonTitle: {
    color: '#fdfdfd',
    fontFamily: 'Poppins-Regular',
    fontSize: normalize(25),
    fontWeight: '500',
  },
  container: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginLeft: hp(1.5),
    marginRight: hp(1.5),
    paddingBottom: hp(2.2),
    width: wp(85),
    alignSelf: 'center',
  },
  name: {
    fontFamily: 'Poppins-Bold',
    fontSize: normalize(17),
    color: '#000000',
    marginLeft: 15,
  },

  categories: {
    flexDirection: 'row',
    marginTop: hp(4),
  },
  card: {
    justifyContent: 'center',
    marginLeft: wp(3),
    borderRadius: 16.7,
    width: wp(39),
    height: hp(26),
  },
  image: {
    opacity: 0.75,
    marginBottom: 5,
    height: hp(18),
    borderRadius: 16,
    // shadowColor: '#888888',
    // shadowOpacity: 0.8,
    // shadowOffset: {width: 5, height: 10},
    // shadowRadius: 2,
  },
  textHeader: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: normalize(14),
    fontWeight: '500',
    marginLeft: wp(0.5),
  },
  textSub: {
    fontFamily: 'Poppins-Regular',
    opacity: 0.82,
    fontSize: normalize(10),
    fontWeight: '500',
    marginLeft: wp(0.5),
  },
});

HomeScreen.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(
  mapStateToProps,
  {logoutUser},
)(HomeScreen);
