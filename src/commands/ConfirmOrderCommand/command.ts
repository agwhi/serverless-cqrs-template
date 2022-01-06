import { OrderAggregate } from "../../models/order/OrderAggregate";
import { OrderConfirmedEvent } from "../../events/OrderConfirmedEvent/event";
import { Handler } from "aws-lambda";

interface ConfirmOrderCommand {
  orderId: string;
}

const handler: Handler = async (command: ConfirmOrderCommand) => {
  const Order = await OrderAggregate.build(command.orderId);

  if (Order.orderConfirmed) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: false,
        message: "Order already confirmed",
      }),
    };
  }

  const orderConfirmedEvent = new OrderConfirmedEvent(command.orderId);

  const success = await orderConfirmedEvent.publish();

  return {
    statusCode: 200,
    body: JSON.stringify({ success: success }),
  };
};

exports.handler = handler;
