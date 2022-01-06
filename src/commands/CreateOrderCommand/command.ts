import { OrderCreatedEvent } from "../../events/OrderCreatedEvent/event";
import { Handler } from "aws-lambda";

interface CreateOrderCommand {
  orderId: string;
  productId: string;
}

const handler: Handler = async (command: CreateOrderCommand) => {

  const orderCreatedEvent = new OrderCreatedEvent(command.orderId, command.productId);

  const success = await orderCreatedEvent.publish();

  return {
    statusCode: 200,
    body: JSON.stringify({ success: success }),
  };
};

exports.handler = handler;
