import React, { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Image, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icon3 from 'react-native-vector-icons/Entypo'
import { ScrollView } from "react-native";

import Category from "../components/Home/Category";
import CategoryFilter from "../components/Home/CategoryFilter";
import Offer from "../components/Home/Offer";
import Feature from "../components/Home/Feature";
import Discount from "../components/Home/Discount";
import { filterRestaurants, getHomeData, getRestaurantCategoryOptions } from "../services/restaurantService";

const HomeScreen = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");

    useEffect(() => {
        let active = true;

        const loadHomeData = async () => {
            setLoading(true);
            const homeData = await getHomeData();
            if (active) {
                setRestaurants(homeData.restaurants);
                setCategories(homeData.categories);
                setLoading(false);
            }
        };

        loadHomeData();

        return () => {
            active = false;
        };
    }, []);

    const filteredRestaurants = useMemo(() => {
        return filterRestaurants(restaurants, searchQuery, selectedCategory);
    }, [restaurants, searchQuery, selectedCategory]);

    const categoryOptions = useMemo(() => {
        return getRestaurantCategoryOptions(restaurants);
    }, [restaurants]);

    const hasFilteredResults = filteredRestaurants.length > 0;

    return (
        <SafeAreaView className="flex-1 bg-white">

            {/* Header */}
            <View className=" flex-row justify-between mt-2 mx-3 pb-4">
                <View className=" flex-row space-x-2 items-center ">
                    <Image
                        source={{ uri: "https://images.unsplash.com/photo-1619454016518-697bc231e7cb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" }}
                        className=" h-9 w-9 rounded-full"
                    />
                    <View>
                        <Text className=" text-sm text-gray-500">Deliver Now</Text>
                        <Text className=" font-bold text-xl">Current Location <Icon name="down" size={20} color="#00CCBB" /></Text>
                    </View>
                </View>
                <Icon2 name="user-circle-o" size={33} color="#00CCBB" />
            </View>

            {/* Search */}
            <View className="flex-row items-center mx-3 pb-4 space-x-2">
                <View className=" flex-row flex-auto space-x-2 py-1 px-2 items-center bg-gray-200">
                    <Icon name="search1" size={18} />
                    <TextInput
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        placeholder="Restaurants and cuisines"
                        keyboardType="default"
                        autoCapitalize="none"
                        className="text-sm flex-1"
                    />
                </View>
                <Icon3 name="sound-mix" size={28} color="#00CCBB" />
            </View>

            {/* Body */}
            {loading ? (
                <View className="flex-1 items-center justify-center bg-gray-100">
                    <ActivityIndicator size="large" color="#00CCBB" />
                    <Text className="mt-3 text-gray-600">Loading restaurants...</Text>
                </View>
            ) : (
                <ScrollView showsVerticalScrollIndicator={false} className="flex-1 bg-gray-100">
                    <Category categories={categories} />
                    <CategoryFilter
                        categories={categoryOptions}
                        selectedCategory={selectedCategory}
                        onSelectCategory={setSelectedCategory}
                    />
                    {hasFilteredResults ? (
                        <>
                            <Offer restaurants={filteredRestaurants} />
                            <Feature restaurants={filteredRestaurants} />
                            <Discount restaurants={filteredRestaurants} />
                        </>
                    ) : (
                        <View className="px-4 py-10">
                            <Text className="text-lg font-semibold text-gray-800">No restaurants match your search.</Text>
                            <Text className="mt-2 text-gray-500">Try clearing the search or changing the category filter.</Text>
                        </View>
                    )}
                </ScrollView>
            )}

        </SafeAreaView>
    );
};

export default HomeScreen;
