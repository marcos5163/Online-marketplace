import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProductOverviewScreen from '../screens/ProductOverviewScreen';
import {NavigationContainer} from '@react-navigation/native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton  from '../components/shop/HeaderButtons';

import {Platform,Text,View,SafeAreaView,Button} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Colors from '../constants/Colors';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import CartScreen from '../screens/CartScreen';
import OrderScreen from '../screens/OrderScreen';
import ShopOwnerScreen from '../screens/ShopOwnerScreen';
import EditProductScreen from '../screens/EditProductScreen';
import OrderRecieved from '../screens/OrderRecieved';
import {useSelector} from 'react-redux';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import UserProfile from '../screens/UserProfile';







const HomeStack = createStackNavigator();

const ShopOwnerStack  = createStackNavigator();

export const ShopOwner = () =>{
   
  return(
   
    <ShopOwnerStack.Navigator screenOptions = {{headerStyle : {backgroundColor : Platform.OS=='android'? Colors.primary:'' },
    headerTintColor :Platform.OS=='android'? 'white':Colors.primary,
    headerTitleAlign : 'center'}} >
       
      <ShopOwnerStack.Screen name = "ShopOwner" component = {ShopOwnerScreen} 
       options={({ navigation }) => ({
        headerLeft: () => (
          <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="menu"
            iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
            onPress={() => {navigation.toggleDrawer()}}
          />
        </HeaderButtons>
      ),
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Cart"
          iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
          onPress={() => {navigation.navigate('EditProductScreen',{productId: null})}}
        />
      </HeaderButtons>
    ),
         
        })}/>

        

     <ShopOwnerStack.Screen name= 'EditProductScreen' component = {EditProductScreen}/>
      </ShopOwnerStack.Navigator>
  );

}

const OrderStack = createStackNavigator();

export const OrderStackScreen  = () =>{
    return (
      <OrderStack.Navigator screenOptions = {{headerStyle : {backgroundColor : Platform.OS=='android'? Colors.primary:'' },
      headerTintColor :Platform.OS=='android'? 'white':Colors.primary,
      headerTitleAlign : 'center'}}>

        <OrderStack.Screen name = "Orders" component = {OrderScreen}
        
        options={({ navigation }) => ({
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
              title="menu"
              iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
              onPress={() => {navigation.toggleDrawer()}}
            />
          </HeaderButtons>
        ),
        
            
           
          })}/>


        
        </OrderStack.Navigator>
    );


}


export const HomeStackScreen = () =>{

  const isLogin = true;

  const cartItems = useSelector(state => {
    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum
      });
    }
    return transformedCartItems;
  });
 
  return(
  <HomeStack.Navigator screenOptions = {{headerStyle : {backgroundColor : Platform.OS=='android'? Colors.primary:'' },
  headerTintColor :Platform.OS=='android'? 'white':Colors.primary,
  headerTitleAlign : 'center'
  }}>
   
   
    
    <HomeStack.Screen name= 'Grojha' component={ProductOverviewScreen}
     options={({ navigation }) => ({
       headerLeft: () => (
         <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
         <Item
           title="menu"
           iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
           onPress={() => {navigation.toggleDrawer()}}
         />
       </HeaderButtons>
     ),
         
         headerRight: () => (

             
             <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
               <View style={{flexDirection:'column',flex:1,alignItems:'center',justifyContent:'center'}}>

                <Text >{cartItems.length}</Text>
               <Item
               title="Cart"
               iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
               onPress={() => {
                   navigation.navigate('Cart')
               }}
             />

                 </View>
             
            
           </HeaderButtons>

         ),
       })}
     />
     <HomeStack.Screen name = 'ProductDetailScreen' component={ProductDetailScreen}/>
     <HomeStack.Screen name = 'Cart' component={CartScreen}/>
    
     </HomeStack.Navigator>);

}

const AuthStack = createStackNavigator();

export const AuthStackScreen =()=>{
  

  
  return(
    <AuthStack.Navigator screenOptions = {{headerStyle : {backgroundColor : Platform.OS=='android'? Colors.primary:'' },
    headerTintColor :Platform.OS=='android'? 'white':Colors.primary,
    headerTitleAlign : 'center'
    }}>
      <AuthStack.Screen name="Login" component={LoginScreen}/>
      <AuthStack.Screen name="Signup" component={SignupScreen}/>
      </AuthStack.Navigator>
  );
  }


const Drawer = createDrawerNavigator();

export const DrawerNavigtorScreen = () =>{
  return (
    <Drawer.Navigator>
     <Drawer.Screen name = "Home" component = {HomeStackScreen}/>
     <Drawer.Screen name = "Orders" component = {OrderStackScreen}/>
     <Drawer.Screen name = "Catalogue (for retailers)" component = {ShopOwner}/>
     <Drawer.Screen name = "Order recieved (for retailers)" component = {OrderRecieved}/>
     <Drawer.Screen name = "Profile" component = {UserProfile}/>
     </Drawer.Navigator>
  );
   

}






