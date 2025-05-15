"use client"

import type React from "react"

import { useState } from "react"
import { usePostMutation } from "@/hooks/useCustomQuery"
import { rkdfApi } from "@/lib"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import toast from "react-hot-toast"

interface ReviewRoundFormProps {
  submissionId: string
  onSuccess: () => void
  onCancel: () => void
  nextRoundNumber: number
}

export const ReviewRoundForm = ({ submissionId, onSuccess, onCancel, nextRoundNumber }: ReviewRoundFormProps) => {
  const [roundNumber, setRoundNumber] = useState(nextRoundNumber)
  const [editorNotes, setEditorNotes] = useState("")
  const postMutation = usePostMutation({})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await postMutation.mutateAsync({
        api: rkdfApi.createReviewRound,
        data: {
          submissionId,
          roundNumber,
          editorNotes: editorNotes.trim() || undefined,
        },
      })

      if (res.data?.success) {
        toast.success("Review round created successfully")
        onSuccess()
      } else {
        toast.error(res.data?.message || "Failed to create review round")
      }
    } catch (error) {
      console.error("Error creating review round:", error)
      toast.error("Something went wrong while creating the review round")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="roundNumber">Round Number</Label>
        <Input
          id="roundNumber"
          type="number"
          value={roundNumber}
          onChange={(e) => setRoundNumber(Number.parseInt(e.target.value))}
          min={1}
          required
        />
      </div>

      <div>
        <Label htmlFor="editorNotes">Editor Notes (Optional)</Label>
        <Textarea
          id="editorNotes"
          value={editorNotes}
          onChange={(e) => setEditorNotes(e.target.value)}
          placeholder="Add any notes for this review round"
          rows={3}
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={postMutation.isPending }>
          {postMutation.isPending  && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
          Create Review Round
        </Button>
      </div>
    </form>
  )
}
