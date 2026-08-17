import React from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { Switch } from "../components/ui/switch";

import { ArrowRight, Mic, Sparkles } from "lucide-react";
import { useState } from "react";

export default function Onboarding() {
    const steps = ["Choose your rhythm", "Enable voice capture", "Try a task"];
    const [step, setStep] = useState(0);
    const [voice, setVoice] = useState(true);
  return (
   <div className="w-full min-w-0 bg-background overflow-x-hidden">
      <div className="w-full min-w-0">
          (
              (<Card className="w-full border-border shadow-none"><CardContent className="p-6"><Progress value={(step + 1) * 33} /><p className="mt-6 text-sm font-medium text-primary">Step {step + 1} of 3</p><h1 className="mt-2 text-2xl font-semibold text-foreground">{steps[step]}</h1><p className="mt-2 text-sm text-muted-foreground">{step === 0 ? "Set a calm, intentional pace for your day." : step === 1 ? "Use your voice when your hands are busy." : "You’re ready to capture the next thing."}</p>{step === 1 && <div className="mt-6 flex items-center rounded-lg bg-muted p-4"><Mic className="mr-3 size-5 text-primary" /><span className="flex-1 text-sm font-medium">Enable voice capture</span><Switch checked={voice} onCheckedChange={setVoice} /></div>}{step === 2 && <Sparkles className="mt-6 size-8 text-primary" />}<div className="mt-8 flex justify-between"><Button variant="ghost" disabled={step === 0} onClick={() => setStep(step - 1)}>Back</Button><Button onClick={() => setStep(Math.min(step + 1, 2))}>{step === 2 ? "Finish" : "Continue"}<ArrowRight className="size-4" /></Button></div></CardContent></Card>)
      </div>
    </div>
  );
}