'use client';
import { useState } from 'react';

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function BottomSheet({ open, children }: BottomSheetProps) {
  const [translateY] = useState(10);
  const [dragging] = useState(false);

  if (!open) return null;

  return (
    <>
      <div
        className={`fixed inset-0 z-99 bottom-0 left-0   bg-black/50 md:hidden transition-opacity duration-300 overflow-hidden
              ${
                open
                  ? 'opacity-100 pointer-events-auto'
                  : 'opacity-0 pointer-events-none'
              }
            `}
      >
        <div
          style={{
            transform: `translateY(${translateY}px)`,
          }}
          className={` fixed
      inset-x-0
      bottom-0
      h-dvh
      max-h-dvh
      rounded-t-3xl
      bg-gray-50
      p-3
      flex
      flex-col
            ${dragging ? '' : 'transition-transform duration-300 ease-out'}`}
        >
          <div className="flex justify-center items-center">
            <div className="h-1 w-12 rounded-full bg-gray-500" />
          </div>
          <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain overscroll-y-auto">
            <div className="flex flex-col gap-3 pb-8 ">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
