import LoanReceipt from './LoanReceipt'
import MakePayment from "./MakePayment"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Home() {
  
  return (
    <main className="min-h-screen bg-muted/30 py-8">
      <div className="container">
        <h1 className="text-3xl font-bold mb-8 text-center">Loan Management System</h1>

        <Tabs defaultValue="payment" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="payment">Make Payment</TabsTrigger>
            <TabsTrigger value="receipt">Loan Receipt</TabsTrigger>
          </TabsList>

          <TabsContent value="payment">
            <MakePayment />
          </TabsContent>

          <TabsContent value="receipt">
            <LoanReceipt />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}

