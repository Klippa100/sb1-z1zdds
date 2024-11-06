import React from 'react';
import { Bell, Shield, Users, Workflow } from 'lucide-react';

export function Settings() {
  const sections = [
    {
      title: 'Notifications',
      icon: Bell,
      settings: [
        { name: 'Schedule Reminders', description: 'Send reminders before scheduled services' },
        { name: 'Equipment Alerts', description: 'Notify when equipment needs maintenance' },
      ],
    },
    {
      title: 'Team Permissions',
      icon: Shield,
      settings: [
        { name: 'Equipment Access', description: 'Who can check out equipment' },
        { name: 'Schedule Management', description: 'Who can modify the schedule' },
      ],
    },
    {
      title: 'Service Templates',
      icon: Workflow,
      settings: [
        { name: 'Sunday Service', description: 'Default setup for Sunday services' },
        { name: 'Wednesday Service', description: 'Default setup for Wednesday services' },
      ],
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Configure your sound department preferences</p>
      </div>

      <div className="space-y-6">
        {sections.map((section, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <section.icon className="h-5 w-5 text-indigo-500" />
              <h2 className="text-xl font-semibold">{section.title}</h2>
            </div>
            <div className="space-y-4">
              {section.settings.map((setting, settingIndex) => (
                <div
                  key={settingIndex}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <h3 className="font-medium">{setting.name}</h3>
                    <p className="text-sm text-gray-600">{setting.description}</p>
                  </div>
                  <button className="px-4 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50 rounded-lg">
                    Configure
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}