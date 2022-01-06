import { handlerPath } from '../../libs/handlerResolver'

export default {
  handler: `${handlerPath(__dirname)}/command.handler`,
  name: 'shipOrderCommandHandler',
  package: {
    patterns: ['src/commands/shipOrderCommand/**']
  },
  iamRoleStatements: [
    {
      Effect: 'Allow',
      Action: ['dynamodb:*'],
      Resource: '*'
    }
  ]
}
