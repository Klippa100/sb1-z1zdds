import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Calendar, Box, Users, Settings, Music2 } from 'lucide-react';

export function Sidebar() {
  const links = [
    { to: '/', icon: Home, label: 'Dashboard' },
    { to: '/schedule', icon: Calendar, label: 'Schedule' },
    { to: '/equipment', icon: Box, label: 'Equipment' },
    { to: '/team', icon: Users, label: 'Team' },
    { to: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="w-64 bg-gray-900 text-white p-4">
      <div className="flex items-center gap-3 mb-8 px-2">
        <Music2 className="h-8 w-8 text-indigo-400" />
        <h1 className="text-xl font-bold">Sound Central</h1>
      </div>
      
      <nav className="space-y-2">
        {links.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800'
              }`
            }
          >
            <Icon className="h-5 w-5" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}