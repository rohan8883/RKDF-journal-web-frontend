import { Calendar, BookOpen, FileText, User, Link as LinkIcon } from 'lucide-react'
import Page from '@/components/helmet-page' 
import SideContent from '../sideContent';

export default function ArticlePage() {
  const articleData = {
    title: "AN INVESTIGATION ON CONTRIBUTION OF MATHEMATICIANS IN DEVELOPMENT OF MATHEMATICS",
    publishedDate: "Dec 30, 2024",
    doi: "https://doi.org/10.59364/ijhesm.v5i2.266",
    keywords: ["Contribution of Mathematics", "Development of mathematics", "Great mathematicians", "Ancient Indian mathematicians"],
    author: "Nupur Sinha",
    affiliation: "RKDF University, Ranchi",
    abstract: `Mathematics is an international subject, and it has no geographical boundary for its development...`, 
    metrics: {
      pdfViews: 12,
      timeline: ["Jan 2025", "Jul 2025", "Jan 2026"],
      impactFactor: 4.0,
      frequency: "monthly"
    },
    issue: "Vol. 5 No. 2 (2024): IJHESM",
    section: "Articles",
    license: "Creative Commons Attribution-NonCommercial 4.0 International License",
    references: [
      "Bag, A.K. (1979) Mathematics in ancient and medieval India, Chaukhambha Orientalia, Varanasi.",
      "Balachandra Rao, S. (1994) Indian mathematics and astronomy, Jnana Deepa Publications, Bangalore.",
      // ... other references
    ]
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
            {/* Main Content - Takes 2/3 on desktop */}
            <div className="lg:col-span-2 space-y-8">
              {/* Article Header Section */}
              <section className="bg-white rounded-lg shadow-md p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">{articleData.title}</h1>
                
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Published: {articleData.publishedDate}
                  </span>
                  <span className="flex items-center gap-1">
                    <LinkIcon className="h-4 w-4" />
                    DOI: <a href={articleData.doi} className="text-teal-600 hover:underline" target="_blank" rel="noopener noreferrer">
                      {articleData.doi.split('//')[1]}
                    </a>
                  </span>
                </div>

                {/* Keywords */}
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

                {/* Author Info */}
                <div className="flex items-start gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="bg-teal-100 p-3 rounded-full">
                    <User className="h-5 w-5 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{articleData.author}</h3>
                    <p className="text-sm text-gray-600">{articleData.affiliation}</p>
                  </div>
                </div>
              </section>

              {/* Abstract Section */}
              <section className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-teal-600 to-teal-500 text-white p-4 flex items-center gap-3">
                  <FileText className="h-6 w-6" />
                  <h2 className="text-xl font-semibold">Abstract</h2>
                </div>
                <div className="p-6">
                  <p className="text-gray-700 whitespace-pre-line">{articleData.abstract}</p>
                </div>
              </section>

              {/* Metrics Section */}
              <section className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-teal-600 to-teal-500 text-white p-4 flex items-center gap-3">
                  <BookOpen className="h-6 w-6" />
                  <h2 className="text-xl font-semibold">Article Metrics</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6">
                  <div className="bg-teal-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-teal-700">{articleData.metrics.pdfViews}</div>
                    <div className="text-sm text-gray-600">PDF Views</div>
                  </div>
                  <div className="bg-teal-50 p-4 rounded-lg">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Timeline</h3>
                    <ul className="space-y-1">
                      {articleData.metrics.timeline.map((time, index) => (
                        <li key={index} className="text-sm text-gray-600">{time}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-teal-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-teal-700">{articleData.metrics.impactFactor}</div>
                    <div className="text-sm text-gray-600">Impact Factor</div>
                  </div>
                  <div className="bg-teal-50 p-4 rounded-lg text-center">
                    <div className="text-xl font-bold text-teal-700 capitalize">{articleData.metrics.frequency}</div>
                    <div className="text-sm text-gray-600">Frequency</div>
                  </div>
                </div>
              </section>

              {/* References Section */}
              <section className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-teal-600 to-teal-500 text-white p-4 flex items-center gap-3">
                  <FileText className="h-6 w-6" />
                  <h2 className="text-xl font-semibold">References</h2>
                </div>
                <div className="p-6">
                  <ol className="list-decimal list-inside space-y-2">
                    {articleData.references.map((ref, index) => (
                      <li key={index} className="text-gray-700">{ref}</li>
                    ))}
                  </ol>
                </div>
              </section>
            </div>
            
            {/* Sidebar - Takes 1/3 on desktop */}
            <div className="space-y-6">
              {/* Article Details */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="bg-gradient-to-r from-teal-600 to-teal-500 text-white p-4 -m-6 mb-4 rounded-t-lg">
                  <h3 className="text-lg font-semibold">Article Details</h3>
                </div>
                <div className="space-y-3 mt-2">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Issue</h4>
                    <p className="text-gray-700">{articleData.issue}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Section</h4>
                    <p className="text-gray-700">{articleData.section}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">License</h4>
                    <p className="text-gray-700">{articleData.license}</p>
                  </div>
                </div>
              </div>

              {/* Download Button */}
              <div className="bg-teal-50 rounded-lg shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-teal-600 to-teal-500 text-white p-4 -m-0 mb-4">
                  <h3 className="text-lg font-semibold">Download</h3>
                </div>
                <div className="p-4 pt-0 text-center">
                  <button className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                    Download PDF
                  </button>
                  <p className="text-xs text-gray-500 mt-2">Available under {articleData.license}</p>
                </div>
              </div>

              {/* Additional sidebar content can go here */}
              <SideContent />
            </div>
          </div>
        </main>
      </div>
    </Page>
  )
}