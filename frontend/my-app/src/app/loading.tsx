"use client"

import Lottie from "lottie-react"
import FootbalAnimation from "@/assets/lottie-animation/Football Bouncing.json"
export default function Loading(){
    return(

        <div className="min-h-screen flex justify-center items-center">
        <Lottie
         animationData={FootbalAnimation}
         />
        </div>
    )
}









