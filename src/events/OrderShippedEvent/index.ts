import { handlerPath } from '../../libs/handlerResolver'

export default {
  handler: `${handlerPath(__dirname)}/event.handler`,
  name: 'orderShippedEventHandler',
  package: {
    patterns: ['src/events/OrderShippedEvent/**']
  },
  events: [
    {
      eventBridge: {
        eventBus: "${self:custom.eventBusArn}",
        pattern: { source: ["OrderShippedEvent"] },
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
