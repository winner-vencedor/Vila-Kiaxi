"use client"

type BottomSheetProps = {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
};


export  function BottomSheet({
    open,
    onClose,
    children
}:BottomSheetProps){
    if(!open)return null
    return(
        <>
        <div
        className={`fixed inset-0 bg-black/50 md:hidden   transition-opacity duration-300
              ${
            open
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }
            `}
        onClick={onClose}
        />
            <div className={`fixed bottom-0 left-0 w-full rounded-t-3xl bg-white p-6 shadow-2xl md:hidden  transition-transform duration-300 ease-out

          ${
            open
              ? "translate-y-0"
              : "translate-y-full"
          }`}>

            {children}
            </div>
        </>
    )
}
