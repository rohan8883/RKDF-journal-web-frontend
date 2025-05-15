"use client"

import { useState } from "react"
import { useApi } from "@/hooks/useCustomQuery"
import { rkdfApi } from "@/lib"
import { Clock, Plus, ChevronRight, CheckCircle, AlertCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { ReviewRoundForm } from "./ReviewRoundForm"

interface ReviewRound {
  _id: string
  submissionId: string
  roundNumber: number
  startDate: string
  endDate?: string
  status: "in_progress" | "completed" | "cancelled"
  editorNotes?: string
  createdAt: string
}

interface ReviewRoundsListProps {
  submissionId: string
  isAdmin: boolean
  onSelectRound: (roundId: string) => void
}

const statusConfig = {
  in_progress: { color: "bg-yellow-100 text-yellow-800", icon: <Clock className="h-4 w-4" /> },
  completed: { color: "bg-green-100 text-green-800", icon: <CheckCircle className="h-4 w-4" /> },
  cancelled: { color: "bg-red-100 text-red-800", icon: <XCircle className="h-4 w-4" /> },
}

export const ReviewRoundsList = ({ submissionId, isAdmin, onSelectRound }: ReviewRoundsListProps) => {
  const [showCreateForm, setShowCreateForm] = useState(false)

  const { data, isLoading, refetch } = useApi<{ success: boolean; data: ReviewRound[] }>({
    api: `${rkdfApi?.getReviewRounds}?submissionId=${submissionId}`,
    options: {
      enabled: !!submissionId,
    },
  })

  const reviewRounds = data?.data || []

  const handleCreateSuccess = () => {
    setShowCreateForm(false)
    refetch()
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

  return (
    <div className="bg-white rounded-lg shadow-sm p-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Review Rounds</h2>
        {isAdmin && !showCreateForm && (
          <Button size="sm" onClick={() => setShowCreateForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Round
          </Button>
        )}
      </div>

      {showCreateForm && (
        <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <ReviewRoundForm
            submissionId={submissionId}
            onSuccess={handleCreateSuccess}
            onCancel={() => setShowCreateForm(false)}
            nextRoundNumber={reviewRounds.length + 1}
          />
        </div>
      )}

      {reviewRounds.length > 0 ? (
        <div className="space-y-3">
          {reviewRounds.map((round) => {
            const statusInfo = statusConfig[round.status] || {
              color: "bg-gray-100 text-gray-800",
              icon: <AlertCircle className="h-4 w-4" />,
            }

            return (
              <div
                key={round._id}
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => onSelectRound(round._id)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-gray-800">Round {round.roundNumber}</h3>
                      <Badge className={`${statusInfo.color} flex items-center gap-1`}>
                        {statusInfo.icon}
                        {round.status.replace("_", " ")}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Started: {format(new Date(round.startDate), "MMM dd, yyyy")}
                      {round.endDate && ` • Ended: ${format(new Date(round.endDate), "MMM dd, yyyy")}`}
                    </p>
                    {round.editorNotes && <p className="text-sm text-gray-600 mt-2 italic">"{round.editorNotes}"</p>}
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <Clock className="h-12 w-12 mx-auto mb-3 text-gray-300" />
          <p className="text-lg font-medium mb-1">No review rounds yet</p>
          <p className="text-sm">
            {isAdmin
              ? "Start the review process by creating a new review round."
              : "The review process has not started yet."}
          </p>
        </div>
      )}
    </div>
  )
}
