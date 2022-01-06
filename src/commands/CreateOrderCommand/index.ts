import { handlerPath } from '../../libs/handlerResolver'

export default {
  handler: `${handlerPath(__dirname)}/command.handler`,
  name: 'createOrderCommandHandler',
  package: {
    patterns: ['src/commands/createOrderCommand/**']
  },
  iamRoleStatements: [
    {
      Effect: 'Allow',
      Action: ['dynamodb:*'],
      Resource: '*'
    }
  ]
}
