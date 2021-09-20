import { Publisher, Subjects } from "../.."
import { INewActivityEvent } from "../user/new-activity"

export class NewActivityPublisher extends Publisher<INewActivityEvent> {
  subject: Subjects.NewActivity = Subjects.NewActivity
}
