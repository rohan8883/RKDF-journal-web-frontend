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
import JournalForm from './JournalForm'
import { useApi, usePutMutation } from '@/hooks/useCustomQuery'
import { getErrorMessage, authApi, rkdfApi } from '@/lib'
import PaginationComponent from '@/components/pagination'
import { Separator } from '@/components/ui/separator'
import SearchBox from '@/components/search-box'
import Spinner from '@/components/loaders/Spinner'
import { Switch } from "@headlessui/react";
import toast from 'react-hot-toast'

// Define the journal list interface
interface I_JOURNAL_LIST {
  data: {
    docs: Array<{
      _id: string;
      title: string;
      description: string;
      issn: string;
      publisher: string;
      foundedYear: number;
      website: string;
      coverImage?: string;
      status?: number;
      createdAt: string;
    }>;
    totalDocs: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export default function JournalsPage() {
  const [page, setPage] = useState<number>(1)
  const mutate = usePutMutation({})
  const [perPage, setPerPage] = useState<number>(10)
  const [search, setSearch] = useState<string>('')
  const [open, setOpen] = useState(false)
  const [id, setId] = useState<string>('')
  const [edit, setEdit] = useState(false)
  
  const journalData = useApi<I_JOURNAL_LIST>({
    api: `${rkdfApi.getAllJournal}?page=${page}&limit=${perPage}&q=${search}`,
    key: 'getAllJournals',
    value: [page, perPage, search],
    options: {
      enabled: true,
    },
  })

  const handleEdit = (journalId: string) => {
    setId(journalId);
    setEdit(true);
    setOpen(true);
  };

  const handleStatusUpdate = async (journalId: string) => {
    try {
      const result = await mutate.mutateAsync({
        api: `${rkdfApi?.updateJournalStatus}/${journalId}`,
        data: {}
      });
      
      if (result?.data?.success) {
        journalData.refetch();
        if(result?.data?.data?.status === 1) {
          toast.success(result.data?.message);
        } else if(result?.data?.data?.status === 0) {
          toast.error(result.data?.message);
        }
      } else {
        toast.error(result.data?.message);
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <main className='flex-1'>
      <JournalForm
        open={open}
        setOpen={setOpen}
        title={edit ? 'Edit Journal' : 'Add Journal'}
        id={id}
        edit={edit}
        setEdit={setEdit}
        refetch={journalData.refetch}
      />
      <div className='grid auto-rows-max items-start gap-4 md:gap-2 lg:col-span-2'>
        <div className='flex w-full justify-between gap-2'>
          <div>
            <SearchBox
              search={search}
              setSearch={setSearch}
              setPage={setPage}
              refetch={journalData.refetch}
              isFetching={journalData.isLoading}
            />
          </div>
          <div>
            <Button
              className='flex items-center gap-2'
              onClick={() => {
                setId('');
                setEdit(false);
                setOpen(true);
              }}
            >
              Add New
            </Button>
          </div>
        </div>
        <Card>
          <CardHeader className='px-7'>
            <CardDescription>
              Journal List ({journalData.data?.data?.totalDocs || 0})
            </CardDescription>
          </CardHeader>
          <CardContent>
            {journalData.isLoading ? (
              <div className='flex h-32 items-center justify-center'>
                <Spinner />
              </div>
            ) : (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className=''>#</TableHead>
                      <TableHead className=''>Title</TableHead>
                      <TableHead className=''>Publisher</TableHead>
                      <TableHead className=''>ISSN</TableHead>
                      <TableHead className=''>Founded Year</TableHead>
                      <TableHead className=''>Created at</TableHead>
                      <TableHead className=''>Status</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {journalData?.data?.data?.docs?.map((journal, index) => (
                      <TableRow key={journal?._id}>
                        <TableCell>{((page * perPage) - perPage) + index + 1}</TableCell>
                        <TableCell>{journal?.title}</TableCell>
                        <TableCell>{journal?.publisher}</TableCell>
                        <TableCell>{journal?.issn}</TableCell>
                        <TableCell>{journal?.foundedYear}</TableCell>
                        <TableCell>
                          {moment(journal?.createdAt).format('DD-MM-YYYY')}
                        </TableCell>
                        <TableCell>
                          <Switch
                            checked={journal?.status === 1}
                            onChange={() => handleStatusUpdate(journal._id)}
                            className={`${
                              journal?.status === 1 ? "bg-primary" : "bg-gray-200"
                            } relative inline-flex items-center h-6 rounded-full w-11`}
                          >
                            <span className="sr-only">
                              Toggle status
                            </span>
                            <span
                              className={`${
                                journal?.status === 1 ? "translate-x-6" : "translate-x-1"
                              } inline-block w-4 h-4 transform bg-white rounded-full`}
                            />
                          </Switch>
                        </TableCell>
                        <TableCell>
                          <Button
                            onClick={() => handleEdit(journal?._id)}
                            size="sm"
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
                    totalPage={journalData?.data?.data?.totalDocs}
                    hasNextPage={journalData?.data?.data?.hasNextPage}
                    hasPrevPage={journalData?.data?.data?.hasPrevPage}
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