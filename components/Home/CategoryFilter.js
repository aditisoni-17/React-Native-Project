import React from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'

const CategoryFilter = ({ categories = [], selectedCategory = 'all', onSelectCategory }) => {
  const filterCategories = ['all', ...new Set(categories)];

  return (
    <View className="mt-3">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 12,
          gap: 10,
        }}
      >
        {filterCategories.map((category) => {
          const isSelected = selectedCategory === category;

          return (
            <TouchableOpacity
              key={category}
              onPress={() => onSelectCategory(category)}
              className={`px-4 py-2 rounded-full border ${isSelected ? 'bg-[#00CCBB] border-[#00CCBB]' : 'bg-white border-gray-300'}`}
            >
              <Text className={`font-semibold ${isSelected ? 'text-white' : 'text-gray-700'}`}>
                {category === 'all' ? 'All' : category}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  )
}

export default CategoryFilter
