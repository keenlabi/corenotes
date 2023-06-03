import { IActivity} from "../types"

export interface staffActivityType {
    id: string,
    title:string,
    dateTime: {
        startDateTime: string,
        endDateTime: string
    },
    host:string,
    assignees: Array<string>,
    category: string,
    status: string,
    createdAt: string
}

export default function formatStaffActivitiesList(activities:IActivity[]):staffActivityType[] {
    if(!activities.length) return []

    return activities.map(activity => {
        return {
            id: activity._id,
            title: activity.title,
            category: activity.category,
            host: activity.host,
            assignees: activity.assignees,
            status: activity.status,
            createdAt: activity.createdAt,
            dateTime: activity.dateTime
        }
    })
}