"use client"

import { useState ,useEffect} from "react"

export default function PasswordForgot(){
    const [cout,setcout]=useState(0)

    useEffect(()=>{
        if(cout >3){
        alert("ola deu certo")}
    },[cout])
    return(
        <div>
            <button onClick={()=>setcout(cout +1)}>clicar</button>
            <p>digiteo seu email para receber a nova senha{cout}</p>
        </div>
    )
}
