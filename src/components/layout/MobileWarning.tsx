
import { AlertTriangle } from 'lucide-react';

const MobileWarning = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-background p-6">
      <div className="text-center max-w-md">
        <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-destructive" />
        <h1 className="text-2xl font-bold text-foreground mb-2">Mobile Access Restricted</h1>
        <p className="text-muted-foreground">
          This application is only available on desktop devices. Please access from a computer for the full experience.
        </p>
      </div>
    </div>
  );
};

export default MobileWarning;
