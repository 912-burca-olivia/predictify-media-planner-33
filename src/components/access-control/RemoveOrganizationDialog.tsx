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

interface RemoveOrganizationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  organization: {
    id: string;
    name: string;
    memberCount: number;
  } | null;
}

export function RemoveOrganizationDialog({
  open,
  onOpenChange,
  organization,
}: RemoveOrganizationDialogProps) {
  const { toast } = useToast();

  const handleRemove = () => {
    if (!organization) return;

    // TODO: Implement actual removal logic
    toast({
      title: "Organization removed",
      description: `${organization.name} has been removed from the system.`,
    });
    onOpenChange(false);
  };

  if (!organization) return null;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remove Organization</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to remove <strong>{organization.name}</strong>?
            {organization.memberCount > 0 && (
              <span className="block mt-2 text-destructive">
                Warning: This organization has {organization.memberCount} member(s).
                They will lose access to organization resources.
              </span>
            )}
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
