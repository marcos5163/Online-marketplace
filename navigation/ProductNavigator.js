import React from 'react';
import { useSelector} from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import {AuthStackScreen,DrawerNavigtorScreen} from './ShopNavigator';
import StartupScreen from '../screens/StartupScreen';

const ProductNavigator = props=>{

    const isAuth = useSelector(state=> !!state.auth.token);
    const didTryAutoLogin = useSelector(state => state.auth.didTryAutoLogin);
    return (
      <NavigationContainer>
       {isAuth && <DrawerNavigtorScreen />}
      {!isAuth && didTryAutoLogin && <AuthStackScreen />}
      {!isAuth && !didTryAutoLogin && <StartupScreen />}
      </NavigationContainer>
    );
   
      
   
  }


  export default ProductNavigator;