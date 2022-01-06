import { Event } from "../../resources/eventStore"

export class DomainEvent {
  aggregateId: unknown;
  eventName: string

  constructor(aggregateId: any, eventName: string) {
    this.aggregateId = aggregateId;
    this.eventName = eventName
  }

  async publish() {
    const { aggregateId, eventName, ...payload } = this
    const item = {
      aggregateId: aggregateId,
      eventName: eventName,
      payload: JSON.stringify(payload),
    };

    const result = await Event.put(item);

    return result
  }
}
