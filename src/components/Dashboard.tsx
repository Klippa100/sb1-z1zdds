import React from 'react';
import { Calendar, Users, Box, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { format, isWithinNextDays, isFuture } from '../utils/dateHelpers';

export function Dashboard() {
  const { events, teamMembers, equipment, alerts } = useApp();

  // Get upcoming events for the next 7 days
  const upcomingEvents = events
    .filter(event => isFuture(new Date(event.date)) && isWithinNextDays(new Date(event.date), 7))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Calculate statistics
  const stats = {
    upcomingServices: upcomingEvents.length,
    activeTeamMembers: teamMembers.length,
    unavailableTeamMembers: teamMembers.filter(member => 
      member.availability.length === 0
    ).length,
    totalEquipment: equipment.length,
    maintenanceEquipment: equipment.filter(item => 
      item.status === 'maintenance'
    ).length
  };

  // Get active alerts
  const activeAlerts = alerts
    .filter(alert => !alert.resolved)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
        <p className="text-gray-600">Here's what's happening in your sound department</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          icon={Calendar}
          title="Upcoming Services"
          value={stats.upcomingServices.toString()}
          description="Next 7 days"
          color="indigo"
        />
        <StatCard
          icon={Users}
          title="Active Team Members"
          value={stats.activeTeamMembers.toString()}
          description={`${stats.unavailableTeamMembers} unavailable`}
          color="green"
        />
        <StatCard
          icon={Box}
          title="Equipment Items"
          value={stats.totalEquipment.toString()}
          description={`${stats.maintenanceEquipment} in maintenance`}
          color="blue"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
          {upcomingEvents.length > 0 ? (
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium">{event.title}</h3>
                    <p className="text-sm text-gray-600">
                      {format(new Date(event.date), 'EEEE, MMMM d')} at {event.time}
                    </p>
                  </div>
                  <div className="flex -space-x-2">
                    {event.teamMembers.map((memberId) => {
                      const member = teamMembers.find(m => m.id === memberId);
                      if (!member) return null;
                      return (
                        <div
                          key={memberId}
                          className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-sm border-2 border-white"
                          title={member.name}
                        >
                          {member.name.charAt(0)}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No upcoming events in the next 7 days</p>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Alerts & Notifications</h2>
          {activeAlerts.length > 0 ? (
            <div className="space-y-4">
              {activeAlerts.map((alert) => (
                <div 
                  key={alert.id} 
                  className={`flex items-center gap-3 p-4 rounded-lg ${
                    alert.type === 'maintenance' 
                      ? 'bg-red-50 text-red-700' 
                      : 'bg-yellow-50 text-yellow-700'
                  }`}
                >
                  <AlertCircle className="h-5 w-5" />
                  <div>
                    <p>{alert.message}</p>
                    <p className="text-sm opacity-75">
                      {format(new Date(alert.date), 'MMM d, h:mm a')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No active alerts</p>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ 
  icon: Icon, 
  title, 
  value, 
  description, 
  color 
}: { 
  icon: React.ElementType;
  title: string;
  value: string;
  description: string;
  color: 'indigo' | 'green' | 'blue';
}) {
  const colors = {
    indigo: 'bg-indigo-500',
    green: 'bg-green-500',
    blue: 'bg-blue-500',
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center gap-4">
        <div className={`${colors[color]} p-3 rounded-lg`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-600">{title}</h3>
          <p className="text-2xl font-semibold">{value}</p>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
    </div>
  );
}