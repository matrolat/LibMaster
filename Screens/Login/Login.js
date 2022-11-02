import { Text, View ,TextInput,TouchableOpacity,Button,Alert} from 'react-native'
import React, { Component } from 'react'
import { useNavigation } from '@react-navigation/native'
import Constants from '../../Constants/Constants';




export default class Login extends Component {
    constructor() {
        super();
        this.onPressButton = this.onPressButton.bind(this);
        this.onPressSignUp = this.onPressSignUp.bind(this);
        this.state = {
            data: [],
            email:"",
            password:"",
            isLoading: true
          };
    }
    
    
    onPressButton() {
     

        var email = this.state.email;
        var password = this.state.password;
       
        // formData.append("email", this.state.email);
        // formData.append("password", this.state.password);
        var Data={
            email:email,
            password:password
        };
        fetch('http://' + Constants.WIFI_IP +'/Libmaster/Api/Login.php', {
            method: "POST",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(Data)
           
          })
          .then((response) => response.json())
          .then((json) => {
            console.log(json[0]);
            var id = json[0];
              this.setState({
                  data: JSON.stringify(json)
                });

                var param =id.LoginId;
                Alert.alert(param);
                // this.props.navigation.navigate('Scanner', {
                //   Id: id.LoginId    });
                  this.props.navigation.navigate('Scanner', {  
                    id: param
                })  
            return json.data;
  
          })
          .catch((error) => {
              // Alert.alert("Invalid Data");
            // console.error(error);
          });



      };
    
      onPressSignUp(){
        this.props.navigation.navigate('SignUp');
      }




      
  render() {
    // const navigation = useNavigation();
    return (
        <View style={{flex:1}}>
        <View style={{flex:4,alignItems:"center",justifyContent:"space-evenly"}}>
 
 <View><Text>logo</Text></View>
 <View><Text style={{color:"#3A449B",fontSize:40}}>LIBMASTER</Text></View>
 </View>
 <View style={{flex:8,backgroundColor:"#E7E6F4",borderTopLeftRadius:60,borderTopRightRadius:60}}>
 <View style={{display:"flex",justifyContent:"center",height:130,alignItems:"center"}}>
   <Text style={{fontSize:26,color:"black"}}>LOGIN</Text>
 </View>
 <View style={{height:100,paddingHorizontal:20,justifyContent:"space-evenly"}}>
 <Text style={{fontSize:16,color:"black"}}>USERNAME</Text>
 <TextInput type="text" color={"black"} value={this.state.email} onChangeText={(email)=>{this.setState({email}); }} style={{backgroundColor:"white",alignSelf:"center",height:36,borderRadius:40,width:"100%"}}/>
 </View>
 <View style={{height:100,paddingHorizontal:20,justifyContent:"space-evenly"}}>
 <Text style={{fontSize:16,color:"black"}}>PASSWORD</Text>
 <TextInput type="text" color={"black"} value={this.state.password} onChangeText={(password)=>{  this.setState({
             password
            }); }} style={{backgroundColor:"white",alignSelf:"center",height:36,borderRadius:40,width:"100%"}}/>
 </View>
 <View style={{flex:3,alignItems:"center",paddingTop:10}}>
   <TouchableOpacity  onPress={this.onPressButton} style={{backgroundColor:"#3A449B",height:36,width:"60%",borderRadius:40,justifyContent:"center",alignItems:"center"}}><Text style={{color:"white",fontSize:20}}>LOGIN</Text></TouchableOpacity>

 </View>
 <View style={{flex:3,alignItems:"center",paddingTop:10}}>
 <TouchableOpacity  onPress={this.onPressSignUp} style={{backgroundColor:"#3A449B",height:36,width:"60%",borderRadius:40,justifyContent:"center",alignItems:"center"}}><Text style={{color:"white",fontSize:20}}>SIGN UP</Text></TouchableOpacity>

    {/* <Button
        title="Go to Details"
        onPress={() =>  this.props.navigation.navigate('Details')}
      /> */}
 </View>
 
 </View>
      </View>
    )
  }
}