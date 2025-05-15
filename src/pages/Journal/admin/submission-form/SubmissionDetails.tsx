"use client"

import { useState } from "react"
import { useParams } from "react-router-dom"
import { useApi, usePostMutation } from "@/hooks/useCustomQuery"
import { rkdfApi } from "@/lib"
import { useAuth } from "@/store/useAuth"
import toast from "react-hot-toast"
import { Book, Calendar, Tag, BookOpen, Clock, Users, ClipboardCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"

// Import separated components
import { LoadingSkeleton } from "./LoadingSkeleton"
import { getStatusDisplay } from "./StatusConfigItem"
import { ReviewerMessagesSection } from "./ReviewerMessagesSection"
import { AuthorInfoSection } from './AuthorInfoSection'
import { FilesSection } from "./FilesSection"
import { ReviewTimelineSection } from "./ReviewTimelineSection"
import { ReviewerAssignmentModal } from "./ReviewerAssignmentModal"
import { ReviewSubmissionForm } from "./ReviewSubmissionForm"
import { ReviewManagement } from "./review/ReviewManagement"
import type { SubmissionData } from "./type"

export default function SubmissionDetailsView() {
  const postMutation = usePostMutation({})
  const { submissionId } = useParams<{ submissionId: string }>()
  const { user } = useAuth()
  const [messagesExpanded, setMessagesExpanded] = useState(true)
  const [assignModalOpen, setAssignModalOpen] = useState(false)
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [activeTab, setActiveTab] = useState<"details" | "reviews">("details")

  // Fetch submission data
  const { data, isLoading } = useApi<any>({
    api: `${rkdfApi?.getSubmissionsById}/${submissionId}`,
    options: {
      enabled: !!submissionId,
    },
  })

  // Fetch reviewer messages
  const { data: messagesData, isLoading: messagesLoading } = useApi<any>({
    api: `${rkdfApi?.getReviewerMessages}?submissionId=${submissionId}`,
    options: {
      enabled: !!submissionId,
    },
  })

  // Fetch available reviewers (for admin)
  const { data: reviewersData, isLoading: reviewersLoading } = useApi<any>({
    api: `${rkdfApi?.getAvailableReviewers}?submissionId=${submissionId}`,
    options: {
      enabled: !!submissionId && user?.role === "Admin",
    },
  })

  const submissionData = data?.data as SubmissionData
  const reviewerMessages = messagesData?.data?.docs || []
  const reviewers = reviewersData?.data?.docs || []

  // Check user roles and assignments
  const isAssignedReviewer = user?.role === "Reviewer"
  const isAuthor = submissionData?.submittedBy?._id === user?._id
  const isAdmin = user?.role === "Admin"

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A"
    try {
      return format(new Date(dateString), "MMM dd, yyyy")
    } catch (e) {
      return "Invalid date"
    }
  }

  const handleAssignReviewer = async (reviewerId: string) => {
    try {
      const res = await postMutation.mutateAsync({
        api: rkdfApi.assignReviewer,
        data: {
          submissionId,
          reviewerId,
        },
      })

      if (res.data?.success) {
        toast.success("Reviewer assigned successfully")
        // Optional: refetch data or reload
        window.location.reload()
      } else {
        toast.error(res.data?.message || "Failed to assign reviewer")
      }
    } catch (error) {
      console.error("Error assigning reviewer:", error)
      toast.error("Something went wrong while assigning reviewer")
    }
  }

  const handleSubmitReview = async (reviewData: any) => {
    try {
      const res = await postMutation.mutateAsync({
        api: rkdfApi.submitReview,
        data: reviewData,
      })

      if (res.data?.success) {
        toast.success("Review submitted successfully")
        setShowReviewForm(false)
        window.location.reload()
      } else {
        toast.error(res.data?.message || "Failed to submit review")
      }
    } catch (error) {
      console.error("Error submitting review:", error)
      toast.error("Something went wrong while submitting the review")
    }
  }

  if (isLoading) {
    return <LoadingSkeleton />
  }

  const statusDisplay = getStatusDisplay(submissionData?.status)

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-md">
      <div className="p-6">
        {/* Header with Title and Status */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-2 md:mb-0">{submissionData?.title}</h1>
          <div className="flex items-center gap-2">
            <Badge className={`${statusDisplay?.color} flex items-center gap-1 px-3 py-1 text-sm font-medium`}>
              {statusDisplay?.icon}
              {submissionData?.status?.replace("_", " ").toUpperCase()}
            </Badge>

            {isAdmin && (
              <Button variant="outline" size="sm" onClick={() => setAssignModalOpen(true)}>
                <Users className="h-4 w-4 mr-2" />
                Assign Reviewer
              </Button>
            )}

            {isAssignedReviewer && !showReviewForm && (
              <Button variant="default" size="sm" onClick={() => setShowReviewForm(true)}>
                <ClipboardCheck className="h-4 w-4 mr-2" />
                Submit Review
              </Button>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === "details" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("details")}
          >
            Submission Details
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === "reviews" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("reviews")}
          >
            Review Process
          </button>
        </div>

        {activeTab === "details" ? (
          /* Main Content Grid - Details Tab */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Submission Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Info Card */}
              <div className="bg-white rounded-lg shadow-sm p-5">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Book className="h-5 w-5 mr-2 text-blue-600" />
                  Submission Details
                </h2>

                <div className="space-y-4">
                  {/* Abstract */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Abstract</h3>
                    <p className="text-gray-800 whitespace-pre-line">{submissionData?.abstract}</p>
                  </div>

                  {/* Keywords */}
                  {submissionData?.keywords?.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1 flex items-center">
                        <Tag className="h-4 w-4 mr-1 text-blue-600" />
                        Keywords
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {submissionData?.keywords?.map((keyword: string, index: number) => (
                          <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Journal */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1 flex items-center">
                      <BookOpen className="h-4 w-4 mr-1 text-blue-600" />
                      Journal
                    </h3>
                    <p className="text-gray-800">
                      {submissionData?.journalId?.title || "Journal information not available"}
                    </p>
                  </div>

                  {/* Dates */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1 flex items-center">
                        <Calendar className="h-4 w-4 mr-1 text-blue-600" />
                        Submission Date
                      </h3>
                      <p className="text-gray-800">
                        {formatDate(submissionData?.submissionDate || submissionData?.createdAt)}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1 flex items-center">
                        <Clock className="h-4 w-4 mr-1 text-blue-600" />
                        Last Updated
                      </h3>
                      <p className="text-gray-800">{formatDate(submissionData?.updatedAt)}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reviewer Messages - Only show to authors and reviewers */}
              {(isAuthor || isAssignedReviewer) && (
                <ReviewerMessagesSection
                  messages={reviewerMessages}
                  loading={messagesLoading}
                  expanded={messagesExpanded}
                  onToggle={() => setMessagesExpanded(!messagesExpanded)}
                  authorName={submissionData?.submittedBy?.fullName}
                />
              )}

              {/* Review Form - Only show to assigned reviewers */}
              {isAssignedReviewer && showReviewForm && (
                <div className="bg-white rounded-lg shadow-sm p-5">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <ClipboardCheck className="h-5 w-5 mr-2 text-blue-600" />
                    Submit Your Review
                  </h2>
                  <ReviewSubmissionForm
                    submissionId={submissionId!}
                    reviewRoundId={submissionData?.currentReviewRound?._id!}
                    onSubmit={handleSubmitReview}
                  />
                </div>
              )}
            </div>

            {/* Right Column - Files & Meta Info */}
            <div className="space-y-6">
              {/* Author Info - Only show to admin and reviewers */}
              {(isAdmin || isAssignedReviewer) && <AuthorInfoSection author={submissionData?.submittedBy} />}

              {/* Files Card */}
              <FilesSection
                manuscriptUrl={submissionData?.fullManuscriptUrl}
                manuscriptFile={submissionData?.manuscriptFile}
              />

              {/* Review Status Timeline */}
              <ReviewTimelineSection submission={submissionData} />
            </div>
          </div>
        ) : (
          /* Reviews Tab */
          <ReviewManagement submissionId={submissionId!} isAdmin={isAdmin} />
        )}
      </div>

      {/* Reviewer Assignment Modal */}
      {isAdmin && (
        <ReviewerAssignmentModal
          reviewers={reviewers}
          loading={reviewersLoading}
          open={assignModalOpen}
          onClose={() => setAssignModalOpen(false)}
          onAssign={handleAssignReviewer}
        />
      )}
    </div>
  )
}
