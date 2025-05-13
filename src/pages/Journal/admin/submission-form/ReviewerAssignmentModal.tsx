import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export const ReviewerAssignmentModal = ({
  reviewers,
  loading,
  open,
  onClose,
  onAssign
}: {
  reviewers: any[];
  loading: boolean;
  open: boolean;
  onClose: () => void;
  onAssign: (reviewerId: string) => void;
}) => {
  const [selectedReviewer, setSelectedReviewer] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAssign = async () => {
    if (!selectedReviewer) return;
    setIsSubmitting(true);
    try {
      await onAssign(selectedReviewer);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Assign Reviewer</DialogTitle>
        </DialogHeader>
        
        {loading ? (
          <div className="flex justify-center py-4">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Select Reviewer
              </label>
              <select
                className="w-full p-2 border rounded-md"
                value={selectedReviewer || ""}
                onChange={(e) => setSelectedReviewer(e.target.value)}
              >
                <option value="">Select a reviewer</option>
                {reviewers.map((reviewer) => (
                  <option key={reviewer._id} value={reviewer._id}>
                    {reviewer.fullName} ({reviewer.email})
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                disabled={!selectedReviewer || isSubmitting}
                onClick={handleAssign}
              >
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : null}
                Assign
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};