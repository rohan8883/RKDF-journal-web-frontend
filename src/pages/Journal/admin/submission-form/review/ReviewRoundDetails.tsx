"use client"

import type React from "react"

import { useState } from "react"
import { useApi, usePostMutation, usePutMutation } from "@/hooks/useCustomQuery"
import { rkdfApi } from "@/lib"
import { Clock, CheckCircle, XCircle, AlertCircle, Edit, Calendar, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { Skeleton } from "@/components/ui/skeleton"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import toast from "react-hot-toast"
import { ReviewsList } from "./ReviewsList"

interface ReviewRoundDetailsProps {
  roundId: string
  submissionId: string
  isAdmin: boolean
  onBack: () => void
}

export const ReviewRoundDetails = ({ roundId, submissionId, isAdmin, onBack }: ReviewRoundDetailsProps) => {
  const [showEditModal, setShowEditModal] = useState(false)
  const [status, setStatus] = useState<string>("")
  const [editorNotes, setEditorNotes] = useState("")
  const postMutation = usePostMutation({})
  const putMutation = usePutMutation({});
  const { data, isLoading, refetch } = useApi<any>({
    api: `${rkdfApi?.getReviewRoundById}/${roundId}`,
    options: {
      enabled: !!roundId,
    },
  })

  const reviewRound = data?.data

  const handleOpenEditModal = () => {
    if (reviewRound) {
      setStatus(reviewRound.status)
      setEditorNotes(reviewRound.editorNotes || "")
      setShowEditModal(true)
    }
  }
 
  const handleUpdateRound = async () => {
    try {
      const res = await putMutation.mutateAsync({
          api: `${rkdfApi?.updateReviewRound}/${roundId}`,
          data: {
        //   reviewRoundId: roundId,
          status,
          editorNotes: editorNotes.trim() || undefined,
          endDate: status === "completed" || status === "cancelled" ? new Date().toISOString() : undefined,
        },
        });

      if (res.data?.success) {
        toast.success("Review round updated successfully")
        setShowEditModal(false)
        refetch()
      } else {
        toast.error(res.data?.message || "Failed to update review round")
      }
    } catch (error) {
      console.error("Error updating review round:", error)
      toast.error("Something went wrong while updating the review round")
    }
  }

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { color: string; icon: React.ReactNode }> = {
      in_progress: { color: "bg-yellow-100 text-yellow-800", icon: <Clock className="h-4 w-4" /> },
      completed: { color: "bg-green-100 text-green-800", icon: <CheckCircle className="h-4 w-4" /> },
      cancelled: { color: "bg-red-100 text-red-800", icon: <XCircle className="h-4 w-4" /> },
    }

    const config = statusConfig[status] || {
      color: "bg-gray-100 text-gray-800",
      icon: <AlertCircle className="h-4 w-4" />,
    }

    return (
      <Badge className={`${config.color} flex items-center gap-1 px-3 py-1`}>
        {config.icon}
        {status.replace("_", " ")}
      </Badge>
    )
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
      </div>
    )
  }

  if (!reviewRound) {
    return (
      <div className="text-center py-8 text-gray-500">
        <AlertCircle className="h-12 w-12 mx-auto mb-3 text-gray-300" />
        <p className="text-lg font-medium">Review round not found</p>
        <Button variant="outline" className="mt-4" onClick={onBack}>
          Back to Review Rounds
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack}>
          Back to Review Rounds
        </Button>
        {isAdmin && (
          <Button onClick={handleOpenEditModal}>
            <Edit className="h-4 w-4 mr-2" />
            Edit Round
          </Button>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-sm p-5">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-2 md:mb-0">Review Round {reviewRound.roundNumber}</h2>
          {getStatusBadge(reviewRound.status)}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1 flex items-center">
              <Calendar className="h-4 w-4 mr-1 text-blue-600" />
              Start Date
            </h3>
            <p className="text-gray-800">{format(new Date(reviewRound.startDate), "MMM dd, yyyy")}</p>
          </div>

          {reviewRound.endDate && (
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1 flex items-center">
                <Calendar className="h-4 w-4 mr-1 text-blue-600" />
                End Date
              </h3>
              <p className="text-gray-800">{format(new Date(reviewRound.endDate), "MMM dd, yyyy")}</p>
            </div>
          )}
        </div>

        {reviewRound.editorNotes && (
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Editor Notes</h3>
            <p className="text-gray-800 bg-gray-50 p-3 rounded-md">{reviewRound.editorNotes}</p>
          </div>
        )}
      </div>

      <ReviewsList roundId={roundId} submissionId={submissionId} isAdmin={isAdmin} />

      {/* Edit Modal */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Review Round</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-2">
            <div>
              <Label>Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Editor Notes</Label>
              <Textarea
                value={editorNotes}
                onChange={(e) => setEditorNotes(e.target.value)}
                placeholder="Add any notes for this review round"
                rows={3}
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowEditModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateRound} disabled={postMutation.isPending }>
                {postMutation.isPending  && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                Update
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
