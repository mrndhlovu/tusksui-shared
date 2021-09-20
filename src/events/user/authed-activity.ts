import { ACTIVITY_TYPES, Subjects } from "../.."

export interface IAuthedActivityEvent {
  subject: Subjects.AuthedActivity
  data: {
    description: string
    fullName: string
    id: string
    type: ACTIVITY_TYPES
    userId: string
  }
}
