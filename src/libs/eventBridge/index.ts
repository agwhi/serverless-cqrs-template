import {
  EventBridgeClient,
  EventBridgeClientConfig,
  PutEventsCommand,
  PutEventsCommandOutput,
  PutEventsRequestEntry
} from '@aws-sdk/client-eventbridge'
import {
  ErrorResponse,
  IEventBridgeAdapter
} from './types/eventBridgeAdapter.interface'

let client: EventBridgeClient

class EventBridgeAdapter implements IEventBridgeAdapter {
  constructor(
    private _eventBusName: string = process.env.EVENT_BUS ?? 'default'
  ) {}

  async putEvent(
    action: string,
    payload: string,
    detailType: string,
    eventBusName: string = this._eventBusName,
    params: EventBridgeClientConfig = {}
  ): Promise<PutEventsCommandOutput | ErrorResponse> {
    const event: PutEventsRequestEntry = {
      Source: action,
      Detail: payload,
      DetailType: detailType,
      EventBusName: eventBusName
    }

    // Construct client on cold start
    if (!client) {
      client = new EventBridgeClient(params)
    }

    // Create put command
    const command: PutEventsCommand = new PutEventsCommand({ Entries: [event] })

    try {
      return await client.send(command)
    } catch (error) {
      console.error('EventBridgeAdapter - putEvent:', error)
      return { error }
    }
  }
}

export { EventBridgeAdapter }
