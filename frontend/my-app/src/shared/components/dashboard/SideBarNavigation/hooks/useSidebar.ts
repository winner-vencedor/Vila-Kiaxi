import { createContext ,useContext} from "react"

type SidebarContextType={
    expanded:boolean,
    setexpanded:React.Dispatch<React.SetStateAction<boolean>>
}

  export const sideBarContext =createContext< SidebarContextType | undefined>(undefined)


  export function useSidebar(){
    const Expanded=useContext(sideBarContext)
     if (!Expanded) {
    throw new Error(
      "useSidebar deve ser usado dentro de SidebarContext.Provider"
    );
  }
    return Expanded

  }
