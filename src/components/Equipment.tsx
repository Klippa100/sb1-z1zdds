import React, { useState } from 'react';
import { Box, AlertCircle, Settings as SettingsIcon } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function Equipment() {
  const { equipment, updateEquipmentStatus, addAlert } = useApp();

  const handleStatusChange = (id: string, status: 'available' | 'maintenance' | 'in-use') => {
    updateEquipmentStatus(id, status);
    if (status === 'maintenance') {
      addAlert({
        type: 'maintenance',
        message: `${equipment.find(e => e.id === id)?.name} marked for maintenance`,
      });
    }
  };

  // Group equipment by category
  const categories = equipment.reduce((groups, item) => {
    if (!groups[item.category]) {
      groups[item.category] = [];
    }
    groups[item.category].push(item);
    return groups;
  }, {} as Record<string, typeof equipment>);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Equipment</h1>
        <p className="text-gray-600">Manage and track your sound equipment</p>
      </div>

      <div className="space-y-6">
        {Object.entries(categories).map(([category, items]) => (
          <div key={category} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <Box className="h-5 w-5 text-indigo-500" />
              <h2 className="text-xl font-semibold">{category}</h2>
            </div>
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-600">{item.notes}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <select
                      value={item.status}
                      onChange={(e) => handleStatusChange(item.id, e.target.value as any)}
                      className="text-sm rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="available">Available</option>
                      <option value="maintenance">Maintenance</option>
                      <option value="in-use">In Use</option>
                    </select>
                    {item.status === 'maintenance' && (
                      <span className="flex items-center gap-1 text-sm text-red-600">
                        <AlertCircle className="h-4 w-4" />
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}