import { Clock } from "lucide-react"
import { format } from "date-fns"
import type { SubmissionData } from "./type"

interface ReviewTimelineSectionProps {
  submission: SubmissionData
}

export const ReviewTimelineSection = ({ submission }: ReviewTimelineSectionProps) => {
  // Extract necessary data from submission
  const { reviewerAssignments = [], submissionDate, createdAt, status } = submission || {}

  return (
    <div className="bg-white rounded-lg shadow-sm p-5">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <Clock className="h-5 w-5 mr-2 text-blue-600" />
        Review Timeline
      </h2>

      <div className="space-y-4">
        <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-0 before:h-full before:w-0.5 before:bg-gray-200">
          {/* Always show submission date as first event */}
          <div className="relative">
            <div className="absolute -left-6 mt-1.5 h-3 w-3 rounded-full border-2 border-white bg-blue-500"></div>
            <div>
              <span className="text-xs font-medium text-blue-600">
                {submissionDate ? format(new Date(submissionDate), "MMM dd, yyyy") : ""}
              </span>
              <h3 className="text-sm font-medium text-gray-800">SUBMISSION RECEIVED</h3>
              {submission?.submittedBy?.fullName && (
                <p className="text-xs text-gray-500 mt-1">Submitted by: {submission.submittedBy.fullName}</p>
              )}
            </div>
          </div>

          {/* Show reviewer assignments if available */}
          {reviewerAssignments?.length > 0 &&
            reviewerAssignments.map((assignment, index) => (
              <div key={index} className="relative">
                <div className="absolute -left-6 mt-1.5 h-3 w-3 rounded-full border-2 border-white bg-blue-500"></div>
                <div>
                  <span className="text-xs font-medium text-blue-600">
                    {assignment.commentedAt
                      ? format(new Date(assignment.commentedAt), "MMM dd, yyyy")
                      : format(new Date(), "MMM dd, yyyy")}
                  </span>
                  <h3 className="text-sm font-medium text-gray-800">REVIEWER ASSIGNED</h3>
                  {assignment.reviewer?.fullName && (
                    <p className="text-xs text-gray-500 mt-1">Reviewer: {assignment.reviewer.fullName}</p>
                  )}
                  {assignment.comment && <p className="text-xs text-gray-600 mt-1 italic">"{assignment.comment}"</p>}
                </div>
              </div>
            ))}

          {/* Show current status */}
          <div className="relative">
            <div className="absolute -left-6 mt-1.5 h-3 w-3 rounded-full border-2 border-white bg-blue-500"></div>
            <div>
              <span className="text-xs font-medium text-blue-600">
                {createdAt ? format(new Date(createdAt), "MMM dd, yyyy") : ""}
              </span>
              <h3 className="text-sm font-medium text-gray-800">
                {status ? status.replace(/_/g, " ").toUpperCase() : "SUBMITTED"}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
