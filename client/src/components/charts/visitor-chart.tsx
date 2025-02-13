import { Line, LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import type { Visitor } from '@shared/schema';

interface VisitorChartProps {
  visitors: Visitor[];
}

export default function VisitorChart({ visitors }: VisitorChartProps) {
  // Group visitors by hour
  const hourlyData = visitors.reduce((acc, visitor) => {
    const hour = new Date(visitor.lastSeen).getHours();
    acc[hour] = (acc[hour] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  // Convert to chart data format
  const data = Object.entries(hourlyData).map(([hour, count]) => ({
    hour: `${hour}:00`,
    visitors: count
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="hour" />
        <YAxis />
        <Tooltip />
        <Line 
          type="monotone" 
          dataKey="visitors" 
          stroke="hsl(var(--primary))" 
          strokeWidth={2} 
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
