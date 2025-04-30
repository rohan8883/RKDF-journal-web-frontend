import Page from '@/components/helmet-page'
import SideContent from '../sideContent'
import { AlertCircle, Check, BookOpen, Copyright, Send, LogIn } from 'lucide-react'

export default function Submissions() {
  return (
    <Page title="Submissions">
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        {/* Header matching other components */}
        <div className="bg-teal-700 text-white py-8 shadow-md">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Send className="h-8 w-8" />
              <h1 className="text-3xl font-bold text-center">Submissions</h1>
            </div>
            <p className="text-center text-teal-100 max-w-3xl mx-auto">
              Guidelines and requirements for submitting your research to IJHESM
            </p>
          </div>
        </div>

        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content - Takes 2/3 on desktop */}
            <div className="lg:col-span-2 space-y-8">
              {/* Login Section */}
              <section className="transform transition-all hover:shadow-lg">
                <div className="bg-gradient-to-r from-teal-600 to-teal-500 text-white p-5 rounded-t-lg flex items-center gap-3">
                  <LogIn className="h-6 w-6" />
                  <h2 className="text-xl font-semibold">Submission Portal</h2>
                </div>
                <div className="bg-white border-t-0 rounded-b-lg shadow-md p-6">
                  <p className="text-teal-700 font-medium text-lg mb-4">
                    Login or Register to make a submission through our online system
                  </p>
                  <button className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-md shadow-sm flex items-center gap-2">
                    <span>Go to Submission Portal</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </section>

              {/* Checklist Section */}
              <section className="transform transition-all hover:shadow-lg">
                <div className="bg-gradient-to-r from-amber-600 to-amber-500 text-white p-5 rounded-t-lg flex items-center gap-3">
                  <AlertCircle className="h-6 w-6" />
                  <h2 className="text-xl font-semibold">Submission Preparation Checklist</h2>
                </div>
                <div className="bg-white border-t-0 rounded-b-lg shadow-md p-6">
                  <p className="text-gray-700 mb-6">
                    As part of the submission process, authors are required to check off their submission's compliance with all of the following items, and submissions may be returned to authors that do not adhere to these guidelines.
                  </p>

                  <ul className="space-y-4">
                    <li className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                        <Check className="h-4 w-4 text-green-600" />
                      </div>
                      <p className="text-gray-700">The submission has not been previously published, nor is it before another journal for consideration (or an explanation has been provided in Comments to the Editor).</p>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                        <Check className="h-4 w-4 text-green-600" />
                      </div>
                      <p className="text-gray-700">The submission file is in OpenOffice, Microsoft Word file format. Send submission file as per Tijer paper format.</p>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                        <Check className="h-4 w-4 text-green-600" />
                      </div>
                      <p className="text-gray-700">If you are facing any issue please send your paper to <a href="mailto:publications@rkdfuniversity.org" className="text-teal-600 hover:text-teal-800 hover:underline">publications@rkdfuniversity.org</a></p>
                    </li>
                  </ul>
                </div>
              </section>

              {/* Author Guidelines Section */}
              <section className="transform transition-all hover:shadow-lg">
                <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-5 rounded-t-lg flex items-center gap-3">
                  <BookOpen className="h-6 w-6" />
                  <h2 className="text-xl font-semibold">Author Guidelines</h2>
                </div>
                <div className="bg-white border-t-0 rounded-b-lg shadow-md p-6">
                  <div className="space-y-4 text-gray-700">
                    <p>
                      Prospective authors should note that only original and previously unpublished contributions that must not currently be under review by another journal or conference are solicited. All papers submitted to this Journal will undergo the peer review. Authors are cordially invited to submit papers to the upcoming edition.
                    </p>
                    
                    <p>
                      The manuscript/paper can be submitted via email to <a href="mailto:publications@rkdfuniversity.org" className="text-teal-600 hover:text-teal-800 hover:underline">publications@rkdfuniversity.org</a>. The email must bear the subject line "<strong>IJHESM Paper Submission</strong>".
                    </p>
                    
                    <p>
                      If you face problems with paper submission, please feel free to contact the Editor-in-Chief at <a href="mailto:vc@rkdfuniversity.org" className="text-teal-600 hover:text-teal-800 hover:underline">vc@rkdfuniversity.org</a>
                    </p>
                    
                    <p>
                      Manuscripts submitted to this journal will be deemed as they have not been published and are not under consideration for publication elsewhere.
                    </p>
                  </div>
                </div>
              </section>

              {/* Copyright Notice Section */}
              <section className="transform transition-all hover:shadow-lg">
                <div className="bg-gradient-to-r from-purple-600 to-purple-500 text-white p-5 rounded-t-lg flex items-center gap-3">
                  <Copyright className="h-6 w-6" />
                  <h2 className="text-xl font-semibold">Copyright Notice</h2>
                </div>
                <div className="bg-white border-t-0 rounded-b-lg shadow-md p-6">
                  <p className="text-gray-700">
                    All Copyright held by the author only.
                  </p>
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