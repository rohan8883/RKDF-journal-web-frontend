type planData = {
  _id: string;
  loanId: string;
  monthId: string;
  paymentAmount: number;
  status: number;
  plan: string;
  month: string;
};

export type planType = {
  success: boolean;
  data: planData;
};

export type planListType = {
  success: boolean;
  data: planData[];
};
