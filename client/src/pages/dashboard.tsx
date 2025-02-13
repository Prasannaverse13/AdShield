import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Shield } from "lucide-react";
import VisitorChart from "@/components/charts/visitor-chart";
import FraudStats from "@/components/fraud-stats";
import VisitorTable from "@/components/visitor-table";
import HowItWorksDialog from "@/components/how-it-works-dialog";
import type { Visitor, FraudAlert } from "@shared/schema";

export default function Dashboard() {
  const { data: visitors = [], refetch: refetchVisitors } = useQuery<Visitor[]>({ 
    queryKey: ['/api/visitors'],
    refetchInterval: 2000 // Refetch every 2 seconds
  });

  const { data: alerts = [], refetch: refetchAlerts } = useQuery<FraudAlert[]>({ 
    queryKey: ['/api/fraud-alerts'],
    refetchInterval: 2000 // Refetch every 2 seconds
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold neon-glow bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-500">
              AdShield Dashboard
            </h1>
            <p className="text-muted-foreground mt-2">Advanced Fraud Prevention System</p>
          </div>
          <div className="flex gap-4">
            <HowItWorksDialog />
            <Link href="/simulate">
              <Button className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 shadow-lg shadow-purple-500/20">
                <Shield className="mr-2 h-4 w-4" />
                Simulate Fraud
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <FraudStats visitors={visitors} alerts={alerts} />
        </div>

        {alerts.filter(a => a.severity === 'high').length > 0 && (
          <Alert variant="destructive" className="border-red-500/50 bg-red-500/10 shadow-lg shadow-red-500/10">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-red-400">
              High severity fraud alerts detected! Please review suspicious activities.
            </AlertDescription>
          </Alert>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="card-cyberpunk">
            <CardHeader>
              <CardTitle className="text-gradient">Visitor Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <VisitorChart visitors={visitors} />
            </CardContent>
          </Card>

          <Card className="card-cyberpunk">
            <CardHeader>
              <CardTitle className="text-gradient">Recent Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alerts.slice(0, 5).map((alert) => (
                  <div 
                    key={alert.id} 
                    className="flex items-center gap-4 p-4 rounded-lg bg-black/50 border border-purple-500/20 shadow-lg transition-all hover:border-purple-500/40"
                  >
                    <AlertCircle className={
                      alert.severity === 'high' 
                        ? 'text-red-500 animate-pulse' 
                        : 'text-yellow-500'
                    } />
                    <div>
                      <p className="font-medium text-gradient">{alert.reason}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(alert.timestamp!).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="card-cyberpunk">
          <CardHeader>
            <CardTitle className="text-gradient">Visitor Activity Log</CardTitle>
          </CardHeader>
          <CardContent>
            <VisitorTable visitors={visitors} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}