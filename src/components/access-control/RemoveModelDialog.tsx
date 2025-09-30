import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

interface RemoveModelDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  model: {
    id: string;
    name: string;
  } | null;
}

export function RemoveModelDialog({
  open,
  onOpenChange,
  model,
}: RemoveModelDialogProps) {
  const { toast } = useToast();

  const handleRemove = () => {
    if (!model) return;

    // TODO: Implement actual removal logic
    toast({
      title: "Model removed",
      description: `${model.name} has been removed from the system.`,
    });
    onOpenChange(false);
  };

  if (!model) return null;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remove Model</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to remove <strong>{model.name}</strong>?
            This will permanently delete all associated data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleRemove} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
            Remove
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
