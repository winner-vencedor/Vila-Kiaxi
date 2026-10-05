export type LastGameHistory={
    id:string;
    data:string;//deve vir tipo de data
    opponent:string;
    ourTime:string;
    opponentScore:number;
    ourTimeScore:number;
    Status:"Vitória"|"Derrota"|"Empate"
}


export type LastGameHistoryProps={
    lastgameHistory:LastGameHistory[]
}
