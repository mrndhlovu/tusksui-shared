import { Subjects } from "../../types"

export interface ICreateNotificationEvent {
  subject: Subjects.CreateNotification
  data: {
    body: string
    id: string
    subject: string
    title: string
    type: string
    userId: string
  }
}
