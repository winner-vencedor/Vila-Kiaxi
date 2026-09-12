export type TopPlayers = {
    position:string;
    id:string;
    name:string;
    photo:string;
    goals:number;
    assists:number;
}

export type TopPlayersProps = {
    players: TopPlayers[];
}
