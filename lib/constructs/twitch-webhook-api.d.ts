import { Construct } from "@aws-cdk/core";
export interface TwitchWebhookApiProps {
    prizePoolApiKey: string;
    prizePoolApiEndpoint: string;
}
export declare class TwitchWebhookApi extends Construct {
    constructor(scope: Construct, id: string, props: TwitchWebhookApiProps);
}
