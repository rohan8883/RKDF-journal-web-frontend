import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { PlusCircle, Edit, Trash2, Search, ChevronDown, FileText } from 'lucide-react'
import ArticleForm from './ArticleForm'
import { useApi } from '@/hooks/useCustomQuery'
import {rkdfApi } from '@/lib'
import PaginationComponent from '@/components/pagination'
import { Separator } from '@/components/ui/separator'
import Spinner from '@/components/loaders/Spinner'
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { format } from 'date-fns' 
import { ArticleDetail } from './ArticleDetails'

interface ArticleCardProps {
  article: any;
  index: number;
}

export default function ArticleList() {
  const [page, setPage] = useState<number>(1)
  const [perPage, setPerPage] = useState<number>(10)
  const [search, setSearch] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)
  const [id, setId] = useState<string>('')
  const [edit, setEdit] = useState<boolean>(false)
  const [detailOpen, setDetailOpen] = useState(false)
  const [selectedArticle, setSelectedArticle] = useState<any>(null)
  // const deleteMutation = useDeleteMutation({})

  const articleData = useApi<any>({
    api: `${rkdfApi.getAllArticles}?page=${page}&limit=${perPage}&q=${search}`,
    key: 'getAllArticles',
    value: [page, perPage, search],
    options: {
      enabled: true,
    },
  })

  // const handleDelete = async (id: string): Promise<void> => {
  //   try {
  //     const result = await deleteMutation.mutateAsync({
  //       api: `${rkdfApi.deleteArticle}/${id}`,
  //     })

  //     if (result?.data?.success) {
  //       toast.success(result.data?.message)
  //       articleData.refetch()
  //     } else {
  //       toast.error(result.data?.message)
  //     }
  //   } catch (error) {
  //     toast.error(getErrorMessage(error))
  //   }
  // }

  const handleEdit = (id: string): void => {
    setOpen(true)
    setEdit(true)
    setId(id)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearch(e.target.value)
  }

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    setPage(1)
    articleData.refetch()
  }

  // Article card for mobile view
  const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => (
    <Card className="mb-4">
      <CardContent className="pt-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-medium">{article?.title}</h3>
            <p className="text-sm text-gray-500">
              {article?.issue?.journal?.title} - Vol. {article?.issue?.volume}, No. {article?.issue?.issueNumber}
            </p>
          </div>
          <Badge variant="outline">
            {format(new Date(article?.publicationDate), 'MMM d, yyyy')}
          </Badge>
        </div>

        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {article.abstract}
        </p>

        {article?.keywords?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {article.keywords.map((keyword: string, i: number) => (
              <Badge key={i} variant="secondary">{keyword}</Badge>
            ))}
          </div>
        )}

        <div className="flex justify-between items-center mt-2">
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={() => handleEdit(article?._id)}
              className="flex items-center gap-1"
            >
              <Edit size={14} /> Edit
            </Button>
            <Button
              size="sm"
              variant="destructive"
              // onClick={() => handleDelete(article?._id)}
              className="flex items-center gap-1"
            >
              <Trash2 size={14} /> Delete
            </Button>
          </div>
          <Button size="sm" variant="outline">
            <FileText size={14} className="mr-2" /> View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <main className="container mx-auto px-4 py-6">
      {selectedArticle && (
        <ArticleDetail
          article={selectedArticle}
          open={detailOpen}
          onOpenChange={setDetailOpen}
        />
      )}
      <ArticleForm
        open={open}
        setOpen={setOpen}
        title={edit ? 'Edit Article' : 'Add Article'}
        id={id}
        edit={edit}
        setEdit={setEdit}
        refetch={articleData.refetch}
      />

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 md:p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <CardTitle className="text-xl font-bold">
              Article Management
            </CardTitle>

            <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3">
              <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={search}
                  onChange={handleSearchChange}
                  className="w-full h-10 pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </form>

              <Button
                className="flex items-center gap-2 whitespace-nowrap"
                onClick={() => {
                  setEdit(false)
                  setId('')
                  setOpen(true)
                }}
              >
                <PlusCircle size={18} />
                Add Article
              </Button>
            </div>
          </div>

          <CardDescription className="mb-4">
            Total Articles: {articleData.data?.data?.totalDocs || 0}
          </CardDescription>

          {articleData.isLoading ? (
            <div className="flex h-32 items-center justify-center">
              <Spinner />
            </div>
          ) : (
            <>
              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">#</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Journal/Issue</TableHead>
                      <TableHead>Publication Date</TableHead>
                      <TableHead>Pages</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {articleData?.data?.data?.docs?.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8">
                          No articles found
                        </TableCell>
                      </TableRow>
                    ) : (
                      articleData?.data?.data?.docs?.map((article: any, index: number) => (
                        <TableRow key={article?._id}>
                          <TableCell>{((page * perPage) - perPage) + index + 1}</TableCell>
                          <TableCell className="font-medium">
                            {article?.title}
                          </TableCell>
                          <TableCell>
                            {article?.issue?.journal?.title} - Vol. {article?.issue?.volume}, No. {article?.issue?.issueNumber}
                          </TableCell>
                          <TableCell>
                            {format(new Date(article?.publicationDate), 'MMM d, yyyy')}
                          </TableCell>
                          <TableCell>{article?.pages || 'N/A'}</TableCell>
                          <TableCell>{article?.status == 1 ? "Review" : 'Pending'}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="h-8 ml-auto flex items-center gap-1">
                                  Actions <ChevronDown size={14} />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleEdit(article?._id)}>
                                  <Edit size={14} className="mr-2" /> Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  // onClick={() => handleDelete(article?._id)}
                                  className="text-red-600"
                                >
                                  <Trash2 size={14} className="mr-2" /> Delete
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => {
                                  setSelectedArticle(article)
                                  setDetailOpen(true)
                                }}>
                                  <FileText size={14} className="mr-2" /> View Details
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden">
                {articleData?.data?.data?.docs?.length === 0 ? (
                  <div className="text-center py-8">
                    No articles found
                  </div>
                ) : (
                  articleData?.data?.data?.docs?.map((article: any, index: number) => (
                    <ArticleCard
                      key={article?._id}
                      article={article}
                      index={index}
                    />
                  ))
                )}
              </div>

              <Separator className="my-4" />

              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-sm text-gray-500">
                  Showing {((page - 1) * perPage) + 1} to {Math.min(page * perPage, articleData?.data?.data?.totalDocs || 0)} of {articleData?.data?.data?.totalDocs || 0} entries
                </div>

                <PaginationComponent
                  page={page}
                  perPage={perPage}
                  totalPage={articleData?.data?.data?.totalDocs}
                  hasNextPage={articleData?.data?.data?.hasNextPage}
                  hasPrevPage={articleData?.data?.data?.hasPrevPage}
                  setPage={setPage}
                  setPerPage={setPerPage}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  )
}
