import {relations} from "drizzle-orm"
import {user} from "./user.ts"
import {chat} from "./chat.ts"
import {MembersShipRequest} from "./Members-ShipRequest.ts"
import {MatchSuggestion} from "./Match-Suggestion.ts"
import {MatchParticipants} from "./Match-Participants.ts"
import {match} from "./match.ts"
import {message} from "./message.ts"
import {playerProfile} from "./player-profile.ts"



export const userRelations=relations(user,({one,many})=>({
    playerProfile:one(playerProfile,{
        fields:[user.id],
        references:[playerProfile.id]
    }),

    messages:many(message),
    MatchParticipants:many(MatchParticipants),
    MatchSuggestion:many(MatchSuggestion),
    MembersShipRequest:many(MembersShipRequest)
    


}))

export const playerProfileRelations=relations(playerProfile,({one})=>({
    user:one(user,{
        fields:[playerProfile.userId],
        references:[user.id]
    })
})
)

export const matchRelations=relations(match,({many})=>({
    MatchParticipants:many(MatchParticipants)
}))


export const messageRelations=relations(message,({one})=>({
    users:one(user,{
        fields:[message.sendId],
        references:[user.id],
    }),
    chat:one(chat,{
        fields:[message.chatId],
        references:[chat.id]
    })
}))

export const MatchSuggestionRelations=relations(MatchSuggestion,({one})=>({
    MatchSuggestion:one(user,{
        fields:[MatchSuggestion.userId],
        references:[user.id]
    })
}))


export const MatchParticipantsRelations=relations(MatchParticipants,({one})=>({
    MatchParticipants:one(match,{
        fields:[MatchParticipants.matchId],
        references:[match.id]
    }),
    user:one(user,{
        fields:[MatchParticipants.userId],
        references:[user.id]
    })
}))

export const MembersShipRequestRelations=relations(MembersShipRequest,({one})=>({
    MembersShipRequest:one(user,{
        fields:[MembersShipRequest.userId],
        references:[user.id]
    })
}))

export const chatRelations=relations(chat,({many})=>({
    chat:many(chat)
}))