import React from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'

const CategoryFilter = ({ categories = [], selectedCategory = 'all', onSelectCategory }) => {
  const filterCategories = categories.length > 0
    ? categories
    : [{ key: 'all', label: 'All' }];

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
          const option = typeof category === 'string'
            ? { key: category, label: category === 'all' ? 'All' : category }
            : category;
          const isSelected = selectedCategory === option.key;

          return (
            <TouchableOpacity
              key={option.key}
              onPress={() => onSelectCategory(option.key)}
              className={`px-4 py-2 rounded-full border ${isSelected ? 'bg-[#00CCBB] border-[#00CCBB]' : 'bg-white border-gray-300'}`}
            >
              <Text className={`font-semibold ${isSelected ? 'text-white' : 'text-gray-700'}`}>
                {option.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  )
}

export default CategoryFilter
