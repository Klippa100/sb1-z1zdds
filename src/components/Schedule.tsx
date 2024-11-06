import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Users, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { useApp } from '../context/AppContext';
import { AddEventModal } from './AddEventModal';

export function Schedule() {
  const { events, teamMembers } = useApp();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Group events by date
  const groupedEvents = events.reduce((groups, event) => {
    const date = format(new Date(event.date), 'yyyy-MM-dd');
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(event);
    return groups;
  }, {} as Record<string, typeof events>);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Schedule</h1>
          <p className="text-gray-600">Manage your team's schedule and service times</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <Plus className="h-5 w-5" />
          Add Event
        </button>
      </div>

      <div className="space-y-8">
        {Object.entries(groupedEvents).map(([date, dayEvents]) => (
          <div key={date} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <CalendarIcon className="h-5 w-5 text-indigo-500" />
              <h2 className="text-xl font-semibold">
                {format(new Date(date), 'EEEE, MMMM d, yyyy')}
              </h2>
            </div>
            <div className="space-y-4">
              {dayEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium">{event.time}</span>
                    </div>
                    <span className="font-medium text-gray-900">{event.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      {event.teamMembers
                        .map(id => teamMembers.find(m => m.id === id)?.name)
                        .filter(Boolean)
                        .join(', ')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <AddEventModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
}