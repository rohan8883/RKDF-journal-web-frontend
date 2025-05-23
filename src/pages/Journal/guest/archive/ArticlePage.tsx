import { Calendar, BookOpen, FileText, User } from 'lucide-react';
import Page from '@/components/helmet-page';
import SideContent from '../sideContent';
import { useApi } from '@/hooks/useCustomQuery';
import { rkdfApi } from '@/lib';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';

interface Author {
  _id: string;
  fullName: string;
  familyName: string;
  userName: string;
  affiliation: string;
}

interface Journal {
  _id: string;
  title: string;
  description: string;
  issn: string;
  publisher: string;
  foundedYear: number;
  website: string;
  coverImage: string;
  status: number;
}

interface Issue {
  _id: string;
  journalId: Journal;
  volume: number;
  issueNumber: number;
  title: string;
  publicationDate: string;
  description: string;
  status: number;
}

interface Submission {
  _id: string;
  submittedBy: Author | string;
  // ... other submission fields
}

interface ArticleData {
  _id: string;
  title: string;
  abstract: string;
  keywords: string[];
  issueId: Issue;
  submissionId: Submission;
  pages: string;
  publicationDate: string;
  manuscriptFile: string;
  status: number;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: ArticleData;
}

export default function ArticlePage() {
  const { id } = useParams<{ id: string }>();
  const { data, isFetching } = useApi<ApiResponse>({
    api: `${rkdfApi.getAllGuestPublicationById}/${id}`,
    options: {
      enabled: !!id,
    },
  });

  if (isFetching) {
    return (
      <Page title="Loading...">
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading article...</p>
          </div>
        </div>
      </Page>
    );
  }

  if (!data?.data) {
    return (
      <Page title="Article Not Found">
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Article Not Found</h1>
            <p className="text-gray-600">The requested article could not be loaded.</p>
          </div>
        </div>
      </Page>
    );
  }

  const articleData = data.data;
  const journalData = articleData.issueId.journalId;
  const issueData = articleData.issueId;
  
  // Get author information
  const getAuthorInfo = () => {
    const submission = articleData.submissionId;
    if (!submission) return null;
    
    if (typeof submission.submittedBy === 'string') {
      return {
        name: 'Unknown Author',
        affiliation: journalData.publisher
      };
    }
    
    return {
      name: submission.submittedBy.fullName || 
           `${submission.submittedBy.userName}` || 
           'Unknown Author',
      affiliation: submission.submittedBy.affiliation || journalData.publisher
    };
  };

  const authorInfo = getAuthorInfo();

  // Format dates
  const publicationDate = articleData.publicationDate 
    ? format(new Date(articleData.publicationDate), 'MMM d, yyyy') 
    : 'Not specified';
    
  const issueYear = issueData.publicationDate 
    ? format(new Date(issueData.publicationDate), 'yyyy') 
    : 'Not specified';

  // Metrics data
  const metrics = {
    pdfViews: 12,
    timeline: [
      format(new Date(), 'MMM yyyy'),
      format(new Date(new Date().setMonth(new Date().getMonth() + 6)), 'MMM yyyy'),
      format(new Date(new Date().setFullYear(new Date().getFullYear() + 1)), 'MMM yyyy')
    ],
    impactFactor: 4.0,
    frequency: "monthly"
  };

  return (
    <Page title={articleData.title}>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        {/* Header */}
        <div className="bg-teal-700 text-white py-8 shadow-md">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center gap-3 mb-2">
              <FileText className="h-8 w-8" />
              <h1 className="text-3xl font-bold text-center">Journal Article</h1>
            </div>
            <p className="text-center text-teal-100 max-w-3xl mx-auto">
              Detailed view of published research article
            </p>
          </div>
        </div>

        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Article Header Section */}
              <section className="bg-white rounded-lg shadow-md p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">{articleData.title}</h1>
                
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Published: {publicationDate}
                  </span>
                  {articleData.pages && (
                    <span className="flex items-center gap-1">
                      <FileText className="h-4 w-4" />
                      Pages: {articleData.pages}
                    </span>
                  )}
                </div>

                {articleData.keywords?.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Keywords:</h3>
                    <div className="flex flex-wrap gap-2">
                      {articleData.keywords.map((keyword, index) => (
                        <span key={index} className="bg-teal-100 text-teal-800 text-xs px-3 py-1 rounded-full">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {authorInfo && (
                  <div className="flex items-start gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                    <div className="bg-teal-100 p-3 rounded-full">
                      <User className="h-5 w-5 text-teal-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{authorInfo.name}</h3>
                      <p className="text-sm text-gray-600">{authorInfo.affiliation}</p>
                    </div>
                  </div>
                )}
              </section>

              {articleData.abstract && (
                <section className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="bg-gradient-to-r from-teal-600 to-teal-500 text-white p-4 flex items-center gap-3">
                    <FileText className="h-6 w-6" />
                    <h2 className="text-xl font-semibold">Abstract</h2>
                  </div>
                  <div className="p-6">
                    <div 
                      className="text-gray-700 prose" 
                      dangerouslySetInnerHTML={{ __html: articleData.abstract }} 
                    />
                  </div>
                </section>
              )}

              <section className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-teal-600 to-teal-500 text-white p-4 flex items-center gap-3">
                  <BookOpen className="h-6 w-6" />
                  <h2 className="text-xl font-semibold">Article Metrics</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6">
                  <div className="bg-teal-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-teal-700">{metrics.pdfViews}</div>
                    <div className="text-sm text-gray-600">PDF Views</div>
                  </div>
                  <div className="bg-teal-50 p-4 rounded-lg">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Timeline</h3>
                    <ul className="space-y-1">
                      {metrics.timeline.map((time, index) => (
                        <li key={index} className="text-sm text-gray-600">{time}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-teal-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-teal-700">{metrics.impactFactor}</div>
                    <div className="text-sm text-gray-600">Impact Factor</div>
                  </div>
                  <div className="bg-teal-50 p-4 rounded-lg text-center">
                    <div className="text-xl font-bold text-teal-700 capitalize">{metrics.frequency}</div>
                    <div className="text-sm text-gray-600">Frequency</div>
                  </div>
                </div>
              </section>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="bg-gradient-to-r from-teal-600 to-teal-500 text-white p-4 -m-6 mb-4 rounded-t-lg">
                  <h3 className="text-lg font-semibold">Article Details</h3>
                </div>
                <div className="space-y-3 mt-2">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Journal</h4>
                    <p className="text-gray-700">{journalData.title}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Issue</h4>
                    <p className="text-gray-700">
                      Vol. {issueData.volume} No. {issueData.issueNumber} ({issueYear})
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">ISSN</h4>
                    <p className="text-gray-700">{journalData.issn}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Publisher</h4>
                    <p className="text-gray-700">{journalData.publisher}</p>
                  </div>
                </div>
              </div>

              {articleData.manuscriptFile && (
                <div className="bg-teal-50 rounded-lg shadow-md overflow-hidden">
                  <div className="bg-gradient-to-r from-teal-600 to-teal-500 text-white p-4 -m-0 mb-4">
                    <h3 className="text-lg font-semibold">Download</h3>
                  </div>
                  <div className="p-4 pt-0 text-center">
                    <a 
                      href={articleData.manuscriptFile} 
                      download
                      className="block w-full bg-teal-600 hover:bg-teal-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download PDF
                    </a>
                    <p className="text-xs text-gray-500 mt-2">Available under Creative Commons License</p>
                  </div>
                </div>
              )}

              <SideContent />
            </div>
          </div>
        </main>
      </div>
    </Page>
  );
}