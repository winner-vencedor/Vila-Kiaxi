
interface ModalProps {
  open: boolean;
  onclose: () => void;
  children: React.ReactNode;
}

export default function Modal({ open, onclose, children }: ModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-card p-4 text-card-foreground">
        <button
          type="button"
          onClick={onclose}
          aria-label="Fechar modal"
          className="absolute right-3 top-3 text-xl text-muted-foreground hover:text-foreground"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
}
