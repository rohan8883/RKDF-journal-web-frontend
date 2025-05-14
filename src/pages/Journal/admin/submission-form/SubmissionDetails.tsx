import { useState } from "react";
import { useParams } from "react-router-dom";
import { useApi, usePostMutation } from "@/hooks/useCustomQuery";
import { rkdfApi } from "@/lib";
import { useAuth } from '@/store/useAuth';
import toast from "react-hot-toast";
import { 
  Book, FileText, Calendar, Tag, BookOpen, Clock, 
  CheckCircle, XCircle, AlertCircle, MessageCircle, User, CornerUpRight,
  ChevronDown, ChevronUp, Users, ClipboardCheck,
  Loader2,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge"; 
import { format } from "date-fns";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const statusConfig = {
  "submitted": { color: "bg-blue-100 text-blue-800", icon: <FileText className="h-4 w-4" /> },
  "pending": { color: "bg-yellow-100 text-yellow-800", icon: <Clock className="h-4 w-4" /> },
  "under_review": { color: "bg-blue-100 text-blue-800", icon: <AlertCircle className="h-4 w-4" /> },
  "accepted": { color: "bg-green-100 text-green-800", icon: <CheckCircle className="h-4 w-4" /> },
  "rejected": { color: "bg-red-100 text-red-800", icon: <XCircle className="h-4 w-4" /> },
  "revisions_required": { color: "bg-purple-100 text-purple-800", icon: <FileText className="h-4 w-4" /> }
};

const LoadingSkeleton = () => (
  <div className="bg-white rounded-lg shadow p-6">
    <div className="space-y-4">
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-4 w-1/4" />
      <Skeleton className="h-24 w-full" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    </div>
  </div>
);

const getStatusDisplay = (status?: string) => {
  const defaultConfig = { color: "bg-gray-100 text-gray-800", icon: <AlertCircle className="h-4 w-4" /> };
  return status ? statusConfig[status as keyof typeof statusConfig] || defaultConfig : defaultConfig;
};

const MessageItem = ({ message, authorName }: { message: any, authorName?: string }) => (
  <div className="bg-gray-50 rounded-lg p-4">
    <div className="flex items-start">
      <div className="bg-blue-100 rounded-full p-2 mr-3">
        <User className="h-5 w-5 text-blue-600" />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-center mb-2">
          <div>
            <h3 className="font-medium text-gray-800">
              {message?.reviewerId?.name || "Anonymous Reviewer"}
            </h3>
            <p className="text-xs text-gray-500">{format(new Date(message?.createdAt), "MMM dd, yyyy")}</p>
          </div>
          <Badge className="bg-blue-100 text-blue-800 border-none">
            {message?.messageType || "Comment"}
          </Badge>
        </div>
        <p className="text-gray-700 whitespace-pre-line">{message?.content}</p>
        
        {message?.response && (
          <div className="mt-3 ml-4 pl-3 border-l-2 border-gray-200">
            <div className="flex items-start">
              <CornerUpRight className="h-4 w-4 text-gray-400 mr-2 mt-1" />
              <div>
                <p className="text-xs text-gray-500 mb-1">
                  Response from {authorName || "Author"} · {format(new Date(message?.responseDate), "MMM dd, yyyy")}
                </p>
                <p className="text-gray-700">{message?.response}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);

const ReviewerMessagesSection = ({ 
  messages, 
  loading, 
  expanded, 
  onToggle, 
  authorName 
}: { 
  messages: any[], 
  loading: boolean, 
  expanded: boolean, 
  onToggle: () => void, 
  authorName?: string 
}) => (
  <div className="bg-white rounded-lg shadow-sm p-5">
    <div className="flex justify-between items-center cursor-pointer mb-2" onClick={onToggle}>
      <h2 className="text-lg font-semibold text-gray-800 flex items-center">
        <MessageCircle className="h-5 w-5 mr-2 text-blue-600" />
        Reviewer Messages ({messages?.length || 0})
      </h2>
      {expanded ? <ChevronUp className="h-5 w-5 text-gray-500" /> : <ChevronDown className="h-5 w-5 text-gray-500" />}
    </div>
    
    {expanded && (
      <div className="space-y-4 mt-2">
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        ) : messages?.length > 0 ? (
          messages.map((message: any, index: number) => (
            <MessageItem key={index} message={message} authorName={authorName} />
          ))
        ) : (
          <div className="text-center py-6 text-gray-500">
            <MessageCircle className="h-8 w-8 mx-auto mb-2 text-gray-400" />
            <p>No reviewer messages yet</p>
          </div>
        )}
      </div>
    )}
  </div>
);

const AuthorInfoSection = ({ author }: { author?: any }) => (
  <div className="bg-white rounded-lg shadow-sm p-5">
    <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
      <User className="h-5 w-5 mr-2 text-blue-600" />
      Author Information
    </h2>
    
    <div className="space-y-3">
      <div>
        <h3 className="text-sm font-medium text-gray-500 mb-1">Name</h3>
        <p className="text-gray-800">{author?.fullName || "Author information not available"}</p>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-500 mb-1">Email</h3>
        <p className="text-gray-800">{author?.email || "Email not available"}</p>
      </div>
      
      {author?.affiliation && (
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">Affiliation</h3>
          <p className="text-gray-800">{author?.affiliation}</p>
        </div>
      )}
    </div>
  </div>
);

const FilesSection = ({ 
  manuscriptUrl, 
  manuscriptFile
}: { 
  manuscriptUrl?: string, 
  manuscriptFile?: string
}) => {
  // Function to open the file in a new tab
  const openInNewTab = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-5">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <FileText className="h-5 w-5 mr-2 text-blue-600" />
        Files
      </h2>
      
      <div className="space-y-4">
        {manuscriptUrl ? (
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 rounded-full p-2">
                  <FileText className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Manuscript</h3>
                  <p className="text-xs text-gray-500">{manuscriptFile || "manuscript.pdf"}</p>
                </div>
              </div>
              
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => openInNewTab(manuscriptUrl)}
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-4 text-gray-500">
            <p>No files available</p>
          </div>
        )}
      </div>
    </div>
  );
}
// Define TypeScript interfaces for the data structure
interface User {
  _id: string;
  fullName: string;
  familyName?: string;
  userName: string;
  affiliation?: string;
  roleId: string;
  mobile: string;
  email: string;
  status: number;
  imageUrl?: string;
}

interface Journal {
  _id: string;
  title: string;
  description: string;
  issn: string;
  publisher: string;
  foundedYear: number;
  website: string;
  coverImage: string;
  status: number;
}

interface ReviewerAssignment {
  reviewer: User;
  comment: string;
  commentedAt: string | null;
  _id: string;
}

interface SubmissionData {
  _id: string;
  title: string;
  abstract: string;
  keywords: string[];
  submittedBy: User;
  journalId: Journal;
  status: string;
  manuscriptFile: string;
  fullManuscriptUrl: string;
  submissionDate: string;
  createdAt: string;
  reviewerAssignments?: ReviewerAssignment[];
}
// Component with proper TypeScript type
const ReviewTimelineSection = ({ 
  submission 
}: { 
  submission: SubmissionData 
}) => {
  // Extract necessary data from submission
  const {
    reviewerAssignments = [],
    submissionDate,
    createdAt,
    status
  } = submission || {};

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
                <p className="text-xs text-gray-500 mt-1">
                  Submitted by: {submission.submittedBy.fullName}
                </p>
              )}
            </div>
          </div>
          
          {/* Show reviewer assignments if available */}
          {reviewerAssignments?.length > 0 && reviewerAssignments.map((assignment, index) => (
            <div key={index} className="relative">
              <div className="absolute -left-6 mt-1.5 h-3 w-3 rounded-full border-2 border-white bg-blue-500"></div>
              <div>
                <span className="text-xs font-medium text-blue-600">
                  {assignment.commentedAt ? format(new Date(assignment.commentedAt), "MMM dd, yyyy") : format(new Date(), "MMM dd, yyyy")}
                </span>
                <h3 className="text-sm font-medium text-gray-800">
                  REVIEWER ASSIGNED
                </h3>
                {assignment.reviewer?.fullName && (
                  <p className="text-xs text-gray-500 mt-1">
                    Reviewer: {assignment.reviewer.fullName}
                  </p>
                )}
                {assignment.comment && (
                  <p className="text-xs text-gray-600 mt-1 italic">
                    "{assignment.comment}"
                  </p>
                )}
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
  );
};

const ReviewerAssignmentModal = ({
  reviewers,
  loading,
  open,
  onClose,
  onAssign
}: {
  reviewers: any[],
  loading: boolean,
  open: boolean,
  onClose: () => void,
  onAssign: (reviewerId: string) => Promise<void>
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
                {reviewers?.map((reviewer) => (
                  <option key={reviewer?._id} value={reviewer?._id}>
                    {reviewer?.fullName} ({reviewer?.email})
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

const ReviewSubmissionForm = ({
  submissionId,
  reviewRoundId,
  onSubmit
}: {
  submissionId: string,
  reviewRoundId: string,
  onSubmit: (data: any) => Promise<void>
}) => {
  const [recommendation, setRecommendation] = useState("");
  const [comments, setComments] = useState("");
  const [confidentialComments, setConfidentialComments] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!recommendation) return;
    
    setIsSubmitting(true);
    try {
      await onSubmit({
        reviewRoundId,
        submissionId,
        recommendation,
        comments,
        confidentialComments
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>Recommendation</Label>
        <Select onValueChange={setRecommendation} value={recommendation}>
          <SelectTrigger>
            <SelectValue placeholder="Select recommendation" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="accept">Accept</SelectItem>
            <SelectItem value="minor_revisions">Minor Revisions</SelectItem>
            <SelectItem value="major_revisions">Major Revisions</SelectItem>
            <SelectItem value="reject">Reject</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Comments to Author</Label>
        <Textarea
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          placeholder="Enter your comments for the author"
          rows={5}
        />
      </div>

      <div>
        <Label>Confidential Comments to Editor</Label>
        <Textarea
          value={confidentialComments}
          onChange={(e) => setConfidentialComments(e.target.value)}
          placeholder="Enter confidential comments for the editor"
          rows={3}
        />
      </div>

      <div className="flex justify-end">
        <Button
          disabled={!recommendation || isSubmitting}
          onClick={handleSubmit}
        >
          {isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          ) : null}
          Submit Review
        </Button>
      </div>
    </div>
  );
};

export default function SubmissionDetailsView() {
   const postMutation = usePostMutation({});
  const { submissionId } = useParams<{ submissionId: string }>(); 
   const { user } = useAuth();
  const [messagesExpanded, setMessagesExpanded] = useState(true);
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  
  // Fetch submission data
  const { data, isLoading } = useApi<any>({
    api: `${rkdfApi?.getSubmissionsById}/${submissionId}`,
    options: {
      enabled: !!submissionId,
    },
  });

  // Fetch reviewer messages
  const { data: messagesData, isLoading: messagesLoading } = useApi<any>({
    api: `${rkdfApi?.getReviewerMessages}?submissionId=${submissionId}`,
    options: {
      enabled: !!submissionId,
    },
  });

  // Fetch available reviewers (for admin)
  const { data: reviewersData, isLoading: reviewersLoading } = useApi<any>({
    api: `${rkdfApi?.getAvailableReviewers}?submissionId=${submissionId}`,
    options: {
      enabled: !!submissionId && user?.role === 'Admin',
    },
  });

  const submissionData = data?.data;
  const reviewerMessages = messagesData?.data?.docs || [];
  const reviewers = reviewersData?.data?.docs || [];

  // Check user roles and assignments
  const isAssignedReviewer =  user?.role === 'Reviewer';
  const isAuthor = submissionData?.submittedBy?._id === user?._id;
  const isAdmin = user?.role === 'Admin';

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    try {
      return format(new Date(dateString), "MMM dd, yyyy");
    } catch (e) {
      return "Invalid date";
    }
  };
 

const handleAssignReviewer = async (reviewerId: string) => {
  try {
    const res = await postMutation.mutateAsync({
      api: rkdfApi.assignReviewer,  
      data: {
        submissionId,
        reviewerId,
      },
    });

    if (res.data?.success) {
      toast.success("Reviewer assigned successfully");
      // Optional: refetch data or reload
      window.location.reload();
    } else {
      toast.error(res.data?.message || "Failed to assign reviewer");
    }
  } catch (error) {
    console.error("Error assigning reviewer:", error);
    toast.error("Something went wrong while assigning reviewer");
  }
};
 
  const handleSubmitReview = async (reviewData: any) => {
  try {
    const res = await postMutation.mutateAsync({
      api: rkdfApi.submitReview,
      data: reviewData,
    });

    if (res.data?.success) {
      toast.success("Review submitted successfully");
      setShowReviewForm(false);
      window.location.reload();
    } else {
      toast.error(res.data?.message || "Failed to submit review");
    }
  } catch (error) {
    console.error("Error submitting review:", error);
    toast.error("Something went wrong while submitting the review");
  }
};


  if (isLoading) {
    return <LoadingSkeleton />;
  }

  const statusDisplay = getStatusDisplay(submissionData?.status);

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-md">
      <div className="p-6">
        {/* Header with Title and Status */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-2 md:mb-0">
            {submissionData?.title}
          </h1>
          <div className="flex items-center gap-2">
            <Badge className={`${statusDisplay?.color} flex items-center gap-1 px-3 py-1 text-sm font-medium`}>
              {statusDisplay?.icon}
              {submissionData?.status?.replace("_", " ").toUpperCase()}
            </Badge>
            
            {isAdmin && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setAssignModalOpen(true)}
              >
                <Users className="h-4 w-4 mr-2" />
                Assign Reviewer
              </Button>
            )}
            
            {isAssignedReviewer && !showReviewForm && (
              <Button 
                variant="default" 
                size="sm"
                onClick={() => setShowReviewForm(true)}
              >
                <ClipboardCheck className="h-4 w-4 mr-2" />
                Submit Review
              </Button>
            )}
          </div>
        </div>
        
        {/* Main Content Grid */}
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
                    <p className="text-gray-800">{formatDate(submissionData?.submissionDate || submissionData?.createdAt)}</p>
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
                  reviewRoundId={submissionData?.currentReviewRound?._id}
                  onSubmit={handleSubmitReview}
                />
              </div>
            )}
          </div>
          
          {/* Right Column - Files & Meta Info */}
          <div className="space-y-6">
            {/* Author Info - Only show to admin and reviewers */}
            {(isAdmin || isAssignedReviewer) && (
              <AuthorInfoSection author={submissionData?.submittedBy} />
            )}
            
            {/* Files Card */}
            <FilesSection 
              manuscriptUrl={submissionData?.fullManuscriptUrl}
              manuscriptFile={submissionData?.manuscriptFile}
              // onDownload={handleFileDownload}
            />
            
            {/* Review Status Timeline */}
           <ReviewTimelineSection submission={submissionData} />
          </div>
        </div>
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
  );
}