import React ,{useState,useCallback} from 'react';
import {View,Text, FlatList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import ShopOwnerItem from '../components/shop/shopOwnerItem'; 
import * as productsAction from '../store/actions/products';
import EditProductScreen from '../screens/EditProductScreen';

const ShopOwnerScreen = props =>{
  
    const dispatch = useDispatch();
    const Ownerproducts = useSelector(state =>state.products.userProducts)


    if(Ownerproducts.length ===0)
    {
      return(<View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
      <Text> No products found, start adding some</Text>
      </View>);

    }
  
return(

<FlatList
    data={Ownerproducts}
    keyExtractor={item => item.id}
   renderItem={itemData => (
    <ShopOwnerItem
    image={itemData.item.imageUrl}
    title={itemData.item.title}
    price={itemData.item.price}
    deletable
    gotoEditProductScreen = {()=> {props.navigation.navigate('EditProductScreen',{productId : itemData.item.id})}}
    onDeleteItem = {()=>{dispatch(productsAction.deleteProduct(itemData.item.id))}}
  />


   )}
  />
);
}


export default ShopOwnerScreen;