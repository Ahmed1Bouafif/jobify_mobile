import { StatusBar } from "expo-status-bar";

import server from "../../ipConfig/serverIp";

//////////////////////////////////
// new dependencis
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
//npm i react-native-vector-icons to install teb3aeli fou9ha
//////////////////////////////////////
// import server from "./ipConfig/serverIp";


// prettier-ignore
import { 
  Button,
  Text,
  View, 
  SafeAreaView,
  AsyncStorage,    
  TouchableOpacity, 
  TextInput,
  Platform,
  StyleSheet,
  Alert,
} from "react-native";
import { useState } from "react";
import axios from "axios";
import colors from "../../../assets/colors/colors";

export default function loginCompanie({ navigation }) {
    const login = async () => {
        const URL = `${server.Ip}/authcompany/login`;
        console.log(URL);
        const worker = { email_or_PhoneNumber, password };
        try {
       
          // const { data } = await axios.post(URL, worker);
          const { data } = await axios.post(URL, worker);
          console.log("DATA", data);
    
          // if the response is not a string (not an error message)
          if (typeof data !== "string") {
            // then it's an object containing data
    
            // the provided login, belongs to a registered company or to a registered worker
            const { workerId, id } = data;
            const userId = id ?? workerId;

            await AsyncStorage.setItem("session", JSON.stringify(userId));


            
            let role;
            if (workerId) {
              role = "Worker";
            } else if (companyId) {
              role = "Company";
            } else {
              role = "admin";
            }
    
            Alert.alert(
              `Welcome ${data.firstName}`,
              "You're now connected to your account",
              [
    
                {
                  text: "Continue",
                  onPress: () => navigation.navigate(`Home${role}`),
                },
              ]
            );
          } else {
 
            let title, content, leftButtonLabel, rightButtonLabel, leftButtonAction, rightButtonAction;
    
            if (data === "Wrong login and password combination") {
              title = "Incorrect login & password combination";
              content = `Please try again, or click on forgot password`;
              leftButtonLabel = "Forgot password";
              leftButtonAction = () => {
                // navigation.navigate("forgotPassword")
              };
              rightButtonLabel = "Ok";
              rightButtonAction = () => {};
            } else if (data === "If you are a company, please enter your email") {
              title = "Incorrect login / password";
              content = `${data}.\nPlease try again, or click on forgot password`;
              leftButtonLabel = "Forgot password";
              leftButtonAction = () => {
                // navigation.navigate("forgotPassword")
              };
              rightButtonLabel = "Close";
              rightButtonAction = () => {};
            } else if (data === "(500) Internal Server Error") {
              title = "Network Error";
              content = `${data}.\nPlease check your network connection`;
              leftButtonLabel = "";
              leftButtonAction = () => {
                // navigation.navigate("forgotPassword")
              };
              rightButtonLabel = "Ok";
              rightButtonAction = () => {};
            }
    
            Alert.alert(title, content, [
              {
                text: leftButtonLabel,
                onPress: leftButtonAction,
              },
              { text: "", onPress: () => null },
              {
                text: rightButtonLabel,
                onPress: rightButtonAction,
              },
            ]);
            console.log(data);
          }
    
          if (!String(data).includes("false")) {
            const workerId = JSON.stringify(data.id);
            await AsyncStorage.setItem("session", workerId);
            Alert.alert(
              `Welcome ${data.firstName}`,
              "You're now connected to your account",
              [
                // {
                //   text: "Cancel",
                //   onPress: () => console.log("Cancel Pressed"),
                // },
                // { text: "Home", onPress: () => navigation.goBack() },
                {
                  text: "Continue",
                  onPress: () => navigation.navigate("HomeWorker"),
                },
              ]
            );
            // alert("Welcome" + " " + data.firstName);
            // navigation.navigate("HomeWorker");
          } else {
            alert("Login ERROR");
          }
        } catch (error) {
          
          Alert.alert("Network Error", "Please check your network connection", [
            {
              text: "",
              onPress: () => {},
            },
            { text: "", onPress: () => null },
            {
              text: "ok",
              onPress: () => {},
            },
          ]);
        }
      };
    
      const handlePressLogin = () => {
        if (!email_or_PhoneNumber) {
          Alert.alert("Missing Field", "Please enter your login", [
            {
              text: "",
              onPress: () => {},
            },
            { text: "", onPress: () => null },
            {
              text: "ok",
              onPress: () => {},
            },
          ]);
        } else if (!password) {
          Alert.alert("Missing Field", "Please enter your password", [
            {
              text: "",
              onPress: () => {},
            },
            { text: "", onPress: () => null },
            {
              text: "ok",
              onPress: () => {},
            },
          ]);
        } else {
          login();
        }
      };
     
    
      const [email_or_PhoneNumber, onChangeEmail] = useState(null);
      const [password, onChangePassword] = useState(null);

         return (
          <View style={styles.container}>
              <StatusBar backgroundColor={colors.blue} barStyle="light-content"/>
            <View style={styles.header}>
                <Text style={styles.text_header}>Welcome! Hotel </Text>
            </View>
            <Animatable.View 
                animation="fadeInUpBig"
                style={[styles.footer, {
                    backgroundColor: colors.white
                }]}
            >
                <Text style={[styles.text_footer, {
                    color: colors.blue
                }]}>Username</Text>
                <View style={styles.action}>
                    <FontAwesome 
                        name="user-o"
                        color={colors.blue}
                        size={20}
                    />
                    <TextInput 
                        placeholder="Your Email"
                        placeholderTextColor="#666666"
                        style={[styles.textInput, {
                            color: colors.gray
                        }]}
                         onChangeText={onChangeEmail}
                         value={email_or_PhoneNumber}
                        autoCapitalize="words"
    
                    />
                   
                </View>
               
                
    
                <Text style={[styles.text_footer, {
                    color: colors.blue,
                    marginTop: 35
                }]}>Password</Text>
                <View style={styles.action}>
                    <Feather 
                        name="lock"
                        color={colors.blue}
                        size={20}
                    />
                    <TextInput 
                        placeholder="Your Password"
                        placeholderTextColor="#666666"
                        secureTextEntry={true}
                        style={[styles.textInput, {
                            color: colors.gray
                        }]}
                        autoCapitalize="words"
                        onChangeText={onChangePassword}
                        value={password}
                    />
                    
                </View>
                
                
    
                <TouchableOpacity>
                    <Text style={{color: colors.blue, marginTop:15}}>Forgot password?</Text>
                </TouchableOpacity>
                <View style={styles.button}>
                    <TouchableOpacity
                        style={[styles.signIn,{backgroundColor:colors.gold}]}
                        title="Login"
                         onPress={handlePressLogin}
                    >
                   
                        <Text style={[styles.textSign, {
                            color:colors.white
                        }]}>Sign In</Text>
                  
                    </TouchableOpacity>
    
                    <TouchableOpacity
                        onPress={() => navigation.navigate('SignupCompany')}
                        style={[styles.signIn, {
                            borderColor: colors.gold,
                            borderWidth: 1,
                            marginTop: 15
                        }]}
                    >
                        <Text style={[styles.textSign, {
                            color: colors.gold
                        }]}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
          </View>
        );
    }
  
    
      const styles = StyleSheet.create({
        container: {
          flex: 1, 
          backgroundColor: colors.blue
        },
        header: {
            flex: 1,
            justifyContent: 'flex-end',
            paddingHorizontal: 20,
            paddingBottom: 50
        },
        footer: {
            flex: 3,
            backgroundColor: colors.white,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            paddingHorizontal: 20,
            paddingVertical: 30
        },
        text_header: {
            color: colors.white,
            fontWeight: 'bold',
            fontSize: 30
        },
        text_footer: {
            color: '#05375a',
            fontSize: 18
        },
        action: {
            flexDirection: 'row',
            marginTop: 10,
            borderBottomWidth: 1,
            borderBottomColor: '#f2f2f2',
            paddingBottom: 5
        },
        actionError: {
            flexDirection: 'row',
            marginTop: 10,
            borderBottomWidth: 1,
            borderBottomColor: '#FF0000',
            paddingBottom: 5
        },
        textInput: {
            flex: 1,
            marginTop: Platform.OS === 'ios' ? 0 : -12,
            paddingLeft: 10,
            color: '#05375a',
        },
        errorMsg: {
            color: '#FF0000',
            fontSize: 14,
        },
        button: {
            alignItems: 'center',
            marginTop: 50,
            
        },
        signIn: {
            width: '100%',
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            
        },
        textSign: {
            fontSize: 18,
            fontWeight: 'bold'
        }
      });
     