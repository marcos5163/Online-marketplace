import React,{useState,useEffect} from 'react';
import {View,Text,TextInput,StyleSheet,Button,ActivityIndicator,Alert} from 'react-native';
import Colors from '../constants/Colors';
import {useDispatch} from 'react-redux';
import * as authActions from '../store/actions/auth';




const LoginScreen = props =>{
 
  
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
 
  useEffect(() => {
    if (error) {
      Alert.alert('An Error Occurred!', error, [{ text: 'Okay' }]);
    }
  }, [error]);
  
   const loginhandler = () => {
    


    setError(null);
    setIsLoading(true);
    try{
      dispatch(authActions.login(email,password));

    }catch(err)
    {
       setError(err.message);
    }
    setIsLoading(false);
   
  };

 
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
        {isLoading? <ActivityIndicator size ='small' color={Colors.primary} /> : <Button color={Colors.primary} title="Login"  onPress = {loginhandler} />}

        </View>
        <View style = {{marginVertical:5}}>
        <Button color={Colors.primary} title="Not a user? signup"  onPress = {()=>{props.navigation.navigate('Signup')}} style = {{margin:10}}/>

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


export default LoginScreen;