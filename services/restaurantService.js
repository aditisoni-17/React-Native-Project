import { apiGet } from './apiClient';
import db from '../mock-api/db.json';

const fallbackRestaurants = db.restaurants;
const fallbackCategories = db.categories;

export async function getHomeData() {
  const [restaurants, categories] = await Promise.all([
    apiGet('/restaurants', fallbackRestaurants),
    apiGet('/categories', fallbackCategories),
  ]);

  return { restaurants, categories };
}

export async function getRestaurantsByCategory(category) {
  return apiGet(`/restaurants?category=${encodeURIComponent(category)}`, fallbackRestaurants.filter((item) => item.category === category));
}

export async function getRestaurantById(id) {
  return apiGet(`/restaurants/${id}`, fallbackRestaurants.find((item) => item.id === Number(id)) || null);
}

export function searchRestaurants(restaurants, query) {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) {
    return restaurants;
  }

  return restaurants.filter((restaurant) => {
    return (
      restaurant.name.toLowerCase().includes(normalizedQuery) ||
      restaurant.category.toLowerCase().includes(normalizedQuery) ||
      restaurant.location.toLowerCase().includes(normalizedQuery)
    );
  });
}
