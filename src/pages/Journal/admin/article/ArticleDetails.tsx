import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { FileText, Globe, BookOpen, Calendar, Hash, Layers, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { Separator } from "@/components/ui/separator"

interface ArticleDetailProps {
  article: {
    _id: string
    title: string
    abstract: string
    keywords: string[]
    issueId?: string
    issue?: {
      _id: string
      volume: string
      issueNumber: string
      title: string
    }
    journal?: {
      _id: string
      title: string
      issn?: string
      website?: string
    }
    submissionId?: string
    doi?: string
    pages?: string
    publicationDate: string
    fullText: string
  }
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ArticleDetail({ article, open, onOpenChange }: ArticleDetailProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Article Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header Section */}
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">{article.title}</h1>
            
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {format(new Date(article.publicationDate), 'MMMM d, yyyy')}
              </Badge>
              
              {article.doi && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <Hash className="h-3 w-3" />
                  DOI: {article.doi}
                </Badge>
              )}
              
              {article.pages && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <Layers className="h-3 w-3" />
                  Pages: {article.pages}
                </Badge>
              )}
            </div>
          </div>

          <Separator />

          {/* Journal/Issue Info */}
          {article.journal && (
            <div className="space-y-2">
              <h3 className="flex items-center gap-2 font-semibold">
                <BookOpen className="h-4 w-4" />
                Journal Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Journal</p>
                  <p>{article.journal.title || 'N/A'}</p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">ISSN</p>
                  <p>{article.journal.issn || 'N/A'}</p>
                </div>
                
                {article.issue && (
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">Volume/Issue</p>
                    <p>Vol.{article.issue.volume} , No. {article.issue.issueNumber}</p>
                  </div>
                )}
                
                {article.journal.website && (
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">Website</p>
                    <a 
                      href={article.journal.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center gap-1"
                    >
                      <Globe className="h-3 w-3" />
                      Visit Journal
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Abstract */}
          <div className="space-y-2">
            <h3 className="font-semibold">Abstract</h3>
            <p className="text-gray-700 whitespace-pre-line">{article.abstract}</p>
          </div>

          {/* Keywords */}
          {article.keywords?.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-semibold">Keywords</h3>
              <div className="flex flex-wrap gap-2">
                {article.keywords.map((keyword, index) => (
                  <Badge key={index} variant="secondary">{keyword}</Badge>
                ))}
              </div>
            </div>
          )}

          <Separator />

          {/* Full Text */}
          <div className="space-y-2">
            <h3 className="font-semibold">Full Text</h3>
            <div className="prose max-w-none text-gray-700 whitespace-pre-line">
              {article.fullText.startsWith('http') ? (
                <a 
                  href={article.fullText} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Download PDF
                </a>
              ) : (
                article.fullText
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end pt-4">
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="flex items-center gap-2"
            >
              <X className="h-4 w-4" />
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}