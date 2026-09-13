import {relations} from "drizzle-orm"
import {user} from "./user.ts"
import {chat} from "./chat.ts"
import {MembersShipRequest} from "./Members-ShipRequest.ts"
import {MatchSuggestion} from "./Match-Suggestion.ts"
import {MatchParticipants} from "./Match-Participants.ts"
import {match} from "./match.ts"
import {message} from "./message.ts"
import {playerProfile} from "./player-profile.ts"
import {refreshToken} from "./refresh-token.ts"



export const userRelations=relations(user,({one,many})=>({
    playerProfile:one(playerProfile),

    messages:many(message),
    matchParticipants:many(MatchParticipants),
    matchSuggestion:many(MatchSuggestion),
    membersShipRequest:many(MembersShipRequest),
    refreshToken:many(refreshToken)


}))

export const playerProfileRelations=relations(playerProfile,({one})=>({
    user:one(user,{
        fields:[playerProfile.userId],
        references:[user.id]
    })
})
)

export const matchRelations=relations(match,({many})=>({
    matchParticipants:many(MatchParticipants)
}))


export const messageRelations=relations(message,({one})=>({
    user:one(user,{
        fields:[message.sendId],
        references:[user.id],
    }),
    chat:one(chat,{
        fields:[message.chatId],
        references:[chat.id]
    })
}))

export const MatchSuggestionRelations=relations(MatchSuggestion,({one})=>({
    user:one(user,{
        fields:[MatchSuggestion.userId],
        references:[user.id]
    })
}))


export const MatchParticipantsRelations=relations(MatchParticipants,({one})=>({
    match:one(match,{
        fields:[MatchParticipants.matchId],
        references:[match.id]
    }),
    user:one(user,{
        fields:[MatchParticipants.userId],
        references:[user.id]
    })
}))

export const MembersShipRequestRelations=relations(MembersShipRequest,({one})=>({
    user:one(user,{
        fields:[MembersShipRequest.userId],
        references:[user.id]
    })
}))

export const chatRelations=relations(chat,({many})=>({
    messages:many(message)
}))


export const refreshTokenRelations=relations(refreshToken,({one})=>({
    user:one(user,{
        fields:[refreshToken.userId],
        references:[user.id]
    })
}))