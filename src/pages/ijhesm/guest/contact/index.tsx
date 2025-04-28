import SideContent from '../sideContent'
import Page from '@/components/helmet-page'
import { MapPin, Phone, Mail, School, Clock } from 'lucide-react'

export default function Contact() {
  return (
    <Page title="Contact">
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-50">
        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content - Takes 2/3 on desktop */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 md:p-8 border-l-4 border-blue-500 transform transition-all hover:shadow-lg">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 border-b pb-4">Contact Us</h1>
                
                <div className="space-y-6">
                  {/* Address Section */}
                  <div className="flex flex-col sm:flex-row items-start sm:space-x-4">
                    <div className="bg-blue-100 p-3 rounded-full flex-shrink-0 mb-3 sm:mb-0">
                      <MapPin className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Our Location</h2>
                      <p className="text-gray-600 text-sm sm:text-base leading-relaxed break-words">
                        Kathal More - Argora - Ranchi Rd, opp. Water Tank, Dhipatoli, Pundag, 
                        Ranchi, Jharkhand 834004
                      </p>
                    </div>
                  </div>
                  
                  {/* Principal Contact Section */}
                  <div className="flex flex-col sm:flex-row items-start sm:space-x-4">
                    <div className="bg-green-100 p-3 rounded-full flex-shrink-0 mb-3 sm:mb-0">
                      <School className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Principal Contact</h2>
                      <div className="text-gray-600 space-y-2 text-sm sm:text-base">
                        <p className="font-medium break-words">IJHESM (International Journal of Humanities Engineering, Science and Management)</p>
                        <p className="break-words">Publishing Body: RKDF University Ranchi</p>
                        <div className="flex items-center mt-2">
                          <Phone className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                          <a href="tel:+917260801432" className="text-blue-600 hover:text-blue-800 hover:underline transition break-all">
                            +91-7260801432
                          </a>
                        </div>
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                          <a href="mailto:publications@rkdfuniversity.org" className="text-blue-600 hover:text-blue-800 hover:underline transition break-all">
                            publications@rkdfuniversity.org
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Support Contact Section */}
                  <div className="flex flex-col sm:flex-row items-start sm:space-x-4">
                    <div className="bg-purple-100 p-3 rounded-full flex-shrink-0 mb-3 sm:mb-0">
                      <Clock className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Support Contact</h2>
                      <div className="text-gray-600 space-y-2 text-sm sm:text-base">
                        <p className="font-medium">Editor IJHESM</p>
                        <div className="flex items-center mt-2">
                          <Phone className="h-4 w-4 text-purple-600 mr-2 flex-shrink-0" />
                          <a href="tel:+919308829235" className="text-blue-600 hover:text-blue-800 hover:underline transition break-all">
                            +91-9308829235
                          </a>
                        </div>
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 text-purple-600 mr-2 flex-shrink-0" />
                          <a href="mailto:publications@rkdfuniversity.org" className="text-blue-600 hover:text-blue-800 hover:underline transition break-all">
                            publications@rkdfuniversity.org
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Operating Hours Card */}
              <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 md:p-8 border-l-4 border-green-500">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Office Hours</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-medium text-green-800 text-sm sm:text-base">Weekdays</h3>
                    <p className="text-gray-600 text-sm sm:text-base">9:00 AM - 5:00 PM</p>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h3 className="font-medium text-yellow-800 text-sm sm:text-base">Weekends</h3>
                    <p className="text-gray-600 text-sm sm:text-base">Closed</p>
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