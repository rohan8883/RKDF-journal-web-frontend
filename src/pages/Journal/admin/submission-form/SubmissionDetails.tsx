"use client"

import { useState } from "react"
import { useParams } from "react-router-dom"
import { useApi, usePostMutation } from "@/hooks/useCustomQuery"
import { rkdfApi } from "@/lib"
import { useAuth } from "@/store/useAuth"
import toast from "react-hot-toast"
import { Book, Calendar, Tag, BookOpen, Clock, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"

// Import separated components
import { LoadingSkeleton } from "./LoadingSkeleton"
import { getStatusDisplay } from "./StatusConfigItem"
import { AuthorInfoSection } from './AuthorInfoSection'
import { FilesSection } from "./FilesSection" 
import { ReviewerAssignmentModal } from "./ReviewerAssignmentModal"
import { ReviewManagement } from "./review/ReviewManagement"
import type { SubmissionData } from "./type"

export default function SubmissionDetailsView() {
  const postMutation = usePostMutation({})
  const { submissionId } = useParams<{ submissionId: string }>()
  const { user } = useAuth()
  const [assignModalOpen, setAssignModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<"details" | "reviews">("details")

  // Fetch submission data
  const { data, isLoading } = useApi<any>({
    api: `${rkdfApi?.getSubmissionsById}/${submissionId}`,
    options: {
      enabled: !!submissionId,
    },
  })

  // Fetch reviewer messages


  // Fetch available reviewers (for admin)
  const { data: reviewersData, isLoading: reviewersLoading } = useApi<any>({
    api: `${rkdfApi?.getAvailableReviewers}?submissionId=${submissionId}`,
    options: {
      enabled: !!submissionId && user?.role === "Admin",
    },
  })

  const submissionData = data?.data as SubmissionData
  const reviewers = reviewersData?.data?.docs || []

  // Check user roles and assignments
  const isAssignedReviewer = user?.role === "Reviewer"
  // const isAuthor = submissionData?.submittedBy?._id === user?._id
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


          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-8">
          <button
            className={`px-6 py-3 font-medium text-sm rounded-t-lg transition-all duration-200 ${activeTab === "details"
                ? "text-white bg-gradient-to-r from-blue-500 to-blue-600 shadow-md"
                : "text-gray-600 bg-gray-100 hover:bg-gray-200"
              }`}
            onClick={() => setActiveTab("details")}
          >
            Submission Details
            {activeTab === "details" && (
              <span className="block w-6 h-1 mx-auto mt-2 bg-blue-300 rounded-full"></span>
            )}
          </button>
          <button
            className={`px-6 py-3 font-medium text-sm rounded-t-lg transition-all duration-200 ${activeTab === "reviews"
                ? "text-white bg-gradient-to-r from-blue-500 to-blue-600 shadow-md"
                : "text-gray-600 bg-gray-100 hover:bg-gray-200"
              }`}
            onClick={() => setActiveTab("reviews")}
          >
            Review Process
            {activeTab === "reviews" && (
              <span className="block w-6 h-1 mx-auto mt-2 bg-blue-300 rounded-full"></span>
            )}
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
