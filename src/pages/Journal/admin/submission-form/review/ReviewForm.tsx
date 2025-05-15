"use client"

import type React from "react"

import { useState } from "react"
import { usePostMutation } from "@/hooks/useCustomQuery"
import { rkdfApi } from "@/lib"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import toast from "react-hot-toast"

interface ReviewFormProps {
  reviewRoundId: string
  submissionId: string
  onSuccess: () => void
  onCancel: () => void
}

export const ReviewForm = ({ reviewRoundId, submissionId, onSuccess, onCancel }: ReviewFormProps) => {
  const [recommendation, setRecommendation] = useState("")
  const [comments, setComments] = useState("")
  const [confidentialComments, setConfidentialComments] = useState("")
  const postMutation = usePostMutation({})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!recommendation) {
      toast.error("Please select a recommendation")
      return
    }

    try {
      const res = await postMutation.mutateAsync({
        api: rkdfApi.createReview,
        data: {
          reviewRoundId,
          submissionId,
          recommendation,
          comments: comments.trim() || undefined,
          confidentialComments: confidentialComments.trim() || undefined,
          submissionDate: new Date().toISOString(),
          status: "completed",
        },
      })

      if (res.data?.success) {
        toast.success("Review submitted successfully")
        onSuccess()
      } else {
        toast.error(res.data?.message || "Failed to submit review")
      }
    } catch (error) {
      console.error("Error submitting review:", error)
      toast.error("Something went wrong while submitting the review")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="recommendation">Recommendation</Label>
        <Select value={recommendation} onValueChange={setRecommendation}>
          <SelectTrigger id="recommendation">
            <SelectValue placeholder="Select your recommendation" />
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
        <Label htmlFor="comments">Comments to Author</Label>
        <Textarea
          id="comments"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          placeholder="Enter your comments for the author"
          rows={5}
        />
      </div>

      <div>
        <Label htmlFor="confidentialComments">Confidential Comments to Editor</Label>
        <Textarea
          id="confidentialComments"
          value={confidentialComments}
          onChange={(e) => setConfidentialComments(e.target.value)}
          placeholder="Enter confidential comments for the editor (not visible to the author)"
          rows={3}
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={postMutation?.isPending }>
          {postMutation?.isPending  && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
          Submit Review
        </Button>
      </div>
    </form>
  )
}
