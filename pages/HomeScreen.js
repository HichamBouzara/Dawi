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
import {categories} from '../assets/static/categoriesData';
import {partenaires} from '../assets/static/partenairesData';
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
            marginBottom: hp(1),
          }}>
          <Image
            source={require('../assets/images/logo.png')}
            style={{width: wp(17), height: wp(20), marginLeft: wp(1.8)}}
          />
          <TouchableOpacity
            style={{
              marginLeft: wp(45),
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
        <ImageBackground
          source={require('../assets/images/accueil/back.jpg')}
          style={styles.coverImage}
          imageStyle={{opacity: 0.6}}>
          <Text style={styles.title}>LE PARTENAIRE BONHEUR</Text>
          <Text style={styles.subtitle}>
            Premier fournisseur d'avantages en Algérie.
          </Text>
          <Image
            style={[styles.rectangle, {marginTop: hp(5)}]}
            source={require('../assets/images/rectangle/Rectangle_739.png')}
          />
          <Button
            title="Commencez !"
            icon={<Icon name="qrcode" size={16} color="#fdfdfd" />}
            iconRight
            titleStyle={styles.buttonText}
            buttonStyle={[styles.buttonContact, {marginTop: hp(5)}]}
            onPress={() => this.props.navigation.navigate('Scanner')}
          />
        </ImageBackground>
        <Header title="Présentation" />
        <Image
          source={require('../assets/images/accueil/bonheur.jpg')}
          style={{width: '100%', height: hp(25), marginBottom: hp(3)}}
        />
        <Text style={styles.header2}>
          Qu'est-ce que
          <Text style={{color: '#fe116e'}}> 9acima</Text>?
        </Text>
        <Text
          style={[styles.header2, {fontSize: normalize(19), color: '#adc7dd'}]}>
          Des avantages tarifaires de façon industrielle.
        </Text>
        <Image
          style={[styles.rectangle, {marginTop: hp(1.5)}]}
          source={require('../assets/images/rectangle/Rectangle_739.png')}
        />
        <Text style={styles.explicationText}>
          9acima est un projet que nous inscrivons dans la catégorie des projets
          innovants et sociétaux à valeurs ajoutées humaines et économiques.Nous
          permettons à nos adhérents d'accéder à un réseau, évolutif,
          d'avantages négociés auprès d'un réseau de partenaires
          conventionnés.Restauration, sport, loisirs, voyage, bien-être, mode ..
          nous répondons aux besoins de consommations les plus
          récurrents.Service ouvert aux particuliers et entreprises.{' '}
        </Text>
        <ImageBackground
          source={require('../assets/images/accueil/office.jpeg')}
          style={[styles.coverImage, {paddingTop: hp(3.5)}]}
          imageStyle={{opacity: 0.6}}>
          <Text style={[styles.title]}>
            Employeur ou Comité de participation?
          </Text>
          <Text
            style={[
              styles.subtitle,
              {marginTop: hp(2.2), marginBottom: hp(2)},
            ]}>
            Offrez un accès illimité et annuel, pour l'ensemble de vos
            collaborateurs, à un réseau divers et varié d'adresses proposant des
            réductions tarifaires et autres avantages. Particulier? Souscrivez
            individuelement en nous contactant.
          </Text>
          <Button
            title="Contactez-nous"
            icon={<Icon name="envelope-open" size={16} color="#fdfdfd" />}
            iconRight
            titleStyle={styles.buttonText}
            buttonStyle={styles.buttonContact}
            onPress={() => this.setModalVisible(true)}
          />
          <Overlay
            isVisible={this.state.modalVisible}
            onBackdropPress={() => this.setModalVisible(false)}
            overlayStyle={styles.modal}>
            <Text style={styles.modalText}> Contact</Text>
            <View
              style={{
                justifyContent: 'flex-start',
                marginTop: hp(1.7),
                paddingLeft: wp(7),
                paddingRight: wp(7),
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  marginBottom: hp(1.4),
                }}>
                <Icon name="map-marker" size={20} color="#f5448e" />

                <TouchableOpacity
                  onPress={() => Linking.openURL(url)}
                  activeOpacity={0.7}>
                  <Text
                    style={{
                      fontFamily: 'Quicksand-Regular',
                      color: 'black',
                      opacity: 0.6,
                      marginLeft: wp(7),
                    }}>
                    03, Chemin Val d'Hydra, Alger
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginBottom: hp(1.4),
                }}>
                <Icon name="phone" size={20} color="#f5448e" />

                <TouchableOpacity onPress={this.dialCall} activeOpacity={0.7}>
                  <Text
                    style={{
                      fontFamily: 'Quicksand-Regular',
                      color: 'black',
                      opacity: 0.6,
                      marginLeft: wp(5.7),
                    }}>
                    (0) 770 17 8000
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginBottom: hp(1.4),
                }}>
                <Icon name="envelope" size={20} color="#f5448e" />
                <TouchableOpacity
                  onPress={() => Linking.openURL('mailto:hello@9acima.com')}
                  title="hello@9acima.com">
                  <Text
                    style={{
                      fontFamily: 'Quicksand-Regular',
                      color: 'black',
                      opacity: 0.6,
                      marginLeft: wp(4.8),
                    }}>
                    hello@9acima.com
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginBottom: hp(1.4),
                }}>
                <Icon name="globe" size={20} color="#f5448e" />
                <TouchableOpacity
                  onPress={() => Linking.openURL('www.9acima.com')}>
                  <Text
                    style={{
                      fontFamily: 'Quicksand-Regular',
                      color: 'black',
                      opacity: 0.6,
                      marginLeft: wp(5.6),
                    }}>
                    www.9acima.com
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Overlay>
        </ImageBackground>
        <Header title="Nos catégories" />
        <ScrollView horizontal contentContainerStyle={{alignItems: 'center'}}>
          {categories.map((c, index) => (
            <TouchableOpacity
              delayPressIn={50}
              onPress={() =>
                this.props.navigation.navigate('Brands', {
                  title: c.title,
                  rowid: c.rowid,
                })
              }
              key={index}>
              <View key={index} style={styles.card}>
                <Image style={styles.image} source={c.image} />
                <Text style={styles.textHeader}>{c.title}</Text>
                <Text style={styles.textSub}>
                  {c.avantages} avantages
                  {/* <Text> | Paycima disponible</Text> */}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <Header title="Nos partenaires" />
        <ScrollView
          horizontal
          contentContainerStyle={{alignItems: 'center', marginBottom: hp(3)}}>
          {partenaires.map((c, index) => (
            <Card
              key={index}
              style={[styles.card, {margin: 0, justifyContent: 'center'}]}>
              <Image
                style={[
                  styles.image,
                  {
                    width: '100%',
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                  },
                ]}
                source={c.image}
              />
              <Text
                style={[
                  styles.textHeader,
                  {letterSpacing: 1, width: wp(60), textAlign: 'center'},
                ]}>
                {c.title}
              </Text>
              <Text
                style={[styles.textSub, {width: wp(65), textAlign: 'center'}]}>
                {c.subtitle}
              </Text>
            </Card>
          ))}
        </ScrollView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginLeft: hp(1.5),
    marginRight: hp(1.5),
    paddingBottom: hp(2.2),
  },
  coverImage: {
    paddingTop: hp(5),
    height: 320, // hp(43),
    backgroundColor: 'rgb(0, 0, 0)',
    paddingLeft: wp(3),
    paddingRight: wp(3),
  },
  title: {
    color: '#ffffff',
    fontFamily: 'Quicksand-Bold',
    fontSize: normalize(34),
    textAlign: 'center',
  },
  subtitle: {
    color: '#ffffff',
    fontFamily: 'Quicksand-Medium',
    fontSize: normalize(14),
    textAlign: 'center',
  },
  rectangle: {
    width: wp(30),
    height: hp(0.8),
    borderRadius: 5,
    backgroundColor: '#f5448e',
    marginTop: hp(3),
    alignSelf: 'center',
    // marginRight: 273,
  },
  header: {
    fontFamily: 'Quicksand-Bold',
    fontSize: normalize(34),
    alignSelf: 'center',
    color: '#566985',
    marginTop: hp(5),
  },
  header2: {
    fontFamily: 'Quicksand-SemiBold',
    fontSize: normalize(27),
    color: '#334e6f',
    textAlign: 'center',
    alignSelf: 'center',
  },
  explicationText: {
    textAlign: 'center',
    fontFamily: 'Quicksand-Medium',
    fontSize: normalize(15),
    color: '#878c9f',
    marginTop: hp(2),
    marginBottom: hp(2),
  },
  buttonText: {
    color: '#fdfdfd',
    fontFamily: 'Poppins-Regular',
    fontSize: normalize(15),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: hp(1),
  },
  buttonContact: {
    backgroundColor: '#f5448e',
    alignSelf: 'center',
    borderRadius: 15,
    borderWidth: 4,
    borderStyle: 'solid',
    borderColor: 'rgba(255,255,255,0.4)',
  },
  image: {
    width: wp(80),
    height: hp(25),
    borderRadius: 26,
    opacity: 0.75,
    marginBottom: 5,
    // shadowColor: '#888888',
    // shadowOpacity: 0.8,
    // shadowOffset: {width: 5, height: 10},
    // shadowRadius: 2,
  },
  card: {
    justifyContent: 'center',
    marginLeft: wp(5),
  },
  textHeader: {
    color: '#666666',
    fontFamily: 'Poppins-Regular',
    fontSize: normalize(18),
    fontWeight: '500',
    letterSpacing: 3.22,
    marginLeft: wp(4),
  },
  textSub: {
    fontFamily: 'Poppins-Regular',
    opacity: 0.82,
    color: '#666666',
    fontSize: normalize(11),
    fontWeight: '500',
    letterSpacing: 1.97,
    marginLeft: wp(3.5),
  },
  modal: {
    width: wp(94),
    height: hp(35),
    backgroundColor: '#fdfdfd',
    borderRadius: 20,
  },
  modalText: {
    color: '#242c37',
    fontFamily: 'Quicksand-Regular',
    fontSize: normalize(25),
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: hp(1),
    marginTop: hp(3),
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
