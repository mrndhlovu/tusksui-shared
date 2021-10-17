import { ICreateNotificationEvent } from "../events/notification"
import { Publisher } from "../services/base-publisher"
import { Subjects } from "../types"

export class CreateNotificationPublisher extends Publisher<ICreateNotificationEvent> {
  subject: Subjects.CreateNotification = Subjects.CreateNotification
}
