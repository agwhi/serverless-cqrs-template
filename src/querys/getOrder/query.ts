import { getOrder } from "../../models/order/OrderProjector";
import { Handler } from "aws-lambda";

const handler: Handler = async (query: {orderId: string}) => {

  const result = await getOrder(query.orderId)


  return {
    statusCode: 200,
    body: JSON.stringify({ success: !!result, result }),
  };
};

exports.handler = handler;
