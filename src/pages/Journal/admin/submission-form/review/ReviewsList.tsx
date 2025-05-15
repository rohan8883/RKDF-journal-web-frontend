"use client"

import { useState } from "react"
import { useApi } from "@/hooks/useCustomQuery"
import { rkdfApi } from "@/lib"
import { useAuth } from "@/store/useAuth"
import { ClipboardCheck, User, Clock, CheckCircle, XCircle, AlertCircle, Plus, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { ReviewForm } from "./ReviewForm"
import { ReviewDetails } from "./ReviewDetails"

interface Review {
  _id: string
  reviewRoundId: string
  reviewerId: {
    _id: string
    fullName: string
    email: string
  }
  submissionId: string
  recommendation?: "accept" | "minor_revisions" | "major_revisions" | "reject"
  comments?: string
  confidentialComments?: string
  submissionDate?: string
  dueDate?: string
  status: "pending" | "completed" | "declined" | "overdue"
  createdAt: string
}

interface ReviewsListProps {
  roundId: string
  submissionId: string
  isAdmin: boolean
}

const statusConfig = {
  pending: { color: "bg-yellow-100 text-yellow-800", icon: <Clock className="h-4 w-4" /> },
  completed: { color: "bg-green-100 text-green-800", icon: <CheckCircle className="h-4 w-4" /> },
  declined: { color: "bg-red-100 text-red-800", icon: <XCircle className="h-4 w-4" /> },
  overdue: { color: "bg-orange-100 text-orange-800", icon: <AlertCircle className="h-4 w-4" /> },
}

export const ReviewsList = ({ roundId, submissionId, isAdmin }: ReviewsListProps) => {
  const { user } = useAuth()
  const [selectedReviewId, setSelectedReviewId] = useState<string | null>(null)
  const [showCreateForm, setShowCreateForm] = useState(false)

  const { data, isLoading, refetch } = useApi<{ success: boolean; data: Review[] }>({
    api: `${rkdfApi?.getReviews}?reviewRoundId=${roundId}`,
    options: {
      enabled: !!roundId,
    },
  })

  const reviews = data?.data || []

  // Check if current user is a reviewer and has already submitted a review
  const isReviewer = user?.role === "Reviewer"
  const userReview = reviews.find((review) => review.reviewerId._id === user?._id)
  const canSubmitReview = isReviewer && !userReview && !showCreateForm

  const handleCreateSuccess = () => {
    setShowCreateForm(false)
    refetch()
  }

  const handleSelectReview = (reviewId: string) => {
    setSelectedReviewId(reviewId)
  }

  const handleBackToList = () => {
    setSelectedReviewId(null)
    refetch()
  }

  // If a review is selected, show its details
  if (selectedReviewId) {
    const review = reviews.find((r) => r._id === selectedReviewId)
    if (review) {
      return <ReviewDetails review={review} onBack={handleBackToList} isAdmin={isAdmin} />
    }
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
        <h2 className="text-lg font-semibold text-gray-800">Reviews</h2>
        {canSubmitReview && (
          <Button size="sm" onClick={() => setShowCreateForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Submit Review
          </Button>
        )}
      </div>

      {showCreateForm && (
        <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <ReviewForm
            reviewRoundId={roundId}
            submissionId={submissionId}
            onSuccess={handleCreateSuccess}
            onCancel={() => setShowCreateForm(false)}
          />
        </div>
      )}

      {reviews.length > 0 ? (
        <div className="space-y-3">
          {reviews.map((review) => {
            const statusInfo = statusConfig[review.status] || {
              color: "bg-gray-100 text-gray-800",
              icon: <AlertCircle className="h-4 w-4" />,
            }

            return (
              <div
                key={review._id}
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => handleSelectReview(review._id)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1 text-blue-600" />
                        <h3 className="font-medium text-gray-800">{review.reviewerId.fullName}</h3>
                      </div>
                      <Badge className={`${statusInfo.color} flex items-center gap-1`}>
                        {statusInfo.icon}
                        {review.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Assigned: {format(new Date(review.createdAt), "MMM dd, yyyy")}
                      {review.submissionDate &&
                        ` • Submitted: ${format(new Date(review.submissionDate), "MMM dd, yyyy")}`}
                    </p>
                    {review.recommendation && (
                      <p className="text-sm font-medium mt-2">
                        Recommendation: <span className="text-blue-600">{review.recommendation.replace("_", " ")}</span>
                      </p>
                    )}
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <ClipboardCheck className="h-12 w-12 mx-auto mb-3 text-gray-300" />
          <p className="text-lg font-medium mb-1">No reviews yet</p>
          <p className="text-sm">
            {isReviewer ? "Submit your review for this submission." : "No reviewers have submitted reviews yet."}
          </p>
        </div>
      )}
    </div>
  )
}
