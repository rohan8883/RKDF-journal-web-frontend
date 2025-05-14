"use client"

import { MessageCircle, ChevronUp, ChevronDown } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { MessageItem } from "./MessageItem"

interface ReviewerMessagesSectionProps {
  messages: any[]
  loading: boolean
  expanded: boolean
  onToggle: () => void
  authorName?: string
}

export const ReviewerMessagesSection = ({
  messages,
  loading,
  expanded,
  onToggle,
  authorName,
}: ReviewerMessagesSectionProps) => (
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
)
