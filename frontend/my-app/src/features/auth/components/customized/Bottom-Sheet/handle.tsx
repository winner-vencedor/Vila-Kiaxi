import { useRef } from 'react';

type BottomSheetHandleProps = {
  onPointerDown: React.PointerEventHandler<HTMLDivElement>;
};

export function BottomSheetHandle({ onPointerDown }: BottomSheetHandleProps) {
  const handleRef = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={handleRef}
      onPointerDown={onPointerDown}
      className="flex justify-center pb-2"
    >
      <div className="h-1.5 w-12 rounded-full bg-gray-500" />
    </div>
  );
}
