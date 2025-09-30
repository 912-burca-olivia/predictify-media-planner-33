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

interface RemoveUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: {
    id: string;
    name: string;
    email: string;
  } | null;
}

export function RemoveUserDialog({
  open,
  onOpenChange,
  user,
}: RemoveUserDialogProps) {
  const { toast } = useToast();

  const handleRemove = () => {
    if (!user) return;

    // TODO: Implement actual removal logic
    toast({
      title: "User removed",
      description: `${user.name} has been removed from the system.`,
    });
    onOpenChange(false);
  };

  if (!user) return null;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remove User</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to remove <strong>{user.name}</strong> ({user.email})?
            This action cannot be undone.
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
