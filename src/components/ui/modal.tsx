import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "./button";

export function Modal({
  open,
  onOpenChange,
  title,
  value,
  onChange,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  value: string;
  onChange: (val: string) => void;
  onSubmit: () => void;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />
        <Dialog.Content className="fixed left-1/2 top-1/2 w-[90vw] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg">
          <Dialog.Title className="text-lg font-medium mb-2">{title}</Dialog.Title>
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full border px-3 py-2 rounded mb-4"
            placeholder="Nhập nội dung..."
          />
          <div className="flex justify-end gap-2">
            <Dialog.Close asChild>
              <Button variant="outline">Hủy</Button>
            </Dialog.Close>
            <Button onClick={onSubmit}>Lưu</Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
