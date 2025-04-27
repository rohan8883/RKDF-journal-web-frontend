'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { useApi } from '@/hooks/useCustomQuery';
import { loanApi } from '@/lib';
import { Separator } from '@/components/ui/separator';
import SearchBox from '@/components/search-box';
import Spinner from '@/components/loaders/Spinner';
import { useNavigate } from 'react-router-dom';

export default function LoanList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState<string>('');
  const loanData = useApi<any>({
    api: `${loanApi?.getAllLoans}`,
    key: 'getAllLoans',
    options: {
      enabled: true
    }
  });

 console.log("Loans",loanData?.data?.Loans);
 
  return (
    <main className="grid items-start m-2">
    
      <div className="grid auto-rows-max items-start gap-4 md:gap-2 lg:col-span-2">
        <div className="flex justify-between w-full gap-2">
          <div>
            <SearchBox
              search={search}
              setSearch={setSearch}
              refetch={loanData.refetch}
              isFetching={loanData.isLoading}
            />
          </div>
        
        </div>
        <Card className="">
          <CardHeader className="px-7">
            <CardDescription>
              Total Month: {loanData?.data?.data?.length}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loanData.isLoading ? (
              <div className="flex justify-center items-center h-32">
                <Spinner />
              </div>
            ) : (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="">Full Name</TableHead>
                      <TableHead className="">Mobile No.</TableHead>
                      {/* <TableHead className="">Created at</TableHead> */}
                      <TableHead className="">Status</TableHead>
                      <TableHead className="text-center">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loanData?.data?.loans?.map((item :any) => (
                      <TableRow key={item._id}>
                        <TableCell>{item.user?.name}</TableCell>
                        <TableCell>{item.user?.phone}</TableCell>
                        {/* <TableCell>
                          {moment(item.createdAt).format('DD-MM-YYYY')}
                        </TableCell> */}
                        <TableCell>
                          {item.status}
                        </TableCell>
                        <TableCell>
                        <Button
                              size={'sm'}
                              className="bg-primary"
                              onClick={() => navigate(`/loan/make-payment/${item._id}`)}
                            >
                              View
                            </Button>
                        </TableCell>
                        {/* <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              size={'sm'}
                              className="bg-primary"
                              onClick={() => handleEdit(item._id)}
                            >
                              Edit
                            </Button>
                            <Button
                              size={'sm'}
                              className={
                                item.status == 1
                                  ? 'bg-destructive'
                                  : 'bg-green-700'
                              }
                              onClick={() => deactivateMonth(item._id)}
                            >
                              {item.status == 1 ? 'Deactivate' : 'Activate'}
                            </Button>
                          </div>
                        </TableCell> */}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Separator className="mt-4 mb-2" />
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
