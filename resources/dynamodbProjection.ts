// Require AWS SDK and instantiate DocumentClient
const DynamoDB = require("aws-sdk/clients/dynamodb");
const DocumentClient = new DynamoDB.DocumentClient();
const { Table } = require("dynamodb-toolbox");

export const ProjectionTable = {
  Type: "AWS::DynamoDB::Table",
  Properties: {
    TableName: "template-projection",
    BillingMode: "PAY_PER_REQUEST",
    KeySchema: [
      { AttributeName: "pk", KeyType: "HASH" },
      { AttributeName: "sk", KeyType: "RANGE" },
    ],
    AttributeDefinitions: [
      { AttributeName: "pk", AttributeType: "S" },
      { AttributeName: "sk", AttributeType: "S" },
    ],
  },
};

export const Projection = new Table({
  name: "template-projection",
  partitionKey: "pk",
  sortKey: "sk",
  DocumentClient,
});


