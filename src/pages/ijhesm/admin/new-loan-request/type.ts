type planData = {
  _id: string;
  planId: string;
  monthId: string;
  amount: number;
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
