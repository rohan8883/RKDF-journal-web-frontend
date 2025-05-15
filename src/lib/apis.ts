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
  // register: '/auth/register',
  register: '/user-d/create-user',
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
  updateUserRole: '/user/update-user-role',
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

} as const;
export const rkdfApi = {
  getAllUser: '/user-d/get-all-user',
  // ════════════════════════════║  API OF JOURNAL MASTER ║═════════════════════════════════
  createJournal: '/journal/create-journals',
  getAllJournal: '/journal/get-all-journals',
  getJournalById: '/journal/get-journals-by-id',
  updateJournal: '/journal/update-journals',
  updateJournalStatus: '/journal/update-journals-status',
  deleteJournal: '/journal/delete-journals',
  // ════════════════════════════║  API OF ISSUE MASTER ║═════════════════════════════════
  createIssue: '/issue/create-issues',
  getAllIssue: '/issue/get-all-issues',
  getIssueById: '/issue/get-issues-by-id',
  updateIssue: '/issue/update-issues',
  updateIssueStatus: '/issue/update-issues-status',
  deleteIssue: '/issue/delete-issues',
  // ════════════════════════════║  API OF SUBMISSION MASTER ║═════════════════════════════════
  createSubmissions: '/submission/create-submissions',
  getAllSubmissions: '/submission/get-all-submissions',
  getSubmissionsById: '/submission/get-by-id-submissions',
  updateSubmissions: '/submission/update-submissions',
  updateSubmissionsStatus: '/submission/update-submissions-status',
  deleteSubmissions: '/submission/delete-submissions',

  getAvailableReviewers: '/user/get-all-reviewer',
  assignReviewer: '/submission/assign-reviewer',
  getReviewerMessages: '/otp/',
  submitReview: '/otp/',


  // New endpoints for review rounds
  createReviewRound: '/review-rounds/create-review-round',
  getReviewRounds: '/review-rounds/get-all-review-round',
  getReviewRoundById: '/review-rounds/get-by-id-review-round',
  updateReviewRound: '/review-rounds/update-review-round',
  deleteReviewRound: '/api/review-rounds',

  // New endpoints for reviews
  getReviews: '/review/get-all-review',
  getReviewById: '/api/reviews',
  createReview: '/review/create-review',
  updateReview: '/review/update-review',

  // ════════════════════════════║  API OF ARTICLE MASTER ║═════════════════════════════════
  createArticles: '/article/create-articles',
  getAllArticles: '/article/get-all-articles',
  getArticlesById: '/article/get-by-id-articles',
  updateArticles: '/article/update-articles',
  updateArticlesStatus: '/article/update-articles-status',
  deleteArticles: '/article/delete-articles',
  // ════════════════════════════║  API OF OTP or VERIFY EMAIL ║═════════════════════════════════
  sendOtp: '/otp/send-otp',
  verifyEmailOtp: '/otp/verify-otp',


} as const;
