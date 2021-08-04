
import React,{useState,useEffect} from 'react';
import {View,Text,TextInput,StyleSheet,Button,ActivityIndicator,Alert} from 'react-native';
import {useDispatch} from 'react-redux';
import Colors from '../constants/Colors';
import * as authActions from '../store/actions/auth';




const SignupScreen = props =>{

  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  
  

  const signuphandler = async () => {
  
    setError(null);
    setIsLoading(true);
    try {
     await dispatch(
        authActions.signup(
          email,
          password
        )
      );
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (error) {
      Alert.alert('An Error Occurred!', error, [{ text: 'Okay' }]);
    }
  }, [error]);
return (
    
    <View style = {styles.container}>
        <View style={styles.formControl}>
        <Text >Email</Text>
        <TextInput style={styles.input} value={email} onChangeText={text=>setEmail(text)} />
            </View>
            <View style={styles.formControl}>
            <Text>Password</Text>
        <TextInput 
        style={styles.input}
         value={password}
          onChangeText={text=>setPassword(text)}
          secureTextEntry={true}
          />
            </View>
        
        <View style = {{marginVertical:5}}>
        {isLoading? <ActivityIndicator size ='small' color={Colors.primary}/>: <Button color={Colors.primary} title="signup"  onPress = {signuphandler} />}

        </View>
        <View style = {{marginVertical:5}}>
        <Button color= {Colors.primary} title="Already signed? login"  onPress = {()=>{props.navigation.navigate('Login')}} style = {{margin:10}}/>

        </View>
        
        
        </View>
);

}

const styles = StyleSheet.create({
    container:{
      margin: 20

    },
    formControl:{
       width :'100%',
       marginVertical:10
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
      }
});


export default SignupScreen;