import React, { useEffect, useState } from 'react'
import { ActivityIndicator, View } from 'react-native'
import MenuItemCard from './MenuItemCard'
import { getRestaurantsByCategory } from '../../services/restaurantService'

const Menu = ({ category }) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let active = true;

        const loadMenu = async () => {
            setLoading(true);
            const menuItems = await getRestaurantsByCategory(category);
            if (active) {
                setItems(menuItems);
                setLoading(false);
            }
        };

        loadMenu();

        return () => {
            active = false;
        };
    }, [category])

    return (
        <View>
            {loading ? (
                <View className="items-center py-8">
                    <ActivityIndicator size="large" color="#00CCBB" />
                </View>
            ) : (
                items.map((info) => {
                    return (
                        <MenuItemCard key={info.id} id={info.id} img={info.image} name={info.name} desc={info.desc} price={info.price} />
                    )
                })
            )}
        </View>
    )
}

export default Menu
