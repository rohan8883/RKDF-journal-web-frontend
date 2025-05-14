import { FileText, Clock, AlertCircle, CheckCircle, XCircle } from "lucide-react"
import type { ReactNode } from "react"

interface StatusConfigItem {
  color: string
  icon: ReactNode
}

export const statusConfig: Record<string, StatusConfigItem> = {
  submitted: { color: "bg-blue-100 text-blue-800", icon: <FileText className="h-4 w-4" /> },
  pending: { color: "bg-yellow-100 text-yellow-800", icon: <Clock className="h-4 w-4" /> },
  under_review: { color: "bg-blue-100 text-blue-800", icon: <AlertCircle className="h-4 w-4" /> },
  accepted: { color: "bg-green-100 text-green-800", icon: <CheckCircle className="h-4 w-4" /> },
  rejected: { color: "bg-red-100 text-red-800", icon: <XCircle className="h-4 w-4" /> },
  revisions_required: { color: "bg-purple-100 text-purple-800", icon: <FileText className="h-4 w-4" /> },
}

export const getStatusDisplay = (status?: string) => {
  const defaultConfig = { color: "bg-gray-100 text-gray-800", icon: <AlertCircle className="h-4 w-4" /> }
  return status ? statusConfig[status as keyof typeof statusConfig] || defaultConfig : defaultConfig
}
