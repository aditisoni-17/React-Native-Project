import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Image, Text, View } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/MaterialIcons'
import Icon3 from 'react-native-vector-icons/AntDesign'
import { TouchableOpacity } from 'react-native';

import Menu from '../components/ResturentMenu/Menu';
import BasketCart from '../components/ResturentMenu/BasketCart';
import { getRestaurantById } from '../services/restaurantService';


const RestaurantScreen = () => {

  const navigation = useNavigation();
  const route = useRoute();
  const routeRestaurant = route.params?.restaurant ?? route.params;
  const [restaurant, setRestaurant] = useState(routeRestaurant?.image ? routeRestaurant : null);
  const [loading, setLoading] = useState(!routeRestaurant?.image);

  useEffect(() => {
    let active = true;

    const loadRestaurant = async () => {
      if (routeRestaurant?.image) {
        setLoading(false);
        return;
      }

      if (routeRestaurant?.id) {
        const restaurantData = await getRestaurantById(routeRestaurant.id);
        if (active) {
          setRestaurant(restaurantData);
          setLoading(false);
        }
        return;
      }

      setLoading(false);
    };

    loadRestaurant();

    return () => {
      active = false;
    };
  }, [routeRestaurant]);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#00CCBB" />
        <Text className="mt-4 text-gray-600">Loading restaurant...</Text>
      </SafeAreaView>
    );
  }

  if (!restaurant) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <Text className="text-2xl font-bold text-gray-800">Restaurant not found</Text>
        <Text className="mt-2 text-gray-500 text-center px-6">The restaurant details could not be loaded. Please go back and try again.</Text>
        <TouchableOpacity className="mt-6 px-5 py-3 rounded-full bg-[#00CCBB]" onPress={() => navigation.navigate('Home')}>
          <Text className="text-white font-semibold">Go Home</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        
        {/* Clicked Food details */}
        <View className='relative bg-white'>
          {/* Food image with back button */}
          <Image source={{ uri: restaurant.image }} className='h-56 w-full' />
          <TouchableOpacity className='absolute left-5 top-14 bg-white rounded-full p-1'
            onPress={() => {
              navigation.goBack()
            }} >
            <Icon name='md-arrow-back-sharp' size={25} color='#00CCBB' />
          </TouchableOpacity>
          
          
          <View className="py-5 px-4">
            <Text className="font-bold text-3xl text-gray-800">{restaurant.name}</Text>
            <View className='flex-row space-x-4 mt-1'>
              <View className='text-md flex-row space-x-2 items-center'>
                <Icon2 name='star-rate' size={20} color='#00CCBB' />
                <Text className="text-[#00CCBB] text-lg">{restaurant.price}</Text>
                <Text className="text-gray-500 text-lg">{restaurant.category}</Text>
              </View>
              <View className='text-md flex-row space-x-2 items-center'>
                <Icon2 name='location-on' size={20} color='#00CCBB' />
                <Text className="text-gray-500 text-lg">nearby</Text>
                <Text className="text-gray-500 text-lg">{restaurant.location}</Text>
              </View>
            </View>
            <Text className='text-md text-gray-500 mt-1'>{restaurant.desc}</Text>
          </View>
          <TouchableOpacity className='mt-1 px-4 py-4 flex-row items-center justify-between border-t border-gray-300'>
            <View className='flex-row items-center space-x-4'>
              <Icon3 name='questioncircleo' size={18} color='#00CCBB' />
              <Text className='font-bold text-xl text-gray-700'>Have a food allergy ?</Text>
            </View>
            <Icon3 name='right' size={20} color='#00CCBB' />
          </TouchableOpacity>
        </View>

        {/* Food Menu */}
        <Text className='text-2xl font-bold pt-6 pb-4 pl-4'>Menu</Text>
        <View className=' pb-[71px]'>
          <Menu category={restaurant.category} />
        </View>
      </ScrollView>

      
      <View className='absolute bottom-2 left-2 right-2'>
        <BasketCart />
      </View>
    </>
  )

}

export default RestaurantScreen
