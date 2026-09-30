"use client"

import Lottie from "lottie-react"
import SucessAnimation from "@/assets/lottie-animation/Checked.json"

type ModalSucess={
    onFinish:()=>void
}

export default function sucessModal({onFinish}:ModalSucess){

    return(
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50">
            <div className=" bg-white w-80 rounded-4xl flex flex-col justify-center items-center">
            <Lottie
            animationData={SucessAnimation}
            loop={false}
            onComplete={onFinish}
            />

            </div>

        </div>
    )
}
