import { Handler } from "aws-lambda";
import { DomainEvent } from "../../libs/domainEvent";
import { Order } from "../../models/order/OrderProjector";

export class OrderConfirmedEvent extends DomainEvent {
  orderId: string;

  constructor(orderId: string) {
    super(orderId, "OrderConfirmedEvent");
    this.orderId = orderId;
  }
}

export const handler: Handler = async (event) => {
  const payload = event.detail;

  const item = {
    orderId: payload.orderId,
    orderStatus: "CONFIRMED",
  };
  const result = await Order.update(item, { returnValues: "all_new" });

  console.log(result);
};
