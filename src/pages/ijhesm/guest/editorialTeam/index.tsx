import Page from '@/components/helmet-page'
import SideContent from '../sideContent'
import { Award, Book, Users, UserCheck, UserPlus, BarChart, Briefcase } from 'lucide-react'

export default function EditorialTeam() {
  return (
    <Page title="Editorial Team">
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-50">
        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content - Takes 2/3 on desktop */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-xl shadow-md p-6 md:p-8 border-l-4 border-purple-500 transform transition-all hover:shadow-lg">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 border-b pb-4">Editorial Team</h1>
                
                {/* Patron Section */}
                <div className="mb-8">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-yellow-100 p-2 rounded-full flex-shrink-0">
                      <Award className="h-5 w-5 text-yellow-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">Patron</h2>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">Prof.(Dr.) Sadhna Kapoor</h3>
                        <p className="text-gray-600 mt-1">Hon'ble Chancellor, RKDF University, Bhopal</p>
                        <p className="text-gray-600">Honorary Professor of the Academic Union, Oxford, UK</p>
                      </div>
                      <div className="mt-2 md:mt-0">
                        <a href="mailto:chancellor@rkdfuniversity.org" className="text-blue-600 hover:text-blue-800 hover:underline transition">
                          chancellor@rkdfuniversity.org
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Advisor Section */}
                <div className="mb-8">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-blue-100 p-2 rounded-full flex-shrink-0">
                      <Briefcase className="h-5 w-5 text-blue-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">Advisor</h2>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">Mr. Siddharth Kapoor</h3>
                        <p className="text-gray-600 mt-1">Managing Director RKDF Group, Bhopal</p>
                      </div>
                      <div className="mt-2 md:mt-0">
                        <a href="mailto:md@rkdfuniversity.org" className="text-blue-600 hover:text-blue-800 hover:underline transition">
                          md@rkdfuniversity.org
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Editor-in-Chief Section */}
                <div className="mb-8">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-green-100 p-2 rounded-full flex-shrink-0">
                      <Book className="h-5 w-5 text-green-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">Editor-in-Chief</h2>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">Prof. (Dr.) Shuchitangshu Chatterjee</h3>
                        <p className="text-gray-600 mt-1">Vice chancellor, RKDF University, Ranchi</p>
                      </div>
                      <div className="mt-2 md:mt-0">
                        <a href="mailto:vc@rkdfuniversity.org" className="text-blue-600 hover:text-blue-800 hover:underline transition">
                          vc@rkdfuniversity.org
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Associate Editor-in-Chief Section */}
                <div className="mb-8">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-indigo-100 p-2 rounded-full flex-shrink-0">
                      <UserPlus className="h-5 w-5 text-indigo-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">Associate Editor-in-Chief</h2>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">Dr. Sneha Pandey</h3>
                          <p className="text-gray-600 mt-1">Associate Professor, Department of Biotechnology</p>
                          <p className="text-gray-600">RKDF University Ranchi</p>
                        </div>
                        <div className="mt-2 md:mt-0">
                          <a href="mailto:sneha.pandey@rkdfuniversity.org" className="text-blue-600 hover:text-blue-800 hover:underline transition">
                            sneha.pandey@rkdfuniversity.org
                          </a>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">Dr. Nilu Kumari</h3>
                          <p className="text-gray-600 mt-1">Assistant Professor, Department of Biotechnology</p>
                          <p className="text-gray-600">RKDF University Ranchi</p>
                        </div>
                        <div className="mt-2 md:mt-0">
                          <a href="mailto:nilukumari@rkdfuniversity.org" className="text-blue-600 hover:text-blue-800 hover:underline transition">
                            nilukumari@rkdfuniversity.org
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Editorial Board Section */}
                <div className="mb-8">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-purple-100 p-2 rounded-full flex-shrink-0">
                      <Users className="h-5 w-5 text-purple-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">Editorial Board/ Reviewer Committee</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-medium text-gray-900">Dr. R. K. Dey</h3>
                      <p className="text-gray-600 text-sm mt-1">Professor, Department of Chemistry, Central University of Jharkhand (CUJ), Bramble, Ranchi</p>
                      <a href="mailto:ratan.dey@cuj.ac.in" className="text-blue-600 text-sm hover:text-blue-800 hover:underline transition">ratan.dey@cuj.ac.in</a>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-medium text-gray-900">Dr. Biplab Kumar Kuila</h3>
                      <p className="text-gray-600 text-sm mt-1">Associate Professor BHU, UP</p>
                      <a href="mailto:bkkuila.chem@bhu.ac.in" className="text-blue-600 text-sm hover:text-blue-800 hover:underline transition">bkkuila.chem@bhu.ac.in</a>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-medium text-gray-900">Dr. Koomkoom Khawas</h3>
                      <p className="text-gray-600 text-sm mt-1">Controller of Examination, RKDF University Ranchi</p>
                      <a href="mailto:koomkoom.27@gmail.com" className="text-blue-600 text-sm hover:text-blue-800 hover:underline transition">koomkoom.27@gmail.com</a>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-medium text-gray-900">Dr. Indranil Bose</h3>
                      <p className="text-gray-600 text-sm mt-1">Dean School of Business University of Bolton Academic Centre RAK</p>
                      <a href="mailto:I.bose@bolton.ac.uk" className="text-blue-600 text-sm hover:text-blue-800 hover:underline transition">I.bose@bolton.ac.uk</a>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-medium text-gray-900">Mr. Sanjeev Kumar Awasthi</h3>
                      <p className="text-gray-600 text-sm mt-1">Assistant Professor Yangling North West A&F Agriculture University, China</p>
                      <a href="mailto:sanjeev11111.awasthi@gmail.com" className="text-blue-600 text-sm hover:text-blue-800 hover:underline transition">sanjeev11111.awasthi@gmail.com</a>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-medium text-gray-900">Dr. Kishor Chandra Satpathy</h3>
                      <p className="text-gray-600 text-sm mt-1">Chief Librarian, Indian Statistical Institute</p>
                      <a href="mailto:ksatpathy@isical.ac.in" className="text-blue-600 text-sm hover:text-blue-800 hover:underline transition">ksatpathy@isical.ac.in</a>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-medium text-gray-900">Dr. Jayanta Mete</h3>
                      <p className="text-gray-600 text-sm mt-1">Faculty of Education, University of Kalyani</p>
                      <a href="mailto:dibyendu.kamilya@gmail.com" className="text-blue-600 text-sm hover:text-blue-800 hover:underline transition">dibyendu.kamilya@gmail.com</a>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-medium text-gray-900">Dr. Rishi Kumar Singh</h3>
                      <p className="text-gray-600 text-sm mt-1">Asst. Professor, School of Bioscience, IMS Ghaziabad</p>
                      <a href="mailto:rishikumar@imsuc.ac.in" className="text-blue-600 text-sm hover:text-blue-800 hover:underline transition">rishikumar@imsuc.ac.in</a>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-medium text-gray-900">Dr. Sudipto Sarkar</h3>
                      <p className="text-gray-600 text-sm mt-1">Associate Professor, Department of Agricultural Engineering, Triguna Sen School of Technology, Assam University, Silchar - 78811 (Assam) India</p>
                      <a href="mailto:sudipto.sarkar@aus.ac.in" className="text-blue-600 text-sm hover:text-blue-800 hover:underline transition">sudipto.sarkar@aus.ac.in</a>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-medium text-gray-900">Dr. Dibyarupa Pal</h3>
                      <p className="text-gray-600 text-sm mt-1">Assistant Professor, Department of Biotechnology, JIS University Agarpara, Kolkata – 700109</p>
                      <a href="mailto:dibyarupa.pal@jisuniversity.ac.in" className="text-blue-600 text-sm hover:text-blue-800 hover:underline transition">dibyarupa.pal@jisuniversity.ac.in</a>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-medium text-gray-900">Dr. Santanu Biswas</h3>
                      <p className="text-gray-600 text-sm mt-1">Director of Research & HOD Dept of Education, RKDF University, Ranchi</p>
                      <a href="mailto:santanu@rkdfuniversity.org" className="text-blue-600 text-sm hover:text-blue-800 hover:underline transition">santanu@rkdfuniversity.org</a>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-medium text-gray-900">Dr. Biswarup Saha</h3>
                      <p className="text-gray-600 text-sm mt-1">Associate Professor Department of Fishery Extension Faculty of Fishery Sciences, West Bengal University of Animal and Fishery Sciences, Chakgaria, Kolkata-700094</p>
                      <a href="mailto:biswarup.ext@gmail.com" className="text-blue-600 text-sm hover:text-blue-800 hover:underline transition">biswarup.ext@gmail.com</a>
                    </div>
                  </div>
                </div>
                
                {/* Advisory Board Section */}
                <div className="mb-8">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-amber-100 p-2 rounded-full flex-shrink-0">
                      <UserCheck className="h-5 w-5 text-amber-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">Advisory Board</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-medium text-gray-900">Dr. Amit Kumar Pandey</h3>
                      <p className="text-gray-600 text-sm mt-1">Registrar RKDF University, Ranchi</p>
                      <a href="mailto:registrar@rkdfuniversity.org" className="text-blue-600 text-sm hover:text-blue-800 hover:underline transition">registrar@rkdfuniversity.org</a>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-medium text-gray-900">Dr. Abhishek Awasthi</h3>
                      <p className="text-gray-600 text-sm mt-1">Assistant Professor Tshighua University, Beijing, China</p>
                      <a href="mailto:abhishekawasthi55@ymail.com" className="text-blue-600 text-sm hover:text-blue-800 hover:underline transition">abhishekawasthi55@ymail.com</a>
                    </div>
                  </div>
                </div>
                
                {/* Treasurer Management Section */}
                <div className="mb-8">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-teal-100 p-2 rounded-full flex-shrink-0">
                      <BarChart className="h-5 w-5 text-teal-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">Treasurer Management</h2>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">Mr. Rajat Raj</h3>
                        <p className="text-gray-600 mt-1">Accountant RKDF University, Ranchi</p>
                      </div>
                      <div className="mt-2 md:mt-0">
                        <a href="mailto:accounts@rkdfuniversity.org" className="text-blue-600 hover:text-blue-800 hover:underline transition">
                          accounts@rkdfuniversity.org
                        </a>
                      </div>
                    </div>
                  </div>
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