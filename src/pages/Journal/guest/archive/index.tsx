import { Archive, Calendar, BookOpen, Search } from 'lucide-react'
import Page from '@/components/helmet-page'
import SideContent from '../sideContent'
import { Link } from 'react-router-dom'
import { useApi } from '@/hooks/useCustomQuery'
import { rkdfApi } from '@/lib'
import { useState, useEffect } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import moment from 'moment'

export default function ArchivePage() {
  const [search, setSearch] = useState<string>('')
  const [issueId, setIssueId] = useState<string>('all') // Default to 'all' instead of empty string
  const [groupedArticles, setGroupedArticles] = useState<Record<string, any[]>>({})

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearch(e.target.value)
  }

  // Only include issueId in API call if it's not 'all'
  const apiUrl = issueId === 'all'
    ? `${rkdfApi.getAllGuestPublication}?page=${1}&limit=${1000}&q=${search}`
    : `${rkdfApi.getAllGuestPublication}?page=${1}&limit=${1000}&q=${search}&issueId=${issueId}`

  const articleData = useApi<any>({
    api: apiUrl,
    // key: ['getAllArticles', search, issueId],
    options: {
      enabled: true,
    },
  })

  const issueList = useApi<any>({
    api: `${rkdfApi.getAllGuestIssue}?page=1&limit=100`,
    options: {
      enabled: true,
    },
  })

  // Group articles by year
  useEffect(() => {
    if (articleData.data?.data?.docs) {
      const grouped: Record<string, any[]> = {}

      articleData.data.data.docs.forEach((article: any) => {
        const year = new Date(article.publicationDate).getFullYear()
        if (!grouped[year]) {
          grouped[year] = []
        }
        grouped[year].push(article)
      })

      setGroupedArticles(grouped)
    }
  }, [articleData.data])

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
                {/* Header */}
                <div className="bg-gradient-to-r from-teal-600 to-teal-500 text-white p-5 rounded-t-lg flex items-center gap-3">
                  <Search className="h-6 w-6" />
                  <h2 className="text-xl font-semibold">Search Archive</h2>
                </div>

                {/* Content */}
                <div className="bg-white border-t-0 rounded-b-lg shadow-md p-6">
                  <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center">

                    {/* Icon */}
                    <div className="hidden sm:flex">
                      <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center">
                        <Search className="h-8 w-8 text-teal-600" />
                      </div>
                    </div>

                    {/* Inputs Section */}
                    <div className="flex flex-col sm:flex-row flex-wrap w-full gap-4">

                      {/* Search Input */}
                      <div className="relative w-full sm:flex-1">
                        <input
                          type="text"
                          placeholder="Search by title, author, or keyword..."
                          className="w-full pl-10 pr-4 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                          value={search}
                          onChange={handleSearchChange}
                        />
                        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      </div>

                      {/* Select Dropdown */}
                      <div className="w-full sm:w-60">
                        <Select value={issueId} onValueChange={(value) => setIssueId(value)}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Filter by issue" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Volume</SelectItem>
                            {issueList?.data?.data?.docs?.map((item: any) => (
                              <SelectItem key={item._id} value={item._id}>
                                {`${item.journal?.title} - Vol. ${item.volume}, No. ${item.issueNumber}, Year- ${moment(item?.publicationDate).format('YYYY')}`}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                    </div>
                  </div>
                </div>
              </section>


              {/* Rest of your component remains the same */}
              {/* Archive List */}
              {Object.entries(groupedArticles)
                .sort(([yearA], [yearB]) => parseInt(yearB) - parseInt(yearA))
                .map(([year, articles]) => (
                  <section key={year} className="transform transition-all hover:shadow-lg">
                    <div className="bg-gradient-to-r from-teal-600 to-teal-500 text-white p-5 rounded-t-lg flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Calendar className="h-6 w-6" />
                        <h2 className="text-xl font-semibold">{year} Issues</h2>
                      </div>
                      <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">
                        {articles.length} {articles.length === 1 ? 'article' : 'articles'}
                      </span>
                    </div>
                    <div className="bg-white border-t-0 rounded-b-lg shadow-md divide-y divide-gray-100">
                      {articles.map((article) => (
                        <div key={article._id} className="p-6 hover:bg-gray-50 transition-colors">
                          <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex-shrink-0 w-16 h-16 bg-teal-100 rounded-lg flex flex-col items-center justify-center">
                              <span className="font-bold text-teal-700">V{article.issue?.volume}</span>
                              <span className="text-xs text-teal-600">No.{article.issue?.issueNumber}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                                <Link to={`/Journal/article-view/${article._id}`} className="hover:text-teal-600">
                                  {article.title}
                                </Link>
                              </h3>
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  {new Date(article.publicationDate).toLocaleDateString('en-US', {
                                    month: 'long',
                                    year: 'numeric'
                                  })}
                                </span>
                                <span className="flex items-center gap-1">
                                  <BookOpen className="h-4 w-4" />
                                  Pages: {article.pages}
                                </span>
                              </div>
                              {article.keywords?.length > 0 && (
                                <div className="mt-2">
                                  {article.keywords.map((keyword: string) => (
                                    <span key={keyword} className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                                      {keyword}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                            <div className="flex-shrink-0">
                              <Link
                                to={`/Journal/article-view/${article._id}`}
                                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                              >
                                View Article
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                ))}

              {Object.keys(groupedArticles).length === 0 && (
                <div className="bg-white p-8 rounded-lg shadow-md text-center">
                  <p className="text-gray-500">No articles found matching your search criteria.</p>
                </div>
              )}
            </div>

            {/* Sidebar - Takes 1/3 on desktop */}
            <SideContent />
          </div>
        </main>
      </div>
    </Page>
  )
}