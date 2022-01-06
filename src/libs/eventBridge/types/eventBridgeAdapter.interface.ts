import {
  EventBridgeClientConfig,
  PutEventsCommandOutput
} from '@aws-sdk/client-eventbridge'

export interface ErrorResponse {
  error: any
}

export interface IEventBridgeAdapter {
  putEvent(
    action: string,
    payload: any,
    detailType: string,
    eventBusName?: string,
    params?: EventBridgeClientConfig
  ): Promise<PutEventsCommandOutput | ErrorResponse>
}
