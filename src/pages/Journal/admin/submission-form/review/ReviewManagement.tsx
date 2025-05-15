"use client"

import { useState } from "react"
import { ReviewRoundsList } from "./ReviewRoundsList"
import { ReviewRoundDetails } from "./ReviewRoundDetails"

interface ReviewManagementProps {
  submissionId: string
  isAdmin: boolean
}

export const ReviewManagement = ({ submissionId, isAdmin }: ReviewManagementProps) => {
  const [selectedRoundId, setSelectedRoundId] = useState<string | null>(null)

  const handleSelectRound = (roundId: string) => {
    setSelectedRoundId(roundId)
  }

  const handleBackToRounds = () => {
    setSelectedRoundId(null)
  }

  return (
    <div className="mt-6">
      {selectedRoundId ? (
        <ReviewRoundDetails
          roundId={selectedRoundId}
          submissionId={submissionId}
          isAdmin={isAdmin}
          onBack={handleBackToRounds}
        />
      ) : (
        <ReviewRoundsList submissionId={submissionId} isAdmin={isAdmin} onSelectRound={handleSelectRound} />
      )}
    </div>
  )
}
