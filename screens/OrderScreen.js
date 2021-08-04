import React, {useEffect} from 'react';
import {View,Text,FlatList} from 'react-native';
import {useSelector , useDispatch} from 'react-redux';
import OrderItem from '../components/shop/OrderItem';
import * as ordersActions from '../store/actions/orders';


const OrderScreen = props => {

  const dispatch = useDispatch();


  useEffect(() => {
    
    dispatch(ordersActions.fetchOrders());
  }, [dispatch]);
    const orders = useSelector(state => state.orders.orders);

    if(orders.length ===0)
    {
      return(<View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
      <Text> No orders found, start adding some</Text>
      </View>);

    }
  
    return (
        <FlatList
        data={orders}
        keyExtractor={item => item.id}
        renderItem={itemData => (
          <OrderItem
            amount={itemData.item.totalAmount}
            date={itemData.item.readableDate}
            items={itemData.item.items}
          />
        )}
      />
    );
  };


export default OrderScreen;