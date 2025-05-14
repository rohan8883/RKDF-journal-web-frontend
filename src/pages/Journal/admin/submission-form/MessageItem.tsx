import { User, CornerUpRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"

interface MessageItemProps {
  message: any
  authorName?: string
}

export const MessageItem = ({ message, authorName }: MessageItemProps) => (
  <div className="bg-gray-50 rounded-lg p-4">
    <div className="flex items-start">
      <div className="bg-blue-100 rounded-full p-2 mr-3">
        <User className="h-5 w-5 text-blue-600" />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-center mb-2">
          <div>
            <h3 className="font-medium text-gray-800">{message?.reviewerId?.name || "Anonymous Reviewer"}</h3>
            <p className="text-xs text-gray-500">{format(new Date(message?.createdAt), "MMM dd, yyyy")}</p>
          </div>
          <Badge className="bg-blue-100 text-blue-800 border-none">{message?.messageType || "Comment"}</Badge>
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
)
