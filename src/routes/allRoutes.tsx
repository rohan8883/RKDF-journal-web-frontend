import { LazyExoticComponent, Suspense, lazy, ElementType } from 'react';
import SuspenseLoader from '@/components/loaders/Spinner';

// ----------------------------------------------------------------------
const Loadable =
  (Component: LazyExoticComponent<() => JSX.Element>) =>
  (props: JSX.IntrinsicAttributes) => {
    return (
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen">
            <SuspenseLoader />
          </div>
        }
      >
        <Component {...props} />
      </Suspense>
    );
  };

const lazyWithRetries = (importer: () => Promise<{ default: ElementType }>) => {
  const retryImport = async () => {
    try {
      return await importer();
    } catch (error) {
      // window.location.reload();
    }
  };
  return Loadable(lazy(retryImport as any));
};

// -------------------------------Before auth routes--------------------------------
// const Login = lazyWithRetries(() => import('@/pages/auth/login'));
const OtpLogin = lazyWithRetries(() => import('@/pages/auth/otp-login'));
// const Register = lazyWithRetries(() => import('@/pages/auth/register'));
const ForgetPassword = lazyWithRetries(
  () => import('@/pages/auth/forget-password')
);
// -------------------------------Guest routes--------------------------------
const LandingPage = lazyWithRetries(() => import('@/pages/Journal/guest/landing'));
const About = lazyWithRetries(() => import('@/pages/Journal/guest/about'));
const News = lazyWithRetries(() => import('@/pages/Journal/guest/news'));
const Contact = lazyWithRetries(() => import('@/pages/Journal/guest/contact'));
const Privacy = lazyWithRetries(() => import('@/pages/Journal/guest/privacy'));
const EthicsPolicy = lazyWithRetries(() => import('@/pages/Journal/guest/ethicsPolicy'));
const AllPolicy = lazyWithRetries(() => import('@/pages/Journal/guest/allPolicy'));
const PubChange = lazyWithRetries(() => import('@/pages/Journal/guest/pubCharge'));
const ResearchArea = lazyWithRetries(() => import('@/pages/Journal/guest/researchArea'));
const Submissions = lazyWithRetries(() => import('@/pages/Journal/guest/submissions'));
const Archive = lazyWithRetries(() => import('@/pages/Journal/guest/archive'));
const Announcement = lazyWithRetries(() => import('@/pages/Journal/guest/announcement'));
const EditorialTeam = lazyWithRetries(() => import('@/pages/Journal/guest/editorialTeam'));
const Indexing = lazyWithRetries(() => import('@/pages/Journal/guest/indexing'));
const LoginPage = lazyWithRetries(() => import('@/pages/Journal/guest/loginPage'));
const Registration = lazyWithRetries(() => import('@/pages/Journal/guest/registration'));
const PublicationProcedure = lazyWithRetries(() => import('@/pages/Journal/guest/publicationProcedure'));



// -------------------------------Admin--------------------------------
const AdminHome = lazyWithRetries(() => import('@/pages/Journal/admin/home'));
const CreateUser = lazyWithRetries(() => import('@/pages/Journal/admin/create-user'));
const RoleMaster = lazyWithRetries(() => import('@/pages/Journal/admin/role'));
const JournalsPage = lazyWithRetries(() => import('@/pages/Journal/admin/Journal-form'));
const IssuePage = lazyWithRetries(() => import('@/pages/Journal/admin/issue'));
const SubmissionForm = lazyWithRetries(() => import('@/pages/Journal/admin/submission-form'));
const SubmissionDetails = lazyWithRetries(() => import('@/pages/Journal/admin/submission-form/SubmissionDetails'));
const ArticlePage = lazyWithRetries(() => import('@/pages/Journal/admin/article'));
const UserMaster = lazyWithRetries(() => import('@/pages/Journal/admin/users'));  
const Profile = lazyWithRetries(() => import('@/pages/Journal/admin/profile'));

 



export type Route = {
  layout: string;
  pages: {
    id: string;
    name: string;
    path: string;
    element: JSX.Element;
    exact?: boolean;
  }[];
};

const routes: Route[] = [
  {
    layout: 'auth', // before Auth
    pages: [
      {
        id: '1',
        name: 'Login',
        path: 'login',
        element: <LoginPage />
      },
      {
        id: '2',
        name: 'Register',
        path: 'registration',
        element: <Registration />
      },
      {
        id: '3',
        name: 'Forget Password',
        path: 'forget-password',
        element: <ForgetPassword />
      },
      {
        id: '4',
        name: 'Otp Login',
        path: 'otp-login',
        element: <OtpLogin />
      },
    ]
  },

  

  {
    layout: 'admin', // after Auth
    pages: [
      {
        id: '1',
        name: 'Home',
        path: 'admin-home',
        element: <AdminHome />,
        exact: true
      },
      {
        id: '2',
        name: 'Home',
        path: 'create-user',
        element: <CreateUser />,
        exact: true
      },
      {
        id: '3',
        name: 'Role',
        path: 'role-master',
        element: <RoleMaster />,
        exact: true
      },
      
      {
        id: '5',
        name: 'User',
        path: 'user',
        element: <UserMaster />,
        exact: true
      }, 
      
      {
        id: '9',
        name: 'User Profile',
        path: 'profile',
        element: <Profile />,
        exact: true
      },

      {
        id: '9',
        name: 'Journals Page',
        path: 'Journals-page',
        element: <JournalsPage />,
        exact: true
      },
      {
        id: '9',
        name: 'Issue Page',
        path: 'issue-list',
        element: <IssuePage />,
        exact: true
      },
      {
        id: '3',
        name: 'Submission Form',
        path: 'submission-form',
        element: <SubmissionForm />
      },
      {
        id: '3',
        name: 'Article',
        path: 'article',
        element: <ArticlePage />
      },
      {
        id: '3',
        name: 'Submission Details',
        path: 'submissions/:submissionId',
        element: <SubmissionDetails />
      },
    ]

  },

  {
    layout: 'guest', // Guest
    pages: [
      {
        id: '1',
        name: 'Landing Page',
        path: 'landing-page',
        element: <LandingPage />
      },
      {
        id: '2',
        name: 'Home Page',
        path: 'news',
        element: <News />
      },
      {
        id: '3',
        name: 'About Page',
        path: 'about',
        element: <About />
      },
      {
        id: '3',
        name: 'About Page',
        path: 'contact',
        element: <Contact />
      },
      {
        id: '3',
        name: 'Privacy',
        path: 'privacy',
        element: <Privacy />
      },
      {
        id: '3',
        name: 'Ethics Policy',
        path: 'ethicsPolicy',
        element: <EthicsPolicy />
      },
      {
        id: '3',
        name: 'All Policy',
        path: 'allPolicy',
        element: <AllPolicy />
      },
      {
        id: '3',
        name: 'Announcement',
        path: 'announcement',
        element: <Announcement />
      },
      {
        id: '3',
        name: 'Pub Change',
        path: 'pubChange',
        element: <PubChange />
      },
      {
        id: '3',
        name: 'Publication Procedure',
        path: 'publicationProcedure',
        element: <PublicationProcedure />
      },
      {
        id: '3',
        name: 'ResearchArea',
        path: 'researchArea',
        element: <ResearchArea />
      },
      {
        id: '3',
        name: 'Submissions',
        path: 'submissions',
        element: <Submissions />
      },
      {
        id: '3',
        name: 'Archive',
        path: 'archive',
        element: <Archive />
      },
      {
        id: '3',
        name: 'Editorial Team',
        path: 'editorialTeam',
        element: <EditorialTeam />
      },
      {
        id: '3',
        name: 'Indexing',
        path: 'indexing',
        element: <Indexing />
      },
      // {
      //   id: '3',
      //   name: 'Login',
      //   path: 'login-page',
      //   element: <LoginPage />
      // },
      // {
      //   id: '3',
      //   name: 'Registration',
      //   path: 'registration',
      //   element: <Registration />
      // },
      {
        id: '3',
        name: 'Submission Form',
        path: 'submission-form',
        element: <SubmissionForm />
      },
     
    ]
  }
];

export default routes;
