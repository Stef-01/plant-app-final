
import React, { useState, useEffect, useCallback } from 'react';
import type { Plant, Weather, Task, Alert, DayOfWeek } from './types';
import { initialPlants, LOGAN_LOCATION } from './constants';
import { getMockWeather } from './services/weatherService';
import { generateTasksAndAlerts } from './services/taskService';
import Header from './components/Header';
import WeatherCard from './components/WeatherCard';
import PlantCard from './components/PlantCard';
import TaskCard from './components/TaskCard';
import AlertBanner from './components/AlertBanner';
import GeminiTip from './components/GeminiTip';
import { LoadingSpinner } from './components/icons/Icons';

const App: React.FC = () => {
  const [plants] = useState<Plant[]>(initialPlants);
  const [weather, setWeather] = useState<Weather | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>(new Date().toLocaleString('en-US', { weekday: 'long' }) as DayOfWeek);


  const loadGardenData = useCallback(() => {
    setLoading(true);
    setError(null);
    getMockWeather(LOGAN_LOCATION)
      .then(weatherData => {
        setWeather(weatherData);
        const { tasks: generatedTasks, alerts: generatedAlerts } = generateTasksAndAlerts(plants, weatherData);
        setTasks(generatedTasks);
        setAlerts(generatedAlerts);
      })
      .catch(err => {
        console.error("Failed to load garden data:", err);
        setError("Could not load garden data. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [plants]);

  useEffect(() => {
    loadGardenData();
  }, [loadGardenData]);

  const dailyTasks = tasks.filter(task => task.day === selectedDay);
  const weekDays: DayOfWeek[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-green-50 text-green-800">
        <LoadingSpinner />
        <span className="ml-4 text-xl font-semibold">Cultivating your garden plan...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-50 text-red-700">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 font-sans text-gray-800">
      <Header />
      <main className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
        {alerts.length > 0 && (
          <div className="space-y-4">
            {alerts.map((alert, index) => (
              <AlertBanner key={index} alert={alert} />
            ))}
          </div>
        )}

        {weather && <WeatherCard weather={weather} />}
        
        <div>
          <h2 className="text-2xl font-bold text-green-900 mb-4">Your Garden</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {plants.map(plant => (
              <PlantCard key={plant.id} plant={plant} />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-green-900 mb-4">This Week's Vibe</h2>
           <div className="flex space-x-2 overflow-x-auto pb-4 mb-4 -mx-4 px-4">
            {weekDays.map(day => (
              <button 
                key={day} 
                onClick={() => setSelectedDay(day)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors whitespace-nowrap ${selectedDay === day ? 'bg-green-600 text-white shadow' : 'bg-white text-green-700 hover:bg-green-100'}`}
              >
                {day}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dailyTasks.length > 0 ? (
                dailyTasks.map(task => (
                    <TaskCard key={task.id} task={task} />
                ))
            ) : (
              <div className="md:col-span-2 lg:col-span-3 bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center text-gray-500">
                <p className="font-medium">All clear for {selectedDay}! Take a moment to just enjoy your garden.</p>
              </div>
            )}
          </div>
        </div>

        {weather && plants.length > 0 && <GeminiTip weather={weather} plants={plants} />}
      </main>
    </div>
  );
};

export default App;
