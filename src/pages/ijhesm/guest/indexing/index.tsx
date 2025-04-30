import { BadgeCheck, Shield, Award, Star, Database } from 'lucide-react'
import Page from '@/components/helmet-page'
import SideContent from '../sideContent'

export default function IndexingCertificates() {
  return (
    <Page title="Indexing Certificates">
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="bg-teal-700 text-white py-8 shadow-md">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Award className="h-8 w-8" />
              <h1 className="text-3xl font-bold text-center">Indexing Certificates</h1>
            </div>
            <p className="text-center text-teal-100 max-w-3xl mx-auto">
              Official recognition of our journal's quality and indexing status
            </p>
          </div>
        </div>

        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content - Takes 2/3 on desktop */}
            <div className="lg:col-span-2 space-y-8">
              {/* SJIF Certificate */}
              <section className="transform transition-all hover:shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-amber-600 to-amber-500 text-white p-5 rounded-t-lg flex items-center gap-3">
                  <Star className="h-6 w-6" />
                  <h2 className="text-xl font-semibold">SJIF Certificate 2021</h2>
                </div>
                <div className="bg-white border-t-0 rounded-b-lg shadow-md p-0">
                  <div className="relative group">
                    <img 
                      src="/1-6309b2ad23a13d852f5bc4e1f312f6df.jpg" 
                      alt="Certificate of Indexing from SJIF with impact factor 5.81"
                      className="w-full h-auto object-contain border-b border-gray-200"
                    />
                    <div className="absolute inset-0 bg-teal-700 bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <a 
                        href="/1-6309b2ad23a13d852f5bc4e1f312f6df.jpg" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-white text-teal-700 px-4 py-2 rounded-md shadow-lg flex items-center gap-2 hover:bg-teal-50 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                        </svg>
                        View Full Certificate
                      </a>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50">
                    <h3 className="font-semibold text-gray-800 mb-2">Scientific Journal Impact Factor (SJIF) 2021</h3>
                    <p className="text-gray-600 text-sm">
                      Impact Factor: <span className="font-bold text-amber-600">5.81</span> | ISSN: 2582-8169
                    </p>
                  </div>
                </div>
              </section>

              {/* ISI Certificate */}
              <section className="transform transition-all hover:shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-5 rounded-t-lg flex items-center gap-3">
                  <Shield className="h-6 w-6" />
                  <h2 className="text-xl font-semibold">ISI Indexing Certificate</h2>
                </div>
                <div className="bg-white border-t-0 rounded-b-lg shadow-md p-0">
                  <div className="relative group">
                    <img 
                      src="/2.jpg" 
                      alt="International Scientific Indexing certificate with impact factor 0.468"
                      className="w-full h-auto object-contain border-b border-gray-200"
                    />
                    <div className="absolute inset-0 bg-teal-700 bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <a 
                        href="/2.jpg" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-white text-teal-700 px-4 py-2 rounded-md shadow-lg flex items-center gap-2 hover:bg-teal-50 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                        </svg>
                        View Full Certificate
                      </a>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50">
                    <h3 className="font-semibold text-gray-800 mb-2">International Scientific Indexing (ISI)</h3>
                    <p className="text-gray-600 text-sm">
                      Impact Factor: <span className="font-bold text-blue-600">0.468</span> | 
                      <a href="https://isindexing.com/isi/journaldetails.php?id=14790" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 ml-1">
                        View Journal Profile
                      </a>
                    </p>
                  </div>
                </div>
              </section>

              {/* Indexing Summary */}
              <section className="transform transition-all hover:shadow-lg">
                <div className="bg-gradient-to-r from-teal-600 to-teal-500 text-white p-5 rounded-t-lg flex items-center gap-3">
                  <Database className="h-6 w-6" />
                  <h2 className="text-xl font-semibold">Our Indexing Achievements</h2>
                </div>
                <div className="bg-white border-t-0 rounded-b-lg shadow-md p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-teal-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <BadgeCheck className="h-5 w-5 text-teal-600" />
                        SJIF Recognition
                      </h3>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start gap-2">
                          <span className="text-teal-600">•</span>
                          <span>Impact Factor of <strong>5.81</strong> in 2021</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-teal-600">•</span>
                          <span>Positively evaluated in SJIF Journals Master List</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-teal-600">•</span>
                          <span>Recognized by INNOSPACE INTERNATIONAL</span>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <Shield className="h-5 w-5 text-blue-600" />
                        ISI Indexing
                      </h3>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600">•</span>
                          <span>Impact Factor of <strong>0.468</strong> (2020-2021)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600">•</span>
                          <span>Officially indexed in International Scientific Indexing</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600">•</span>
                          <span>Public journal profile available online</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            
            {/* Sidebar - Takes 1/3 on desktop */}
            <SideContent />
          </div>
        </main>
      </div>
    </Page>
  )
}