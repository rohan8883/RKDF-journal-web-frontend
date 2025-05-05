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
import { PlusCircle, Edit, Trash2, Search, ChevronDown } from 'lucide-react'
import IssueForm from './IssueForm'
import { useApi, } from '@/hooks/useCustomQuery'
import { rkdfApi } from '@/lib'
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

interface IssueCardProps {
  issue: any;
  index: number;
}

export default function IssueList() {
  const [page, setPage] = useState<number>(1)
  const [perPage, setPerPage] = useState<number>(10)
  const [search, setSearch] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)
  const [id, setId] = useState<string>('')
  const [edit, setEdit] = useState<boolean>(false)
  // const deleteMutation = useDeleteMutation({})

  const issueData = useApi<any>({
    api: `${rkdfApi.getAllIssue}?page=${page}&limit=${perPage}&q=${search}`,
    key: 'getAllIssues',
    value: [page, perPage, search],
    options: {
      enabled: true,
    },
  })

  // const handleDelete = async (id: string): Promise<void> => {
  //   try {
  //     const result = await deleteMutation.mutateAsync({
  //       api: `${rkdfApi.deleteIssue}/${id}`,
  //     })
      
  //     if (result?.data?.success) {
  //       toast.success(result.data?.message)
  //       issueData.refetch()
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
    issueData.refetch()
  }

  // Issue card for mobile view
  const IssueCard: React.FC<IssueCardProps> = ({ issue }) => (
    <Card className="mb-4">
      <CardContent className="pt-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-medium">{issue?.title}</h3>
            <p className="text-sm text-gray-500">
              {issue?.journal?.title} • Vol. {issue?.volume}, No. {issue?.issueNumber}
            </p>
          </div>
          <Badge variant="outline">
            {format(new Date(issue?.publicationDate), 'MMM d, yyyy')}
          </Badge>
        </div>
        
        {issue?.description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {issue.description}
          </p>
        )}
        
        <div className="flex justify-between items-center mt-2">
          <div className="flex gap-2">
            <Button 
              size="sm" 
              onClick={() => handleEdit(issue?._id)}
              className="flex items-center gap-1"
            >
              <Edit size={14} /> Edit
            </Button>
            <Button 
              size="sm" 
              variant="destructive"
              // onClick={() => handleDelete(issue?._id)}
              className="flex items-center gap-1"
            >
              <Trash2 size={14} /> Delete
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <main className="container mx-auto px-4 py-6">
      <IssueForm
        open={open}
        setOpen={setOpen}
        title={edit ? 'Edit Issue' : 'Add Issue'}
        id={id}
        edit={edit}
        setEdit={setEdit}
        refetch={issueData.refetch}
      />
      
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 md:p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <CardTitle className="text-xl font-bold">
              Issue Management
            </CardTitle>
            
            <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3">
              <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Search issues..."
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
                Add Issue
              </Button>
            </div>
          </div>

          <CardDescription className="mb-4">
            Total Issues: {issueData.data?.data?.totalDocs || 0}
          </CardDescription>

          {issueData.isLoading ? (
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
                      <TableHead>Journal</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Volume</TableHead>
                      <TableHead>Issue</TableHead>
                      <TableHead>Publication Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {issueData?.data?.data?.docs?.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8">
                          No issues found
                        </TableCell>
                      </TableRow>
                    ) : (
                      issueData?.data?.data?.docs?.map((issue:any, index:any) => (
                        <TableRow key={issue?._id}>
                          <TableCell>{((page * perPage) - perPage) + index + 1}</TableCell>
                          <TableCell className="font-medium">
                            {issue?.journal?.title}
                          </TableCell>
                          <TableCell>{issue?.title}</TableCell>
                          <TableCell>Vol. {issue?.volume}</TableCell>
                          <TableCell>No. {issue?.issueNumber}</TableCell>
                          <TableCell>
                            {format(new Date(issue?.publicationDate), 'MMM d, yyyy')}
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="h-8 ml-auto flex items-center gap-1">
                                  Actions <ChevronDown size={14} />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleEdit(issue?._id)}>
                                  <Edit size={14} className="mr-2" /> Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  // onClick={() => handleDelete(issue?._id)}
                                  className="text-red-600"
                                >
                                  <Trash2 size={14} className="mr-2" /> Delete
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
                {issueData?.data?.data?.docs?.length === 0 ? (
                  <div className="text-center py-8">
                    No issues found
                  </div>
                ) : (
                  issueData?.data?.data?.docs?.map((issue:any, index:any) => (
                    <IssueCard 
                      key={issue?._id} 
                      issue={issue} 
                      index={index} 
                    />
                  ))
                )}
              </div>

              <Separator className="my-4" />
              
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-sm text-gray-500">
                  Showing {((page - 1) * perPage) + 1} to {Math.min(page * perPage, issueData?.data?.data?.totalDocs || 0)} of {issueData?.data?.data?.totalDocs || 0} entries
                </div>
                
                <PaginationComponent
                  page={page}
                  perPage={perPage}
                  totalPage={issueData?.data?.data?.totalDocs}
                  hasNextPage={issueData?.data?.data?.hasNextPage}
                  hasPrevPage={issueData?.data?.data?.hasPrevPage}
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