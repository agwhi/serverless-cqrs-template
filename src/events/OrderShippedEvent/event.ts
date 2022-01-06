import { Handler } from "aws-lambda";
import { DomainEvent } from "../../libs/domainEvent"
import { Order } from "../../models/order/OrderProjector";


export class OrderShippedEvent extends DomainEvent {
  orderId: string;
 
  constructor(orderId: string) {
    super(orderId, "OrderShippedEvent")
    this.orderId = orderId;
  }
}

export const handler: Handler = async (event) => {
  const payload = event.detail;

  const item = {
    orderId: payload.orderId,
    orderStatus: "SHIPPED",
  };
  const result = await Order.update(item, { returnValues: "all_new" });

  console.log(result);
};