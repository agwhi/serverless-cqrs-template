import { Handler } from "aws-lambda";
import { DomainEvent } from "../../libs/domainEvent"
import { Order } from "../../models/order/OrderProjector";

export class OrderCreatedEvent extends DomainEvent {
  orderId: string;
  productId: string;

  constructor(orderId: string, productId: string) {
    super(orderId, "OrderCreatedEvent")
    this.orderId = orderId;
    this.productId = productId;
  }
}

export const handler: Handler = async (event) => {
  const payload = event.detail;

  const item = {
    orderId: payload.orderId,
    productId: payload.productId,
    orderStatus: "ORDERED",
  };

  // Use the 'put' method of your entity instance
  const result = await Order.put(item);
  
  console.log(result);
};
