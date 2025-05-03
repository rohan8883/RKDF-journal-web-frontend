import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  open: boolean;
  setOpen: (val: boolean) => void;
  selectedUserId: string;
  roleList: any[];
  onSubmit: (roleId: string) => void;
}

export default function ChangeRoleModel({
  open,
  setOpen,
  selectedUserId,
  roleList,
  onSubmit,
}: Props) {
  const [selectedRoleId, setSelectedRoleId] = useState("");

  const handleSubmit = () => {
    if (selectedRoleId && selectedUserId) {
      onSubmit(selectedRoleId);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded bg-white p-6 shadow-lg">
          <Dialog.Title className="text-lg font-semibold mb-4">Change User Role</Dialog.Title>
          <div className="space-y-2">
            {roleList.map((role: any) => (
              <label key={role._id} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="role"
                  value={role._id}
                  checked={selectedRoleId === role._id}
                  onChange={() => setSelectedRoleId(role._id)}
                />
                <span>{role.roleName}</span>
              </label>
            ))}
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmit}>Update Role</Button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
