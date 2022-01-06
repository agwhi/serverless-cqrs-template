import { handlerPath } from "../../libs/handlerResolver";

export default {
  handler: `${handlerPath(__dirname)}/event.handler`,
  name: "orderConfirmedEventHandler",
  package: {
    patterns: ["src/events/OrderConfirmedEvent/**"],
  },
  events: [
    {
      eventBridge: {
        eventBus: "${self:custom.eventBusArn}",
        pattern: { source: ["OrderConfirmedEvent"] },
      },
    },
  ],
  iamRoleStatements: [
    {
      Effect: "Allow",
      Action: ["dynamodb:*"],
      Resource: "*",
    },
    {
      Effect: 'Allow',
      Action: ['events:*'],
      Resource: "*"
    }
  ],
};
