import {
  ChevronRight,
  // GlobeLock,
  // Handshake,
  // BadgeInfo,
  LogOut,
  LockKeyhole,
  Edit
} from 'lucide-react';
import { Avatar } from '@files-ui/react';
import toast from 'react-hot-toast';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Page from '@/components/helmet-page';
import { useTranslate } from '@/hooks/useTanslate';
// import { useLittleMachine } from '@/lib';
import { useStore } from '@/store';
import { ModeToggle } from '@/components/mode-toggle';
import { useState } from 'react';
import { authApi, BASE_URI } from '@/lib';
import { usePutMutation } from '@/hooks/useCustomQuery';
import EditProfile from './EditProfile';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/store/useAuth';
import { useNavigate } from 'react-router-dom';
import { Confirm } from '@/components/react-confirm-box';

export default function ProfileScreen() {
  const navigate = useNavigate()
  const { initialize } = useAuth();
  const [open, setOpen] = useState(false);
  const mutate = usePutMutation({});
  const { logout, user } = useStore();
  const [imgUrl, setImgUrl] = useState(`${BASE_URI}/${user?.imageUrl}`);

  const { i18n } = useTranslate();
  // const { actions, state } = useLittleMachine();
  const handleProfileChange = async (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImgUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);
    const formData = new FormData();
    formData.append('imageUrl', file);
    const response = await mutate.mutateAsync({
      api: authApi.updateProfileImg,
      data: formData
    });
    if (response?.data?.success) {
      toast.success(response?.data?.message);
      initialize();
    }
  };

  const handleLogout = async () => {
    Confirm('Are you sure?', 'Do you want to Logout?', async () => {
      logout()
    });
  };
  return (
    <Page title="Profile">
      <EditProfile open={open} setOpen={setOpen} title="Edit Profile" />
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <Card className="shadow-none" x-chunk="dashboard-05-chunk-1">
            <CardHeader className="pb-0"></CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <Avatar
                  label="Upload Image"
                  name="profile-image"
                  variant="circle"
                  isLoading={mutate.isPending}
                  src={imgUrl}
                  style={{ width: '140px', height: '140px' }}
                  alt={user?.fullName}
                  onChange={handleProfileChange}
                />
              </div>

              <CardTitle className="text-2xl text-center">
                {user?.fullName}
              </CardTitle>
              <CardDescription className="text-center">
                {user?.email}
              </CardDescription>
              <CardContent className="flex justify-center items-center mt-1 ">
                <Button
                  size="sm"
                  onClick={() => setOpen(true)}
                  className="space-x-3"
                >
                  <Edit size={17} /> Edit Profile
                </Button>
              </CardContent>
            </CardContent>
          </Card>
        </div>
        <div className="col-span-2">
          <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
            <CardContent className="px-6 text-sm">
              {/* <Separator className="my-4" /> */}
              <div className="grid gap-3">
                <div className="flex justify-between items-center mt-4">
                  <div className="font-semibold">{i18n.t('settingOption')}</div>
                  <div className="flex justify-between">
                    <ModeToggle />
                  </div>
                </div>
                {/* line */}
                <Separator />
                <dl className="grid gap-3 gap-y-6">
                 <div className="w-full flex"  onClick={() => navigate('/gym-app/change-password')}>
                    <div className="flex-initial">
                      <LockKeyhole className="mr-2 h-4 w-4 inline" />
                      {i18n.t('changePassword')}
                    </div>
                    <div className="flex-1 text-right">
                      <ChevronRight className="mr-2 h-4 w-4 inline" />
                    </div>
                  </div>
                  {/* <button
                    className="w-full flex"
                    onClick={() => {
                      actions.updateAction({
                        language: state.language === 'en' ? 'hi' : 'en'
                      });
                    }}
                  >
                    <div className="flex-initial">
                      <BadgeInfo className="mr-2 h-4 w-4 inline" />
                      {i18n.t('SwitchLanguage')}
                    </div>
                    <div className="flex-1 text-right">
                      <ChevronRight className="mr-2 h-4 w-4 inline" />
                    </div>
                  </button> */}
                  <button className="w-full flex" onClick={() => handleLogout()}>
                    <div className="flex-initial text-red-600">
                      {' '}
                      <LogOut className="mr-2 h-4 w-4 inline" />
                      {i18n.t('logout')}
                    </div>
                    <div className="flex-1 text-right">
                      <ChevronRight className="mr-2 h-4 w-4 inline" />
                    </div>
                  </button>
                </dl>
              </div>
            </CardContent>
            <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
              <div className="text-xs text-muted-foreground flex-1">
              GymSphere
              </div>
              <div className="text-xs text-muted-foreground text-right">
                Version 1.0.0
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Page>
  );
}
