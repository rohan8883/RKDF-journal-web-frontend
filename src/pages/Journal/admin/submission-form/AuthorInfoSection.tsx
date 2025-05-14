import { User } from "lucide-react"

interface AuthorInfoSectionProps {
  author?: any
}

export const AuthorInfoSection = ({ author }: AuthorInfoSectionProps) => (
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
)
