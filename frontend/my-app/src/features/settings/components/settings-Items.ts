import {LucideLock,BellIcon,Settings2Icon,SunDimIcon} from "lucide-react"
import { SettingsItemType } from "../types/settings-item-type"

export const Account: SettingsItemType[] = [
{
    id:"Pass and security",
    label:"Password & Security",
     href:"/settings/password",
    icon:LucideLock
},
{
    id:"Notification",
    label:"Notification",
     href:"/settings/notification",
    icon:BellIcon
}
]

export const Preferences=[{
    id:"About",
    label:"About Us",
     href:"/settings/about",
    icon:Settings2Icon
},
{
    id:"Theme",
    label:"Theme",
     href:"/settings/appearance",
    icon:SunDimIcon
}]
