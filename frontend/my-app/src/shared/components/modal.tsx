
interface ModalProps {
  open: boolean;
  onclose: () => void;
  children: React.ReactNode;
}

export default function Modal({ open, children }: ModalProps) {
  return (
    <div
      className={`fixed inset-0 z-50 bg-black/50  p-30 flex justify-center items-center ${
        open ? 'opacity-100' : 'opacity-0'
      }`}
    >

      <div className="bg-gray-200 w-full h-full rounded-2xl p-3 flex flex-col justify-between   ">
        {children}

      </div>
    </div>
  );
}
