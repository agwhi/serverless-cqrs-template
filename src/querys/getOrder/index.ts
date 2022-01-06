import { handlerPath } from '../../libs/handlerResolver'

export default {
  handler: `${handlerPath(__dirname)}/query.handler`,
  name: 'getOrderQueryHandler',
  package: {
    patterns: ['src/querys/getOrder/**']
  },
  iamRoleStatements: [
    {
      Effect: 'Allow',
      Action: ['dynamodb:*'],
      Resource: '*'
    }
  ]
}
