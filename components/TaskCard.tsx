
import React from 'react';
import type { Task } from '../types';
import { WateringCanIcon, SeedlingIcon, BugIcon, ShieldIcon, ScissorsIcon } from './icons/Icons';

const TaskIcon: React.FC<{ category: Task['category'] }> = ({ category }) => {
    switch (category) {
        case 'Watering': return <WateringCanIcon className="h-6 w-6 text-blue-500" />;
        case 'Feeding': return <SeedlingIcon className="h-6 w-6 text-yellow-600" />;
        case 'Pest Control': return <BugIcon className="h-6 w-6 text-red-500" />;
        case 'Protection': return <ShieldIcon className="h-6 w-6 text-indigo-500" />;
        case 'Maintenance': return <ScissorsIcon className="h-6 w-6 text-gray-500" />;
        default: return <SeedlingIcon className="h-6 w-6 text-gray-500" />;
    }
}

const priorityStyles = {
    High: 'border-red-500',
    Medium: 'border-yellow-500',
    Low: 'border-green-500',
};


const TaskCard: React.FC<{ task: Task }> = ({ task }) => {
  return (
    <div className={`bg-white/90 backdrop-blur-sm rounded-xl shadow-md p-4 border-l-4 ${priorityStyles[task.priority]} flex items-start space-x-4`}>
        <div className="flex-shrink-0">
            <TaskIcon category={task.category} />
        </div>
        <div>
            <h4 className="font-bold text-gray-800">{task.title}</h4>
            <p className="text-sm text-gray-600 mt-1">{task.description}</p>
        </div>
    </div>
  );
};

export default TaskCard;
