export type NextGame={
    ourTime:string,
    opponent:string;
    date:string;//aqui deve ser um tipo Date
    location:string;
    time:string;//aqui deve ser um tipo Date
}


export type NextGameProps={
    nextgame:NextGame
}
