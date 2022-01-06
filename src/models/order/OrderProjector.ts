import { Projection } from "../../../resources/dynamodbProjection";
const { Entity } = require("dynamodb-toolbox");

export const Order = new Entity({
  name: "Order",
  attributes: {
    pk: { partitionKey: true, hidden: true, prefix: "ORDER#" },
    sk: { sortKey: true, hidden: true, prefix: "STATUS#" },
    orderId: ["pk", 0, {type: "string"}],
    orderStatus: ["sk", 0, {type: "string"}],
    productId: { type: "string", required: true },
  },
  table: Projection,
});

export const getOrder = async (orderId: string) => {
  const result = await Order.query(
    `ORDER#${orderId}`
  );
  return result.Items?.[0]
}