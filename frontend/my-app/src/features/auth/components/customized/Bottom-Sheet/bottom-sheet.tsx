'use client';
import { useState, useEffect, useRef } from 'react';
import { BottomSheetHandle } from '@/features/auth/components/customized/Bottom-Sheet/handle';
import {
  CLOSE_THRESHOLD,
  SNAP_POINTS,
} from '@/features/auth/components/customized/Bottom-Sheet/constants';

type BottomSheetProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export function BottomSheet({ open, onClose, children }: BottomSheetProps) {
  const startY = useRef(0);
  const startTranslateY = useRef(SNAP_POINTS.HALF);
  const [translateY, setTranslateY] = useState(SNAP_POINTS.HALF);
  const [dragging, setDragging] = useState(false);

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    setDragging(true);

    startY.current = event.clientY;
    startTranslateY.current = translateY;

    setDragging(true);
  }

  useEffect(() => {
    if (!open || !dragging) return;

    function onPointerMove(event: PointerEvent) {
      const distance = event.clientY - startY.current;
      const newPosition = startTranslateY.current + distance;

      const limitedPosition = Math.max(
        SNAP_POINTS.EXPANDED,
        Math.min(newPosition, CLOSE_THRESHOLD)
      );
      setTranslateY(limitedPosition);
    }

    function onPointerUp() {
      setDragging(false);

      if (translateY >= CLOSE_THRESHOLD) {
        setTranslateY(SNAP_POINTS.HALF);
        onClose();
        return;
      }
      if (translateY < 150) {
        setTranslateY(SNAP_POINTS.EXPANDED);

        return;
      }

      if (translateY < 430) {
        setTranslateY(SNAP_POINTS.HALF);

        return;
      }

      setTranslateY(SNAP_POINTS.COLLAPSED);
    }

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, [open, dragging, translateY, onClose]);

  useEffect(() => {
    function handleEsc(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  if (!open) return null;
  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 md:hidden transition-opacity duration-300
              ${
                open
                  ? 'opacity-100 pointer-events-auto'
                  : 'opacity-0 pointer-events-none'
              }
            `}
        onClick={onClose}
      />
      <div
        style={{
          transform: `translateY(${translateY}px)`,
        }}
        className={`fixed bottom-0 left-0 w-full rounded-t-3xl bg-white p-6 shadow-2xl md:hidden touch-none select-none
            ${dragging ? '' : 'transition-transform duration-300 ease-out'}`}
      >
        <div className="flex justify-center pb-0">
          <BottomSheetHandle onPointerDown={handlePointerDown} />
        </div>
        {children}
      </div>
    </>
  );
}
