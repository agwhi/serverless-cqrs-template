import { handlerPath } from '../../libs/handlerResolver'

export default {
  handler: `${handlerPath(__dirname)}/command.handler`,
  name: 'confirmOrderCommandHandler',
  package: {
    patterns: ['src/commands/confirmOrderCommand/**']
  },
  iamRoleStatements: [
    {
      Effect: 'Allow',
      Action: ['dynamodb:*'],
      Resource: '*'
    }
  ]
}
