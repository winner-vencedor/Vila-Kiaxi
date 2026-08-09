# Domain Model
````

User:
id
name
phone
email
gender(male,famele) enum
password
role_id
createdAT
updatedAT




role:
id
name


PlayerProfile:
id
user_id
position(GOALKEEPER, DEFENDER, MIDFIELDER, FORWARD) enum
height
weight
preferredFoot(LEFT, RIGHT, BOTH) enum





Match:
id
location
time
date
duration
opponent
description
status(SCHEDULED,IN_PROGRESS,FINISHED,CANCELLED) enum
createdAt
updatedAT


MatchParticipants:
id
match_id
user_id
confirmed
goals
assists
redCard
yellowCard
createdAT




message:
id
chat_id
send_id
content
createdAt
updatedAT


chat:
id
name
createdAT



MatchSuggestion:
id
user_id
location
date
time
description
status(PENDING,REJECT,APPROVED) enum
createdAt
updatedAT




MembersShipRequest:
id
user_id
status(PENDING,REJECTED,APPROVED) enum
requestedAT
reviewedAT
createdAt
updatedAT

````