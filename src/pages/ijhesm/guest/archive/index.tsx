import { Archive, Calendar, BookOpen, Search } from 'lucide-react'
import Page from '@/components/helmet-page'
import SideContent from '../sideContent'
import {Link} from 'react-router-dom'

// Sample archive data - replace with your actual data
const archiveData = [
  {
    year: 2023,
    issues: [
      {
        volume: '6',
        number: '4',
        date: 'December 2023',
        title: 'Special Issue on Sustainable Engineering',
        papers: 12,
        link: '/archive/2023/6/4'
      },
      {
        volume: '6',
        number: '3',
        date: 'September 2023',
        title: 'Advances in Humanities Research',
        papers: 8,
        link: '/archive/2023/6/3'
      },
      {
        volume: '6',
        number: '2',
        date: 'June 2023',
        title: 'Innovations in Science and Management',
        papers: 10,
        link: '/archive/2023/6/2'
      },
      {
        volume: '6',
        number: '1',
        date: 'March 2023',
        title: 'Emerging Technologies Edition',
        papers: 7,
        link: '/archive/2023/6/1'
      }
    ]
  },
  {
    year: 2022,
    issues: [
      {
        volume: '5',
        number: '4',
        date: 'December 2022',
        title: 'Annual Review Issue',
        papers: 15,
        link: '/archive/2022/5/4'
      },
      {
        volume: '5',
        number: '3',
        date: 'September 2022',
        title: 'Interdisciplinary Research Collection',
        papers: 9,
        link: '/archive/2022/5/3'
      }
    ]
  }
]

export default function ArchivePage() {
  return (
    <Page title="Archive">
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        {/* Header */}
        <div className="bg-teal-700 text-white py-8 shadow-md">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Archive className="h-8 w-8" />
              <h1 className="text-3xl font-bold text-center">Journal Archive</h1>
            </div>
            <p className="text-center text-teal-100 max-w-3xl mx-auto">
              Browse through our collection of past issues and publications
            </p>
          </div>
        </div>

        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content - Takes 2/3 on desktop */}
            <div className="lg:col-span-2 space-y-8">
              {/* Search Archive Section */}
              <section className="transform transition-all hover:shadow-lg">
                <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-5 rounded-t-lg flex items-center gap-3">
                  <Search className="h-6 w-6" />
                  <h2 className="text-xl font-semibold">Search Archive</h2>
                </div>
                <div className="bg-white border-t-0 rounded-b-lg shadow-md p-6">
                  <div className="flex gap-4">
                    <div className="hidden sm:block">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                        <Search className="h-8 w-8 text-blue-600" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Search by title, author, or keyword..."
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      </div>
                      <div className="flex flex-wrap gap-4 mt-4">
                        <select className="flex-1 min-w-[150px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                          <option value="">All Years</option>
                          <option value="2023">2023</option>
                          <option value="2022">2022</option>
                          <option value="2021">2021</option>
                        </select>
                        <select className="flex-1 min-w-[150px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                          <option value="">All Volumes</option>
                          <option value="6">Volume 6</option>
                          <option value="5">Volume 5</option>
                          <option value="4">Volume 4</option>
                        </select>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2">
                          <Search className="h-4 w-4" />
                          Search
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Archive List */}
              {archiveData.map((yearData) => (
                <section key={yearData.year} className="transform transition-all hover:shadow-lg">
                  <div className="bg-gradient-to-r from-teal-600 to-teal-500 text-white p-5 rounded-t-lg flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-6 w-6" />
                      <h2 className="text-xl font-semibold">{yearData.year} Issues</h2>
                    </div>
                    <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">
                      {yearData.issues.length} issues
                    </span>
                  </div>
                  <div className="bg-white border-t-0 rounded-b-lg shadow-md divide-y divide-gray-100">
                    {yearData.issues.map((issue) => (
                      <div key={`${yearData.year}-${issue.volume}-${issue.number}`} className="p-6 hover:bg-gray-50 transition-colors">
                        <div className="flex flex-col sm:flex-row gap-4">
                          <div className="flex-shrink-0 w-16 h-16 bg-teal-100 rounded-lg flex flex-col items-center justify-center">
                            <span className="font-bold text-teal-700">V{issue.volume}</span>
                            <span className="text-xs text-teal-600">No.{issue.number}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-semibold text-gray-800 mb-1">
                              <Link to={issue.link} className="hover:text-teal-600">
                                {issue.title}
                              </Link>
                            </h3>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {issue.date}
                              </span>
                              <span className="flex items-center gap-1">
                                <BookOpen className="h-4 w-4" />
                                {issue.papers} papers
                              </span>
                            </div>
                          </div>
                          <div className="flex-shrink-0">
                            <Link
                              to={issue.link}
                              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                            >
                              Browse Issue
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
            
            {/* Sidebar - Takes 1/3 on desktop */}
            <SideContent />
          </div>
        </main>
      </div>
    </Page>
  )
}