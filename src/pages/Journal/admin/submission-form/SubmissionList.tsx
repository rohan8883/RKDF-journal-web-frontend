import { useState } from 'react'
import { useNavigate } from 'react-router-dom' // Import from react-router-dom instead
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
import SubmissionForm from './SubmissionForm'
import { useApi } from '@/hooks/useCustomQuery'
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

interface SubmissionCardProps {
  submission: any;
  index: number;
  handleViewDetails: (id: string) => void;
}

export default function SubmissionList() {
  const navigate = useNavigate() // Use navigate from react-router
  const [page, setPage] = useState<number>(1)
  const [perPage, setPerPage] = useState<number>(10)
  const [search, setSearch] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)
  const [id, setId] = useState<string>('')
  const [edit, setEdit] = useState<boolean>(false)
  // const deleteMutation = useDeleteMutation({})

  const submissionData = useApi<any>({
    api: `${rkdfApi.getAllSubmissions}?page=${page}&limit=${perPage}&q=${search}`,
    key: 'getAllSubmissions',
    value: [page, perPage, search],
    options: {
      enabled: true,
    },
  })

  const handleEdit = (id: string): void => {
    setOpen(true)
    setEdit(true)
    setId(id)
  }

  // Navigate to submission details page
  const handleViewDetails = (id: string): void => {
    navigate(`/journal/submissions/${id}`)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearch(e.target.value)
  }

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    setPage(1)
    submissionData.refetch()
  }

  // Submission card for mobile view
  const SubmissionCard: React.FC<SubmissionCardProps> = ({ submission, index, handleViewDetails }) => (
    <Card className="mb-4">
      <CardContent className="pt-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-medium">{submission?.title}</h3>
            <p className="text-sm text-gray-500">
              {submission?.journal?.title} • Submitted by {submission?.author?.fullName}
            </p>
          </div>
          <Badge variant="outline">
            {/* {format(new Date(submission?.createdAt), 'MMM d, yyyy')} */}
          </Badge>
        </div>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {submission?.abstract}
        </p>
        
        <div className="flex justify-between items-center mt-2">
          <div className="flex gap-2">
            <Button 
              size="sm" 
              onClick={() => handleEdit(submission?._id)}
              className="flex items-center gap-1"
            >
              <Edit size={14} /> Edit
            </Button>
            <Button 
              size="sm" 
              variant="destructive"
              className="flex items-center gap-1"
            >
              <Trash2 size={14} /> Delete
            </Button>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              <FileText size={14} className="mr-2" /> View Files
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => handleViewDetails(submission?._id)}
            >
              <FileText size={14} className="mr-2" /> View Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <main className="container mx-auto px-4 py-6">
      <SubmissionForm
        open={open}
        setOpen={setOpen}
        title={edit ? 'Edit Submission' : 'Add Submission'}
        id={id}
        edit={edit}
        setEdit={setEdit}
        refetch={submissionData.refetch}
      />
      
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 md:p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <CardTitle className="text-xl font-bold">
              Submission Management
            </CardTitle>
            
            <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3">
              <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Search submissions..."
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
                Add Submission
              </Button>
            </div>
          </div>

          <CardDescription className="mb-4">
            Total Submissions: {submissionData?.data?.data?.totalDocs || 0}
          </CardDescription>

          {submissionData?.isLoading ? (
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
                      <TableHead>Journal</TableHead>
                      <TableHead>Submitted By</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {submissionData?.data?.data?.docs?.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8">
                          No submissions found
                        </TableCell>
                      </TableRow>
                    ) : (
                      submissionData?.data?.data?.docs?.map((submission: any, index: number) => (
                        <TableRow key={submission?._id}>
                          <TableCell>{((page * perPage) - perPage) + index + 1}</TableCell>
                          <TableCell className="font-medium">
                            {submission?.title}
                          </TableCell>
                          <TableCell>{submission?.journal?.title}</TableCell>
                          <TableCell>{submission?.author?.fullName}</TableCell>
                         
                          <TableCell>
                            <Badge variant="outline">Pending</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="h-8 ml-auto flex items-center gap-1">
                                  Actions <ChevronDown size={14} />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleEdit(submission?._id)}>
                                  <Edit size={14} className="mr-2" /> Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 size={14} className="mr-2" /> Delete
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <FileText size={14} className="mr-2" /> View Files
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleViewDetails(submission?._id)}>
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
                {submissionData?.data?.data?.docs?.length === 0 ? (
                  <div className="text-center py-8">
                    No submissions found
                  </div>
                ) : (
                  submissionData?.data?.data?.docs?.map((submission: any, index: number) => (
                    <SubmissionCard 
                      key={submission?._id} 
                      submission={submission} 
                      index={index}
                      handleViewDetails={handleViewDetails}
                    />
                  ))
                )}
              </div>

              <Separator className="my-4" />
              
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-sm text-gray-500">
                  Showing {((page - 1) * perPage) + 1} to {Math.min(page * perPage, submissionData?.data?.data?.totalDocs || 0)} of {submissionData?.data?.data?.totalDocs || 0} entries
                </div>
                
                <PaginationComponent
                  page={page}
                  perPage={perPage}
                  totalPage={submissionData?.data?.data?.totalDocs}
                  hasNextPage={submissionData?.data?.data?.hasNextPage}
                  hasPrevPage={submissionData?.data?.data?.hasPrevPage}
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