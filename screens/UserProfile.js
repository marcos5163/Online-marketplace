import React from 'react';
import {View, Text, Button} from 'react-native';
import * as authActions from '../store/actions/auth';
import {useDispatch} from 'react-redux';


const UserProfile = ()=>{

    const dispatch = useDispatch();

    return (

        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Button title ="Logout" onPress={()=>{dispatch(authActions.logout());}}/>
            </View>
    );

}

export default UserProfile;