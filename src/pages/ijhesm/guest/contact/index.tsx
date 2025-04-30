import SideContent from '../sideContent'
import Page from '@/components/helmet-page'
import { MapPin, Phone, Mail, School, Clock, Calendar, Info } from 'lucide-react'

export default function Contact() {
  return (
    <Page title="Contact">
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        {/* Consistent header with other pages */}
        <div className="bg-teal-700 text-white py-8 shadow-md">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Phone className="h-8 w-8" />
              <h1 className="text-3xl font-bold text-center">Contact Us</h1>
            </div>
            <p className="text-center text-teal-100 max-w-3xl mx-auto">
              Get in touch with the IJHESM editorial team
            </p>
          </div>
        </div>

        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content - Takes 2/3 on desktop */}
            <div className="lg:col-span-2 space-y-8">
              {/* Address Section */}
              <section className="transform transition-all hover:shadow-lg">
                <div className="bg-gradient-to-r from-teal-600 to-teal-500 text-white p-5 rounded-t-lg flex items-center gap-3">
                  <MapPin className="h-6 w-6" />
                  <h2 className="text-xl font-semibold">Our Location</h2>
                </div>
                <div className="bg-white border-t-0 rounded-b-lg shadow-md p-6">
                  <div className="flex gap-4">
                    <div className="hidden sm:block">
                      <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center">
                        <MapPin className="h-8 w-8 text-teal-600" />
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-700 leading-relaxed">
                        Kathal More - Argora - Ranchi Rd, opp. Water Tank, Dhipatoli, Pundag, 
                        Ranchi, Jharkhand 834004
                      </p>
                      <div className="mt-4">
                        <iframe 
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3662.963717425544!2d85.30999731544185!3d23.34363598479873!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f4e104bb5f1c6f%3A0x1f625c1f8a4e9a0!2sRKDF%20University!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin" 
                          width="100%" 
                          height="250" 
                          style={{border:0}} 
                          allowFullScreen 
                          loading="lazy"
                          className="rounded-lg shadow-sm"
                          title="RKDF University Location Map"
                        ></iframe>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Contact Information Sections */}
              <section className="transform transition-all hover:shadow-lg">
                <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-5 rounded-t-lg flex items-center gap-3">
                  <School className="h-6 w-6" />
                  <h2 className="text-xl font-semibold">Editorial Contacts</h2>
                </div>
                <div className="bg-white border-t-0 rounded-b-lg shadow-md p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Principal Contact */}
                    <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                      <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <School className="h-5 w-5 text-blue-600" />
                        Principal Contact
                      </h3>
                      <div className="space-y-2 text-gray-700">
                        <p>IJHESM (RKDF University Ranchi)</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Phone className="h-4 w-4 text-blue-600" />
                          <a href="tel:+917260801432" className="text-blue-600 hover:text-blue-800 hover:underline">
                            +91-7260801432
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-blue-600" />
                          <a href="mailto:publications@rkdfuniversity.org" className="text-blue-600 hover:text-blue-800 hover:underline break-all">
                            publications@rkdfuniversity.org
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Support Contact */}
                    <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                      <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <Info className="h-5 w-5 text-purple-600" />
                        Support Contact
                      </h3>
                      <div className="space-y-2 text-gray-700">
                        <p>Editor IJHESM</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Phone className="h-4 w-4 text-purple-600" />
                          <a href="tel:+919308829235" className="text-purple-600 hover:text-purple-800 hover:underline">
                            +91-9308829235
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-purple-600" />
                          <a href="mailto:publications@rkdfuniversity.org" className="text-purple-600 hover:text-purple-800 hover:underline break-all">
                            publications@rkdfuniversity.org
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Office Hours Section */}
              <section className="transform transition-all hover:shadow-lg">
                <div className="bg-gradient-to-r from-amber-600 to-amber-500 text-white p-5 rounded-t-lg flex items-center gap-3">
                  <Clock className="h-6 w-6" />
                  <h2 className="text-xl font-semibold">Office Hours</h2>
                </div>
                <div className="bg-white border-t-0 rounded-b-lg shadow-md p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                      <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-green-600" />
                        Weekdays
                      </h3>
                      <p className="text-gray-700">9:00 AM - 5:00 PM</p>
                    </div>
                    <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-500">
                      <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                        <Clock className="h-5 w-5 text-amber-600" />
                        Weekends
                      </h3>
                      <p className="text-gray-700">Closed</p>
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