import { Event } from "../../../resources/eventStore";

export class OrderAggregate {
  orderId: string;
  orderConfirmed: boolean;

  async init(orderId: string) {
    let events = await Event.query(orderId);

    console.log(events.Items)

    events.Items.forEach((event) => {
      const payload = JSON.parse(event.payload);
      switch (event.eventName) {
        case "OrderCreatedEvent":
          this.orderId = payload.orderId;
          this.orderConfirmed = false;
          break;
        case "OrderConfirmedEvent":
          this.orderConfirmed = true;
          break;
        default:
          console.log(`Unknown event type: ${event.eventName}.`);
      }
    });
  }

  static async build(orderId: string) {
    const aggregate = new OrderAggregate();
    await aggregate.init(orderId);
    return aggregate;
  }
}
