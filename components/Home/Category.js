import React from 'react'
import { ScrollView } from 'react-native'
import CategoryCard from './CategoryCard'

const Category = ({ categories = [] }) => {
    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} 
        contentContainerStyle={{
            paddingTop: 10,
            paddingHorizontal: 7,
        }} >
            {
                categories.map((category) => {
                    return (
                        <CategoryCard key={category.id} img={category.image} name={category.name} />
                    )
                })
            }
        </ScrollView>
    )
}

export default Category
