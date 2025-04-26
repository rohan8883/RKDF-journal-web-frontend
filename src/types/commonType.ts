export type GET_LAST_TRANSACTION_TYPE = {
  success: true;
  data: {
    _id: string;
    transactionNo: string;
    amount: number;
    paidFrom: string;
    paidUpto: string;
    studentId: string;
    paymentMode: string;
    orderId: string;
    isVerified: boolean;
    status: number;
    receiptNo: string | null;
    willReconcile: boolean;
    isReconciled: boolean;
    reconcileDate: string | null;
    createdAt: string;
    updatedAt: string;
  };
};

export type CLASS_BY_FACULTY_ID = {
  success: boolean;
  data: [
    {
      _id: string;
      className: string;
      status: number;
    }
  ];
};

export type SECTION_BY_FACULTY_ID_AND_CLASS_ID = {
  success: boolean;
  data: [
    {
      _id: string;
      sectionName: string;
      classId: string;
      status: number;
    }
  ];
};

export type SUBJECT_BY_CLASS_AND_SECTION = {
  success: boolean;
  data: [
    {
      _id: string;
      classId: string;
      sectionId: string;
      subjectCode: string;
      subjectName: string;
    }
  ];
};

export type MONTH_TYPE = {
  success: boolean;
  message: string;
  data: {
    docs: [
      {
        _id: string;
        month: string;
        status: number;
        sNo: number;
      }
    ];
  };
};
