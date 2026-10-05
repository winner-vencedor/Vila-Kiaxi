export type LastGame={

    ourTime:string,
    opponent:string,
    ourScore:number,
    opponentScore:number,
    marcadores:{
        id:string,
        name:string,
        goal:number
    }[],
    assistentes:{
        id:string,
        name:string,
        assistencia:number
    }[]
}

export type LastGameProps={
    lastGame:LastGame
}
