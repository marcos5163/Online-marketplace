import React from 'react';
import {View,Text,Button,Image,StyleSheet,TouchableOpacity} from 'react-native';


import { Ionicons } from '@expo/vector-icons';

const ShopOwnerItem = props =>{
return (
<TouchableOpacity onPress = {props.onViewOption}>
  <View style = {style.container}>
    <View style = {style.containerImage}>
      <Image style = {style.image} source = {{uri : props.image}}/>
      </View >
      <View style= {style.containerText}>
        <Text style = {style.title} numberOfLines = {2} ellipsizeMode ='tail'>
            {props.title}
          </Text>
          <Text style = {style.price}>
          ₹{props.price}
            </Text>
      </View>

        <View style = {style.containerButton}>
        <Button  title ="Edit" onPress= {props.gotoEditProductScreen} style = {style.buttons} />
        <View style = {style.iconstyle}>
        {props.deletable && <TouchableOpacity onPress={props.onDeleteItem}>
          <Ionicons
            name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
            size={23}
            color="red"
          />
        </TouchableOpacity>}
          </View>
          </View>

        
    </View>
    </TouchableOpacity>
  

);

}

const style = StyleSheet.create({
  container:{
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    height: 100,
    margin: 5,
    flexDirection: 'row',
    flex : 1
    
  },
  containerImage:{
    height :'90%',
    width : '25%',
    margin : 5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius:10,
    borderBottomRightRadius:10,
    overflow: 'hidden'

  },
  image: {
    width: '100%',
    height: '100%'
  },
  containerText:{
    padding : 10
  },
  title: {
    fontSize: 18,
    marginVertical: 4,
    width : 150
  },
  price: {
    fontSize: 14,
    color: '#888'
  },
  containerButton:{
    margin: 20,
    justifyContent :'center',
    alignItems: 'center',
    flex: 1,
    flexDirection : 'row'
    
  },
  iconstyle:{
    margin : 20
  }
  

});

export default ShopOwnerItem;