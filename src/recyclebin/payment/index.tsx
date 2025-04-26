import { useState } from 'react';
import { HandCoins } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter
} from '@/components/ui/table';
import Page from '@/components/helmet-page';

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Cross2Icon } from '@radix-ui/react-icons';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';

import { Separator } from '@/components/ui/separator';

export default function page() {
  const [isDialogOpen, setisDialogOpen] = useState(false);
  const invoices = [
    {
      invoice: 'Tution Fee',
      paymentStatus: 'Paid',
      totalAmount: '₹250.00',
      paymentMethod: 'Credit Card',
      payFor: 'May 2024 to June 2024'
    },
    {
      invoice: 'Exam Fee',
      paymentStatus: 'Pending',
      totalAmount: '₹150.00',
      paymentMethod: 'PayPal',
      payFor: 'May 2024 to June 2024'
    },
    {
      invoice: 'Transportation Fee',
      paymentStatus: 'Unpaid',
      totalAmount: '₹350.00',
      paymentMethod: 'Bank Transfer',
      payFor: 'May 2024 to June 2024'
    },
    {
      invoice: 'Events Fee',
      paymentStatus: 'Paid',
      totalAmount: '₹450.00',
      paymentMethod: 'Credit Card',
      payFor: 'May 2024 to June 2024'
    }
  ];

  // const handlePaymentType = (e) => {
  //   console.log('value...', e)
  //   setpaymentType(paymentTypePassed)
  //   if (paymentTypePassed === 'PART' || paymentTypePassed === 'ADVANCE') {
  //   setisDialogOpen(true)
  //   }
  // }

  const FEE_MONTH = [
    { id: 1, month: 'January' },
    { id: 2, month: 'FEBRUARY' },
    { id: 3, month: 'March' },
    { id: 4, month: 'April' },
    { id: 5, month: 'May' },
    { id: 5, month: 'June' },
    { id: 5, month: 'July' },
    { id: 5, month: 'August' },
    { id: 5, month: 'September' },
    { id: 5, month: 'October' },
    { id: 5, month: 'November' },
    { id: 5, month: 'December' }
  ];

  return (
    <Page title="Payment">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              <Card className="sm:col-span-2 " x-chunk="dashboard-05-chunk-0">
                <CardHeader className="pb-3 flex justify-center items-center">
                  <div className="grid gap-3 w-full">
                    <dl className="gap-3 flex text-xs">
                      <div className="flex-1 items-center justify-between">
                        <dt className="text-muted-foreground inline">
                          Last Payment : &nbsp;
                        </dt>
                        <dd className="text-muted-foreground inline">₹2050</dd>
                      </div>
                      <div className="flex-1 items-end justify-end text-right">
                        <dt className="text-muted-foreground inline">
                          Date : &nbsp;
                        </dt>
                        <dd className="text-muted-foreground inline">
                          10/04/2000
                        </dd>
                      </div>
                    </dl>
                  </div>
                  <Separator className="my-4" />
                  {/* <CardDescription>Pending Payment</CardDescription> */}
                  <CardTitle className="text-4xl pt-2">₹1,329</CardTitle>
                  <CardDescription className="max-w-lg text-balance leading-relaxed">
                    May 2024 to June 2024
                  </CardDescription>
                  <CardContent className="w-full text-balance leading-relaxed flex pt-2">
                    <RadioGroup className="flex space-x-4" defaultValue="FULL">
                      <div className="flex-1 flex items-center space-x-2">
                        <RadioGroupItem value="PART" id="r1" />
                        <Label htmlFor="r1">Part</Label>
                      </div>
                      <div className="flex-1 flex items-center space-x-2">
                        <RadioGroupItem value="FULL" id="r2" />
                        <Label htmlFor="r2">Full</Label>
                      </div>
                      <div className="flex-1 flex items-center space-x-2">
                        <RadioGroupItem value="ADVANCE" id="r3" />
                        <Label htmlFor="r3">Advance</Label>
                      </div>
                    </RadioGroup>
                  </CardContent>
                </CardHeader>
                <CardFooter>
                  <Dialog open={isDialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        onClick={() => setisDialogOpen(true)}
                        className="mx-auto "
                      >
                        <HandCoins className="mr-2 h-4 w-4" />
                        Pay Fee Now
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <span className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                        <Cross2Icon
                          onClick={() => setisDialogOpen(false)}
                          className="h-4 w-4"
                        />
                      </span>
                      <DialogHeader>
                        <DialogTitle>Select Upto Month</DialogTitle>
                        <DialogTitle>2000</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <RadioGroup
                          className="grid grid-cols-3 gap-2 gap-y-4"
                          defaultValue="FULL"
                        >
                          {FEE_MONTH?.map((data, index) => (
                            <div
                              key={`uptoMonth${index}`}
                              className="flex items-center gap-1"
                            >
                              <RadioGroupItem
                                value={data?.month}
                                id={`${data?.id}`}
                              />
                              <Label htmlFor={`${data?.id}`}>
                                {data?.month}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Pay</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            </div>
          </div>
          <div>
            <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
              <CardContent className="py-6 px-2 text-sm">
                <div className="font-semibold px-4">Fee Description</div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="">Fee Type</TableHead>
                      <TableHead className="">For Month</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoices.map((invoice) => (
                      <TableRow key={invoice.invoice}>
                        <TableCell className="text-xs">
                          {invoice.invoice}
                        </TableCell>
                        <TableCell className="w-[100px] text-xs">
                          {invoice.payFor}
                        </TableCell>
                        <TableCell className="font-medium text-right text-xs">
                          {invoice.totalAmount}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableCell colSpan={2}>Total</TableCell>
                      <TableCell className="text-right">₹2,500.00</TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </Page>
  );
}
