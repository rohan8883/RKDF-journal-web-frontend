"use client"

import { FileText, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BASE_URI } from "@/lib"

interface FilesSectionProps {
  manuscriptUrl?: string
  manuscriptFile?: string
}

export const FilesSection = ({ manuscriptUrl, manuscriptFile }: FilesSectionProps) => {
  // Function to open the file in a new tab
  const openInNewTab = (url: string) => {
    window.open(url, "_blank")
  }

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

              <Button variant="ghost" size="sm" onClick={() => openInNewTab(`${BASE_URI}/${manuscriptFile}`)}>
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
  )
}
