import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface AddEventModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddEventModal({ isOpen, onClose }: AddEventModalProps) {
  const { teamMembers, addEvent } = useApp();
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    title: '',
    type: 'service',
    teamMembers: [] as string[],
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addEvent({
      ...formData,
      date: new Date(formData.date),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add New Event</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={formData.date}
              onChange={e => setFormData({ ...formData, date: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Time</label>
            <input
              type="time"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={formData.time}
              onChange={e => setFormData({ ...formData, time: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Type</label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={formData.type}
              onChange={e => setFormData({ ...formData, type: e.target.value as any })}
            >
              <option value="service">Service</option>
              <option value="soundcheck">Sound Check</option>
              <option value="rehearsal">Rehearsal</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Team Members</label>
            <div className="mt-2 space-y-2">
              {teamMembers.map(member => (
                <label key={member.id} className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    checked={formData.teamMembers.includes(member.id)}
                    onChange={e => {
                      const newTeamMembers = e.target.checked
                        ? [...formData.teamMembers, member.id]
                        : formData.teamMembers.filter(id => id !== member.id);
                      setFormData({ ...formData, teamMembers: newTeamMembers });
                    }}
                  />
                  <span className="ml-2">{member.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg"
            >
              Add Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}