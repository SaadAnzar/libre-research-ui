import { TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useResearch } from "@/services/research-service";

export function DeleteButton({
  researchId,
  onClick,
}: {
  researchId: string;
  onClick?: () => void;
}) {
  const { deleteResearch } = useResearch();

  const handleDelete = async (researchId: string) => {
    if (!researchId) return;

    try {
      await deleteResearch.mutateAsync(researchId);
      toast.success("Research deleted successfully!");
    } catch (error: any) {
      toast.error(error?.detail);
    }
  };

  return (
    <Button
      variant="outline"
      className="rounded-xl hover:bg-destructive hover:text-destructive"
      onClick={() => {
        handleDelete(researchId);
        onClick?.();
      }}
    >
      Delete
      <TrashIcon />
    </Button>
  );
}
