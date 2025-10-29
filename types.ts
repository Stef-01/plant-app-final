
export type PlantCategory = 'Warm-season Vegetable' | 'Fruit Tree' | 'Herb' | 'Root Crop' | 'Nut Tree' | 'Flower';

export type Phenology = 'Seedling' | 'Vegetative' | 'Flowering' | 'Fruiting' | 'Harvest' | 'Dormant';

export interface Plant {
  id: number;
  name: string;
  category: PlantCategory;
  phenology: Phenology;
  location: string;
  icon: string;
}

export interface Weather {
  location: {
    name: string;
    region: string;
  };
  current: {
    tempC: number;
    humidity: number;
    precipMM: number;
    condition: string;
    windKPH: number;
  };
  forecast: DailyForecast[];
}

export interface DailyForecast {
  day: DayOfWeek;
  maxTempC: number;
  minTempC: number;
  chanceOfRain: number; // Percentage
  condition: string;
}

export type DayOfWeek = 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';

export interface Task {
  id: string;
  title: string;
  description: string;
  plantId?: number; // Optional link to a specific plant
  priority: 'High' | 'Medium' | 'Low';
  day: DayOfWeek;
  category: 'Watering' | 'Feeding' | 'Maintenance' | 'Pest Control' | 'Protection';
}

export interface Alert {
  type: 'Heatwave' | 'Frost' | 'High Winds' | 'Heavy Rain';
  title: string;
  message: string;
  severity: 'Warning' | 'Critical';
}
