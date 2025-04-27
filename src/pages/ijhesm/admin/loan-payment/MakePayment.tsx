"use client"
import Spinner from '@/components/loaders/Spinner'
import { useEffect, useState } from "react"
import { FormProviders, RHFTextField, ButtonLoading } from '@/components/forms'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import PaymentSuccess from '../paymentSuccess'
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useApi, usePostMutation } from '@/hooks/useCustomQuery';
import { loanApi } from '@/lib';
import moment from 'moment';
import { useParams } from "react-router-dom"
const schema = yup.object().shape({
  loanId: yup.string().nullable(),
  paymentAmount: yup.number().positive().required('Amount is required')
});
type PaymentType = yup.InferType<typeof schema>;
export default function MakePayment() {
 


  const { id } = useParams();
  const createPaymentMutation = usePostMutation({});
  const [loanDatas, setLoanData] = useState<any>(null);
  const [paymentLoanData, setPaymentLoanData] = useState<any>(null);
  const [open, setOpen] = useState(false);

  const method = useForm<PaymentType>({
    defaultValues: {
      loanId: '',
      paymentAmount: 0,
    },
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: PaymentType) => {
    try {
      const result = await createPaymentMutation.mutateAsync({
        api: loanApi.createPayment,
        data
      });
      if (result.data.success) {
        setOpen(true)
        setPaymentLoanData(result.data);
        // toast.success(result.data.message);
        // navigate(`/gym-app/success-payment/₹{result?.data.loanUpdate._id}`)

      } else {
        toast.error(result.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const { data, isLoading } = useApi<any>({
    api: `${loanApi.getAllLoanById}/${id}`,
    options: {
      enabled: true
    }
  });
  useEffect(() => {
    if (data?.success) {
      setLoanData(data);
      method.setValue('loanId', data.loan._id);
      method.setValue('paymentAmount', data.loan.monthlyPayment.toFixed(2));
    }
  }, [data, method]);
  console.log("Mutation==<>", loanDatas);

  if (isLoading) return <div className="flex justify-center items-center h-32"><Spinner /></div>;



  // Sample loan data
  const loanData = {
    receiptNumber: "LN-2023-0042",
    status: "Active",
    borrower: {
      name: "John Doe",
      id: "ID-12345678",
    },
    loan: {
      amount: 5000.0,
      interestRate: 8.5,
      term: 12,
      startDate: "2023-10-15",
      endDate: "2024-10-15",
      purpose: "Home Renovation",
      totalPaid: 890.66,
      nextPaymentDue: "2024-01-15",
      nextPaymentAmount: 445.33,
      progress: 18, // percentage of loan paid
    },
    payments: [
      { id: "PMT-001", date: "2023-11-15", amount: 445.33, method: "Credit Card", status: "Completed" },
      { id: "PMT-002", date: "2023-12-15", amount: 445.33, method: "Bank Transfer", status: "Completed" },
    ],
    upcomingPayments: [
      { number: 3, dueDate: "2024-01-15", amount: 445.33, status: "Due" },
      { number: 4, dueDate: "2024-02-15", amount: 445.33, status: "Upcoming" },
      { number: 5, dueDate: "2024-03-15", amount: 445.33, status: "Upcoming" },
    ],
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {open && <PaymentSuccess loanData={paymentLoanData} />}
        </DialogTrigger>
      </Dialog>

      <div className="max-w-6xl mx-auto p-4">
        <div className="grid gap-6 md:grid-cols-3">
          {/* Loan Summary Card */}
          <Card className="md:col-span-3">
            <CardHeader className="pb-3">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                <div>
                  <CardTitle>Loan Summary</CardTitle>
                  <CardDescription>
                    Loan #{loanDatas?.loan?.loanNumber} • {loanDatas?.loan?.user?.name}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={loanData.status === "Active" ? "default" : "secondary"}>{loanData.status}</Badge>
                  <Button variant="outline" size="sm" asChild>
                    <a href="/loan-receipt">View Full Details</a>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Loan Amount</p>
                  <p className="text-2xl font-bold">₹{loanDatas?.loan?.amount?.toFixed(2)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Total Paid</p>
                  <p className="text-2xl font-bold">₹{loanDatas?.summary?.totalPaid?.toFixed(2)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Next Payment</p>
                  <p className="text-2xl font-bold">{moment(loanDatas?.summary?.nextPaymentDue).format('DD-MM-YYYY')}</p>
                  <p className="text-sm text-muted-foreground">Due on {loanData.loan.nextPaymentDue}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Remaining Term</p>
                  <p className="text-2xl font-bold">{loanDatas?.summary?.remainingPayments} months</p>
                  <p className="text-sm text-muted-foreground">of {loanDatas?.loan?.durationMonths} months</p>
                </div>
                <div className="md:col-span-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Repayment Progress</span>
                    <span>{Math.min(loanDatas?.summary?.repaymentProgress ?? 0, 100)}%</span>
                  </div>
                  <Progress
                    value={Math.min(loanDatas?.summary?.repaymentProgress ?? 0, 100)}
                    className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Content Area */}
          <div className="md:col-span-3">
            <Tabs defaultValue={"make-payment"} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="make-payment">Make Payment</TabsTrigger>
                <TabsTrigger value="payment-history">Payment History</TabsTrigger>
              </TabsList>

              {/* Make Payment Tab */}
              {loanDatas?.loan?.status !== "paid" ?
                <TabsContent value="make-payment">
                  <Card>
                    <CardHeader>
                      <CardTitle>Make a Payment</CardTitle>
                      <CardDescription>Process your loan payment using your preferred payment method.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <FormProviders methods={method} onSubmit={method.handleSubmit(onSubmit)}>
                        <div className="grid gap-6">
                          <div className="grid gap-2">
                            <Label htmlFor="payment-amount">Payment Amount</Label>
                            <div className="relative">
                              <RHFTextField
                                name="paymentAmount"
                                label="Payable Amount"
                                placeholder="Enter Amount"
                                inputValidation={["number"]}
                              />
                            </div>
                            <div className="flex justify-between text-sm">
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="h-auto p-0 text-muted-foreground"
                              >
                                Regular Payment (₹{loanDatas?.loan?.monthlyPayment?.toFixed(2)})
                              </Button>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="h-auto p-0 text-muted-foreground"
                              >
                                Full Remaining (₹{(loanDatas?.summary?.remainingBalance)?.toFixed(2)})
                              </Button>
                            </div>
                          </div>
                          <ButtonLoading
                            type="submit"
                            className="w-full"
                            isLoading={createPaymentMutation.isPending}
                          >
                            Make Payment
                          </ButtonLoading>
                        </div>
                      </FormProviders>
                    </CardContent>
                    <CardFooter>

                    </CardFooter>
                  </Card>
                </TabsContent>
                :
                <div className="bg-white w-full shadow-lg rounded-2xl p-6 md:p-8 text-center   mx-auto mt-3 ">
                  <div className="flex justify-center mb-4">
                    <svg
                      className="w-16 h-16 text-green-500 animate-bounce"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-700 mb-2">Payment Successful</h2>
                  <p className="text-gray-500 mb-4">Your payment has already been completed.</p>
                  <button
                    className="bg-green-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-600 transition duration-200"
                  >
                    Go to Dashboard
                  </button>
                </div>
              }

              {/* Payment History Tab */}
              <TabsContent value="payment-history">
                <Card>
                  <CardHeader>
                    <CardTitle>Payment History</CardTitle>
                    <CardDescription>View all your past and upcoming payments.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {loanDatas?.loan?.paymentsMade?.length > 0 &&
                        <div>
                          <h3 className="text-lg font-medium mb-2">Past Payments</h3>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>No.</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Status</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {loanDatas?.loan?.paymentsMade?.map((payment: any) => (
                                <TableRow key={payment.paymentNumber}>
                                  <TableCell className="font-medium">{payment.paymentNumber}</TableCell>
                                  <TableCell>{moment(payment.date).format('DD-MM-YYYY')}</TableCell>
                                  <TableCell>₹{payment.amount.toFixed(2)}</TableCell>
                                  <TableCell>
                                    <Badge variant="default" className="bg-green-500 text-white">{payment.status == 'paid' && "Complete"}</Badge>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      }

                      <Separator />

                      <div>
                        <h3 className="text-lg font-medium mb-2">Upcoming Payments</h3>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>No.</TableHead>
                              <TableHead>Due Date</TableHead>
                              <TableHead>Amount</TableHead>
                              <TableHead>Status</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {loanDatas?.summary?.upcomingPayments?.map((payment: any) => (
                              <TableRow key={payment.paymentNumber}>
                                <TableCell className="font-medium">{payment.paymentNumber}</TableCell>
                                <TableCell>{moment(payment.date).format('DD-MM-YYYY')}</TableCell>
                                <TableCell>₹{payment.amount.toFixed(2)}</TableCell>
                                <TableCell>
                                  <Badge className='capitalize' variant={payment.status === "due" ? "destructive" : "outline"}>
                                    {payment.status}
                                  </Badge>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>


        </div>
      </div>
    </>
  )
}

