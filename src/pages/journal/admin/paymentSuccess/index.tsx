
import { Check } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
 
import moment from "moment";
import { useNavigate } from 'react-router-dom';
const SuccessPaymentModal = (props:any) => {
 const navigate = useNavigate()
      console.log("Rohan== >",props?.loanData?.payment);
      
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
        <CardHeader className="bg-green-50 flex flex-col items-center justify-center py-6">
          <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center mb-4">
            <Check className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-xl font-bold text-green-700">Payment Successful!</CardTitle>
          <CardDescription className="text-green-600">
           {props?.loanData?.message}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="py-6">
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Transaction ID</span>
              <span className="font-medium">{props?.loanData?.payment?.transactionNumber} </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Amount</span>
              <span className="font-medium">{  Math.round(props?.loanData?.payment?.amount)}</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Date</span>
              <span className="font-medium">{moment(props?.loanData?.payment?.date ).format("DD-MM-YYYY")} </span>
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
              <p className="text-sm text-blue-700">
                A receipt has been sent to your email address.
              </p>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="bg-gray-50 p-4 flex flex-col sm:flex-row gap-3">
          <Button className="w-full bg-green-600 hover:bg-green-700 text-white" >
            View Receipt Details
          </Button>
          <Button variant="outline" className="w-full border-gray-300 text-gray-700" onClick={(()=>navigate('/loan/admin-home'))}>
            Return to Dashboard
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SuccessPaymentModal;