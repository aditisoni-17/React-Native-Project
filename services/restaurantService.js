import { apiGet } from './apiClient';
import db from '../mock-api/db.json';

const fallbackRestaurants = db.restaurants;
const fallbackCategories = db.categories;

function normalizeCategoryKey(category) {
  return String(category ?? '').trim().toLowerCase();
}

function formatCategoryLabel(category) {
  return String(category ?? '')
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/^./, (char) => char.toUpperCase());
}

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

export function getRestaurantCategories(restaurants = fallbackRestaurants) {
  return ['all', ...new Set(restaurants.map((restaurant) => normalizeCategoryKey(restaurant.category)))];
}

export function getRestaurantCategoryOptions(restaurants = fallbackRestaurants) {
  return [
    { key: 'all', label: 'All' },
    ...new Map(
      restaurants.map((restaurant) => {
        const key = normalizeCategoryKey(restaurant.category);
        return [key, { key, label: formatCategoryLabel(restaurant.category) }];
      })
    ).values(),
  ];
}

export function filterRestaurants(restaurants, query, category) {
  const filteredByQuery = searchRestaurants(restaurants, query);

  const normalizedCategory = normalizeCategoryKey(category);

  if (!normalizedCategory || normalizedCategory === 'all') {
    return filteredByQuery;
  }

  return filteredByQuery.filter((restaurant) => normalizeCategoryKey(restaurant.category) === normalizedCategory);
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
