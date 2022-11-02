import { Text, View,Image,TextInput,TouchableOpacity,ScrollView,Alert } from 'react-native'
import React, { Component } from 'react'
import Constants from '../../Constants/Constants';

export default class SignUp extends Component {
    constructor() {
        super();
        this.onPressButton = this.onPressButton.bind(this);
        // this.onPressSignUp = this.onPressSignUp.bind(this);
        this.state = {
            data: [],
            id: "",
            email:"",
            password:"",
            branch:"",
            rollno:"",
           
          };
    }

    onPressButton() {
     

        var email = this.state.email;
        var password = this.state.password;
      
        var Data1={
            email:email,
            password:password
        };
     
      
        fetch('http://' + Constants.WIFI_IP +'/Libmaster/Api/Register_Login_Details.php', {
            method: "POST",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(Data1)
           
          })
          .then((response) => response.json())
          .then((json) => {
            var id = json[0];
              this.setState({
                  id: id.LoginId
                });
 
                // console.log(id.LoginId);
                console.log("id");
                console.log(this.state.id);  
                
                var Lid=this.state.id;
                var branch = this.state.branch;
                var rollno = this.state.rollno;
                var Data2={
                  id:Lid,
                  branch:branch,
                  rollno:rollno
              };
              console.log(Data2);
              fetch('http://' + Constants.WIFI_IP +'/Libmaster/Api/Register_User_Details.php', {
                  method: "POST",
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(Data2)
                 
                })
                .then((response) => response.json())
                .then((json) => {
                  console.log(json);
                    this.setState({
                        data: JSON.stringify(json)
                      });
                    //   Alert.alert(this.state.data);
                    setTimeout(function(){
                        alert("You can now Login"); 
                   }, 1000);
                      this.props.navigation.navigate('Login');
                  return json.data;
        
                })
                .catch((error) => {
                    Alert.alert("Invalid Data");
                  // console.error(error);
                });








            // return json.data;
          })
          .catch((error) => {
              Alert.alert("Invalid Data");
            // console.error(error);
          });

         


          

      };










  render() {
    return (
    <ScrollView vertical={true} > 
    {/* <ScrollView  vertical={true} style={{flex:1}}>  */}
       <View style={{flex:4}}>
 


           <View style={{padding:10,alignItems:"center"}}> 
               <Image
          style={{ width: 170,
            height: 165}}
          source={require('../../Assets/Ellipse.png')}
        />
           </View>



           <View style={{alignItems:"center"}}>
           <Image
          style={{ width: 177,
            height: 23}}
          source={require('../../Assets/Rectangle.png')}
        />
           </View>
       </View>
       <View style={{flex:12,justifyContent:"center",alignItems:"center"}}>
           <View style={{backgroundColor:"#E6E6F4",height:"90%",width:"85%",borderRadius:30,paddingTop:10}}>
           <View style={{height:90,paddingHorizontal:20,justifyContent:"space-evenly"}}>
 <Text style={{fontSize:16,color:"black"}}>EMAIL.</Text>
 <TextInput type="text" color={"black"} value={this.state.email} onChangeText={(email)=>{this.setState({email}); }} style={{backgroundColor:"white",alignSelf:"center",height:36,borderRadius:40,width:"100%"}}/>
 </View>
           <View style={{height:90,paddingHorizontal:20,justifyContent:"space-evenly"}}>
 <Text style={{fontSize:16,color:"black"}}>PASSWORD</Text>
 <TextInput type="text" color={"black"} value={this.state.password} onChangeText={(password)=>{this.setState({password}); }} style={{backgroundColor:"white",alignSelf:"center",height:36,borderRadius:40,width:"100%"}}/>
 </View>
           <View style={{height:90,paddingHorizontal:20,justifyContent:"space-evenly"}}>
 <Text style={{fontSize:16,color:"black"}}>BRANCH</Text>
 <TextInput type="text" color={"black"} value={this.state.branch} onChangeText={(branch)=>{this.setState({branch}); }} style={{backgroundColor:"white",alignSelf:"center",height:36,borderRadius:40,width:"100%"}}/>
 </View>
           <View style={{height:90,paddingHorizontal:20,justifyContent:"space-evenly"}}>
 <Text style={{fontSize:16,color:"black"}}>ROLL NUMBER</Text>
 <TextInput type="text" color={"black"} value={this.state.rollno} onChangeText={(rollno)=>{this.setState({rollno}); }} style={{backgroundColor:"white",alignSelf:"center",height:36,borderRadius:40,width:"100%"}}/>
 </View>

 <View style={{flex:3,alignItems:"center",paddingTop:20,paddingBottom:70}}>
   <TouchableOpacity  onPress={this.onPressButton} style={{backgroundColor:"#3A449B",height:36,width:"60%",borderRadius:40,justifyContent:"center",alignItems:"center"}}><Text style={{color:"white",fontSize:20}}>REGISTER</Text></TouchableOpacity>

 </View>


           </View>
        
       </View>
       {/* </ScrollView> */}
      </ScrollView>
    )
  }
}