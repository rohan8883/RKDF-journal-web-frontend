export const apis = {
  photoApi: 'https://api.slingacademy.com/v1/sample-data/photos',
  jsonApi: 'https://jsonplaceholder.typicode.com/posts'
} as const;

export const authApi = {
  sendOtpLogin: '/auth/send-mobile-otp',
  verifyOtpLogin: '/auth/verify-mobile-otp',
  login: '/auth/login',
  loginWithOtp: '/auth/send-otp-via-mobile',
  loginVerifyOtp: '/auth/verify-otp-and-login',
  register: '/auth/register',
  sendOtpViaEmail: '/auth/send-otp',
  verifyOtp: '/auth/verify-otp',
  resetPassword: '/auth/reset-password',
  getUser: '/user/get-user',
  updateProfileImg: '/user/upload-image-url',
  updateProfile: '/user/update-profile',
  changePassword: '/user/change-password',
  adminChangePassword: '/change-pass/change-password'
} as const;

export const loanApi = {
  // ════════════════════════════║  API OF USERS MASTER ║═════════════════════════════════
  // createUser: '/user/create-user',
  createUser: '/user/create-user-with-image',
  getAllUser: '/user/get-all-user',
  getAllUserMasterList: '/user/get-all-user-mater-list',
  getAllUserByUlb: '/user/get-all-user-by-ulb',
  updateUser: '/user/update-profile',
  deleteUser: '/user/delete-user',
  getUserById: '/user/edit',
  updateUserStatus: '/user/update-user-status',

  sendOtp: '/otp/send-otp',
  verifyEmailOtp: '/otp/verify-otp',

  createRole: '/role/create-role',
  getAllRole: '/role/get-all-role',
  getRoleById: '/role/get-role-by-id',
  updateRole: '/role/update-role',
  updateRoleStatus: '/role/update-role-status',
  deleteRole: '/role/delete-role',

  

  // users api list
  createUserswithImage: '/user/create-user-with-img',
  updateUserwithImage: '/user/update-user-with-image',

  //===========================RO SERVICE API===============================
   
  // ====================loan distribution api=====================================
    
   createLoan: "/provide-loan/create-loan",
   createPayment: "/provide-loan/make-payment",
   getAllLoans: "/provide-loan/get-all-loans",
   getAllLoanById: "/provide-loan/get-all-loans-by-id",

   createMember: '/member/create-member',
   getMember: '/member/get-member',
   updateMember: '/member/update-member',
   getAllMembers: '/member/get-members',
   deleteMember: '/member/update-member-status',

   createPlan: '/plan/create-plan',
   getAllPlan: '/plan/get-all-plan',
   getPlanById: '/plan/get-plan-by-id',
   updatePlan: '/plan/update-plan',
   updatePlanStatus: '/plan/update-plan-status',
   deletePlan: '/plan/delete-plan',

} as const;
