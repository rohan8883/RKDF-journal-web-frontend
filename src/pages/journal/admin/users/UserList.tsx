''
import { useState } from 'react'
import moment from 'moment'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import UserForm from './UserForm'
import { useApi,  usePutMutation } from '@/hooks/useCustomQuery'
import { BASE_URI, getErrorMessage, loanApi } from '@/lib'
import { I_USER_LIST } from './type'
import PaginationComponent from '@/components/pagination'
import { Separator } from '@/components/ui/separator'
import SearchBox from '@/components/search-box'
import Spinner from '@/components/loaders/Spinner'
import { Switch } from "@headlessui/react";
import toast from 'react-hot-toast'
import { Image } from '@/components/image'

export default function HomePage() {
  const [page, setPage] = useState<number>(1)
  const mutate = usePutMutation({})
  const [perPage, setPerPage] = useState<number>(10)
  const [search, setSearch] = useState<string>('')
  const [open, setOpen] = useState(false)
  const [id, setId] = useState<string>('')
  const [edit, setEdit] = useState(false)
  const userData = useApi<I_USER_LIST>({
    api: `${loanApi.getAllUser}?page=${page}&limit=${perPage}&q=${search}`,
    key: 'getAllUser',
    value: [page, perPage],
    options: {
      enabled: true,
    },
  })


  const handelStatusUpdate = async (roleId: string) => {
    try {
      const result = await mutate.mutateAsync({
        api: `${loanApi?.updateUserStatus}/${roleId}`,
        data: {
          id: roleId
        }
      });
      if (result?.data?.success) {
        userData.refetch();
        if(result?.data?.data?.status==1) {
          toast.success(result.data?.message);
        }if(result?.data?.data?.status==0){
          toast.error(result.data?.message);
        }
      } else {
        toast.error(result.data?.message);
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleEdit = (id: string) => {
    setOpen(true)
    setEdit(true)
    setId(id)
  }


  return (
    <main className='flex-1'>
      <UserForm
        open={open}
        setOpen={setOpen}
        title={edit ? 'Edit User' : 'Add User'}
        id={id}
        edit={edit}
        setEdit={setEdit}
        refetch={userData.refetch}
      />
      <div className='grid auto-rows-max items-start gap-4 md:gap-2 lg:col-span-2'>
        <div className='flex w-full justify-between gap-2'>
          <div>
            <SearchBox
              search={search}
              setSearch={setSearch}
              setPage={setPage}
              refetch={userData.refetch}
              isFetching={userData.isLoading}
            />
          </div>
          <div>
            <Button
              className='flex items-center gap-2'
              onClick={() => setOpen(true)}
            >
              Add New
            </Button>
          </div>
        </div>
        {/* <Card className='w-full overflow-scroll'> */}
        <Card >
          <CardHeader className='px-7'>
            <CardDescription>
              User List ({userData.data?.data?.totalDocs})
            </CardDescription>
          </CardHeader>
          <CardContent>
            {userData.isLoading ? (
              <div className='flex h-32 items-center justify-center'>
                <Spinner />
              </div>
            ) : (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className=''>#</TableHead>
                      <TableHead className=''>Image</TableHead>
                      <TableHead className=''>User Name</TableHead>
                      <TableHead className=''>Mobile</TableHead>
                      <TableHead className=''>Email</TableHead>
                      <TableHead className=''>Created at</TableHead>
                      <TableHead className=''>Status</TableHead>
                      {/* <TableHead>Action</TableHead> */}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {userData?.data?.data?.docs?.map((user, index) => (
                      <TableRow key={user?._id}>
                        <TableCell>{((page * perPage) - perPage) + index + 1}</TableCell>
                        <TableCell>
                          <Image
                            src={`${BASE_URI}/${user?.imageUrl}`}
                            alt={user?.fullName}
                            width={50}
                            height={50}
                          />
                        </TableCell>
                        <TableCell>{user?.fullName}</TableCell>
                        <TableCell>{user?.mobile}</TableCell>
                        <TableCell>{user?.email}</TableCell>
                       
                        <TableCell>
                          {moment(user?.createdAt).format('DD-MM-YYYY')}
                        </TableCell>
                        <TableCell>
                        <Switch
                            checked={user?.status == 1}
                            onChange={() => handelStatusUpdate(user._id)}
                            className={`${
                              user?.status ? "bg-primary" : "bg-gray-200"
                            } relative inline-flex items-center h-6 rounded-full w-11`}
                          >
                            <span className="sr-only">
                              Enable notifications
                            </span>
                            <span
                              className={`${
                                user?.status ? "translate-x-6" : "translate-x-1"
                              } inline-block w-4 h-4 transform bg-white rounded-full`}
                            />
                          </Switch>
                        </TableCell>
                        <TableCell>
                          <Button
                            onClick={() => handleEdit(user?._id)}
                          >
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Separator className='mb-2 mt-4' />
                <div className='flex w-full justify-end'>
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
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
