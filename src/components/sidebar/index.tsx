import HeadRoom from 'react-headroom';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Menu,
  Settings,
  EllipsisVerticalIcon,
  HomeIcon,
  LogOutIcon,
  ArrowLeft,
  List,
  CircleUserRound,
  Dumbbell,
  User
} from 'lucide-react';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger
} from '@/components/ui/menubar';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { useStore } from '@/store';
import { Image } from '../image';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

const AdminSideBar = [
  {
    icon: User,
    label: 'Add Owner',
    path: '/loan/registration-form'
  },
  {
    icon: List,
    label: 'Owners List',
    path: '/loan/owner-list'
  },
  {
    icon: User,
    label: 'Add Member',
    path: '/loan/add-member'
  },
  {
    icon: List,
    label: 'Plan Master List',
    path: '/loan/masters/plan'
  },
  {
    icon: List,
    label: 'Month Master List',
    path: '/loan/masters/month'
  },
  {
    icon: List,
    label: 'Plan Mapping List',
    path: '/loan/masters/plan-mapping'
  },
  {
    icon: List,
    label: 'Report',
    path: '/loan/month-plan-report'
  }
];
const SideBar = [

  {
    icon: User,
    label: 'Add Member',
    path: '/loan/add-member'
  },
  {
    icon: List,
    label: 'Plan Master List',
    path: '/loan/masters/plan'
  },

  {
    icon: List,
    label: 'Plan Mapping List',
    path: '/loan/masters/plan-mapping'
  },
  {
    icon: List,
    label: 'Report',
    path: '/loan/month-plan-report'
  }
];

export default function SideBarMenu({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { getTitle, logout, user } = useStore();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const equalPath = ['/loan/auth/login'];

  const handleNavigate = (path: string) => {
    navigate(path);
  };
  const currentSidebar = user?.roleId == '67193213e0e76d08635e31fb' ? AdminSideBar : SideBar;
  
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background ">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          {currentSidebar.map((item, index) => (
            <Tooltip key={index + 1}>
              <TooltipTrigger asChild>
                <Link
                  to={'/home'}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <item.icon className="h-5 w-5" />
                  <span className="sr-only">{item.label}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="text-xs">
                {item.label}
              </TooltipContent>
            </Tooltip>
          ))}
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        </nav>
      </aside>

      <div className="flex flex-col sm:gap-4">
        <HeadRoom>
          <header
            className={`flex bg-background py-3 border-b items-center gap-4 px-4 sm:px-6`}
          >
            <Sheet>
              {!equalPath?.includes(pathname) ? (
                <button
                  className="text-muted-foreground hover:text-foreground"
                  onClick={() => window.history.back()}
                >
                  <ArrowLeft className="h-6 w-6 text-primary" />
                </button>
              ) : (
                <SheetTrigger asChild className="w-8 h-8">
                  <Button size="icon" variant="outline">
                    {/* <PanelLeft className="h-5 w-5" /> */}
                    <Menu className="w-6 h-6 text-primary" />
                    <span className="sr-only">Toggle Menu</span>
                  </Button>
                </SheetTrigger>
              )}
              <SheetContent side="left" className="sm:max-w-xs">
                <nav className="grid grid-cols-1 gap-6 text-lg font-medium">
                  <div className="w-full flex justify-center items-center mt-2">
                    <div className="bg-gray-100 h-20 flex justify-center rounded-xl mt-2 lg:mt-4 dark:bg-gray-800">
                      <div className="flex items-center gap-2 p-2">
                        <Avatar className="border w-16 h-16">
                          <AvatarImage
                            alt={user?.fullName}
                            className="rounded-full border-2"
                            src={user?.imgFullPath}
                          />
                          <AvatarFallback>
                            <Image
                              alt="Avatar"
                              width={100}
                              height={100}
                              className="rounded-full"
                              src={'/Gym.png'}
                            />
                          </AvatarFallback>
                        </Avatar>

                        <div>
                          <h1 className="font-semibold text-sm w-36 truncate text-start">
                            {user?.fullName}
                          </h1>
                          <p className="text-xs text-gray-600 dark:text-gray-300 text-start w-36 truncate">
                            {user?.email}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* line */}
                  <div className="border-t border-secondary w-full" />
                  {currentSidebar.map((item, index) => (
                    <div
                      key={index + 1}
                      onClick={() => handleNavigate(item.path)}
                      className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                    >
                      <item.icon className="h-5 w-5 text-xs" />
                      <div className=" text-sm">{item.label}</div>
                    </div>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
            
            <div className="relative ml-auto flex-1 md:grow-0">
              {equalPath?.includes(pathname) ? (
                <div className="flex justify-center items-center gap-4">
                  <Dumbbell className="h-6 w-6 text-primary" />
                  <h1 className="font-semibold text-center text-lg text-primary -ml-2">
                    {user?.gymName || "Loan Distribution"}
                  </h1>
                </div>
              ) : (
                <h1 className="font-semibold text-start text-sm text-primary">
                  {getTitle}
                </h1>
              )}
            </div>
            <Menubar
              className={`border-none shadow-none bg-background rounded-full`}
            >
              <MenubarMenu>
                <MenubarTrigger
                  className={`rounded-full -mx-[1.5rem] bg-background p-2`}
                >
                  <EllipsisVerticalIcon className="h-6 w-6 text-primary" />
                </MenubarTrigger>
                <MenubarContent className="w-10">
                  <MenubarItem
                    className="flex space-x-2 items-center justify-start"
                    onClick={() => {
                      navigate('/loan');
                    }}
                  >
                    <HomeIcon className="h-5 w-5" />
                    <h1>Home</h1>
                  </MenubarItem>
                  <MenubarItem
                    className="flex space-x-2 items-center justify-start"
                    onClick={() => {
                      navigate('/loan/profile');
                    }}
                  >
                    <CircleUserRound className="h-5 w-5" />
                    <h1>Profile</h1>
                  </MenubarItem>
                  {/* <MenubarItem className="flex space-x-2 items-center justify-start">
                    <Settings className="h-5 w-5" />
                    <h1 className="text-sm">Settings</h1>
                  </MenubarItem> */}
                  <MenubarSeparator />
                  <MenubarItem
                    className="flex space-x-2 items-center justify-start"
                    onClick={() => {
                      logout();
                    }}
                  >
                    {/* logout */}
                    <LogOutIcon className="h-5 w-5 text-red-600" />
                    <h1 className="text-sm">Logout</h1>
                  </MenubarItem>
                  <MenubarSeparator />
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </header>
        </HeadRoom>
        {children}
      </div>
    </div>
  );
}
