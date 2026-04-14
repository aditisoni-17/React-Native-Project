import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'

const DiscountCard = ({ restaurant }) => {

    const navigation = useNavigation();

    return (
        <View>
            <TouchableOpacity className="mx-1 bg-white pb-4"
                onPress={() => {
                    navigation.navigate('Restaurant', { restaurant })
                }} >
                <Image source={{ uri: restaurant.image }} className=" h-32 w-60" />
                <View className="pt-3 pl-2">
                    <Text className="font-bold text-xl text-gray-800">{restaurant.name}</Text>
                    <View className='text-md flex-row space-x-3 items-center'>
                        <Icon name='star-rate' size={20} color='#00CCBB' />
                        <Text className="text-[#00CCBB] text-lg">{restaurant.price}</Text>
                        <Text className="text-gray-500 text-lg">{restaurant.category}</Text>
                    </View>
                    <View className='text-md flex-row space-x-3 items-center'>
                        <Icon name='location-on' size={20} color='#00CCBB' />
                        <Text className="text-gray-500 text-lg">nearby</Text>
                        <Text className="text-gray-500 text-lg">{restaurant.location}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )

}

export default DiscountCard
