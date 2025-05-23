import { Calendar, FileText, User } from 'lucide-react';
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

interface Contributor {
  _id: string;
  fullName: string;
  email: string;
  affiliation: string;
  bioStatement: string;
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
  contributors: Contributor[];
  hasContributors: boolean;
  references: string;
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
  const contributors = articleData.submissionId.contributors || [];
  const references = articleData.submissionId.references
    ? articleData.submissionId.references.split('\n').filter(ref => ref.trim() !== '')
    : [];

  // Format dates
  const publicationDate = articleData.publicationDate
    ? format(new Date(articleData.publicationDate), 'MMM d, yyyy')
    : 'Not specified';

  const issueYear = issueData.publicationDate
    ? format(new Date(issueData.publicationDate), 'yyyy')
    : 'Not specified';

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

                {/* Author and Contributors Section */}
                {(authorInfo || contributors.length > 0) && (
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Authors & Contributors:</h3>
                    <div className="space-y-4">
                      {/* Primary Author */}
                      {authorInfo && (
                        <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                          <div className="bg-teal-100 p-3 rounded-full">
                            <User className="h-5 w-5 text-teal-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800">{authorInfo.name} (Author)</h4>
                            <p className="text-sm text-gray-600">{authorInfo.affiliation}</p>
                          </div>
                        </div>
                      )}
                      {/* Contributors */}
                      {contributors.length > 0 && (
                        <div className="space-y-4">
                          {contributors.map((contributor, index) => (
                            <div key={contributor._id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                              <div className="bg-teal-100 p-3 rounded-full">
                                <User className="h-5 w-5 text-teal-600" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-800">{contributor.fullName} (Contributor)</h4>
                                <p className="text-sm text-gray-600">{contributor.affiliation}</p>
                                {/* {contributor.email && (
                                  <p className="text-sm text-gray-600">Email: {contributor.email}</p>
                                )}
                                {contributor.bioStatement && (
                                  <p className="text-sm text-gray-600">Bio: {contributor.bioStatement}</p>
                                )} */}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
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

              {/* References Section */}
              {references.length > 0 && (
                <section className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="bg-gradient-to-r from-teal-600 to-teal-500 text-white p-4 flex items-center gap-3">
                    <FileText className="h-6 w-6" />
                    <h2 className="text-xl font-semibold">References</h2>
                  </div>
                  <div className="p-6">
                    <ol className="list-decimal list-inside space-y-2">
                      {references.map((ref, index) => (
                        <li key={index} className="text-gray-700">{ref}</li>
                      ))}
                    </ol>
                  </div>
                </section>
              )}
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
                <div className="bg-white rounded-lg shadow-md overflow-hidden border border-teal-100">
                  <div className="bg-gradient-to-r from-teal-600 to-teal-500 text-white p-4 flex items-center gap-3">
                    <FileText className="h-5 w-5" />
                    <h3 className="text-lg font-semibold">Download Article</h3>
                  </div>
                  <div className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-teal-50 p-4 rounded-full mb-4">
                        <FileText className="h-8 w-8 text-teal-600" />
                      </div>
                      <h4 className="text-lg font-medium text-gray-800 mb-2">Full Text PDF</h4>
                      <p className="text-sm text-gray-600 mb-4">Download the complete article in PDF format</p>
                      <a
                        href={articleData.manuscriptFile}
                        download
                        className="w-full flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white py-3 px-6 rounded-lg font-medium transition-colors shadow-md hover:shadow-lg"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FileText className="h-5 w-5" />
                        Download Now
                      </a>
                      <p className="text-xs text-gray-500 mt-3 flex items-center">
                        <span className="inline-flex items-center">
                          <svg className="h-3 w-3 text-teal-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Available under Creative Commons License
                        </span>
                      </p>
                    </div>
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