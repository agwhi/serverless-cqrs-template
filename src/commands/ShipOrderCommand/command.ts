import { OrderAggregate } from "../../models/order/OrderAggregate";
import { OrderShippedEvent } from "../../events/OrderShippedEvent/event";
import { Handler } from "aws-lambda";

interface ConfirmOrderCommand {
  orderId: string;
}

const handler: Handler = async (command: ConfirmOrderCommand) => {
  const Order = await OrderAggregate.build(command.orderId);

  if (!Order.orderConfirmed) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: false,
        message: "Order hasn't been confirmed",
      }),
    };
  }

  const orderShippedEvent = new OrderShippedEvent(command.orderId);

  const success = await orderShippedEvent.publish();

  return {
    statusCode: 200,
    body: JSON.stringify({ success: success }),
  };
};

exports.handler = handler;
