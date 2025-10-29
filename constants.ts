
import type { Plant } from './types';

export const LOGAN_LOCATION = {
  city: 'Logan City',
  state: 'Queensland',
  country: 'Australia'
};

export const HEATWAVE_THRESHOLD = 31; // Celsius
export const FROST_THRESHOLD = 2; // Celsius

export const initialPlants: Plant[] = [
  {
    id: 1,
    name: 'Tomato',
    category: 'Warm-season Vegetable',
    phenology: 'Fruiting',
    location: 'Bed 1',
    icon: '🍅',
  },
  {
    id: 2,
    name: 'Lemon Tree',
    category: 'Fruit Tree',
    phenology: 'Flowering',
    location: 'Backyard Corner',
    icon: '🍋',
  },
  {
    id: 3,
    name: 'Basil',
    category: 'Herb',
    phenology: 'Vegetative',
    location: 'Pot near kitchen',
    icon: '🌿',
  },
  {
    id: 4,
    name: 'Taro',
    category: 'Root Crop',
    phenology: 'Vegetative',
    location: 'Boggy patch',
    icon: '🍠',
  },
   {
    id: 5,
    name: 'Cucumber',
    category: 'Warm-season Vegetable',
    phenology: 'Flowering',
    location: 'Trellis',
    icon: '🥒',
  },
  {
    id: 6,
    name: 'Macadamia',
    category: 'Nut Tree',
    phenology: 'Fruiting',
    location: 'Front Yard',
    icon: '🌰',
  }
];
