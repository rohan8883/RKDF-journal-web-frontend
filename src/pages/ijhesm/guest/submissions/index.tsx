import Page from '@/components/helmet-page'
import SideContent from '../sideContent'
import { AlertCircle, Check, BookOpen, Copyright } from 'lucide-react'

export default function Submissions() {
  return (
    <Page title="Submissions">
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-50">
        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content - Takes 2/3 on desktop */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-xl shadow-md p-6 md:p-8 border-l-4 border-indigo-500 transform transition-all hover:shadow-lg">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 border-b pb-4">Submissions</h1>
                
                <div className="mb-6">
                  <p className="text-indigo-700 font-semibold text-lg mb-4">Login or Register to make a submission.</p>
                </div>

                {/* Checklist Section */}
                <div className="mb-8">
                  <div className="flex items-start space-x-3 mb-4">
                    <div className="bg-amber-100 p-2 rounded-full flex-shrink-0 mt-1">
                      <AlertCircle className="h-5 w-5 text-amber-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">Submission Preparation Checklist</h2>
                  </div>
                  
                  <p className="text-gray-600 mb-4">
                    As part of the submission process, authors are required to check off their submission's compliance with all of the following items, and submissions may be returned to authors that do not adhere to these guidelines.
                  </p>

                  <ul className="bg-gray-50 p-4 rounded-lg space-y-3">
                    <li className="flex items-start space-x-3">
                      <div className="bg-green-100 p-1 rounded-full flex-shrink-0 mt-1">
                        <Check className="h-4 w-4 text-green-600" />
                      </div>
                      <p className="text-gray-700">The submission has not been previously published, nor is it before another journal for consideration (or an explanation has been provided in Comments to the Editor).</p>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="bg-green-100 p-1 rounded-full flex-shrink-0 mt-1">
                        <Check className="h-4 w-4 text-green-600" />
                      </div>
                      <p className="text-gray-700">The submission file is in OpenOffice, Microsoft Word file format. Send submission file as per Tijer paper format.</p>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="bg-green-100 p-1 rounded-full flex-shrink-0 mt-1">
                        <Check className="h-4 w-4 text-green-600" />
                      </div>
                      <p className="text-gray-700">If you are facing any issue please send your paper to <a href="mailto:publications@rkdfuniversity.org" className="text-blue-600 hover:text-blue-800 hover:underline transition">publications@rkdfuniversity.org</a></p>
                    </li>
                  </ul>
                </div>

                {/* Author Guidelines Section */}
                <div className="mb-8">
                  <div className="flex items-start space-x-3 mb-4">
                    <div className="bg-blue-100 p-2 rounded-full flex-shrink-0 mt-1">
                      <BookOpen className="h-5 w-5 text-blue-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">Author Guidelines</h2>
                  </div>
                  
                  <div className="space-y-4 text-gray-600">
                    <p>
                      Prospective authors should note that only original and previously unpublished contributions that must not currently be under review by another journal or conference are solicited. All papers submitted to this Journal will undergo the peer review. Authors are cordially invited to submit papers to the upcoming edition.
                    </p>
                    
                    <p>
                      The manuscript/paper can be submitted via email to <a href="mailto:publications@rkdfuniversity.org" className="text-blue-600 hover:text-blue-800 hover:underline transition">publications@rkdfuniversity.org</a>. The email must bear the subject line "<strong>IJHESM Paper Submission</strong>".
                    </p>
                    
                    <p>
                      If you face problems with paper submission, please feel free to contact the Editor-in-Chief at <a href="mailto:vc@rkdfuniversity.org" className="text-blue-600 hover:text-blue-800 hover:underline transition">vc@rkdfuniversity.org</a>
                    </p>
                    
                    <p>
                      Manuscripts submitted to this journal will be deemed as they have not been published and are not under consideration for publication elsewhere.
                    </p>
                  </div>
                </div>

                {/* Copyright Notice Section */}
                <div>
                  <div className="flex items-start space-x-3 mb-4">
                    <div className="bg-purple-100 p-2 rounded-full flex-shrink-0 mt-1">
                      <Copyright className="h-5 w-5 text-purple-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">Copyright Notice</h2>
                  </div>
                  
                  <p className="text-gray-600">
                    All Copyright held by the author only.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Sidebar - Takes 1/3 on desktop */}
            <SideContent />
          </div>
        </main>
      </div>
    </Page>
  )
}