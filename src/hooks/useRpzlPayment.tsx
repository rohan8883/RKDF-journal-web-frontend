import useRazorpay, { RazorpayOptions } from 'react-razorpay';

const UseRazorPay = () => {
  const [Razorpay] = useRazorpay();

  const handlePayment = async (
    order: {
      amount: number;
      orderId: string;
      departmentId?: string;
      currency?: string;
      name?: string;
      description?: string;
      image?: string;
      prefillName?: string;
      prefillEmail?: string;
      prefillContact?: string;
    },
    notes: any,
    callback: (response: any) => Promise<any>
  ) => {
    const options: RazorpayOptions = {
      key: 'rzp_test_wKHhRMLS4eUaX0', // Enter the Key ID generated from the Dashboard rzp_test_OOrMIZgN8sK1m2
      // key: 'rzp_test_NXHWEn0nSMDcnm', // Enter the Key ID generated from the Dashboard rzp_test_OOrMIZgN8sK1m2
      amount: `${order?.amount}`, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: order?.currency ?? 'INR',
      name: order?.name ?? 'Acme Corp',
      description: order?.description ?? 'Test Transaction',
      image: order?.image ?? 'https://example.com/your_logo',
      order_id: order?.orderId, //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
      handler: async (response) => {
        console.log(response);
        const res = await callback({ ...response, ...order });
        console.log('res razorpay', res);
      },
      prefill: {
        name: order?.prefillName ?? 'Piyush Garg',
        email: order?.prefillEmail ?? 'youremail@example.com',
        contact: order?.prefillContact ?? '9999999999'
      },
      notes: {
        ...notes
      },
      theme: {
        color: '#3399cc'
      }
      // redirect: true,
    };
    const rzp1 = new Razorpay(options);
    rzp1.on('payment.failed', function (response: { error: { code: string } }) {
      alert(response.error.code);
    });

    rzp1.open();
  };

  return {
    handlePayment
  };
};

export default UseRazorPay;
