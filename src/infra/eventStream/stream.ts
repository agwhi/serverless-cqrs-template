import { unmarshall } from "@aws-sdk/util-dynamodb";
import { EventBridgeAdapter } from "../../libs/eventBridge";

const eventBridgeClient = new EventBridgeAdapter("domain-events");

const handler = async (event) => {
  const domainEvent = event.Records?.map(async (record) => {
    console.log(record);
    if (record.eventName === "INSERT") {
      const newImage = unmarshall(record?.dynamodb?.NewImage);
      console.log(newImage);

      await eventBridgeClient.putEvent(
        newImage.eventName,
        newImage.payload,
        "Domain Event"
      );
    }
  });

  await Promise.all(domainEvent);
};

exports.handler = handler;
