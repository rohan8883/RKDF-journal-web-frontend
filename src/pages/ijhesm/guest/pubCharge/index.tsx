import { CreditCard, Banknote, Globe, FileDigit, FileBadge, FileCheck } from 'lucide-react'
import Page from '@/components/helmet-page'
import SideContent from '../sideContent'

export default function PublicationCharges() {
  return (
    <Page title="Publication Charges">
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="bg-teal-700 text-white py-8 shadow-md">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Banknote className="h-8 w-8" />
              <h1 className="text-3xl font-bold text-center">Article Processing Charges & Payment Options</h1>
            </div>
            <p className="text-center text-teal-100 max-w-3xl mx-auto">
              Transparent pricing for authors with multiple convenient payment options
            </p>
          </div>
        </div>

        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content - Takes 2/3 on desktop */}
            <div className="lg:col-span-2 space-y-8">
              {/* Pricing Section */}
              <section className="transform transition-all hover:shadow-lg">
                <div className="bg-gradient-to-r from-teal-600 to-teal-500 text-white p-5 rounded-t-lg flex items-center gap-3">
                  <CreditCard className="h-6 w-6" />
                  <h2 className="text-xl font-semibold">Publication Charges</h2>
                </div>
                <div className="bg-white border-t-0 rounded-b-lg shadow-md p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Indian Author */}
                    <div className="bg-amber-50 p-5 rounded-lg border-l-4 border-amber-500">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                          <FileDigit className="h-5 w-5 text-amber-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">Indian Author</h3>
                      </div>
                      <p className="text-2xl font-bold text-gray-800 mb-2">₹ 2000 INR</p>
                      <p className="text-gray-600 text-sm">Per accepted paper</p>
                    </div>

                    {/* International Author */}
                    <div className="bg-blue-50 p-5 rounded-lg border-l-4 border-blue-500">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Globe className="h-5 w-5 text-blue-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">International Author</h3>
                      </div>
                      <p className="text-2xl font-bold text-gray-800 mb-2">$45 USD</p>
                      <p className="text-gray-600 text-sm">Per accepted paper</p>
                    </div>

                    {/* DOI */}
                    <div className="bg-purple-50 p-5 rounded-lg border-l-4 border-purple-500">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                          <FileDigit className="h-5 w-5 text-purple-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">DOI Registration</h3>
                      </div>
                      <p className="text-2xl font-bold text-gray-800 mb-2">₹ 300 INR</p>
                      <p className="text-gray-600 text-sm">Optional for each paper</p>
                    </div>
                  </div>

                  <div className="mt-6 bg-gray-50 p-5 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <FileCheck className="h-5 w-5 text-teal-600" />
                      Payment Process
                    </h3>
                    <p className="text-gray-700 mb-4">
                      Once your paper is accepted for publication, the registration phase begins. At least one author must complete payment for the paper to appear in the journal. For multiple accepted papers, payment must be made individually for each paper.
                    </p>
                    <div className="space-y-2">
                      <p className="flex items-start gap-2 text-gray-700">
                        <span className="inline-block w-2 h-2 bg-teal-500 rounded-full mt-2"></span>
                        Payment can be made via bank transfer or through our online payment link
                      </p>
                      <p className="flex items-start gap-2 text-gray-700">
                        <span className="inline-block w-2 h-2 bg-teal-500 rounded-full mt-2"></span>
                        Payment is required before publication can proceed
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Bank Details Section */}
              <section className="transform transition-all hover:shadow-lg">
                <div className="bg-gradient-to-r from-teal-600 to-teal-500 text-white p-5 rounded-t-lg flex items-center gap-3">
                  <Banknote className="h-6 w-6" />
                  <h2 className="text-xl font-semibold">Bank Transfer Details</h2>
                </div>
                <div className="bg-white border-t-0 rounded-b-lg shadow-md p-6">
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-700">Bank Name</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Punjab National Bank</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-700">Account Name</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">RKDF University Ranchi</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-700">Branch Address</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">PUNJAB NATIONAL BANK</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-700">Account Number</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">7548002100000593</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-700">IFSC Code</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">PUNB0754800</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-400 p-4">
                    <p className="text-yellow-700 text-sm">
                      Please include your paper ID and author name in the payment reference.
                    </p>
                  </div>
                </div>
              </section>

              {/* What's Included Section */}
              <section className="transform transition-all hover:shadow-lg">
                <div className="bg-gradient-to-r from-teal-600 to-teal-500 text-white p-5 rounded-t-lg flex items-center gap-3">
                  <FileBadge className="h-6 w-6" />
                  <h2 className="text-xl font-semibold">What's Included</h2>
                </div>
                <div className="bg-white border-t-0 rounded-b-lg shadow-md p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded">
                      <FileCheck className="h-5 w-5 text-teal-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Publication of one entire Research Paper Online (max 5 authors)</span>
                    </div>
                    <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded">
                      <FileCheck className="h-5 w-5 text-teal-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Individual Certificate for all authors (Softcopy)</span>
                    </div>
                    <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded">
                      <FileCheck className="h-5 w-5 text-teal-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Confirmation Letter (Softcopy)</span>
                    </div>
                    <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded">
                      <FileCheck className="h-5 w-5 text-teal-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Indexing, typesetting, and website maintenance</span>
                    </div>
                    <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded">
                      <FileCheck className="h-5 w-5 text-teal-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Paper and author details handling</span>
                    </div>
                    <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded">
                      <FileCheck className="h-5 w-5 text-teal-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Basic formatting for publication</span>
                    </div>
                    <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded">
                      <FileCheck className="h-5 w-5 text-teal-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Unique paper identification number assignment</span>
                    </div>
                    <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded">
                      <FileCheck className="h-5 w-5 text-teal-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Listing in IJHESM SEARCH Digital Library</span>
                    </div>
                    <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded col-span-1 md:col-span-2">
                      <FileCheck className="h-5 w-5 text-teal-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Indexing in major databases like Google Scholar, academia.edu</span>
                    </div>
                    <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded col-span-1 md:col-span-2">
                      <FileCheck className="h-5 w-5 text-teal-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Automated citation generator for published papers</span>
                    </div>
                    <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded col-span-1 md:col-span-2">
                      <FileCheck className="h-5 w-5 text-teal-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Lifetime availability in digital repository</span>
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