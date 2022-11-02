import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native'

import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

export default class Scanner extends Component {
  constructor() {
    super();

    this.state = {
        url: "",
        email:"",
        password:"",
        datetime:"",
        isLoading: true,
        data:""
      };
}



  onSuccess = e => {
    console.log(e.data);
    this.setState({
      url: JSON.stringify(e.data)
    });



    var id = this.props.route.params.id; 
    
    // formData.append("email", this.state.email);
    // formData.append("password", this.state.password);
    var Data={
       id:id
    };
    // console.log("Data");
    // console.log(e.data);
    fetch(e.data, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(Data)
       
      })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
          // this.setState({
          //     data: JSON.stringify(json)
          //   });
            Alert.alert("Successfull");
            // this.props.navigation.navigate('Scanner');
        return json.data;

      })
      .catch((error) => {
        console.error(error);
          Alert.alert("Invalid Data");
      });



    // Linking.openURL(e.data).catch(err =>
    //   console.error('An error occured', err)
    // );
  };

  onPressSignUp(){
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
 
    this.setState({
      datetime:  date + '/' + month + '/' + year 
      + ' ' + hours + ':' + min + ':' + sec
    });
  }
 
  render() {
    return (
      <QRCodeScanner
        onRead={this.onSuccess}
        // flashMode={RNCamera.Constants.FlashMode.torch}
        topContent={
          <Text style={styles.centerText}>
            Go to{' '}
            <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
            your computer and scan the QR code {this.props.route.params.id}
          </Text>
        }
        bottomContent={
          <TouchableOpacity style={styles.buttonTouchable}>
            <Text style={styles.buttonText}>OK. Got it!</Text>
          </TouchableOpacity>
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16
  }
});
