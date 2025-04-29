

import { Shield, BookOpen, FileText, Lock } from 'lucide-react'
import Page from '@/components/helmet-page'
import SideContent from '../sideContent'

export default function Privacy() {
  return (
    <Page title="Privacy">
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="bg-teal-700 text-white py-8 shadow-md">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Lock className="h-8 w-8" />
              <h1 className="text-3xl font-bold text-center">Privacy Statement</h1>
            </div>
            <p className="text-center text-teal-100 max-w-3xl mx-auto">
              Our commitment to transparency, integrity, and protecting your research
            </p>
          </div>
        </div>

        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content - Takes 2/3 on desktop */}
            <div className="lg:col-span-2 space-y-8">
              {/* Peer Review Policy Section */}
              <section className="transform transition-all hover:shadow-lg">
                <div className="bg-gradient-to-r from-teal-600 to-teal-500 text-white p-5 rounded-t-lg flex items-center gap-3">
                  <Shield className="h-6 w-6" />
                  <h2 className="text-xl font-semibold">Peer Review Policy</h2>
                </div>
                <div className="bg-white border-t-0 rounded-b-lg shadow-md p-6">
                  <div className="flex gap-4">
                    <div className="hidden sm:block">
                      <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center">
                        <FileText className="h-8 w-8 text-teal-600" />
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-700 leading-relaxed">
                        <span className="font-semibold text-teal-700">IJHESM</span> (International Journal of Humanities Engineering, Science and Management) employs a 
                        <span className="font-semibold text-teal-700"> double-blind review process</span>, in which the author identities are concealed from the reviewers, and 
                        vice versa, throughout the review process.
                      </p>
                      <p className="text-gray-700 leading-relaxed mt-4">
                        The peer-review process and editorial scrutiny are the main mechanisms for ensuring the quality of published articles. 
                        To this end, the submitted articles are <span className="font-semibold text-teal-700">rigorously peer-reviewed</span> to ensure the high-quality 
                        submissions are accepted and published; these published articles reflect the up-to-date research findings, with 
                        reliable and sound results, objective and unbiased discussion of the results.
                      </p>
                      
                      <div className="mt-6 bg-gray-50 p-4 rounded-lg border-l-4 border-teal-500">
                        <h3 className="font-semibold text-gray-800 mb-2">Our Review Process Ensures:</h3>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <div className="w-4 h-4 bg-teal-500 rounded-full mt-1 mr-2 flex-shrink-0"></div>
                            <span className="text-gray-700">Complete anonymity for authors and reviewers</span>
                          </li>
                          <li className="flex items-start">
                            <div className="w-4 h-4 bg-teal-500 rounded-full mt-1 mr-2 flex-shrink-0"></div>
                            <span className="text-gray-700">Rigorous quality control standards</span>
                          </li>
                          <li className="flex items-start">
                            <div className="w-4 h-4 bg-teal-500 rounded-full mt-1 mr-2 flex-shrink-0"></div>
                            <span className="text-gray-700">Objective evaluation of research methodology</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Open Access Publishing Policy Section */}
              <section className="transform transition-all hover:shadow-lg">
                <div className="bg-gradient-to-r from-teal-600 to-teal-500 text-white p-5 rounded-t-lg flex items-center gap-3">
                  <BookOpen className="h-6 w-6" />
                  <h2 className="text-xl font-semibold">Open Access Publishing Policy</h2>
                </div>
                <div className="bg-white border-t-0 rounded-b-lg shadow-md p-6">
                  <div className="flex gap-4">
                    <div className="hidden sm:block">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                        <BookOpen className="h-8 w-8 text-blue-600" />
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-700 leading-relaxed">
                        <span className="font-semibold text-teal-700">IJHESM</span> (International Journal of Humanities Engineering, Science and Management) is an 
                        <span className="font-semibold text-teal-700"> open-access journal</span> which means that all content is freely available without charge to the user or his/her 
                        institution.
                      </p>
                      <p className="text-gray-700 leading-relaxed mt-4">
                        Users are allowed to read, download, copy, distribute, print, search, or link to the full texts of the articles in this 
                        journal without asking prior permission from the publisher or the author. This is in accordance with the 
                        <span className="font-semibold text-teal-700"> BOAI definition of open access</span>.
                      </p>
                      
                      <div className="mt-6 bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                        <h3 className="font-semibold text-gray-800 mb-2">Benefits of Our Open Access Policy:</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="flex items-start bg-white p-3 rounded shadow-sm">
                            <div className="w-4 h-4 bg-blue-500 rounded-full mt-1 mr-2 flex-shrink-0"></div>
                            <span className="text-gray-700">Increased visibility and readership</span>
                          </div>
                          <div className="flex items-start bg-white p-3 rounded shadow-sm">
                            <div className="w-4 h-4 bg-blue-500 rounded-full mt-1 mr-2 flex-shrink-0"></div>
                            <span className="text-gray-700">Greater citation opportunities</span>
                          </div>
                          <div className="flex items-start bg-white p-3 rounded shadow-sm">
                            <div className="w-4 h-4 bg-blue-500 rounded-full mt-1 mr-2 flex-shrink-0"></div>
                            <span className="text-gray-700">Compliance with funding mandates</span>
                          </div>
                          <div className="flex items-start bg-white p-3 rounded shadow-sm">
                            <div className="w-4 h-4 bg-blue-500 rounded-full mt-1 mr-2 flex-shrink-0"></div>
                            <span className="text-gray-700">Accessibility for global researchers</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Additional Privacy Information Section */}
              <section className="transform transition-all hover:shadow-lg">
                <div className="bg-gradient-to-r from-teal-600 to-teal-500 text-white p-5 rounded-t-lg flex items-center gap-3">
                  <Lock className="h-6 w-6" />
                  <h2 className="text-xl font-semibold">Data Protection Policy</h2>
                </div>
                <div className="bg-white border-t-0 rounded-b-lg shadow-md p-6">
                  <p className="text-gray-700 leading-relaxed">
                    IJHESM is committed to protecting the privacy of authors, reviewers, and users of our platform. We collect and process 
                    personal data only for legitimate purposes related to the publication process, including communication about submissions, 
                    reviews, and journal updates.
                  </p>
                  <p className="text-gray-700 leading-relaxed mt-4">
                    All data is handled in accordance with applicable data protection regulations. We do not share personal information with 
                    third parties without consent, except as required by law or as necessary to fulfill publishing operations.
                  </p>
                  <div className="flex justify-center mt-6">
                    <button className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-md shadow-md flex items-center gap-2">
                      <FileText className="w-4 h-4" /> Download Complete Privacy Policy
                    </button>
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