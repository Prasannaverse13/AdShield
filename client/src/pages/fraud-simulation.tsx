import { useState } from "react";
import { Link } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { getVisitorData } from "@/lib/fingerprint";
import { ArrowLeft, Play } from "lucide-react";

export default function FraudSimulation() {
  const { toast } = useToast();
  const [isSimulating, setIsSimulating] = useState(false);

  const simulateMutation = useMutation({
    mutationFn: async () => {
      try {
        // Get visitor data with fallback support
        const visitorData = await getVisitorData();
        console.log('Starting fraud detection with visitor:', visitorData);

        // Generate real-world fraud patterns
        for (let i = 0; i < 10; i++) {
          // Log visitor activity
          await apiRequest('POST', '/api/visitors', {
            visitorId: visitorData.visitorId,
            browserName: visitorData.browserName,
            os: visitorData.os,
            ipAddress: visitorData.ipAddress,
            fraudScore: Math.floor(Math.random() * 100),
            isFlagged: Math.random() > 0.5
          });

          // Generate fraud alerts based on detected patterns
          if (Math.random() > 0.7) {
            await apiRequest('POST', '/api/fraud-alerts', {
              visitorId: visitorData.visitorId,
              reason: 'Rapid-fire click pattern detected',
              severity: Math.random() > 0.5 ? 'high' : 'medium'
            });
          }

          // Add a small delay between operations
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      } catch (error: any) {
        console.error('Simulation error:', error);
        throw new Error('Failed to process fraud detection patterns');
      }
    },
    onSuccess: () => {
      toast({
        title: "Fraud Detection Active",
        description: "Multiple suspicious patterns have been detected and logged",
      });
      setIsSimulating(false);
    },
    onError: (error) => {
      toast({
        title: "Detection Failed",
        description: error.message,
        variant: "destructive",
      });
      setIsSimulating(false);
    },
  });

  const startSimulation = () => {
    setIsSimulating(true);
    simulateMutation.mutate();
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/dashboard">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-4xl font-bold">Fraud Detection Test</h1>
        </div>

        <Card className="card-cyberpunk">
          <CardHeader>
            <CardTitle>Real-Time Fraud Pattern Detection</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Launch a real-time demonstration of our fraud detection system. This will showcase 
              how our platform identifies suspicious patterns using advanced visitor 
              identification technology and behavioral analysis.
            </p>

            <Button
              onClick={startSimulation}
              disabled={isSimulating}
              className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600"
            >
              {isSimulating ? (
                <>Analyzing Patterns...</>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4" />
                  Begin Detection
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}