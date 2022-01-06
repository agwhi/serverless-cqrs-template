// Require AWS SDK and instantiate DocumentClient
const DynamoDB = require("aws-sdk/clients/dynamodb");
const DocumentClient = new DynamoDB.DocumentClient();
const { Table, Entity } = require("dynamodb-toolbox");

export const EventStoreTable = {
  Type: "AWS::DynamoDB::Table",
  Properties: {
    TableName: "event-store",
    BillingMode: "PAY_PER_REQUEST",
    KeySchema: [
      { AttributeName: "aggregateId", KeyType: "HASH" },
      { AttributeName: "eventTime", KeyType: "RANGE" },
    ],
    AttributeDefinitions: [
      { AttributeName: "aggregateId", AttributeType: "S" },
      { AttributeName: "eventTime", AttributeType: "N" },
    ],
    PointInTimeRecoverySpecification: { PointInTimeRecoveryEnabled: true },
    StreamSpecification: { StreamViewType: "NEW_IMAGE" },
  },
};

export const EventStore = new Table({
  name: "event-store",
  partitionKey: "aggregateId",
  sortKey: "eventTime",
  DocumentClient,
});

export const Event = new Entity({
  name: "Event",
  attributes: {
    aggregateId: { partitionKey: true },
    eventName: { type: "string", required: true },
    eventTime: { sortKey: true, type: "number", default: () => Date.now() },
    payload: { type: "string" },
  },
  table: EventStore,
});
