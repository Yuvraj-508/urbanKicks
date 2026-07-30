import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { Trash2 } from "lucide-react";

export default function DeleteAddressDialog({
  open,
  onOpenChange,
  address,
  onDelete,
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-3xl">
        <DialogHeader>
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <Trash2 className="h-8 w-8 text-red-600" />
          </div>

          <DialogTitle className="mt-4 text-center text-2xl">
            Delete Address?
          </DialogTitle>

          <DialogDescription className="text-center">
            Are you sure you want to delete this address?

            <br />

            <span className="mt-2 block font-medium text-slate-700">
              {address?.name}
            </span>

            <span className="text-sm">
              {address?.address}
            </span>

            <br />

            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-6 flex gap-3">
          <Button
            variant="outline"
            className="flex-1 rounded-xl"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>

          <Button
            className="flex-1 rounded-xl bg-red-600 hover:bg-red-700"
            onClick={onDelete}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}