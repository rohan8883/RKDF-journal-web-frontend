import Page from '@/components/helmet-page'
import SideContent from '../sideContent'
import { Shield, BookOpen, AlertTriangle, FileCheck, FileX, Clipboard, RefreshCw } from 'lucide-react'

export default function AllPolicy() {
  return (
    <Page title="All Policy">
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-50">
        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content - Takes 2/3 on desktop */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-xl shadow-md p-6 md:p-8 border-l-4 border-blue-500 transform transition-all hover:shadow-lg">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 border-b pb-4">All Policy</h1>
                
                {/* Peer Review Policy */}
                <div className="mb-8">
                  <div className="flex items-start space-x-3 mb-4">
                    <div className="bg-blue-100 p-2 rounded-full flex-shrink-0 mt-1">
                      <Shield className="h-5 w-5 text-blue-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">Peer Review Policy</h2>
                  </div>
                  
                  <p className="text-gray-600">
                    IJHESM (International Journal of Humanities Engineering, Science and Management) employ a double-blind review process, in which the author identities are concealed from the reviewers, and vice versa, throughout the review process. The peer-review process and editorial scrutiny are the main mechanisms for ensuring the quality of published articles. To this end, the submitted articles are rigorously peer-reviewed to ensure the high-quality submissions are accepted and published; these published articles reflect the up-to-date research findings, with reliable and sound results, objective and unbiased discussion of the results.
                  </p>
                </div>
                
                {/* Open Access Policy */}
                <div className="mb-8">
                  <div className="flex items-start space-x-3 mb-4">
                    <div className="bg-green-100 p-2 rounded-full flex-shrink-0 mt-1">
                      <BookOpen className="h-5 w-5 text-green-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">Open Access Policy</h2>
                  </div>
                  
                  <p className="text-gray-600">
                    IJHESM (International Journal of Humanities Engineering, Science and Management) is an open access journal which means that all content is freely available without charge to the user or his/her institution. Users are allowed to read, download, copy, distribute, print, search, or link to the full texts of the articles in this journal without asking prior permission from the publisher or the author. This is in accordance with the BOAI definition of open access.
                  </p>
                </div>
                
                {/* Conflict of Interest Policy */}
                <div className="mb-8">
                  <div className="flex items-start space-x-3 mb-4">
                    <div className="bg-yellow-100 p-2 rounded-full flex-shrink-0 mt-1">
                      <AlertTriangle className="h-5 w-5 text-yellow-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">Conflict of Interest Policy</h2>
                  </div>
                  
                  <div className="space-y-3 text-gray-600">
                    <p>
                      IJHESM (International Journal of Humanities Engineering, Science and Management) Conflict of Interest policy is based on the COPE's definition and guidelines.
                    </p>
                    <blockquote className="pl-4 border-l-4 border-yellow-200 italic">
                      'Conflicts of interest comprise those which may not be fully apparent and which may influence the judgment of the author, reviewers, and editors. They have been described as those which, when revealed later, would make a reasonable reader feel misled or deceived. They may be personal, commercial, political, academic, or financial.
                      <br /><br />
                      "Financial" interests may include employment, research funding, stock or share ownership, payment for lectures or travel, consultancies and company support for staff.'
                    </blockquote>
                  </div>
                </div>
                
                {/* Publication Ethics */}
                <div className="mb-8">
                  <div className="flex items-start space-x-3 mb-4">
                    <div className="bg-indigo-100 p-2 rounded-full flex-shrink-0 mt-1">
                      <Clipboard className="h-5 w-5 text-indigo-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">Publication Ethics</h2>
                  </div>
                </div>
                
                {/* Plagiarism Policy */}
                <div className="mb-8 ml-8">
                  <div className="flex items-start space-x-3 mb-4">
                    <div className="bg-red-100 p-2 rounded-full flex-shrink-0 mt-1">
                      <FileX className="h-5 w-5 text-red-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">Plagiarism Policy</h3>
                  </div>
                  
                  <p className="text-gray-600">
                    None of the parts of a manuscript are plagiarized from other sources. Proper reference is provided for all contents extracted from other sources. Strong action will be taken against cases of plagiarism. All the papers submitted have to pass through an initial screening and will be checked through the Advanced Plagiarism Detection Software.
                  </p>
                </div>
                
                {/* Correction */}
                <div className="mb-8 ml-8">
                  <div className="flex items-start space-x-3 mb-4">
                    <div className="bg-purple-100 p-2 rounded-full flex-shrink-0 mt-1">
                      <FileCheck className="h-5 w-5 text-purple-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">Correction</h3>
                  </div>
                  
                  <p className="text-gray-600">
                    PDF Galley proofs are sent to the author for proofreading and corrections are done before the PDF's are sent for printing.
                  </p>
                </div>
                
                {/* Retractions */}
                <div className="mb-8 ml-8">
                  <div className="flex items-start space-x-3 mb-4">
                    <div className="bg-orange-100 p-2 rounded-full flex-shrink-0 mt-1">
                      <RefreshCw className="h-5 w-5 text-orange-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">Retractions</h3>
                  </div>
                  
                  <p className="text-gray-600">
                    IJHESM (International Journal of Humanities Engineering, Science and Management) Retraction policy is based, in large part, on the guidelines and standards developed by the Committee on Publication Ethics (COPE). Please see: <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline transition">Click here to view the retraction policy</a>
                  </p>
                </div>
                
                {/* Withdrawal Policy */}
                <div className="mb-8 ml-8">
                  <div className="flex items-start space-x-3 mb-4">
                    <div className="bg-teal-100 p-2 rounded-full flex-shrink-0 mt-1">
                      <FileX className="h-5 w-5 text-teal-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">Withdrawal Policy</h3>
                  </div>
                  
                  <p className="text-gray-600">
                    Manuscripts may be withdrawn by submitting a letter to the editorial office stating the reasons for manuscript withdrawal. If an author requests a withdrawal within 10 days of submission, the author is allowed to withdraw the manuscript without paying any withdrawal fee.
                  </p>
                </div>
                
                <div className="mt-8 text-right">
                  <p className="text-gray-700 font-medium">RKDF University</p>
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