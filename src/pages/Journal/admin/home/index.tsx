"use client"

import { useState, useEffect } from "react"
// import { useRouter} from "next/navigation"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { Download, RefreshCw } from "lucide-react"
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

// Types
interface DashboardOverview {
  counts: {
    journals: number
    activeJournals: number
    issues: number
    publishedIssues: number
    articles: number
    publishedArticles: number
    authors: number
    reviews: number
    pendingReviews: number
  }
  recentActivity: {
    articles: Array<{
      _id: string
      title: string
      status: string
      updatedAt: string
      issue: {
        volume: number
        number: number
      }
    }>
    reviews: Array<{
      _id: string
      status: string
      recommendation: string
      updatedAt: string
      article: {
        title: string
      }
      reviewer: {
        firstName: string
        lastName: string
      }
    }>
  }
}

interface JournalStatistics {
  journalsByStatus: Array<{
    status: string
    count: number
  }>
  journalsWithMostIssues: Array<{
    journalId: string
    title: string
    issueCount: number
  }>
  journalsWithMostArticles: Array<{
    journalId: string
    title: string
    articleCount: number
  }>
  journalsByYear: Array<{
    year: number
    count: number
  }>
}

interface IssueStatistics {
  issuesByStatus: Array<{
    status: string
    count: number
  }>
  issuesByYear: Array<{
    year: number
    count: number
  }>
  issuesWithMostArticles: Array<{
    issueId: string
    volume: number
    number: number
    journalTitle: string
    articleCount: number
  }>
  avgArticlesPerIssue: Array<{
    journalId: string
    journalTitle: string
    issueCount: number
    totalArticles: number
    avgArticlesPerIssue: number
  }>
}

interface ArticleStatistics {
  articlesByStatus: Array<{
    status: string
    count: number
  }>
  articlesByYear: Array<{
    year: number
    count: number
  }>
  articlesBySubject: Array<{
    subjectId: string
    subjectName: string
    count: number
  }>
  mostUsedKeywords: Array<{
    keyword: string
    count: number
  }>
}

interface AuthorStatistics {
  mostPublishedAuthors: Array<{
    authorId: string
    firstName: string
    lastName: string
    affiliation: string
    articleCount: number
  }>
  authorsByAffiliation: Array<{
    affiliation: string
    count: number
  }>
  mostCorrespondingAuthors: Array<{
    authorId: string
    firstName: string
    lastName: string
    affiliation: string
    correspondingCount: number
  }>
  authorsByYear: Array<{
    year: number
    count: number
  }>
}

interface ReviewStatistics {
  reviewsByStatus: Array<{
    status: string
    count: number
  }>
  reviewsByRecommendation: Array<{
    recommendation: string
    count: number
  }>
  avgReviewTime: {
    avgTime: number
    minTime: number
    maxTime: number
  }
  mostActiveReviewers: Array<{
    reviewerId: string
    firstName: string
    lastName: string
    affiliation: string
    reviewCount: number
    completedCount: number
    completionRate: number
  }>
}

interface JournalAnalytics {
  journal: {
    _id: string
    title: string
    issn: string
    publisher: string
    active: boolean
  }
  counts: {
    issues: number
    publishedIssues: number
    articles: number
  }
  issuesByYear: Array<{
    year: number
    count: number
  }>
  articlesByStatus: Array<{
    status: string
    count: number
  }>
  articlesByYear: Array<{
    year: number
    count: number
  }>
  topSubjects: Array<{
    subjectId: string
    subjectName: string
    count: number
  }>
  topAuthors: Array<{
    authorId: string
    firstName: string
    lastName: string
    affiliation: string
    articleCount: number
  }>
}

interface TimeBasedAnalytics {
  timeRange: {
    startDate: string
    endDate: string
  }
  counts: {
    journalsCreated: number
    issuesPublished: number
    articlesPublished: number
    reviewsCompleted: number
  }
  articlesByMonth: Array<{
    date: string
    count: number
  }>
  reviewsByMonth: Array<{
    date: string
    count: number
  }>
  avgReviewTimeByMonth: Array<{
    date: string
    avgTime: number
  }>
}

// Color palette
const COLORS = [
  "#2563eb", // blue-600
  "#0891b2", // cyan-600
  "#0d9488", // teal-600
  "#16a34a", // green-600
  "#ca8a04", // yellow-600
  "#d97706", // amber-600
  "#c2410c", // orange-700
  "#dc2626", // red-600
  "#9333ea", // purple-600
  "#db2777", // pink-600
]

// Status color mapping
const STATUS_COLORS = {
  draft: "#94a3b8", // slate-400
  submitted: "#0891b2", // cyan-600
  "in-review": "#ca8a04", // yellow-600
  accepted: "#16a34a", // green-600
  rejected: "#dc2626", // red-600
  published: "#2563eb", // blue-600
  pending: "#94a3b8", // slate-400
  "in-progress": "#ca8a04", // yellow-600
  completed: "#16a34a", // green-600
  declined: "#dc2626", // red-600
  late: "#7c3aed", // violet-600
  Active: "#16a34a", // green-600
  Inactive: "#94a3b8", // slate-400
  Published: "#16a34a", // green-600
  Unpublished: "#94a3b8", // slate-400
  accept: "#16a34a", // green-600
  "minor-revisions": "#0891b2", // cyan-600
  "major-revisions": "#ca8a04", // yellow-600
  reject: "#dc2626", // red-600
}

// Helper function to format status labels
const formatStatus = (status: string): string => {
  return status
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

export default function AnalyticsDashboard() {
  // const router = useRouter()
  // const searchParams = useSearchParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("overview")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Data states
  const [overview, setOverview] = useState<DashboardOverview | null>(null)
  const [journalStats, setJournalStats] = useState<JournalStatistics | null>(null)
  const [issueStats, setIssueStats] = useState<IssueStatistics | null>(null)
  const [articleStats, setArticleStats] = useState<ArticleStatistics | null>(null)
  const [authorStats, setAuthorStats] = useState<AuthorStatistics | null>(null)
  const [reviewStats, setReviewStats] = useState<ReviewStatistics | null>(null)
  
  // Journal-specific analytics
  const [selectedJournal, setSelectedJournal] = useState<string | null>(null)
  const [journalAnalytics, setJournalAnalytics] = useState<JournalAnalytics | null>(null)
  const [journals, setJournals] = useState<Array<{ _id: string, title: string }>>([])
  
  // Time-based analytics
  const [startDate, setStartDate] = useState<Date | undefined>(new Date(new Date().setFullYear(new Date().getFullYear() - 1)))
  const [endDate, setEndDate] = useState<Date | undefined>(new Date())
  const [timeBasedAnalytics, setTimeBasedAnalytics] = useState<TimeBasedAnalytics | null>(null)

  // Fetch journals for dropdown
  useEffect(() => {
    const fetchJournals = async () => {
      try {
        const response = await fetch("/api/journals?limit=100")
        const data = await response.json()
        if (data.success) {
          setJournals(data.data.docs.map((journal: any) => ({ _id: journal._id, title: journal.title })))
        }
      } catch (err) {
        console.error("Error fetching journals:", err)
      }
    }
    
    fetchJournals()
  }, [])

  // Fetch data based on active tab
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      
      try {
        let endpoint = ""
        
        switch (activeTab) {
          case "overview":
            endpoint = "/api/analytics/overview"
            break
          case "journals":
            endpoint = "/api/analytics/journals"
            break
          case "issues":
            endpoint = "/api/analytics/issues"
            break
          case "articles":
            endpoint = "/api/analytics/articles"
            break
          case "authors":
            endpoint = "/api/analytics/authors"
            break
          case "reviews":
            endpoint = "/api/analytics/reviews"
            break
          case "journal-specific":
            if (!selectedJournal) return
            endpoint = `/api/analytics/journals/${selectedJournal}`
            break
          case "time-based":
            const startDateParam = startDate ? format(startDate, "yyyy-MM-dd") : ""
            const endDateParam = endDate ? format(endDate, "yyyy-MM-dd") : ""
            endpoint = `/api/analytics/time-based?startDate=${startDateParam}&endDate=${endDateParam}`
            break
          default:
            endpoint = "/api/analytics/overview"
        }
        
        const response = await fetch(endpoint)
        const data = await response.json()
        
        if (!data.success) {
          throw new Error(data.message || "Failed to fetch data")
        }
        
        switch (activeTab) {
          case "overview":
            setOverview(data.data)
            break
          case "journals":
            setJournalStats(data.data)
            break
          case "issues":
            setIssueStats(data.data)
            break
          case "articles":
            setArticleStats(data.data)
            break
          case "authors":
            setAuthorStats(data.data)
            break
          case "reviews":
            setReviewStats(data.data)
            break
          case "journal-specific":
            setJournalAnalytics(data.data)
            break
          case "time-based":
            setTimeBasedAnalytics(data.data)
            break
        }
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching data")
        console.error("Error fetching data:", err)
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [activeTab, selectedJournal, startDate, endDate])

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value)
    navigate(`?tab=${value}`, { replace: true })
  }

  // Handle journal selection
  const handleJournalChange = (value: string) => {
    setSelectedJournal(value)
  }

  // Handle refresh
  const handleRefresh = () => {
    // Re-fetch data for current tab
    const currentTab = activeTab
    setActiveTab("temp")
    setTimeout(() => {
      setActiveTab(currentTab)
    }, 100)
  }

  // Handle export data
  const handleExportData = () => {
    let dataToExport: any = null
    let filename = "analytics-data.json"
    
    switch (activeTab) {
      case "overview":
        dataToExport = overview
        filename = "dashboard-overview.json"
        break
      case "journals":
        dataToExport = journalStats
        filename = "journal-statistics.json"
        break
      case "issues":
        dataToExport = issueStats
        filename = "issue-statistics.json"
        break
      case "articles":
        dataToExport = articleStats
        filename = "article-statistics.json"
        break
      case "authors":
        dataToExport = authorStats
        filename = "author-statistics.json"
        break
      case "reviews":
        dataToExport = reviewStats
        filename = "review-statistics.json"
        break
      case "journal-specific":
        dataToExport = journalAnalytics
        filename = `journal-analytics-${selectedJournal}.json`
        break
      case "time-based":
        dataToExport = timeBasedAnalytics
        filename = "time-based-analytics.json"
        break
    }
    
    if (dataToExport) {
      const jsonString = JSON.stringify(dataToExport, null, 2)
      const blob = new Blob([jsonString], { type: "application/json" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Journal Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Comprehensive analytics and insights for your academic journal management system
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={handleRefresh}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportData}>
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="mt-6">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="journals">Journals</TabsTrigger>
          <TabsTrigger value="issues">Issues</TabsTrigger>
          <TabsTrigger value="articles">Articles</TabsTrigger>
          <TabsTrigger value="authors">Authors</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="journal-specific">Journal Analytics</TabsTrigger>
          <TabsTrigger value="time-based">Time-Based</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview">
          {loading ? (
            <DashboardSkeleton />
          ) : error ? (
            <ErrorMessage message={error} />
          ) : overview ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {/* Key Metrics */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Journals</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{overview.counts.journals}</div>
                  <p className="text-xs text-muted-foreground">
                    {overview.counts.activeJournals} active ({Math.round((overview.counts.activeJournals / overview.counts.journals) * 100)}%)
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Issues</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{overview.counts.issues}</div>
                  <p className="text-xs text-muted-foreground">
                    {overview.counts.publishedIssues} published ({Math.round((overview.counts.publishedIssues / overview.counts.issues) * 100)}%)
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Articles</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{overview.counts.articles}</div>
                  <p className="text-xs text-muted-foreground">
                    {overview.counts.publishedArticles} published ({Math.round((overview.counts.publishedArticles / overview.counts.articles) * 100)}%)
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{overview.counts.reviews}</div>
                  <p className="text-xs text-muted-foreground">
                    {overview.counts.pendingReviews} pending ({Math.round((overview.counts.pendingReviews / overview.counts.reviews) * 100)}%)
                  </p>
                </CardContent>
              </Card>
              
              {/* Recent Activity */}
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>Recent Articles</CardTitle>
                  <CardDescription>Latest article updates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {overview.recentActivity.articles.map((article) => (
                      <div key={article._id} className="flex items-center">
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">{article.title}</p>
                          <p className="text-sm text-muted-foreground">
                            Vol. {article.issue.volume}, No. {article.issue.number}
                          </p>
                        </div>
                        <div className="ml-auto flex items-center">
                          <Badge
                            className="ml-2"
                            style={{ backgroundColor: STATUS_COLORS[article.status as keyof typeof STATUS_COLORS] || "#94a3b8" }}
                          >
                            {formatStatus(article.status)}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>Recent Reviews</CardTitle>
                  <CardDescription>Latest review activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {overview.recentActivity.reviews.map((review) => (
                      <div key={review._id} className="flex items-center">
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">{review.article.title}</p>
                          <p className="text-sm text-muted-foreground">
                            Reviewer: {review.reviewer.firstName} {review.reviewer.lastName}
                          </p>
                        </div>
                        <div className="ml-auto flex items-center">
                          <Badge
                            className="ml-2"
                            style={{ backgroundColor: STATUS_COLORS[review.status as keyof typeof STATUS_COLORS] || "#94a3b8" }}
                          >
                            {formatStatus(review.status)}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Summary Cards */}
              <Card className="col-span-2 md:col-span-4">
                <CardHeader>
                  <CardTitle>System Summary</CardTitle>
                  <CardDescription>Key metrics at a glance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="flex flex-col space-y-2">
                      <div className="text-sm font-medium text-muted-foreground">Journals & Issues</div>
                      <ul className="space-y-1 text-sm">
                        <li className="flex items-center justify-between">
                          <span>Journals</span>
                          <span className="font-medium">{overview.counts.journals}</span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span>Active Journals</span>
                          <span className="font-medium">{overview.counts.activeJournals}</span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span>Issues</span>
                          <span className="font-medium">{overview.counts.issues}</span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span>Published Issues</span>
                          <span className="font-medium">{overview.counts.publishedIssues}</span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span>Avg. Articles per Issue</span>
                          <span className="font-medium">
                            {(overview.counts.articles / overview.counts.issues).toFixed(1)}
                          </span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="flex flex-col space-y-2">
                      <div className="text-sm font-medium text-muted-foreground">Articles & Authors</div>
                      <ul className="space-y-1 text-sm">
                        <li className="flex items-center justify-between">
                          <span>Articles</span>
                          <span className="font-medium">{overview.counts.articles}</span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span>Published Articles</span>
                          <span className="font-medium">{overview.counts.publishedArticles}</span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span>Authors</span>
                          <span className="font-medium">{overview.counts.authors}</span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span>Avg. Authors per Article</span>
                          <span className="font-medium">
                            {(overview.counts.authors / overview.counts.articles).toFixed(1)}
                          </span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="flex flex-col space-y-2">
                      <div className="text-sm font-medium text-muted-foreground">Reviews & Performance</div>
                      <ul className="space-y-1 text-sm">
                        <li className="flex items-center justify-between">
                          <span>Reviews</span>
                          <span className="font-medium">{overview.counts.reviews}</span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span>Pending Reviews</span>
                          <span className="font-medium">{overview.counts.pendingReviews}</span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span>Completed Reviews</span>
                          <span className="font-medium">{overview.counts.reviews - overview.counts.pendingReviews}</span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span>Avg. Reviews per Article</span>
                          <span className="font-medium">
                            {(overview.counts.reviews / overview.counts.articles).toFixed(1)}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="flex h-40 items-center justify-center">
              <p className="text-muted-foreground">No data available</p>
            </div>
          )}
        </TabsContent>

        {/* Journals Tab */}
        <TabsContent value="journals">
          {loading ? (
            <DashboardSkeleton />
          ) : error ? (
            <ErrorMessage message={error} />
          ) : journalStats ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {/* Journal Status Distribution */}
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Journal Status</CardTitle>
                  <CardDescription>Distribution of journals by status</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <div className="h-[300px] w-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={journalStats.journalsByStatus}
                          dataKey="count"
                          nameKey="status"
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          label={({ status, count, percent }) => `${status}: ${count} (${(percent * 100).toFixed(0)}%)`}
                        >
                          {journalStats.journalsByStatus.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={STATUS_COLORS[entry.status as keyof typeof STATUS_COLORS] || COLORS[index % COLORS.length]} 
                            />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value, name) => [`${value} journals`, name]}
                          contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '6px', border: '1px solid #e2e8f0' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Journals by Year */}
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>Journals Created by Year</CardTitle>
                  <CardDescription>Number of journals created each year</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={journalStats.journalsByYear}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip 
                          formatter={(value) => [`${value} journals`, 'Count']}
                          contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '6px', border: '1px solid #e2e8f0' }}
                        />
                        <Bar dataKey="count" fill="#2563eb" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Journals with Most Issues */}
              <Card className="col-span-1 md:col-span-2 lg:col-span-1">
                <CardHeader>
                  <CardTitle>Journals with Most Issues</CardTitle>
                  <CardDescription>Top journals by issue count</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {journalStats.journalsWithMostIssues.map((journal, index) => (
                      <div key={journal.journalId} className="flex items-center">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-medium text-blue-600">
                          {index + 1}
                        </div>
                        <div className="ml-4 space-y-1">
                          <p className="text-sm font-medium leading-none">{journal.title}</p>
                          <p className="text-sm text-muted-foreground">{journal.issueCount} issues</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Journals with Most Articles */}
              <Card className="col-span-1 md:col-span-2 lg:col-span-2">
                <CardHeader>
                  <CardTitle>Journals with Most Articles</CardTitle>
                  <CardDescription>Top journals by article count</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart 
                        data={journalStats.journalsWithMostArticles}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis 
                          type="category" 
                          dataKey="title" 
                          width={100}
                          tick={{ fontSize: 12 }}
                        />
                        <Tooltip 
                          formatter={(value) => [`${value} articles`, 'Count']}
                          contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '6px', border: '1px solid #e2e8f0' }}
                        />
                        <Bar dataKey="articleCount" fill="#0891b2" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="flex h-40 items-center justify-center">
              <p className="text-muted-foreground">No data available</p>
            </div>
          )}
        </TabsContent>

        {/* Issues Tab */}
        <TabsContent value="issues">
          {loading ? (
            <DashboardSkeleton />
          ) : error ? (
            <ErrorMessage message={error} />
          ) : issueStats ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {/* Issue Status Distribution */}
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Issue Status</CardTitle>
                  <CardDescription>Distribution of issues by publication status</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <div className="h-[300px] w-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={issueStats.issuesByStatus}
                          dataKey="count"
                          nameKey="status"
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          label={({ status, count, percent }) => `${status}: ${count} (${(percent * 100).toFixed(0)}%)`}
                        >
                          {issueStats.issuesByStatus.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={STATUS_COLORS[entry.status as keyof typeof STATUS_COLORS] || COLORS[index % COLORS.length]} 
                            />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value, name) => [`${value} issues`, name]}
                          contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '6px', border: '1px solid #e2e8f0' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Issues by Year */}
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>Issues Published by Year</CardTitle>
                  <CardDescription>Number of issues published each year</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={issueStats.issuesByYear}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip 
                          formatter={(value) => [`${value} issues`, 'Count']}
                          contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '6px', border: '1px solid #e2e8f0' }}
                        />
                        <Bar dataKey="count" fill="#0d9488" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Issues with Most Articles */}
              <Card className="col-span-1 md:col-span-2 lg:col-span-1">
                <CardHeader>
                  <CardTitle>Issues with Most Articles</CardTitle>
                  <CardDescription>Top issues by article count</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {issueStats.issuesWithMostArticles.map((issue, index) => (
                      <div key={issue.issueId} className="flex items-center">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-100 text-sm font-medium text-teal-600">
                          {index + 1}
                        </div>
                        <div className="ml-4 space-y-1">
                          <p className="text-sm font-medium leading-none">
                            Vol. {issue.volume}, No. {issue.number}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {issue.journalTitle} • {issue.articleCount} articles
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Average Articles per Issue */}
              <Card className="col-span-1 md:col-span-2 lg:col-span-2">
                <CardHeader>
                  <CardTitle>Average Articles per Issue</CardTitle>
                  <CardDescription>By journal</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart 
                        data={issueStats.avgArticlesPerIssue}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis 
                          type="category" 
                          dataKey="journalTitle" 
                          width={100}
                          tick={{ fontSize: 12 }}
                        />
                        <Tooltip 
                          formatter={(value) => [`${Number(value).toFixed(1)} articles per issue`, 'Average']}
                          contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '6px', border: '1px solid #e2e8f0' }}
                        />
                        <Bar dataKey="avgArticlesPerIssue" fill="#16a34a" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="flex h-40 items-center justify-center">
              <p className="text-muted-foreground">No data available</p>
            </div>
          )}
        </TabsContent>

        {/* Articles Tab */}
        <TabsContent value="articles">
          {loading ? (
            <DashboardSkeleton />
          ) : error ? (
            <ErrorMessage message={error} />
          ) : articleStats ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {/* Article Status Distribution */}
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Article Status</CardTitle>
                  <CardDescription>Distribution of articles by status</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <div className="h-[300px] w-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={articleStats.articlesByStatus}
                          dataKey="count"
                          nameKey="status"
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          label={({ status, count, percent }) => 
                            `${formatStatus(status)}: ${count} (${(percent * 100).toFixed(0)}%)`
                          }
                        >
                          {articleStats.articlesByStatus.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={STATUS_COLORS[entry.status as keyof typeof STATUS_COLORS] || COLORS[index % COLORS.length]} 
                            />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value, name) => [`${value} articles`, formatStatus(name as string)]}
                          contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '6px', border: '1px solid #e2e8f0' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Articles by Year */}
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>Articles Published by Year</CardTitle>
                  <CardDescription>Number of articles published each year</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={articleStats.articlesByYear}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip 
                          formatter={(value) => [`${value} articles`, 'Count']}
                          contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '6px', border: '1px solid #e2e8f0' }}
                        />
                        <Bar dataKey="count" fill="#ca8a04" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Articles by Subject */}
              <Card className="col-span-1 md:col-span-2 lg:col-span-1">
                <CardHeader>
                  <CardTitle>Top Subjects</CardTitle>
                  <CardDescription>Most popular article subjects</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {articleStats.articlesBySubject.map((subject, index) => (
                      <div key={subject.subjectId} className="flex items-center">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100 text-sm font-medium text-yellow-600">
                          {index + 1}
                        </div>
                        <div className="ml-4 space-y-1">
                          <p className="text-sm font-medium leading-none">{subject.subjectName}</p>
                          <p className="text-sm text-muted-foreground">{subject.count} articles</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Most Used Keywords */}
              <Card className="col-span-1 md:col-span-2 lg:col-span-2">
                <CardHeader>
                  <CardTitle>Most Used Keywords</CardTitle>
                  <CardDescription>Popular keywords across all articles</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart 
                        data={articleStats.mostUsedKeywords}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis 
                          type="category" 
                          dataKey="keyword" 
                          width={100}
                          tick={{ fontSize: 12 }}
                        />
                        <Tooltip 
                          formatter={(value) => [`${value} occurrences`, 'Count']}
                          contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '6px', border: '1px solid #e2e8f0' }}
                        />
                        <Bar dataKey="count" fill="#d97706" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="flex h-40 items-center justify-center">
              <p className="text-muted-foreground">No data available</p>
            </div>
          )}
        </TabsContent>

        {/* Authors Tab */}
        <TabsContent value="authors">
          {loading ? (
            <DashboardSkeleton />
          ) : error ? (
            <ErrorMessage message={error} />
          ) : authorStats ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {/* Most Published Authors */}
              <Card className="col-span-1 md:col-span-2 lg:col-span-1">
                <CardHeader>
                  <CardTitle>Most Published Authors</CardTitle>
                  <CardDescription>Authors with most articles</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {authorStats.mostPublishedAuthors.map((author, index) => (
                      <div key={author.authorId} className="flex items-center">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-sm font-medium text-purple-600">
                          {index + 1}
                        </div>
                        <div className="ml-4 space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {author.firstName} {author.lastName}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {author.affiliation} • {author.articleCount} articles
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Authors by Affiliation */}
              <Card className="col-span-1 md:col-span-2 lg:col-span-2">
                <CardHeader>
                  <CardTitle>Authors by Affiliation</CardTitle>
                  <CardDescription>Top institutions by author count</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart 
                        data={authorStats.authorsByAffiliation}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis 
                          type="category" 
                          dataKey="affiliation" 
                          width={100}
                          tick={{ fontSize: 12 }}
                        />
                        <Tooltip 
                          formatter={(value) => [`${value} authors`, 'Count']}
                          contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '6px', border: '1px solid #e2e8f0' }}
                        />
                        <Bar dataKey="count" fill="#9333ea" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Authors by Year */}
              <Card className="col-span-1 md:col-span-2 lg:col-span-1">
                <CardHeader>
                  <CardTitle>Authors by Registration Year</CardTitle>
                  <CardDescription>New authors per year</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={authorStats.authorsByYear}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip 
                          formatter={(value) => [`${value} authors`, 'Count']}
                          contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '6px', border: '1px solid #e2e8f0' }}
                        />
                        <Bar dataKey="count" fill="#db2777" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Most Corresponding Authors */}
              <Card className="col-span-1 md:col-span-2 lg:col-span-2">
                <CardHeader>
                  <CardTitle>Most Corresponding Authors</CardTitle>
                  <CardDescription>Authors with most corresponding articles</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart 
                        data={authorStats.mostCorrespondingAuthors}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis 
                          type="category" 
                          dataKey={(data) => `${data.firstName} ${data.lastName}`}
                          width={100}
                          tick={{ fontSize: 12 }}
                        />
                        <Tooltip 
                          formatter={(value) => [`${value} corresponding articles`, 'Count']}
                          contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '6px', border: '1px solid #e2e8f0' }}
                        />
                        <Bar dataKey="correspondingCount" fill="#c2410c" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="flex h-40 items-center justify-center">
              <p className="text-muted-foreground">No data available</p>
            </div>
          )}
        </TabsContent>

        {/* Reviews Tab */}
        <TabsContent value="reviews">
          {loading ? (
            <DashboardSkeleton />
          ) : error ? (
            <ErrorMessage message={error} />
          ) : reviewStats ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {/* Review Status Distribution */}
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Review Status</CardTitle>
                  <CardDescription>Distribution of reviews by status</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <div className="h-[300px] w-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={reviewStats.reviewsByStatus}
                          dataKey="count"
                          nameKey="status"
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          label={({ status, count, percent }) => 
                            `${formatStatus(status)}: ${count} (${(percent * 100).toFixed(0)}%)`
                          }
                        >
                          {reviewStats.reviewsByStatus.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={STATUS_COLORS[entry.status as keyof typeof STATUS_COLORS] || COLORS[index % COLORS.length]} 
                            />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value, name) => [`${value} reviews`, formatStatus(name as string)]}
                          contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '6px', border: '1px solid #e2e8f0' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Review Recommendations */}
              <Card className="col-span-1 md:col-span-2 lg:col-span-1">
                <CardHeader>
                  <CardTitle>Review Recommendations</CardTitle>
                  <CardDescription>Distribution of review recommendations</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <div className="h-[300px] w-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={reviewStats.reviewsByRecommendation}
                          dataKey="count"
                          nameKey="recommendation"
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          label={({ recommendation, count, percent }) => 
                            `${formatStatus(recommendation)}: ${count} (${(percent * 100).toFixed(0)}%)`
                          }
                        >
                          {reviewStats.reviewsByRecommendation.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={STATUS_COLORS[entry.recommendation as keyof typeof STATUS_COLORS] || COLORS[index % COLORS.length]} 
                            />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value, name) => [`${value} reviews`, formatStatus(name as string)]}
                          contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '6px', border: '1px solid #e2e8f0' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Review Time */}
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Review Time</CardTitle>
                  <CardDescription>Average time to complete reviews</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center space-y-6 pt-6">
                    <div className="flex flex-col items-center">
                      <div className="text-4xl font-bold text-blue-600">
                        {reviewStats.avgReviewTime.avgTime} days
                      </div>
                      <p className="text-sm text-muted-foreground">Average review time</p>
                    </div>
                    <div className="grid w-full grid-cols-2 gap-4">
                      <div className="flex flex-col items-center rounded-lg border p-3">
                        <div className="text-xl font-semibold text-green-600">
                          {reviewStats.avgReviewTime.minTime} days
                        </div>
                        <p className="text-xs text-muted-foreground">Fastest review</p>
                      </div>
                      <div className="flex flex-col items-center rounded-lg border p-3">
                        <div className="text-xl font-semibold text-red-600">
                          {reviewStats.avgReviewTime.maxTime} days
                        </div>
                        <p className="text-xs text-muted-foreground">Slowest review</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Most Active Reviewers */}
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Most Active Reviewers</CardTitle>
                  <CardDescription>Reviewers with most completed reviews</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart 
                        data={reviewStats.mostActiveReviewers}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey={(data) => `${data.firstName} ${data.lastName}`}
                          tick={{ fontSize: 12 }}
                          interval={0}
                          angle={-45}
                          textAnchor="end"
                          height={80}
                        />
                                                   <YAxis yAxisId="left" orientation="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip 
                          formatter={(value, name) => {
                            if (name === 'Completed Reviews') {
                              return [`${value} reviews`, name];
                            } else {
                              return [`${value}%`, name];
                            }
                          }}
                          contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '6px', border: '1px solid #e2e8f0' }}
                        />
                        <Bar 
                          yAxisId="left"
                          dataKey="completedCount" 
                          name="Completed Reviews"
                          fill="#2563eb" 
                          radius={[4, 4, 0, 0]} 
                        />
                        <Bar 
                          yAxisId="right"
                          dataKey="completionRate" 
                          name="Completion Rate"
                          fill="#16a34a"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="flex h-40 items-center justify-center">
              <p className="text-muted-foreground">No data available</p>
            </div>
          )}
        </TabsContent>

        {/* Journal-Specific Analytics Tab */}
        <TabsContent value="journal-specific">
          {loading ? (
            <DashboardSkeleton />
          ) : error ? (
            <ErrorMessage message={error} />
          ) : journalAnalytics ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {/* Journal Selection */}
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Journal Analytics</CardTitle>
                  <CardDescription>Select a journal to view detailed analytics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-x-4 md:space-y-0">
                    <select
                      value={selectedJournal || ""}
                      onChange={(e) => handleJournalChange(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="">Select a journal</option>
                      {journals.map((journal) => (
                        <option key={journal._id} value={journal._id}>
                          {journal.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </CardContent>
              </Card>

              {/* Journal Summary */}
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>{journalAnalytics.journal.title}</CardTitle>
                  <CardDescription>
                    ISSN: {journalAnalytics.journal.issn} • Publisher: {journalAnalytics.journal.publisher} • 
                    Status: <Badge variant={journalAnalytics.journal.active ? "default" : "secondary"}>
                      {journalAnalytics.journal.active ? "Active" : "Inactive"}
                    </Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="flex flex-col items-center justify-center rounded-lg border p-6">
                      <div className="text-3xl font-bold">{journalAnalytics.counts.issues}</div>
                      <p className="text-sm text-muted-foreground">Total Issues</p>
                    </div>
                    <div className="flex flex-col items-center justify-center rounded-lg border p-6">
                      <div className="text-3xl font-bold">{journalAnalytics.counts.publishedIssues}</div>
                      <p className="text-sm text-muted-foreground">Published Issues</p>
                    </div>
                    <div className="flex flex-col items-center justify-center rounded-lg border p-6">
                      <div className="text-3xl font-bold">{journalAnalytics.counts.articles}</div>
                      <p className="text-sm text-muted-foreground">Total Articles</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Articles by Status */}
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Articles by Status</CardTitle>
                  <CardDescription>Distribution of articles by status</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <div className="h-[300px] w-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={journalAnalytics.articlesByStatus}
                          dataKey="count"
                          nameKey="status"
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          label={({ status, count, percent }) => 
                            `${formatStatus(status)}: ${count} (${(percent * 100).toFixed(0)}%)`
                          }
                        >
                          {journalAnalytics.articlesByStatus.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={STATUS_COLORS[entry.status as keyof typeof STATUS_COLORS] || COLORS[index % COLORS.length]} 
                            />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value, name) => [`${value} articles`, formatStatus(name as string)]}
                          contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '6px', border: '1px solid #e2e8f0' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Articles by Year */}
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>Articles by Year</CardTitle>
                  <CardDescription>Number of articles published each year</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={journalAnalytics.articlesByYear}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip 
                          formatter={(value) => [`${value} articles`, 'Count']}
                          contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '6px', border: '1px solid #e2e8f0' }}
                        />
                        <Bar dataKey="count" fill="#0891b2" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Top Subjects */}
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Top Subjects</CardTitle>
                  <CardDescription>Most common article subjects</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {journalAnalytics.topSubjects.map((subject, index) => (
                      <div key={subject.subjectId} className="flex items-center">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-100 text-sm font-medium text-cyan-600">
                          {index + 1}
                        </div>
                        <div className="ml-4 space-y-1">
                          <p className="text-sm font-medium leading-none">{subject.subjectName}</p>
                          <p className="text-sm text-muted-foreground">{subject.count} articles</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Authors */}
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>Top Authors</CardTitle>
                  <CardDescription>Authors with most articles in this journal</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart 
                        data={journalAnalytics.topAuthors}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis 
                          type="category" 
                          dataKey={(data) => `${data.firstName} ${data.lastName}`}
                          width={100}
                          tick={{ fontSize: 12 }}
                        />
                        <Tooltip 
                          formatter={(value) => [`${value} articles`, 'Count']}
                          contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '6px', border: '1px solid #e2e8f0' }}
                        />
                        <Bar dataKey="articleCount" fill="#0d9488" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="flex h-40 items-center justify-center">
              <p className="text-muted-foreground">Select a journal to view analytics</p>
            </div>
          )}
        </TabsContent>

        {/* Time-Based Analytics Tab */}
        <TabsContent value="time-based">
          {loading ? (
            <DashboardSkeleton />
          ) : error ? (
            <ErrorMessage message={error} />
          ) : timeBasedAnalytics ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {/* Date Range Selection */}
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Time-Based Analytics</CardTitle>
                  <CardDescription>Select a date range to analyze activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-x-4 md:space-y-0">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-muted-foreground mb-1">Start Date</label>
                      <input
                        type="date"
                        value={startDate ? format(startDate, 'yyyy-MM-dd') : ''}
                        onChange={(e) => setStartDate(e.target.value ? new Date(e.target.value) : undefined)}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-muted-foreground mb-1">End Date</label>
                      <input
                        type="date"
                        value={endDate ? format(endDate, 'yyyy-MM-dd') : ''}
                        onChange={(e) => setEndDate(e.target.value ? new Date(e.target.value) : undefined)}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Summary Stats */}
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Summary Statistics</CardTitle>
                  <CardDescription>
                    {format(new Date(timeBasedAnalytics.timeRange.startDate), 'MMMM d, yyyy')} - 
                    {format(new Date(timeBasedAnalytics.timeRange.endDate), 'MMMM d, yyyy')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-4">
                    <div className="flex flex-col items-center justify-center rounded-lg border p-6">
                      <div className="text-3xl font-bold">{timeBasedAnalytics.counts.journalsCreated}</div>
                      <p className="text-sm text-muted-foreground">Journals Created</p>
                    </div>
                    <div className="flex flex-col items-center justify-center rounded-lg border p-6">
                      <div className="text-3xl font-bold">{timeBasedAnalytics.counts.issuesPublished}</div>
                      <p className="text-sm text-muted-foreground">Issues Published</p>
                    </div>
                    <div className="flex flex-col items-center justify-center rounded-lg border p-6">
                      <div className="text-3xl font-bold">{timeBasedAnalytics.counts.articlesPublished}</div>
                      <p className="text-sm text-muted-foreground">Articles Published</p>
                    </div>
                    <div className="flex flex-col items-center justify-center rounded-lg border p-6">
                      <div className="text-3xl font-bold">{timeBasedAnalytics.counts.reviewsCompleted}</div>
                      <p className="text-sm text-muted-foreground">Reviews Completed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Articles by Month */}
              <Card className="col-span-1 md:col-span-2 lg:col-span-1">
                <CardHeader>
                  <CardTitle>Articles Published</CardTitle>
                  <CardDescription>By month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={timeBasedAnalytics.articlesByMonth}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="date"
                          tickFormatter={(value) => format(new Date(value), 'MMM yyyy')}
                        />
                        <YAxis />
                        <Tooltip 
                          labelFormatter={(value) => format(new Date(value), 'MMMM yyyy')}
                          formatter={(value) => [`${value} articles`, 'Count']}
                          contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '6px', border: '1px solid #e2e8f0' }}
                        />
                        <Bar dataKey="count" fill="#16a34a" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Reviews by Month */}
              <Card className="col-span-1 md:col-span-2 lg:col-span-1">
                <CardHeader>
                  <CardTitle>Reviews Completed</CardTitle>
                  <CardDescription>By month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={timeBasedAnalytics.reviewsByMonth}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="date"
                          tickFormatter={(value) => format(new Date(value), 'MMM yyyy')}
                        />
                        <YAxis />
                        <Tooltip 
                          labelFormatter={(value) => format(new Date(value), 'MMMM yyyy')}
                          formatter={(value) => [`${value} reviews`, 'Count']}
                          contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '6px', border: '1px solid #e2e8f0' }}
                        />
                        <Bar dataKey="count" fill="#2563eb" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Avg Review Time by Month */}
              <Card className="col-span-1 md:col-span-2 lg:col-span-1">
                <CardHeader>
                  <CardTitle>Average Review Time</CardTitle>
                  <CardDescription>By month (in days)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={timeBasedAnalytics.avgReviewTimeByMonth}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="date"
                          tickFormatter={(value) => format(new Date(value), 'MMM yyyy')}
                        />
                        <YAxis />
                        <Tooltip 
                          labelFormatter={(value) => format(new Date(value), 'MMMM yyyy')}
                          formatter={(value) => [`${Number(value).toFixed(1)} days`, 'Average']}
                          contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '6px', border: '1px solid #e2e8f0' }}
                        />
                        <Bar dataKey="avgTime" fill="#d97706" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="flex h-40 items-center justify-center">
              <p className="text-muted-foreground">Select a date range to view analytics</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Skeleton loader for dashboard
function DashboardSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {[...Array(8)].map((_, i) => (
        <Card key={i}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              <div className="h-4 w-24 rounded bg-gray-200"></div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-8 w-16 rounded bg-gray-200"></div>
            <div className="mt-2 h-4 w-32 rounded bg-gray-200"></div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

// Error message component
function ErrorMessage({ message }: { message: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Error</CardTitle>
        <CardDescription>Could not load data</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-red-600">{message}</div>
      </CardContent>
    </Card>
  )
}
