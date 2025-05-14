export interface User {
  _id: string
  fullName: string
  familyName?: string
  userName: string
  affiliation?: string
  roleId: string
  mobile: string
  email: string
  status: number
  imageUrl?: string
}

export interface Journal {
  _id: string
  title: string
  description: string
  issn: string
  publisher: string
  foundedYear: number
  website: string
  coverImage: string
  status: number
}

export interface ReviewerAssignment {
  reviewer: User
  comment: string
  commentedAt: string | null
  _id: string
}

export interface SubmissionData {
  _id: string
  title: string
  abstract: string
  keywords: string[]
  submittedBy: User
  journalId: Journal
  status: string
  manuscriptFile: string
  fullManuscriptUrl: string
  submissionDate: string
  createdAt: string
  updatedAt?: string
  reviewerAssignments?: ReviewerAssignment[]
  currentReviewRound?: {
    _id: string
  }
}
