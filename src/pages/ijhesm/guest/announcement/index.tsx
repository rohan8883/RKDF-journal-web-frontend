import { Megaphone, CalendarDays, AlertCircle, Trophy, Award,Clipboard  } from 'lucide-react'
import Page from '@/components/helmet-page'
import SideContent from '../sideContent'

export default function Announcements() {
  // Sample announcement data - replace with your actual data
  const announcements = [
    {
      id: 1,
      title: "Call for Papers: Special Issue on Sustainable Engineering",
      date: "June 15, 2023",
      content: "We are inviting submissions for our upcoming special issue focusing on innovative approaches to sustainable engineering practices. Submission deadline: August 30, 2023.",
      icon: <Megaphone className="h-5 w-5 text-amber-600" />,
      category: "Call for Papers"
    },
    {
      id: 2,
      title: "Journal Impact Factor Released",
      date: "May 20, 2023",
      content: "We're proud to announce our latest impact factor of 3.2, reflecting the growing influence of IJHESM in the research community.",
      icon: <Trophy className="h-5 w-5 text-blue-600" />,
      category: "Journal News"
    },
    {
      id: 3,
      title: "Upcoming Conference Participation",
      date: "April 10, 2023",
      content: "Our editorial team will be attending the International Conference on Humanities and Engineering in Berlin next month. Meet us at Booth #42.",
      icon: <CalendarDays className="h-5 w-5 text-teal-600" />,
      category: "Event"
    },
    {
      id: 4,
      title: "New Indexing Partnership",
      date: "March 5, 2023",
      content: "IJHESM is now indexed in Scopus, expanding our global reach and visibility for authors.",
      icon: <Award className="h-5 w-5 text-purple-600" />,
      category: "Journal News"
    },
    {
      id: 5,
      title: "System Maintenance Notice",
      date: "February 28, 2023",
      content: "Our submission system will be temporarily unavailable on March 3 from 2:00 AM to 6:00 AM GMT for scheduled maintenance.",
      icon: <AlertCircle className="h-5 w-5 text-red-600" />,
      category: "Notice"
    }
  ]

  return (
    <Page title="Announcements">
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="bg-teal-700 text-white py-8 shadow-md">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Megaphone className="h-8 w-8" />
              <h1 className="text-3xl font-bold text-center">Announcements</h1>
            </div>
            <p className="text-center text-teal-100 max-w-3xl mx-auto">
              Latest updates, calls for papers, and important notices from IJHESM
            </p>
          </div>
        </div>

        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content - Takes 2/3 on desktop */}
            <div className="lg:col-span-2 space-y-6">
              {/* Featured Announcement */}
              <section className="transform transition-all hover:shadow-lg">
                <div className="bg-gradient-to-r from-amber-600 to-amber-500 text-white p-5 rounded-t-lg flex items-center gap-3">
                  <Megaphone className="h-6 w-6" />
                  <h2 className="text-xl font-semibold">Featured Announcement</h2>
                </div>
                <div className="bg-white border-t-0 rounded-b-lg shadow-md p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-shrink-0 w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
                      <Megaphone className="h-8 w-8 text-amber-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold px-2 py-1 bg-amber-100 text-amber-800 rounded-full">
                          Call for Papers
                        </span>
                        <span className="text-xs text-gray-500">June 15, 2023</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        Call for Papers: Special Issue on Sustainable Engineering
                      </h3>
                      <p className="text-gray-700">
                        We are inviting submissions for our upcoming special issue focusing on innovative approaches to sustainable engineering practices. This special issue aims to bring together cutting-edge research on sustainable solutions across engineering disciplines.
                      </p>
                      <p className="text-gray-700 mt-2">
                        <span className="font-semibold">Submission deadline:</span> August 30, 2023
                      </p>
                      <button className="mt-4 bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-4 rounded-md shadow-sm flex items-center gap-2 text-sm">
                        <span>View Details</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* All Announcements List */}
              <section className="transform transition-all hover:shadow-lg">
                <div className="bg-gradient-to-r from-teal-600 to-teal-500 text-white p-5 rounded-t-lg flex items-center gap-3">
                  <Clipboard  className="h-6 w-6" />
                  <h2 className="text-xl font-semibold">All Announcements</h2>
                </div>
                <div className="bg-white border-t-0 rounded-b-lg shadow-md">
                  <div className="divide-y divide-gray-100">
                    {announcements.map((announcement) => (
                      <div key={announcement.id} className="p-5 hover:bg-gray-50 transition-colors">
                        <div className="flex gap-4">
                          <div className="flex-shrink-0 mt-1">
                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                              {announcement.icon}
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                                announcement.category === "Call for Papers" 
                                  ? "bg-amber-100 text-amber-800" 
                                  : announcement.category === "Journal News" 
                                    ? "bg-blue-100 text-blue-800" 
                                    : announcement.category === "Event" 
                                      ? "bg-teal-100 text-teal-800" 
                                      : "bg-red-100 text-red-800"
                              }`}>
                                {announcement.category}
                              </span>
                              <span className="text-xs text-gray-500">{announcement.date}</span>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-1">
                              {announcement.title}
                            </h3>
                            <p className="text-gray-600 text-sm">
                              {announcement.content}
                            </p>
                            <button className="mt-2 text-teal-600 hover:text-teal-800 text-sm font-medium flex items-center gap-1">
                              <span>Read more</span>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
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