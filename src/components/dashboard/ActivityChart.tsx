
import React, { useState } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

// Sample data for the charts
const monthlyData = [
  { name: 'Jan', emails: 120, meetings: 10, responses: 24 },
  { name: 'Feb', emails: 180, meetings: 8, responses: 32 },
  { name: 'Mar', emails: 220, meetings: 12, responses: 48 },
  { name: 'Apr', emails: 250, meetings: 15, responses: 56 },
  { name: 'May', emails: 310, meetings: 18, responses: 68 },
  { name: 'Jun', emails: 290, meetings: 20, responses: 72 },
  { name: 'Jul', emails: 350, meetings: 22, responses: 85 },
  { name: 'Aug', emails: 380, meetings: 25, responses: 92 },
  { name: 'Sep', emails: 420, meetings: 30, responses: 110 },
  { name: 'Oct', emails: 450, meetings: 28, responses: 105 },
  { name: 'Nov', emails: 480, meetings: 33, responses: 120 },
  { name: 'Dec', emails: 510, meetings: 35, responses: 130 },
];

const weeklyData = [
  { name: 'Lun', emails: 45, meetings: 5, responses: 12 },
  { name: 'Mar', emails: 52, meetings: 3, responses: 14 },
  { name: 'Mer', emails: 48, meetings: 4, responses: 13 },
  { name: 'Jeu', emails: 60, meetings: 6, responses: 17 },
  { name: 'Ven', emails: 58, meetings: 8, responses: 16 },
  { name: 'Sam', emails: 20, meetings: 1, responses: 5 },
  { name: 'Dim', emails: 10, meetings: 0, responses: 2 },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card p-4 !backdrop-blur-lg">
        <p className="font-medium mb-2">{label}</p>
        {payload.map((entry, index) => (
          <div key={`tooltip-${index}`} className="flex items-center gap-2 text-sm">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            <span>{entry.name}:</span>
            <span className="font-medium">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const ActivityChart: React.FC = () => {
  const [activeChart, setActiveChart] = useState("area");
  const [period, setPeriod] = useState("weekly");
  
  const data = period === "weekly" ? weeklyData : monthlyData;
  
  return (
    <div className="glass-card p-6 animate-scale-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h3 className="text-xl font-semibold">Activité de prospection</h3>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Tabs defaultValue="weekly" value={period} onValueChange={setPeriod} className="w-[200px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="weekly">Hebdo.</TabsTrigger>
              <TabsTrigger value="monthly">Mensuel</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Tabs defaultValue="area" value={activeChart} onValueChange={setActiveChart} className="w-[200px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="area">Aires</TabsTrigger>
              <TabsTrigger value="bar">Barres</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          {activeChart === "area" ? (
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorEmails" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0066FF" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#0066FF" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorResponses" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorMeetings" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                width={40}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Area
                type="monotone"
                dataKey="emails"
                name="Emails envoyés"
                stroke="#0066FF"
                fillOpacity={1}
                fill="url(#colorEmails)"
              />
              <Area
                type="monotone"
                dataKey="responses"
                name="Réponses"
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#colorResponses)"
              />
              <Area
                type="monotone"
                dataKey="meetings"
                name="Rendez-vous"
                stroke="#82ca9d"
                fillOpacity={1}
                fill="url(#colorMeetings)"
              />
            </AreaChart>
          ) : (
            <BarChart
              data={data}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                width={40}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar 
                dataKey="emails" 
                name="Emails envoyés" 
                fill="#0066FF" 
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="responses" 
                name="Réponses" 
                fill="#8884d8" 
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="meetings" 
                name="Rendez-vous" 
                fill="#82ca9d" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ActivityChart;
