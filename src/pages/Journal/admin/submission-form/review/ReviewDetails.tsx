"use client"

import type React from "react"

import { useState } from "react"
import { usePostMutation, usePutMutation } from "@/hooks/useCustomQuery"
import { rkdfApi } from "@/lib"
import { User, Calendar, Edit, CheckCircle, XCircle, AlertCircle, Clock, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import toast from "react-hot-toast"

interface ReviewDetailsProps {
    review: any
    onBack: () => void
    isAdmin: boolean
}

export const ReviewDetails = ({ review, onBack, isAdmin }: ReviewDetailsProps) => {
    const [showEditModal, setShowEditModal] = useState(false)
    const [status, setStatus] = useState(review.status)
    const [recommendation, setRecommendation] = useState(review.recommendation || "")
    const [comments, setComments] = useState(review.comments || "")
    const [confidentialComments, setConfidentialComments] = useState(review.confidentialComments || "")
    const postMutation = usePostMutation({})
    const putMutation = usePutMutation({});
    const handleOpenEditModal = () => {
        setShowEditModal(true)
    }



    const handleUpdateReview = async () => {
        try {
            const res = await putMutation.mutateAsync({
                api: `${rkdfApi.updateReview}/${review._id}`,
                data: {
                    //   reviewId: review._id,
                    status,
                    recommendation,
                    comments: comments.trim() || undefined,
                    confidentialComments: confidentialComments.trim() || undefined,
                },
            });

            if (res.data?.success) {
                toast.success("Review updated successfully")
                setShowEditModal(false)
                onBack() // Go back to refresh the list
            } else {
                toast.error(res.data?.message || "Failed to update review")
            }
        } catch (error) {
            console.error("Error updating review:", error)
            toast.error("Something went wrong while updating the review")
        }
    }

    const getStatusBadge = (status: string) => {
        const statusConfig: Record<string, { color: string; icon: React.ReactNode }> = {
            pending: { color: "bg-yellow-100 text-yellow-800", icon: <Clock className="h-4 w-4" /> },
            completed: { color: "bg-green-100 text-green-800", icon: <CheckCircle className="h-4 w-4" /> },
            declined: { color: "bg-red-100 text-red-800", icon: <XCircle className="h-4 w-4" /> },
            overdue: { color: "bg-orange-100 text-orange-800", icon: <AlertCircle className="h-4 w-4" /> },
        }

        const config = statusConfig[status] || {
            color: "bg-gray-100 text-gray-800",
            icon: <AlertCircle className="h-4 w-4" />,
        }

        return (
            <Badge className={`${config.color} flex items-center gap-1 px-3 py-1`}>
                {config.icon}
                {status}
            </Badge>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <Button variant="outline" onClick={onBack}>
                    Back to Reviews
                </Button>
                {isAdmin && (
                    <Button onClick={handleOpenEditModal}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Review
                    </Button>
                )}
            </div>

            <div className="bg-white rounded-lg shadow-sm p-5">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                    <div className="flex items-center">
                        <User className="h-5 w-5 mr-2 text-blue-600" />
                        <h2 className="text-xl font-semibold text-gray-800">Review by {review.reviewerId.fullName}</h2>
                    </div>
                    {getStatusBadge(review.status)}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-1 flex items-center">
                            <Calendar className="h-4 w-4 mr-1 text-blue-600" />
                            Assigned Date
                        </h3>
                        <p className="text-gray-800">{format(new Date(review.createdAt), "MMM dd, yyyy")}</p>
                    </div>

                    {review.submissionDate && (
                        <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-1 flex items-center">
                                <Calendar className="h-4 w-4 mr-1 text-blue-600" />
                                Submission Date
                            </h3>
                            <p className="text-gray-800">{format(new Date(review.submissionDate), "MMM dd, yyyy")}</p>
                        </div>
                    )}

                    {review.dueDate && (
                        <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-1 flex items-center">
                                <Calendar className="h-4 w-4 mr-1 text-blue-600" />
                                Due Date
                            </h3>
                            <p className="text-gray-800">{format(new Date(review.dueDate), "MMM dd, yyyy")}</p>
                        </div>
                    )}
                </div>

                {review.recommendation && (
                    <div className="mb-4">
                        <h3 className="text-sm font-medium text-gray-500 mb-1">Recommendation</h3>
                        <p className="text-gray-800 font-medium">{review.recommendation.replace("_", " ")}</p>
                    </div>
                )}

                {review.comments && (
                    <div className="mb-4">
                        <h3 className="text-sm font-medium text-gray-500 mb-1">Comments to Author</h3>
                        <div className="bg-gray-50 p-3 rounded-md whitespace-pre-line">{review.comments}</div>
                    </div>
                )}

                {isAdmin && review.confidentialComments && (
                    <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-1">Confidential Comments to Editor</h3>
                        <div className="bg-gray-50 p-3 rounded-md whitespace-pre-line border-l-4 border-blue-400">
                            {review.confidentialComments}
                        </div>
                    </div>
                )}
            </div>

            {/* Edit Modal */}
            <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Review</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4 mt-2">
                        <div>
                            <Label>Status</Label>
                            <Select value={status} onValueChange={setStatus}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="completed">Completed</SelectItem>
                                    <SelectItem value="declined">Declined</SelectItem>
                                    <SelectItem value="overdue">Overdue</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label>Recommendation</Label>
                            <Select value={recommendation} onValueChange={setRecommendation}>
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
                                placeholder="Enter comments for the author"
                                rows={4}
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

                        <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={() => setShowEditModal(false)}>
                                Cancel
                            </Button>
                            <Button onClick={handleUpdateReview} disabled={postMutation.isPending}>
                                {postMutation.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                                Update
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
