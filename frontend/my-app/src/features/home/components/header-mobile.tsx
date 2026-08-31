"use client"

import Image from "next/image"
import UserPhoto from "@/assets/ildinha.png"
import {Menu,Bell} from "lucide-react"
import {BottomSheet} from "@/shared/components/custom/Bottom-Sheet/bottom-sheet"
import { useState } from "react";

export default function HeaderMobile(){
      const [open, setopen] = useState(false);

    return(
        <header className=" fixed top-0 left-0 right-0 z-40 flex p-3 justify-between items-center bg-gray-200 md:hidden ">
            <div className="flex gap-2 items-center">
            <Image
            src={UserPhoto}
            alt=""
            loading="eager"
            className="w-12 h-12 rounded-full"
            priority
            />

            <div className="flex flex-col gap-1">
                <h4 className="text-xl font-medium text-gray-900">Ilda Nhanga</h4>
                <span className="text-sm font-medium text-gray-600">
                    Tues,21November2024
                </span>
            </div>
            </div>
            <div className="flex gap-2">
                 <button className=" p-2 text-gray-900  hover:text-emerald-300" >
                    <Bell/>
                </button>
                <button className="p-2 text-gray-900  hover:text-emerald-300">
                <Menu/>
                </button>

            </div>
            {/* <BottomSheet open={open} onClose={()=>setopen(false)}>
                <div className="bg-white h-full">
                <p>ol</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione exercitationem obcaecati praesentium at animi suscipit ex corrupti rerum, dolorum aliquid assumenda quibusdam reprehenderit, rem alias doloribus dolorem accusantium perspiciatis commodi.</p>
                </div>
            </BottomSheet> */}
        </header>
    )
}

