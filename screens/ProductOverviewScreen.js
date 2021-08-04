import React ,{useState,useEffect,useCallback} from 'react';
import {View, FlatList,ActivityIndicator, StyleSheet,Text,Button,Alert} from 'react-native';
import {useSelector , useDispatch} from 'react-redux';
import ProductItem from '../components/shop/Productitem';
import CartScreen from '../screens/CartScreen';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton  from '../components/shop/HeaderButtons';
import {createDrawerNavigator} from '@react-navigation/drawer';
import * as productActions from '../store/actions/products';

import * as cartActions from '../store/actions/cart';
import Colors from '../constants/Colors';


const ProductOverviewScreen = props =>{


  const [isLoading , setisLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error,  setError] = useState();
  const products = useSelector(state=> state.products.availableProducts);
  

  const dispatch = useDispatch();

  


  const loadedproducts  = useCallback( async ()  =>{
    setIsRefreshing(true);
    setisLoading(true);

    try{
     await dispatch(productActions.fetchProducts());
    }
    catch(err)
    {
       setError(err.message);
    }
    setIsRefreshing(false);
   setisLoading(false);
 }, [dispatch, setisLoading, setError]);

 useEffect(() => {
  const unsubscribe = props.navigation.addListener(
    'focus',
    loadedproducts
  );

  return () => {
    unsubscribe();
  };
}, [loadedproducts]);

  useEffect(() => {

    loadedproducts();
    
  }, [dispatch, loadedproducts]);


  
    
  if(isLoading)
  {
    return (

      <View style = {style.spinner}>

       <ActivityIndicator size = "large" color = {Colors.primary}/>

      </View>
    );
  }
  if (error) {
    return (
      <View style={style.spinner}>
        <Text>Something went Wrong!</Text>
        <Button
        
          title="Try again"
          onPress={loadedproducts}
          color={Colors.primary}
        />
      </View>
    );
  }


  if(!isLoading&&products.length===0)
  {
    return (

      <View style = {style.spinner}>

      <Text>No products found. Start adding some :D</Text>

      </View>
    );
  }
  
    
   return(
    
    
    
    
    <FlatList
    onRefresh = {loadedproducts}
    refreshing = {isRefreshing}
    data={products}
    keyExtractor={item => item.id}
   renderItem={itemData => (
    <ProductItem
    image={itemData.item.imageUrl}
    title={itemData.item.title}
    price={itemData.item.price}
    onViewOption = {()=> {props.navigation.navigate('ProductDetailScreen',{productId : itemData.item.id})}}
    onAddToCart={() => {dispatch(cartActions.addToCart(itemData.item))
           Alert.alert("Success",  itemData.item.title+" is added" , [{text:'okay', onPress: ()=>{}  }] );
    }
     
  }
  />
   )}
  />
   );

}

const style = StyleSheet.create({
spinner:{
  flex:1,
  justifyContent:'center',
  alignItems:'center'
}

}); 

export default ProductOverviewScreen;