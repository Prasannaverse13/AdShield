import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="text-center space-y-8 max-w-3xl px-4">
        <h1 className="text-6xl font-bold neon-glow bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-500">
          AdShield
        </h1>
        
        <p className="text-xl text-muted-foreground">
          Advanced Fraud Prevention System for Click Fraud & Fake Profiles
        </p>

        <div className="border-t border-purple-500/20 w-32 mx-auto"></div>
        
        <p className="text-muted-foreground">
          Real-time fraud detection powered by advanced visitor identification technology.
          Protect your business from click fraud, fake accounts, and suspicious activities.
        </p>

        <Link href="/dashboard">
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 shadow-lg shadow-purple-500/20 text-lg px-8 py-6"
          >
            <Shield className="mr-2 h-6 w-6" />
            Get Started
          </Button>
        </Link>
      </div>
    </div>
  );
}
