import React, { useMemo } from 'react'
import { ScrollView, Text, TouchableOpacity, View, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector, useDispatch } from 'react-redux'
import { addToBasket, removeFromBasket, selectBasketItems, BasketTotal } from '../features/basketSlice'
import Icon from 'react-native-vector-icons/AntDesign'
import Icon2 from 'react-native-vector-icons/SimpleLineIcons'
import { useNavigation } from '@react-navigation/native'


const BasketScreen = () => {

    const items = useSelector(selectBasketItems);
    const subtotal = useSelector(BasketTotal);

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const groupedItems = useMemo(() => {
        return items.reduce((result, item) => {
            (result[item.name] = result[item.name] || []).push(item);
            return result;
        }, {})
    }, [items]);

    const groupedItemEntries = Object.entries(groupedItems);
    const basketCount = items.length;
    const deliveryFee = basketCount > 0 ? 5.99 : 0;

    const addOne = (item) => {
        dispatch(addToBasket(item));
    };

    const removeOne = (item) => {
        dispatch(removeFromBasket({ id: item.id }));
    };

    const isEmpty = basketCount === 0;

    return (
        <>
            <SafeAreaView className='flex-1'>

                {/* Header area */}
                <View className='flex-row justify-between p-5 items-center bg-white rounded-t-3xl border-b border-[#00CCBB]'>
                    <Icon2 name='basket-loaded' size={25} color='#00CCBB'></Icon2>
                    <Text className='text-2xl font-bold'>Basket</Text>
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <Icon name='closecircle' size={25} color='#00CCBB'></Icon>
                    </TouchableOpacity>
                </View>
                <View className='bg-white my-5 flex-row items-center justify-between px-4 py-4'>
                    <View className='flex-row items-center space-x-3'>
                        <Image source={{ uri: "https://images.unsplash.com/photo-1619454016518-697bc231e7cb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" }}
                            className=" h-9 w-9 rounded-full" />
                        <Text className='text-lg'>Deliver in 50-70 min</Text>
                    </View>
                    <Text className='text-lg text-[#00CCBB]'>Change</Text>
                </View>

                {/* Basket items */}
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View className='pb-96'>
                        {isEmpty ? (
                            <View className='items-center px-6 py-16 bg-white'>
                                <Text className='text-2xl font-bold text-gray-800'>Your basket is empty</Text>
                                <Text className='text-gray-500 text-center mt-2'>Add some dishes from a restaurant to start your order.</Text>
                                <TouchableOpacity className='mt-6 px-5 py-3 rounded-full bg-[#00CCBB]' onPress={() => navigation.navigate('Home')}>
                                    <Text className='text-white font-semibold'>Browse restaurants</Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            groupedItemEntries.map(([key, value]) => {
                                const item = value[0];
                                const quantity = value.length;

                                return (
                                    <View className='px-4 py-4 border-b border-gray-200 bg-white' key={key}>
                                        <View className='flex-row justify-between items-center'>
                                            <View className='flex-row items-center space-x-3 flex-1 pr-3'>
                                                <Image source={{ uri: item.img }} className='h-12 w-12 rounded-full' />
                                                <View className='flex-1'>
                                                    <Text className='font-semibold text-gray-800' numberOfLines={1}>{item.name}</Text>
                                                    <Text className='text-gray-500'>$ {item.price.toFixed(2)} each</Text>
                                                </View>
                                            </View>
                                            <Text className='font-semibold text-gray-800'>$ {(item.price * quantity).toFixed(2)}</Text>
                                        </View>

                                        <View className='flex-row items-center justify-between mt-4'>
                                            <View className='flex-row items-center space-x-4'>
                                                <TouchableOpacity onPress={() => removeOne(item)} disabled={quantity <= 0}>
                                                    <Icon name='minuscircle' size={30} color={quantity > 0 ? '#00CCBB' : '#D1D5DB'} />
                                                </TouchableOpacity>
                                                <Text className='text-lg font-semibold'>{quantity}</Text>
                                                <TouchableOpacity onPress={() => addOne(item)}>
                                                    <Icon name='pluscircle' size={30} color='#00CCBB' />
                                                </TouchableOpacity>
                                            </View>
                                            <TouchableOpacity onPress={() => removeOne(item)}>
                                                <Text className='text-[#00CCBB] font-semibold'>Remove</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )
                            })
                        )}
                    </View>
                </ScrollView>

            </SafeAreaView>

            {/* Order summary and payment */}
            <View className='absolute left-0 right-0 bottom-0 bg-white'>
                <View>
                    <View className='flex-row justify-between px-5 pt-6'>
                        <Text className='text-gray-500'>Subtotal</Text>
                        <Text className='text-gray-500'>$ {subtotal.toFixed(2)}</Text>
                    </View>
                    <View className='flex-row justify-between px-5 pt-4'>
                        <Text className='text-gray-500'>Delivery fees</Text>
                        <Text className='text-gray-500'>$ {deliveryFee.toFixed(2)}</Text>
                    </View>
                    <View className='flex-row justify-between px-5 pt-4'>
                        <Text className='font-bold'>order Total</Text>
                        <Text className='font-bold'>$ {(subtotal + deliveryFee).toFixed(2)}</Text>
                    </View>
                </View>
                <TouchableOpacity
                    className={`mx-4 my-5 p-3 rounded-lg ${isEmpty ? 'bg-gray-300' : 'bg-[#00CCBB]'}`}
                    onPress={() => { navigation.navigate("OrderPlacing") }}
                    disabled={isEmpty}
                >
                    <Text className='text-center text-lg text-white font-semibold'>
                        {isEmpty ? 'Add items to continue' : 'Place Order'}
                    </Text>
                </TouchableOpacity>
            </View>
        </>
    )

}

export default BasketScreen
