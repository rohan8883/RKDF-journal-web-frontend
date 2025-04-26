"use client"

import {  useRef } from "react"
import {  Download, Printer } from "lucide-react"
// import { format } from "date-fns"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
 
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import moment from 'moment';
import { useApi } from "@/hooks/useCustomQuery"
import { useParams } from "react-router-dom"
import { loanApi } from "@/lib"
// import { Calendar } from "@/components/ui/calendar"

export default function LoanReceipt() {
    const { id } = useParams();
  // const [date, setDate] = useState<Date | undefined>(new Date())
  const receiptRef = useRef<HTMLDivElement>(null)
  const { data} = useApi<any>({
    api: `${loanApi.getAllLoanById}/${id}`,
    options: {
      enabled: true
    }
  });
  // Sample loan data
  const loanData = {
    receiptNumber: "LN-2023-0042",
    status: "Active",
    borrower: {
      name: "John Doe",
      id: "ID-12345678",
      contact: "+1 (555) 123-4567",
      address: "123 Main Street, Anytown, ST 12345",
    },
    loan: {
      amount: 5000.0,
      interestRate: 8.5,
      term: 12,
      startDate: "2023-10-15",
      endDate: "2024-10-15",
      purpose: "Home Renovation",
    },
    payments: [
      { number: 1, dueDate: "2023-11-15", amount: 445.33, status: "Paid" },
      { number: 2, dueDate: "2023-12-15", amount: 445.33, status: "Paid" },
      { number: 3, dueDate: "2024-01-15", amount: 445.33, status: "Upcoming" },
      { number: 4, dueDate: "2024-02-15", amount: 445.33, status: "Upcoming" },
      { number: 5, dueDate: "2024-03-15", amount: 445.33, status: "Upcoming" },
    ],
  }
console.log(data?.loan?.user?.name ,"jkgjgjg");

  // Function to handle printing
  const handlePrint = () => {
    const printContent = document.getElementById("receipt-content")
    // const originalContents = document.body.innerHTML

    if (printContent) {
      // Create a new window for printing
      const printWindow = window.open("", "_blank")
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Loan Receipt - ${loanData.receiptNumber}</title>
              <style>
                body { font-family: Arial, sans-serif; }
                .print-container { max-width: 800px; margin: 0 auto; padding: 20px; }
                table { width: 100%; border-collapse: collapse; margin: 15px 0; }
                table, th, td { border: 1px solid #ddd; }
                th, td { padding: 8px; text-align: left; }
                th { background-color: #f2f2f2; }
                .header { display: flex; justify-content: space-between; align-items: center; }
                .section { margin-bottom: 20px; }
                .badge { display: inline-block; padding: 3px 8px; border-radius: 4px; font-size: 12px; }
                .badge-active { background-color: #22c55e; color: white; }
                .badge-paid { background-color: #22c55e; color: white; }
                .badge-upcoming { background-color: #e5e7eb; color: #374151; }
                h3 { margin-top: 20px; border-bottom: 1px solid #e5e7eb; padding-bottom: 5px; }
                .footer { margin-top: 30px; border-top: 1px solid #e5e7eb; padding-top: 15px; }
                @media print {
                  button { display: none; }
                }
              </style>
            </head>
            <body>
              <div class="print-container">
                ${printContent.innerHTML}
              </div>
            </body>
          </html>
        `)
        printWindow.document.close()
        printWindow.focus()
        printWindow.print()
        printWindow.close()
      }
    }
  }

  // Function to download as PDF
  const handleDownloadPDF = async () => {
    if (!receiptRef.current) return

    try {
      // Show loading state or notification here if needed

      const receipt = receiptRef.current
      const canvas = await html2canvas(receipt, {
        scale: 2,
        logging: false,
        useCORS: true,
      })

      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      })

      const imgWidth = 210
      const pageHeight = 297
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight
      let position = 0

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      pdf.save(`Loan_Receipt_${loanData.receiptNumber}.pdf`)
    } catch (error) {
      console.error("Error generating PDF:", error)
      // Show error notification here if needed
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card className="shadow-lg" ref={receiptRef} id="receipt-content">
        <CardHeader className="border-b">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl font-bold">Loan Receipt</CardTitle>
              <CardDescription>Loan #{data?.loan?.loanNumber ||"N/A"}</CardDescription>
            </div>
            <Badge variant={loanData.status === "Active" ? "default" : "secondary"}>{loanData.status}</Badge>
          </div>
        </CardHeader>

        <CardContent className="pt-6 space-y-6">
          {/* Borrower Information */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Borrower Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium">{data?.loan?.user?.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">ID Number</p>
                <p className="font-medium">{loanData.borrower.id}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Contact</p>
                <p className="font-medium">{data?.loan?.user?.phone} </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Address</p>
                <p className="font-medium">{data?.loan?.user?.address}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Loan Details */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Loan Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-muted/50 p-4 rounded-lg">
              <div>
                <p className="text-sm text-muted-foreground">Loan Amount</p>
                <p className="font-medium text-lg">₹{data?.loan?.amount?.toFixed(2)} </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Interest Rate</p> 
                <p className="font-medium">{data?.loan?.interestRate}%</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Term</p>
                <p className="font-medium">{data?.loan?.durationMonths} months</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Start Date</p>
                <p className="font-medium"> {moment(data?.loan?.startDate).format('DD-MM-YYYY')}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">End Date</p>
                <p className="font-medium">{moment(data?.loan?.loanEndDate).format('DD-MM-YYYY')}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Purpose of Loan</p>
                <p className="font-medium">{data?.loan?.loanType || "N/A"}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Payment Schedule */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Payment Schedule</h3>
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
                {data?.loan?.paymentSchedule.map((payment:any) => (
                  <TableRow key={payment.paymentNumber}>
                    <TableCell>{payment.paymentNumber}</TableCell>
                    <TableCell>{moment(payment.dueDate).format('DD-MM-YYYY')}</TableCell>
                    <TableCell>₹{payment.amount.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge className="capitalize" variant={payment.status === "paid" ? "success" : "outline"}>{payment.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Terms and Conditions */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Terms and Conditions</h3>
            <div className="text-sm text-muted-foreground bg-muted/50 p-4 rounded-lg">
              <p className="mb-2">1. Late payments are subject to a 2% fee of the installment amount.</p>
              <p className="mb-2">2. Early repayment is allowed with no additional fees.</p>
              <p className="mb-2">3. This loan is governed by the laws of the state.</p>
              <p>4. Failure to repay may result in legal action and affect credit score.</p>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col sm:flex-row justify-between gap-4 border-t pt-6">
          <div className="flex items-center space-x-2">
            <p className="text-sm text-muted-foreground">Issue Date:</p>
            {/* <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover> */}
          </div>
          <div className="flex space-x-2 w-full sm:w-auto">
            <Button className="w-full sm:w-auto" variant="outline" onClick={handlePrint}>
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
            <Button className="w-full sm:w-auto" onClick={handleDownloadPDF}>
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

