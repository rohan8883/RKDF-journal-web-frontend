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
import { 
  PlusCircle, 
  Edit, 
  UserCog, 
  Search, 
  BadgeCheck, 
  XCircle,
  ChevronDown
} from 'lucide-react'
import UserForm from './UserForm'
import { useApi, usePutMutation } from '@/hooks/useCustomQuery'
import { getErrorMessage, loanApi } from '@/lib'
import { I_USER_LIST} from './type'
import PaginationComponent from '@/components/pagination'
import { Separator } from '@/components/ui/separator'
import Spinner from '@/components/loaders/Spinner'
import { Switch } from "@headlessui/react"
import toast from 'react-hot-toast'
import ChangeRoleModel from './ChangeRole'
import { Badge } from "@/components/ui/badge"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface RoleDoc {
  _id: string;
  name: string;
  status: number;
  createdAt: string;
  updatedAt: string;
}

interface RoleListResponse {
  success: boolean;
  message: string;
  data: {
    docs: RoleDoc[];
    totalDocs: number;
    limit: number;
    page: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    nextPage: number | null;
    prevPage: number | null;
  };
}

interface UserCardProps {
  index: number;
  user: any;
}


export default function HomePage() {
  const [page, setPage] = useState<number>(1)
  const mutate = usePutMutation({})
  const [perPage, setPerPage] = useState<number>(10)
  const [search, setSearch] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)
  const [id, setId] = useState<string>('')
  const [edit, setEdit] = useState<boolean>(false)
  const [changeRoleOpen, setChangeRoleOpen] = useState<boolean>(false)
  const [selectedUserId, setSelectedUserId] = useState<string>('')
  
  const userData = useApi<I_USER_LIST>({
    api: `${loanApi.getAllUser}?page=${page}&limit=${perPage}&q=${search}`,
    key: 'getAllUser',
    value: [page, perPage, search],
    options: {
      enabled: true,
    },
  })

  const roleList = useApi<RoleListResponse>({
    api: `${loanApi.getAllRole}?page=1&limit=10`,
    options: {
      enabled: true,
    },
  })

  const handelStatusUpdate = async (roleId: string): Promise<void> => {
    try {
      const result = await mutate.mutateAsync({
        api: `${loanApi?.updateUserStatus}/${roleId}`,
        data: { id: roleId }
      })
      
      if (result?.data?.success) {
        userData.refetch()
        if (result?.data?.data?.status === 1) {
          toast.success(result.data?.message)
        } else if (result?.data?.data?.status === 0) {
          toast.error(result.data?.message)
        }
      } else {
        toast.error(result.data?.message)
      }
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }

  const handleEdit = (id: string): void => {
    setOpen(true)
    setEdit(true)
    setId(id)
  }
  
  const handleChangeRole = (id: string): void => {
    setSelectedUserId(id)
    setChangeRoleOpen(true)
  }
  
  const handleRoleSubmit = async (roleId: string): Promise<void> => {
    try {
      const result = await mutate.mutateAsync({
        api: `${loanApi.updateUserRole}/${selectedUserId}`,
        data: { roleId },
      })
      
      if (result?.data?.success) {
        toast.success(result?.data?.message || 'Role updated successfully')
        userData.refetch()
        setChangeRoleOpen(false)
      } else {
        toast.error(result?.data?.message || 'Something went wrong')
      }
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearch(e.target.value)
  }

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    setPage(1)
    userData.refetch()
  }

  // User card for mobile view
  const UserCard: React.FC<UserCardProps> = (user:any ) => (
    <Card className="mb-4">
      <CardContent className="pt-4">
        <div className="flex justify-between items-center mb-2">
          <div>
            <h3 className="font-medium">{user?.fullName}</h3>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>
          <Badge variant={user?.status === 1 ? "success" : "destructive"}>
            {user?.status === 1 ? "Active" : "Inactive"}
          </Badge>
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-sm mb-3">
          <div>
            <span className="font-medium">Role:</span> {user?.role}
          </div>
          <div>
            <span className="font-medium">Mobile:</span> {user?.mobile}
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-2">
          <Switch
            checked={user?.status === 1}
            onChange={() => handelStatusUpdate(user._id)}
            className={`${user?.status === 1 ? "bg-primary" : "bg-gray-200"} relative inline-flex items-center h-6 rounded-full w-11`}
          >
            <span className="sr-only">Toggle status</span>
            <span
              className={`${user?.status === 1 ? "translate-x-6" : "translate-x-1"} inline-block w-4 h-4 transform bg-white rounded-full`}
            />
          </Switch>
          
          <div className="flex gap-2">
            <Button 
              size="sm" 
              onClick={() => handleEdit(user?._id)}
              className="flex items-center gap-1"
            >
              <Edit size={14} /> Edit
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => handleChangeRole(user?._id)}
              className="flex items-center gap-1"
            >
              <UserCog size={14} /> Role
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <main className="container mx-auto px-4 py-6">
      <ChangeRoleModel
        open={changeRoleOpen}
        setOpen={setChangeRoleOpen}
        selectedUserId={selectedUserId}
        roleList={roleList?.data?.data?.docs || []}
        onSubmit={handleRoleSubmit}
      />
      
      <UserForm
        open={open}
        setOpen={setOpen}
        title={edit ? 'Edit User' : 'Add User'}
        id={id}
        edit={edit}
        setEdit={setEdit}
        refetch={userData.refetch}
      />
      
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 md:p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <CardTitle className="text-xl font-bold">
              User Management
            </CardTitle>
            
            <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3">
              <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Search users..."
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
                Add User
              </Button>
            </div>
          </div>

          <CardDescription className="mb-4">
            Total Users: {userData.data?.data?.totalDocs || 0}
          </CardDescription>

          {userData.isLoading ? (
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
                      <TableHead>Role</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Mobile</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {userData?.data?.data?.docs?.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8">
                          No users found
                        </TableCell>
                      </TableRow>
                    ) : (
                      userData?.data?.data?.docs?.map((user, index) => (
                        <TableRow key={user?._id}>
                          <TableCell>{((page * perPage) - perPage) + index + 1}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{user?.role}</Badge>
                          </TableCell>
                          <TableCell className="font-medium">{user?.fullName}</TableCell>
                          <TableCell>{user?.mobile}</TableCell>
                          <TableCell>{user?.email}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Switch
                                checked={user?.status === 1}
                                onChange={() => handelStatusUpdate(user._id)}
                                className={`${user?.status === 1 ? "bg-primary" : "bg-gray-200"} relative inline-flex items-center h-6 rounded-full w-11 mr-2`}
                              >
                                <span className="sr-only">Toggle status</span>
                                <span
                                  className={`${user?.status === 1 ? "translate-x-6" : "translate-x-1"} inline-block w-4 h-4 transform bg-white rounded-full`}
                                />
                              </Switch>
                              {user?.status === 1 ? (
                                <span className="text-xs text-green-600 flex items-center">
                                  <BadgeCheck size={16} className="mr-1" /> Active
                                </span>
                              ) : (
                                <span className="text-xs text-red-600 flex items-center">
                                  <XCircle size={16} className="mr-1" /> Inactive
                                </span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="h-8 ml-auto flex items-center gap-1">
                                  Actions <ChevronDown size={14} />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleEdit(user?._id)}>
                                  <Edit size={14} className="mr-2" /> Edit User
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleChangeRole(user?._id)}>
                                  <UserCog size={14} className="mr-2" /> Change Role
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
                {userData?.data?.data?.docs?.length === 0 ? (
                  <div className="text-center py-8">
                    No users found
                  </div>
                ) : (
                  userData?.data?.data?.docs?.map((user:any, index) => (
                    <UserCard 
                      key={user?._id} 
                      user={user} 
                      index={index} 
                    />
                  ))
                )}
              </div>

              <Separator className="my-4" />
              
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-sm text-gray-500">
                  Showing {((page - 1) * perPage) + 1} to {Math.min(page * perPage, userData?.data?.data?.totalDocs || 0)} of {userData?.data?.data?.totalDocs || 0} entries
                </div>
                
                <PaginationComponent
                  page={page}
                  perPage={perPage}
                  totalPage={userData?.data?.data?.totalDocs}
                  hasNextPage={userData?.data?.data?.hasNextPage}
                  hasPrevPage={userData?.data?.data?.hasPrevPage}
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