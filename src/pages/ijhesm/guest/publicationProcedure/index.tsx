import { ClipboardList, Calendar, Clock, ArrowRightCircle, CheckCircle, DollarSign, Globe, Send } from 'lucide-react'
import Page from '@/components/helmet-page'
import SideContent from '../sideContent'

export default function PublicationProcedure() {
  return (
    <Page title="Publication Procedure">
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="bg-teal-700 text-white py-8 shadow-md">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center gap-3 mb-2">
              <ClipboardList className="h-8 w-8" />
              <h1 className="text-3xl font-bold text-center">Publication Procedure</h1>
            </div>
            <p className="text-center text-teal-100 max-w-3xl mx-auto">
              Follow these steps to publish your research paper with IJHESM
            </p>
          </div>
        </div>

        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content - Takes 2/3 on desktop */}
            <div className="lg:col-span-2 space-y-8">
              {/* Publication Steps Section */}
              <section className="transform transition-all hover:shadow-lg">
                <div className="bg-gradient-to-r from-teal-600 to-teal-500 text-white p-5 rounded-t-lg flex items-center gap-3">
                  <ArrowRightCircle className="h-6 w-6" />
                  <h2 className="text-xl font-semibold">Publication Steps</h2>
                </div>
                <div className="bg-white border-t-0 rounded-b-lg shadow-md p-6">
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                        <span className="text-teal-700 font-bold text-xl">1</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">Submit Article</h3>
                        <p className="text-gray-600">Submit your research paper through our online submission system</p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                        <span className="text-teal-700 font-bold text-xl">2</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">Peer Review Process</h3>
                        <p className="text-gray-600">Double-blind peer review by our expert editorial board</p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                        <span className="text-teal-700 font-bold text-xl">3</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">Submit Final Paper</h3>
                        <p className="text-gray-600">Submit the revised version after review (if applicable)</p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                        <span className="text-teal-700 font-bold text-xl">4</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">Pay Publication Fees</h3>
                        <p className="text-gray-600">Complete the payment process after acceptance</p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                        <span className="text-teal-700 font-bold text-xl">5</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">Paper Published Online</h3>
                        <p className="text-gray-600">Your paper will be published in our digital library</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Important Dates Section */}
              <section className="transform transition-all hover:shadow-lg">
                <div className="bg-gradient-to-r from-teal-600 to-teal-500 text-white p-5 rounded-t-lg flex items-center gap-3">
                  <Calendar className="h-6 w-6" />
                  <h2 className="text-xl font-semibold">Important Dates</h2>
                </div>
                <div className="bg-white border-t-0 rounded-b-lg shadow-md p-6">
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <DollarSign className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">Article Processing Charge</h3>
                        <p className="text-gray-700">
                          Low Publication Charge: <span className="font-bold">₹2000 INR</span> for Indian authors & <span className="font-bold">$45 USD</span> for International authors
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Send className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">Call for Papers</h3>
                        <p className="text-gray-700">
                          Paper Submission Deadline: <span className="font-bold">28th of each month</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">Review Results Notification</h3>
                        <p className="text-gray-700">
                          Acceptance/Rejection notification: <span className="font-bold">As per COPE guidelines</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Clock className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">Paper Publication Time</h3>
                        <p className="text-gray-700">
                          Publication timeline: <span className="font-bold">As per COPE guidelines</span> after submitting all required documents
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Journal Info Section */}
              <section className="transform transition-all hover:shadow-lg">
                <div className="bg-gradient-to-r from-teal-600 to-teal-500 text-white p-5 rounded-t-lg flex items-center gap-3">
                  <Globe className="h-6 w-6" />
                  <h2 className="text-xl font-semibold">Journal Information</h2>
                </div>
                <div className="bg-white border-t-0 rounded-b-lg shadow-md p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-teal-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">International Peer Reviewed Journal</h3>
                      <p className="text-gray-700">
                        IJHESM follows rigorous peer-review standards in accordance with international publishing norms
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 flex flex-col sm:flex-row gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                      <Globe className="h-5 w-5 text-teal-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">Open Access Journal</h3>
                      <p className="text-gray-700">
                        All published papers are freely available to readers worldwide without subscription barriers
                      </p>
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