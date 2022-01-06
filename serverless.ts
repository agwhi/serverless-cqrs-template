import type { AWS } from "@serverless/typescript";

import * as commandHandlers from "./src/commands";
import * as eventHandlers from "./src/events";
import * as queryHandlers from "./src/querys";
import { EventStoreTable } from "./resources/eventStore";
import { ProjectionTable } from "./resources/dynamodbProjection";
import { DomainEventBus } from "./resources/eventBridge";
import EventStream from "./src/infra/eventStream";

const serverlessConfiguration: AWS = {
  service: "cqrs-template",
  frameworkVersion: "2",
  plugins: ["serverless-esbuild", "serverless-iam-roles-per-function"],
  package: {
    individually: true,
    patterns: ["!./**"],
  },
  custom: {
    eventBusArn: 'arn:aws:events:${AWS::Region}:${AWS::AccountId}:event-bus/domain-events'
  },
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
    },
    lambdaHashingVersion: "20201221",
    eventBridge: { useCloudFormation: true },
  },
  functions: { ...commandHandlers, ...eventHandlers, ...queryHandlers, EventStream },
  resources: {
    Resources: {
      EventStoreTable,
      ProjectionTable,
      DomainEventBus,
    },
  },
};

module.exports = serverlessConfiguration;
