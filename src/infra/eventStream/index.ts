import { handlerPath } from "../../libs/handlerResolver";

export default {
  handler: `${handlerPath(__dirname)}/stream.handler`,
  name: "eventStreamHandler",
  package: {
    patterns: ["src/infra/eventStream/**"],
  },
  events: [
    {
      stream: {
        type: "dynamodb",
        arn: {
          "Fn::GetAtt": ["EventStoreTable", "StreamArn"],
        },
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
