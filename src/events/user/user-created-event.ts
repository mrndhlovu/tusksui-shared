import { Subjects } from "../../types"

export interface IUserCreatedEvent {
  subject: Subjects.UserCreated
  data: {
    id: string
    username: string
    firstname: string
    lastname: string
    email: string
    initials?: string
  }
}
