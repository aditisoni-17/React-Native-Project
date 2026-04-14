import React from 'react'
import { Text, View, ScrollView } from 'react-native'
import FeatureCard from './FeatureCard'
import Icon from 'react-native-vector-icons/Ionicons'

const Feature = ({ restaurants = [] }) => {

    return (
        <View className='mt-3'>
            <View className='px-3 pt-3 pb-2'>
                <View className='flex-row justify-between items-center'>
                    <Text className="font-bold text-2xl text-gray-800">Featured</Text>
                    <Icon name='md-arrow-forward-sharp' size={25} color='#00CCBB' />
                </View>
                <Text className='text-gray-600'>Why not support your local restaurant tonight</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{
                paddingTop: 10,
                paddingHorizontal: 7,
            }}>
                {
                    restaurants.map((restaurant) => {
                        return (
                            <View key={restaurant.id}>
                                <FeatureCard restaurant={restaurant} />
                            </View>
                        )
                    })
                }
            </ScrollView>
        </View>
    )

}

export default Feature
