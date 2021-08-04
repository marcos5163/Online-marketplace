import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import cartReducer from './store/reducers/cart';
import { applyMiddleware, combineReducers, createStore} from 'redux';
import {Provider} from 'react-redux';
import orderReducer from './store/reducers/orders';
import productsReducer from './store/reducers/products';

import ProductNavigator from './navigation/ProductNavigator';
import ReduxThunk from 'redux-thunk';
import authReducer from './store/reducers/auth';


const rootReducer = combineReducers({
  products : productsReducer,
  cart : cartReducer,
  orders : orderReducer,
  auth: authReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  
  return (
  <Provider store = {store}>
  <ProductNavigator />
  </Provider>);
      
    

  
  
}

