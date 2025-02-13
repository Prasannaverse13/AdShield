import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Users, Shield, Activity } from "lucide-react";
import type { Visitor, FraudAlert } from "@shared/schema";

interface FraudStatsProps {
  visitors: Visitor[];
  alerts: FraudAlert[];
}

export default function FraudStats({ visitors, alerts }: FraudStatsProps) {
  const stats = [
    {
      title: "Total Visitors",
      value: visitors.length,
      icon: Users,
      description: "Unique visitors tracked"
    },
    {
      title: "Fraud Alerts",
      value: alerts.length,
      icon: AlertCircle,
      description: "Suspicious activities detected"
    },
    {
      title: "Risk Score",
      value: Math.round(visitors.reduce((acc, v) => acc + v.fraudScore, 0) / visitors.length || 0),
      icon: Shield,
      description: "Average fraud risk score"
    }
  ];

  return stats.map((stat) => (
    <Card key={stat.title}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {stat.title}
        </CardTitle>
        <stat.icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{stat.value}</div>
        <p className="text-xs text-muted-foreground">
          {stat.description}
        </p>
      </CardContent>
    </Card>
  ));
}
