// ReviewManagement.tsx
"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Loader2,  Trash2 } from "lucide-react"
import toast from "react-hot-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { useAuth } from "@/store/useAuth"

export interface Reviewer {
  _id: string
  fullName: string
  email: string
}

export interface ReviewerAssignment {
  _id: string
  reviewer: Reviewer
  comment: string
  commentedAt: string | null
  // Add any other fields you need
}
interface ReviewManagementProps {
  submissionId: string
  isAdmin: boolean
  reviewerAssignments: ReviewerAssignment[]
  onUpdateAssignment?: (reviewerId: string, comment: string) => Promise<void>
  onDeleteAssignment?: (reviewerId: string) => Promise<void>
}

export function ReviewAssignManagement({
  isAdmin,
  reviewerAssignments = [],
  onDeleteAssignment
}: ReviewManagementProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [reviewerToDelete, setReviewerToDelete] = useState<string | null>(null)
  const { user } = useAuth();

  const handleDelete = async () => {
    if (!reviewerToDelete || !onDeleteAssignment) return
    setIsSubmitting(true)
    try {
      await onDeleteAssignment(reviewerToDelete)
      setDeleteDialogOpen(false)
    } catch (error) {
      console.error("Error deleting review assignment:", error)
      toast.error("Failed to remove reviewer")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-5">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Review Assignments</h2>
      {reviewerAssignments.length === 0 ? (
        <p className="text-gray-500">No reviewers assigned yet</p>
      ) : (
        <div className="space-y-4">
          {reviewerAssignments.map((assignment) => (
            <div key={assignment._id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{assignment.reviewer.fullName}</h3>
                  <p className="text-sm text-gray-500">{assignment.reviewer.email}</p>
                </div>
                {(isAdmin || assignment.reviewer._id === user?._id) && (
                  <div className=" ">
                    {isAdmin && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setReviewerToDelete(assignment._id)
                          setDeleteDialogOpen(true)
                        }}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove Reviewer</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to remove this reviewer?</p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isSubmitting}
            >
              {isSubmitting && (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              )}
              Remove
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}