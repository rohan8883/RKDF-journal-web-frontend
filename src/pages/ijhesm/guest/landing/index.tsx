import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import SideContent from '../sideContent'
import Page from '@/components/helmet-page'
import { Image } from '@/components/image';
import { ArrowRight, BookOpen, FileText, Upload, CreditCard, Award, Check, ExternalLink } from 'lucide-react'

export default function LandingPage() {
  return (
    <Page>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-50">
        <div className="bg-teal-700 text-white py-12 shadow-md">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-center">
              International Journal of Humanities Engineering, Science and Management
            </h1>
            <p className="text-center text-teal-100 mt-4 max-w-3xl mx-auto">
              An International Peer Reviewed, Open Access Journal committed to advancing multidisciplinary research and scholarship
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
              <Button className="bg-white text-teal-700 hover:bg-teal-50 font-medium text-base shadow-lg flex items-center gap-2">
                <Upload size={18} /> Submit Paper
              </Button>
              <Button className="bg-teal-600 hover:bg-teal-500 border border-teal-400 font-medium text-base shadow-lg flex items-center gap-2">
                <FileText size={18} /> Publication Guidelines
              </Button>
            </div>
          </div>
        </div>

        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content - Takes 2/3 on desktop */}
            <div className="lg:col-span-2 space-y-8">
              {/* About Journal Section */}
              <section className="transform transition-all hover:shadow-lg">
                <div className="bg-gradient-to-r from-teal-600 to-teal-500 text-white p-5 rounded-t-lg flex items-center gap-3">
                  <BookOpen className="h-6 w-6" />
                  <h2 className="text-xl font-semibold">
                    About IJHESM
                  </h2>
                </div>
                <Card className="border-t-0 rounded-t-none shadow-md">
                  <CardContent className="p-6">
                    <p className="text-gray-700 leading-relaxed">
                      IJHESM (International Journal of Humanities Engineering, Science and Management) is a prestigious open access 
                      journal published by RKDF University Ranchi. Our journal serves as a platform for researchers, 
                      academicians, and professionals to share their discoveries and innovative ideas across multiple disciplines.
                    </p>
                    <div className="flex flex-wrap gap-3 mt-6">
                      <Button className="bg-teal-600 hover:bg-teal-700 shadow-md flex items-center gap-2">
                        <Upload size={16} /> Submit Paper Online
                      </Button>
                      <Button className="bg-teal-50 text-teal-700 hover:bg-teal-100 border border-teal-200 shadow-md flex items-center gap-2">
                        <FileText size={16} /> Publication Process
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Editor Message Section */}
              <section className="transform transition-all hover:shadow-lg">
                <div className="bg-gradient-to-r from-teal-600 to-teal-500 text-white p-5 rounded-t-lg flex items-center gap-3">
                  <Award className="h-6 w-6" />
                  <h2 className="text-xl font-semibold">Message From Editor-In-Chief</h2>
                </div>
                <Card className="border-t-0 rounded-t-none shadow-md">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-3/4">
                        <p className="text-gray-700 text-justify leading-relaxed">
                          It is our proud privilege to present the Volume-2, Issue-2 of INTERNATIONAL JOURNAL OF HUMANITIES,
                          ENGINEERING, SCIENCE AND MANAGEMENT (IJHESM), a journal of RKDF University, Ranchi, based on papers
                          selected by our editorial board and advisory committee. This issue brings out the various articles
                          from diversified areas of Commerce, Business Management, Natural Science, Social Science, Mass
                          Communication, Mathematics, Economics, Humanities, Business and Social Ethics, Industrial Relations,
                          Religious Studies, Language, Literature, Information Science, International Relations, Information
                          Technology, Health, Library Science, Cultural Studies, Demography, Women Studies, Environmental
                          Studies, Critical Evaluation and many more.
                        </p>
                        <p className="text-gray-700 text-justify mt-4 leading-relaxed">
                          This journal is purporting to provide a podium for Researchers, Academicians and Professionals to
                          publish their discoveries, innovative ideas, reviews on different issues (National and International),
                          critical evaluation and analysis, data interpretation etc. to explore or discover future trends.
                        </p>
                        <p className="text-gray-700 text-justify mt-4 leading-relaxed">
                          It is our ultimate objective to make bridge between established theory and its practical application
                          in the related areas of society. We welcome the researchers and scholars to their research findings, 
                          facts, suggestions, recommendations and reviews to IJHESM.
                        </p>
                      </div>
                      <div className="md:w-1/4 bg-gray-50 p-4 rounded-lg border border-gray-100 flex flex-col items-center">
                        <div className="w-24 h-24 rounded-full bg-teal-100 mb-3 flex items-center justify-center">
                          <span className="text-teal-700 text-3xl font-bold">VC</span>
                        </div>
                        <p className="font-semibold text-gray-800 text-center">Dr. Shuchitangshu Chatterjee</p>
                        <p className="text-gray-600 text-center text-sm">Vice Chancellor</p>
                        <p className="text-gray-600 text-center text-sm">RKDF University Ranchi</p>
                        <a href="mailto:vc@rkdfuniversity.org" 
                           className="mt-3 text-teal-600 hover:text-teal-800 flex items-center text-sm">
                          <ExternalLink size={14} className="mr-1" /> vc@rkdfuniversity.org
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Important Journal Details Section */}
              <section className="transform transition-all hover:shadow-lg">
                <div className="bg-gradient-to-r from-teal-600 to-teal-500 text-white p-5 rounded-t-lg flex items-center gap-3">
                  <FileText className="h-6 w-6" />
                  <h2 className="text-xl font-semibold">Important Journal Details</h2>
                </div>
                <Card className="border-t-0 rounded-t-none shadow-md">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-teal-50 p-4 rounded-lg border-l-4 border-teal-500">
                        <div className="flex items-center">
                          <Check className="h-5 w-5 text-teal-600 mr-2" />
                          <span className="font-semibold text-gray-800">Journal Type:</span>
                        </div>
                        <p className="text-gray-700 ml-7">International Peer Reviewed, Open Access Journal</p>
                      </div>
                      <div className="bg-teal-50 p-4 rounded-lg border-l-4 border-teal-500">
                        <div className="flex items-center">
                          <Check className="h-5 w-5 text-teal-600 mr-2" />
                          <span className="font-semibold text-gray-800">Issue Frequency:</span>
                        </div>
                        <p className="text-gray-700 ml-7">Half Yearly</p>
                      </div>
                      <div className="bg-teal-50 p-4 rounded-lg border-l-4 border-teal-500">
                        <div className="flex items-center">
                          <Check className="h-5 w-5 text-teal-600 mr-2" />
                          <span className="font-semibold text-gray-800">Publication Guidelines:</span>
                        </div>
                        <p className="text-gray-700 ml-7">Follow COPE Guidelines</p>
                      </div>
                      <div className="bg-teal-50 p-4 rounded-lg border-l-4 border-teal-500">
                        <div className="flex items-center">
                          <Check className="h-5 w-5 text-teal-600 mr-2" />
                          <span className="font-semibold text-gray-800">ISSN:</span>
                        </div>
                        <p className="text-gray-700 ml-7">2582-8169 | <Link to="#" className="text-teal-600 hover:text-teal-800 underline">ISSN Approved Link</Link></p>
                      </div>
                      <div className="bg-teal-50 p-4 rounded-lg border-l-4 border-teal-500">
                        <div className="flex items-center">
                          <Check className="h-5 w-5 text-teal-600 mr-2" />
                          <span className="font-semibold text-gray-800">Call for Paper Submission:</span>
                        </div>
                        <p className="text-gray-700 ml-7">28<sup>th</sup> of Current Month</p>
                      </div>
                      <div className="bg-teal-50 p-4 rounded-lg border-l-4 border-teal-500">
                        <div className="flex items-center">
                          <Check className="h-5 w-5 text-teal-600 mr-2" />
                          <span className="font-semibold text-gray-800">Subject Category:</span>
                        </div>
                        <p className="text-gray-700 ml-7">Multidisciplinary, Peer-reviewed, Refereed</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Types of Article Invited Section */}
              <section className="transform transition-all hover:shadow-lg">
                <div className="bg-gradient-to-r from-teal-600 to-teal-500 text-white p-5 rounded-t-lg flex items-center gap-3">
                  <BookOpen className="h-6 w-6" />
                  <h2 className="text-xl font-semibold">Types of Article Invited</h2>
                </div>
                <Card className="border-t-0 rounded-t-none shadow-md">
                  <CardContent className="p-6">
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {[
                          "Research Papers", 
                          "Survey Papers", 
                          "Study Papers", 
                          "Subjective Papers", 
                          "Experimental Results", 
                          "Analysis Studies",
                          "Informative Articles", 
                          "Comparison Papers", 
                          "Case Studies", 
                          "Review Papers", 
                          "Comparative Studies", 
                          "Dissertation Chapters",
                          "Research Proposals", 
                          "Working Projects", 
                          "New Innovation & Ideas"
                        ].map((item, index) => (
                          <div key={index} className="flex items-center">
                            <div className="w-2 h-2 bg-teal-500 rounded-full mr-2"></div>
                            <span className="text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Publication Procedure Section */}
              <section className="transform transition-all hover:shadow-lg">
                <div className="bg-gradient-to-r from-teal-600 to-teal-500 text-white p-5 rounded-t-lg flex items-center gap-3">
                  <FileText className="h-6 w-6" />
                  <h2 className="text-xl font-semibold">Publication Procedure</h2>
                </div>
                <Card className="border-t-0 rounded-t-none shadow-md">
                  <CardContent className="p-6">
                    <p className="text-gray-700 mb-6 text-center font-medium">Follow these steps to publish your research paper</p>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
                      <div className="flex flex-col items-center max-w-full sm:max-w-xs">
                        <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center shadow-md">
                          <Upload className="h-10 w-10 text-teal-600" />
                        </div>
                        <span className="mt-3 font-medium text-gray-800">Step 1</span>
                        <span className="text-sm text-gray-600 text-center">Submit Article</span>
                      </div>
                      
                      <ArrowRight className="h-6 w-6 text-gray-400 rotate-90 sm:rotate-0 hidden sm:block" />
                      
                      <div className="flex flex-col items-center max-w-full sm:max-w-xs">
                        <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center shadow-md">
                          <FileText className="h-10 w-10 text-indigo-600" />
                        </div>
                        <span className="mt-3 font-medium text-gray-800">Step 2</span>
                        <span className="text-sm text-gray-600 text-center">Peer Review Process</span>
                      </div>
                      
                      <ArrowRight className="h-6 w-6 text-gray-400 rotate-90 sm:rotate-0 hidden sm:block" />
                      
                      <div className="flex flex-col items-center max-w-full sm:max-w-xs">
                        <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center shadow-md">
                          <CreditCard className="h-10 w-10 text-pink-600" />
                        </div>
                        <span className="mt-3 font-medium text-gray-800">Step 3</span>
                        <span className="text-sm text-gray-600 text-center">Pay Fees</span>
                      </div>
                      
                      <ArrowRight className="h-6 w-6 text-gray-400 rotate-90 sm:rotate-0 hidden sm:block" />
                      
                      <div className="flex flex-col items-center max-w-full sm:max-w-xs">
                        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center shadow-md">
                          <Award className="h-10 w-10 text-blue-600" />
                        </div>
                        <span className="mt-3 font-medium text-gray-800">Step 4</span>
                        <span className="text-sm text-gray-600 text-center">Paper Published Online</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-center mt-6">
                      <Button className="bg-teal-600 hover:bg-teal-700 shadow-md flex items-center gap-2">
                        More Details <ArrowRight size={16} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
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