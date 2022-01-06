import { handlerPath } from '../../libs/handlerResolver'

export default {
  handler: `${handlerPath(__dirname)}/event.handler`,
  name: 'orderCreatedEventHandler',
  package: {
    patterns: ['src/events/OrderCreatedEvent/**']
  },
  events: [
    {
      eventBridge: {
        eventBus: "${self:custom.eventBusArn}",
        pattern: { source: ["OrderCreatedEvent"] },
      },
    },
  ],
  iamRoleStatements: [
    {
      Effect: 'Allow',
      Action: ['dynamodb:*'],
      Resource: '*'
    },
    {
      Effect: 'Allow',
      Action: ['events:*'],
      Resource: "*"
    }
  ]
}
