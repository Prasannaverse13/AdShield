import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { InfoIcon, MousePointer2, Shield, Server } from "lucide-react";

export default function HowItWorksDialog() {
  const steps = [
    {
      icon: MousePointer2,
      title: "Automatic Click Tracking",
      description: "Our script silently monitors all user interactions on the target website without requiring any manual activation."
    },
    {
      icon: Server,
      title: "Real-time Data Collection",
      description: "The script automatically collects visitor information like device fingerprint, IP address, and browser details."
    },
    {
      icon: Shield,
      title: "Fraud Detection",
      description: "Our system analyzes patterns to detect suspicious activities like rapid clicking, multiple accounts, or payment fraud."
    }
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <InfoIcon className="h-4 w-4" />
          How It Works
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl card-cyberpunk">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold neon-glow">
            How AdShield Works
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-8 py-4">
          {steps.map((step, index) => (
            <div key={index} className="flex gap-4 items-start">
              <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                <step.icon className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-purple-400">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}

          <div className="p-4 rounded-lg border border-cyan-500/20 bg-cyan-500/5">
            <h4 className="font-semibold text-cyan-400 mb-2">Example Detection:</h4>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>50+ clicks in 10 seconds → Bot Activity</li>
              <li>5+ accounts from same device → Fake Users</li>
              <li>Multiple IDs using same payment → Potential Fraud</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
