import { useState } from "react";
import { useParams } from "react-router-dom";
import { useApi } from "@/hooks/useCustomQuery";
import { rkdfApi } from "@/lib";
import { 
  Book, 
  FileText, 
  Calendar, 
  Tag, 
  BookOpen, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  FileSymlink,
  Download,
  MessageCircle,
  User,
  CornerUpRight,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge"; 
import { format } from "date-fns";

// Updated status mapping
const statusConfig = {
  "submitted": { color: "bg-blue-100 text-blue-800", icon: <FileText className="h-4 w-4" /> },
  "pending": { color: "bg-yellow-100 text-yellow-800", icon: <Clock className="h-4 w-4" /> },
  "under_review": { color: "bg-blue-100 text-blue-800", icon: <AlertCircle className="h-4 w-4" /> },
  "accepted": { color: "bg-green-100 text-green-800", icon: <CheckCircle className="h-4 w-4" /> },
  "rejected": { color: "bg-red-100 text-red-800", icon: <XCircle className="h-4 w-4" /> },
  "revisions_required": { color: "bg-purple-100 text-purple-800", icon: <FileText className="h-4 w-4" /> }
};

export default function SubmissionDetailsView() {
  const [messagesExpanded, setMessagesExpanded] = useState(true);
  const { submissionId } = useParams<{ submissionId: string }>();
  
  const { data, isLoading } = useApi<any>({
    api: `${rkdfApi?.getSubmissionsById}/${submissionId}`,
    options: {
      enabled: !!submissionId,
    },
  });

  // Get reviewer messages for this submission
  const { data: messagesData, isLoading: messagesLoading } = useApi<any>({
    api: `${rkdfApi?.getReviewerMessages}?submissionId=${submissionId}`,
    options: {
      enabled: !!submissionId,
    },
  });

  const submissionData = data?.data;
  const reviewerMessages = messagesData?.data?.docs || [];

  // Function to format date
  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    try {
      return format(new Date(dateString), "MMM dd, yyyy");
    } catch (e) {
      return "Invalid date";
    }
  };

  // Function to download a file
  const handleFileDownload = (fileUrl?: string, fileName?: string) => {
    if (!fileUrl) return;
    
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName || "download";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return (
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
  }

  // Get status config or default
  const getStatusDisplay = (status?: string) => {
    const defaultConfig = { color: "bg-gray-100 text-gray-800", icon: <AlertCircle className="h-4 w-4" /> };
    return status ? statusConfig[status as keyof typeof statusConfig] || defaultConfig : defaultConfig;
  };

  const statusDisplay = getStatusDisplay(submissionData?.status);

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-md">
      <div className="p-6">
        {/* Header with Title and Status */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-2 md:mb-0">{submissionData?.title}</h1>
          <Badge className={`${statusDisplay?.color} flex items-center gap-1 px-3 py-1 text-sm font-medium`}>
            {statusDisplay?.icon}
            {submissionData?.status?.replace("_", " ").toUpperCase()}
          </Badge>
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
                {submissionData?.keywords && submissionData?.keywords.length > 0 && (
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

            {/* Reviewer Messages Card */}
            <div className="bg-white rounded-lg shadow-sm p-5">
              <div 
                className="flex justify-between items-center cursor-pointer mb-2"
                onClick={() => setMessagesExpanded(!messagesExpanded)}
              >
                <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                  <MessageCircle className="h-5 w-5 mr-2 text-blue-600" />
                  Reviewer Messages ({reviewerMessages?.length || 0})
                </h2>
                {messagesExpanded ? 
                  <ChevronUp className="h-5 w-5 text-gray-500" /> : 
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                }
              </div>
              
              {messagesExpanded && (
                <div className="space-y-4 mt-2">
                  {messagesLoading ? (
                    <div className="space-y-4">
                      <Skeleton className="h-24 w-full" />
                      <Skeleton className="h-24 w-full" />
                    </div>
                  ) : reviewerMessages?.length > 0 ? (
                    reviewerMessages.map((message: any, index: number) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4">
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
                                <p className="text-xs text-gray-500">{formatDate(message?.createdAt)}</p>
                              </div>
                              <Badge className="bg-blue-100 text-blue-800 border-none">
                                {message?.messageType || "Comment"}
                              </Badge>
                            </div>
                            <p className="text-gray-700 whitespace-pre-line">{message?.content}</p>
                            
                            {/* If there's a response to this message */}
                            {message?.response && (
                              <div className="mt-3 ml-4 pl-3 border-l-2 border-gray-200">
                                <div className="flex items-start">
                                  <CornerUpRight className="h-4 w-4 text-gray-400 mr-2 mt-1" />
                                  <div>
                                    <p className="text-xs text-gray-500 mb-1">
                                      Response from {submissionData?.submittedBy?.fullName || "Author"} · {formatDate(message?.responseDate)}
                                    </p>
                                    <p className="text-gray-700">{message?.response}</p>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
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
          </div>
          
          {/* Right Column - Files & Meta Info */}
          <div className="space-y-6">
            {/* Author Info */}
            <div className="bg-white rounded-lg shadow-sm p-5">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <User className="h-5 w-5 mr-2 text-blue-600" />
                Author Information
              </h2>
              
              <div className="space-y-3">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Name</h3>
                  <p className="text-gray-800">
                    {submissionData?.submittedBy?.fullName || "Author information not available"}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Email</h3>
                  <p className="text-gray-800">
                    {submissionData?.submittedBy?.email || "Email not available"}
                  </p>
                </div>
                
                {submissionData?.submittedBy?.affiliation && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Affiliation</h3>
                    <p className="text-gray-800">{submissionData?.submittedBy?.affiliation}</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Files Card */}
            <div className="bg-white rounded-lg shadow-sm p-5">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <FileText className="h-5 w-5 mr-2 text-blue-600" />
                Files
              </h2>
              
              <div className="space-y-4">
                {/* Manuscript File */}
                {submissionData?.fullManuscriptUrl && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <div className="bg-blue-100 rounded-full p-2">
                          <FileText className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800">Manuscript</h3>
                          <p className="text-xs text-gray-500">
                            {submissionData?.manuscriptFile || "manuscript.pdf"}
                          </p>
                        </div>
                      </div>
                      
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleFileDownload(
                          submissionData?.fullManuscriptUrl,
                          submissionData?.manuscriptFile || "manuscript.pdf"
                        )}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
                
                {/* No files case */}
                {!submissionData?.fullManuscriptUrl && (
                  <div className="text-center py-4 text-gray-500">
                    <p>No files available</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Review Status Timeline */}
            <div className="bg-white rounded-lg shadow-sm p-5">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Clock className="h-5 w-5 mr-2 text-blue-600" />
                Review Timeline
              </h2>
              
              <div className="space-y-4">
                {submissionData?.reviewerAssignments && submissionData?.reviewerAssignments?.length > 0 ? (
                  <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-0 before:h-full before:w-0.5 before:bg-gray-200">
                    {submissionData?.reviewerAssignments?.map((assignment: any, index: number) => (
                      <div key={index} className="relative">
                        <div className="absolute -left-6 mt-1.5 h-3 w-3 rounded-full border-2 border-white bg-blue-500"></div>
                        <div>
                          <span className="text-xs font-medium text-blue-600">
                            {formatDate(assignment?.assignedDate)}
                          </span>
                          <h3 className="text-sm font-medium text-gray-800">
                            {assignment?.status?.replace("_", " ").toUpperCase() || "ASSIGNED"}
                          </h3>
                          {assignment?.reviewerId?.fullName && (
                            <p className="text-xs text-gray-500 mt-1">
                              Reviewer: {assignment?.reviewerId?.fullName}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  // Default timeline items if no history
                  <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-0 before:h-full before:w-0.5 before:bg-gray-200">
                    <div className="relative">
                      <div className="absolute -left-6 mt-1.5 h-3 w-3 rounded-full border-2 border-white bg-blue-500"></div>
                      <div>
                        <span className="text-xs font-medium text-blue-600">
                          {formatDate(submissionData?.submissionDate || submissionData?.createdAt)}
                        </span>
                        <h3 className="text-sm font-medium text-gray-800">SUBMISSION RECEIVED</h3>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <div className="absolute -left-6 mt-1.5 h-3 w-3 rounded-full border-2 border-white bg-blue-500"></div>
                      <div>
                        <span className="text-xs font-medium text-blue-600">
                          {formatDate(submissionData?.updatedAt)}
                        </span>
                        <h3 className="text-sm font-medium text-gray-800">
                          {submissionData?.status?.replace("_", " ").toUpperCase() || "SUBMITTED"}
                        </h3>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}