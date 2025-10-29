
import type { Plant, Weather, Task, Alert } from '../types';
import { HEATWAVE_THRESHOLD, FROST_THRESHOLD } from '../constants';

export const generateTasksAndAlerts = (plants: Plant[], weather: Weather): { tasks: Task[], alerts: Alert[] } => {
  let tasks: Task[] = [];
  let alerts: Alert[] = [];
  let taskIdCounter = 0;

  // --- Weather-based alerts and tasks ---
  const heatwaveDays = weather.forecast.filter(day => day.maxTempC >= HEATWAVE_THRESHOLD);
  if (heatwaveDays.length > 1) {
    alerts.push({
      type: 'Heatwave',
      title: `Heatwave Alert: ${heatwaveDays.length} hot days ahead!`,
      message: `Temperatures will exceed ${HEATWAVE_THRESHOLD}°C. Prepare your garden for heat stress.`,
      severity: 'Warning',
    });

    const dayBeforeHeatwave = weather.forecast.findIndex(day => day.maxTempC >= HEATWAVE_THRESHOLD);
    if (dayBeforeHeatwave > 0) {
        const prepDay = weather.forecast[dayBeforeHeatwave - 1].day;
        tasks.push({
            id: `task-${taskIdCounter++}`,
            title: 'Prepare for Heatwave',
            description: 'Water deeply early in the morning to hydrate plants before the heat sets in.',
            priority: 'High',
            day: prepDay,
            category: 'Watering',
        });
        tasks.push({
            id: `task-${taskIdCounter++}`,
            title: 'Apply Mulch',
            description: 'Top up mulch around sensitive plants to retain soil moisture and keep roots cool.',
            priority: 'Medium',
            day: prepDay,
            category: 'Maintenance',
        });
    }
  }

  const frostDays = weather.forecast.filter(day => day.minTempC <= FROST_THRESHOLD);
  if (frostDays.length > 0) {
      alerts.push({
          type: 'Frost',
          title: `Frost Alert: ${frostDays.length} cold nights forecast.`,
          message: `Temperatures may drop near ${FROST_THRESHOLD}°C. Protect tender plants.`,
          severity: 'Warning',
      });
      const firstFrostDay = frostDays[0];
      tasks.push({
          id: `task-${taskIdCounter++}`,
          title: 'Protect from Frost',
          description: 'Cover frost-sensitive plants like tomatoes and basil with a frost cloth or blanket before nightfall.',
          priority: 'High',
          day: firstFrostDay.day,
          category: 'Protection',
      });
  }

  // --- General Plant-specific tasks based on phenology ---
  plants.forEach(plant => {
    // Assign tasks to a semi-random day for variety
    const taskDay = weather.forecast[plant.id % 7].day;

    if (plant.category === 'Warm-season Vegetable' && plant.phenology === 'Fruiting') {
      tasks.push({
        id: `task-${taskIdCounter++}`,
        title: `Side-dress ${plant.name}`,
        description: `Give your ${plant.name} a nutrient boost with a balanced liquid fertilizer to support fruit development.`,
        plantId: plant.id,
        priority: 'Medium',
        day: taskDay,
        category: 'Feeding'
      });
    }
    if (plant.category === 'Warm-season Vegetable' && ['Flowering', 'Fruiting'].includes(plant.phenology)) {
        tasks.push({
            id: `task-${taskIdCounter++}`,
            title: `Scout for Pests on ${plant.name}`,
            description: `Check leaves (especially undersides) for common pests like aphids or whiteflies.`,
            plantId: plant.id,
            priority: 'Medium',
            day: weather.forecast[(plant.id + 2) % 7].day,
            category: 'Pest Control'
          });
    }

    if (plant.category === 'Fruit Tree' && plant.phenology === 'Flowering') {
      tasks.push({
        id: `task-${taskIdCounter++}`,
        title: `Check ${plant.name} for Pollinators`,
        description: 'Observe if bees and other pollinators are visiting the flowers. Healthy pollination is key to a good harvest.',
        plantId: plant.id,
        priority: 'Low',
        day: taskDay,
        category: 'Maintenance'
      });
    }

     if (plant.category === 'Nut Tree' && plant.phenology === 'Fruiting') {
      tasks.push({
        id: `task-${taskIdCounter++}`,
        title: `Ensure Consistent Moisture for ${plant.name}`,
        description: 'Steady watering is crucial during nut fill. Check soil moisture and water deeply if dry.',
        plantId: plant.id,
        priority: 'High',
        day: weather.forecast[(plant.id + 4) % 7].day,
        category: 'Watering'
      });
    }

    if (plant.category === 'Herb') {
        tasks.push({
          id: `task-${taskIdCounter++}`,
          title: `Harvest ${plant.name}`,
          description: `Regularly pinch back your ${plant.name} to encourage bushier growth and provide fresh herbs for your kitchen.`,
          plantId: plant.id,
          priority: 'Low',
          day: weather.forecast[(plant.id + 1) % 7].day,
          category: 'Maintenance'
        });
      }
  });


  return { tasks, alerts };
};
