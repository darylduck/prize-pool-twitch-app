"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwitchWebhookApi = void 0;
const core_1 = require("@aws-cdk/core");
const aws_apigateway_1 = require("@aws-cdk/aws-apigateway");
const aws_lambda_1 = require("@aws-cdk/aws-lambda");
const aws_lambda_nodejs_1 = require("@aws-cdk/aws-lambda-nodejs");
const api_gateway_1 = require("../schema/api-gateway");
class TwitchWebhookApi extends core_1.Construct {
    constructor(scope, id, props) {
        super(scope, id);
        const registerSubscriberLambda = new aws_lambda_nodejs_1.NodejsFunction(this, 'RegisterSubscriberLambda', {
            entry: 'src/lambda/registerSubscriber/index.js',
            handler: 'handler',
            runtime: aws_lambda_1.Runtime.NODEJS_14_X,
            environment: {
                PRIZE_POOL_API_KEY: props.prizePoolApiKey,
                PRIZE_POOL_ENDPOINT: props.prizePoolApiEndpoint
            }
        });
        const restApi = new aws_apigateway_1.RestApi(this, 'RestApi', {
            restApiName: 'TwitchPrizeDrawWebhookAPI',
            description: 'Handles all webhook posts from Twitch\'s EventSub system',
            endpointTypes: [aws_apigateway_1.EndpointType.REGIONAL],
            deployOptions: {
                stageName: 'Production'
            }
        });
        const channelSubscriptionModel = restApi.addModel('ChannelSubscription', {
            contentType: 'application/json',
            modelName: 'ChannelSubscription',
            description: 'This model represents the webhook payload that Twitch sends to our subscription endpoint.',
            schema: api_gateway_1.ChannelSubscriptionSchema
        });
        const subscriptionsResource = restApi.root.addResource('subscriptions');
        const postSubscriptionIntegration = new aws_apigateway_1.LambdaIntegration(registerSubscriberLambda, {
            proxy: false,
            passthroughBehavior: aws_apigateway_1.PassthroughBehavior.WHEN_NO_TEMPLATES,
            requestTemplates: {
                'application/json': `{
    "body": $input.json('$'),
    "headers": {
        #foreach($param in $input.params().header.keySet())
        "$param": "$util.escapeJavaScript($input.params().header.get($param))"
        #if($foreach.hasNext),#end
        #end
    }
}`
            },
            integrationResponses: [
                { statusCode: '200', responseTemplates: { 'application/json': `$input.path('$')` } },
                { statusCode: '400', selectionPattern: '.*errorMessage.*', responseTemplates: { 'application/json': `#set($inputRoot = $input.path('$'))` } }
            ]
        });
        subscriptionsResource.addMethod('POST', postSubscriptionIntegration, {
            requestValidatorOptions: {
                requestValidatorName: 'Validate body',
                validateRequestBody: true
            },
            requestModels: { 'application/json': channelSubscriptionModel },
            methodResponses: [
                { statusCode: '200', responseModels: { 'text/plain ': aws_apigateway_1.Model.EMPTY_MODEL } },
                { statusCode: '400', responseModels: { 'application/json': aws_apigateway_1.Model.EMPTY_MODEL } }
            ]
        });
    }
}
exports.TwitchWebhookApi = TwitchWebhookApi;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHdpdGNoLXdlYmhvb2stYXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidHdpdGNoLXdlYmhvb2stYXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHdDQUEwQztBQUMxQyw0REFBK0c7QUFDL0csb0RBQThDO0FBQzlDLGtFQUE0RDtBQUU1RCx1REFBa0U7QUFPbEUsTUFBYSxnQkFBaUIsU0FBUSxnQkFBUztJQUM3QyxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQTRCO1FBQ3BFLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFakIsTUFBTSx3QkFBd0IsR0FBRyxJQUFJLGtDQUFjLENBQUMsSUFBSSxFQUFFLDBCQUEwQixFQUFFO1lBQ3BGLEtBQUssRUFBRSx3Q0FBd0M7WUFDL0MsT0FBTyxFQUFFLFNBQVM7WUFDbEIsT0FBTyxFQUFFLG9CQUFPLENBQUMsV0FBVztZQUM1QixXQUFXLEVBQUU7Z0JBQ1gsa0JBQWtCLEVBQUUsS0FBSyxDQUFDLGVBQWU7Z0JBQ3pDLG1CQUFtQixFQUFFLEtBQUssQ0FBQyxvQkFBb0I7YUFDaEQ7U0FDRixDQUFDLENBQUM7UUFFSCxNQUFNLE9BQU8sR0FBRyxJQUFJLHdCQUFPLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRTtZQUMzQyxXQUFXLEVBQUUsMkJBQTJCO1lBQ3hDLFdBQVcsRUFBRSwwREFBMEQ7WUFDdkUsYUFBYSxFQUFFLENBQUMsNkJBQVksQ0FBQyxRQUFRLENBQUM7WUFDdEMsYUFBYSxFQUFFO2dCQUNiLFNBQVMsRUFBRSxZQUFZO2FBQ3hCO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsTUFBTSx3QkFBd0IsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLHFCQUFxQixFQUFFO1lBQ3ZFLFdBQVcsRUFBRSxrQkFBa0I7WUFDL0IsU0FBUyxFQUFFLHFCQUFxQjtZQUNoQyxXQUFXLEVBQUUsMkZBQTJGO1lBQ3hHLE1BQU0sRUFBRSx1Q0FBeUI7U0FDbEMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxxQkFBcUIsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUN4RSxNQUFNLDJCQUEyQixHQUFHLElBQUksa0NBQWlCLENBQUMsd0JBQXdCLEVBQUU7WUFDbEYsS0FBSyxFQUFFLEtBQUs7WUFDWixtQkFBbUIsRUFBRSxvQ0FBbUIsQ0FBQyxpQkFBaUI7WUFDMUQsZ0JBQWdCLEVBQUU7Z0JBQ2hCLGtCQUFrQixFQUFFOzs7Ozs7OztFQVExQjthQUNLO1lBQ0Qsb0JBQW9CLEVBQUU7Z0JBQ3BCLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBRSxFQUFFLGtCQUFrQixFQUFFLGtCQUFrQixFQUFFLEVBQUU7Z0JBQ3BGLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxnQkFBZ0IsRUFBRSxrQkFBa0IsRUFBRSxpQkFBaUIsRUFBRSxFQUFFLGtCQUFrQixFQUFFLHFDQUFxQyxFQUFFLEVBQUU7YUFDOUk7U0FDRixDQUFDLENBQUM7UUFFSCxxQkFBcUIsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLDJCQUEyQixFQUFFO1lBQ25FLHVCQUF1QixFQUFFO2dCQUN2QixvQkFBb0IsRUFBRSxlQUFlO2dCQUNyQyxtQkFBbUIsRUFBRSxJQUFJO2FBQzFCO1lBQ0QsYUFBYSxFQUFFLEVBQUUsa0JBQWtCLEVBQUUsd0JBQXdCLEVBQUU7WUFDL0QsZUFBZSxFQUFFO2dCQUNmLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxjQUFjLEVBQUUsRUFBRSxhQUFhLEVBQUUsc0JBQUssQ0FBQyxXQUFXLEVBQUUsRUFBRTtnQkFDM0UsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLGNBQWMsRUFBRSxFQUFFLGtCQUFrQixFQUFFLHNCQUFLLENBQUMsV0FBVyxFQUFFLEVBQUU7YUFDakY7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUEvREQsNENBK0RDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSBcIkBhd3MtY2RrL2NvcmVcIjtcbmltcG9ydCB7IEVuZHBvaW50VHlwZSwgTGFtYmRhSW50ZWdyYXRpb24sIE1vZGVsLCBQYXNzdGhyb3VnaEJlaGF2aW9yLCBSZXN0QXBpIH0gZnJvbSBcIkBhd3MtY2RrL2F3cy1hcGlnYXRld2F5XCI7XG5pbXBvcnQgeyBSdW50aW1lIH0gZnJvbSBcIkBhd3MtY2RrL2F3cy1sYW1iZGFcIjtcbmltcG9ydCB7IE5vZGVqc0Z1bmN0aW9uIH0gZnJvbSBcIkBhd3MtY2RrL2F3cy1sYW1iZGEtbm9kZWpzXCI7XG5cbmltcG9ydCB7IENoYW5uZWxTdWJzY3JpcHRpb25TY2hlbWEgfSBmcm9tICcuLi9zY2hlbWEvYXBpLWdhdGV3YXknO1xuXG5leHBvcnQgaW50ZXJmYWNlIFR3aXRjaFdlYmhvb2tBcGlQcm9wcyB7XG4gIHByaXplUG9vbEFwaUtleTogc3RyaW5nO1xuICBwcml6ZVBvb2xBcGlFbmRwb2ludDogc3RyaW5nO1xufVxuXG5leHBvcnQgY2xhc3MgVHdpdGNoV2ViaG9va0FwaSBleHRlbmRzIENvbnN0cnVjdCB7XG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzOiBUd2l0Y2hXZWJob29rQXBpUHJvcHMpIHtcbiAgICBzdXBlcihzY29wZSwgaWQpO1xuXG4gICAgY29uc3QgcmVnaXN0ZXJTdWJzY3JpYmVyTGFtYmRhID0gbmV3IE5vZGVqc0Z1bmN0aW9uKHRoaXMsICdSZWdpc3RlclN1YnNjcmliZXJMYW1iZGEnLCB7XG4gICAgICBlbnRyeTogJ3NyYy9sYW1iZGEvcmVnaXN0ZXJTdWJzY3JpYmVyL2luZGV4LmpzJyxcbiAgICAgIGhhbmRsZXI6ICdoYW5kbGVyJyxcbiAgICAgIHJ1bnRpbWU6IFJ1bnRpbWUuTk9ERUpTXzE0X1gsXG4gICAgICBlbnZpcm9ubWVudDoge1xuICAgICAgICBQUklaRV9QT09MX0FQSV9LRVk6IHByb3BzLnByaXplUG9vbEFwaUtleSxcbiAgICAgICAgUFJJWkVfUE9PTF9FTkRQT0lOVDogcHJvcHMucHJpemVQb29sQXBpRW5kcG9pbnRcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IHJlc3RBcGkgPSBuZXcgUmVzdEFwaSh0aGlzLCAnUmVzdEFwaScsIHtcbiAgICAgIHJlc3RBcGlOYW1lOiAnVHdpdGNoUHJpemVEcmF3V2ViaG9va0FQSScsXG4gICAgICBkZXNjcmlwdGlvbjogJ0hhbmRsZXMgYWxsIHdlYmhvb2sgcG9zdHMgZnJvbSBUd2l0Y2hcXCdzIEV2ZW50U3ViIHN5c3RlbScsXG4gICAgICBlbmRwb2ludFR5cGVzOiBbRW5kcG9pbnRUeXBlLlJFR0lPTkFMXSxcbiAgICAgIGRlcGxveU9wdGlvbnM6IHtcbiAgICAgICAgc3RhZ2VOYW1lOiAnUHJvZHVjdGlvbidcbiAgICAgIH0gIFxuICAgIH0pO1xuXG4gICAgY29uc3QgY2hhbm5lbFN1YnNjcmlwdGlvbk1vZGVsID0gcmVzdEFwaS5hZGRNb2RlbCgnQ2hhbm5lbFN1YnNjcmlwdGlvbicsIHtcbiAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICBtb2RlbE5hbWU6ICdDaGFubmVsU3Vic2NyaXB0aW9uJyxcbiAgICAgIGRlc2NyaXB0aW9uOiAnVGhpcyBtb2RlbCByZXByZXNlbnRzIHRoZSB3ZWJob29rIHBheWxvYWQgdGhhdCBUd2l0Y2ggc2VuZHMgdG8gb3VyIHN1YnNjcmlwdGlvbiBlbmRwb2ludC4nLFxuICAgICAgc2NoZW1hOiBDaGFubmVsU3Vic2NyaXB0aW9uU2NoZW1hXG4gICAgfSk7XG5cbiAgICBjb25zdCBzdWJzY3JpcHRpb25zUmVzb3VyY2UgPSByZXN0QXBpLnJvb3QuYWRkUmVzb3VyY2UoJ3N1YnNjcmlwdGlvbnMnKTsgICAgXG4gICAgY29uc3QgcG9zdFN1YnNjcmlwdGlvbkludGVncmF0aW9uID0gbmV3IExhbWJkYUludGVncmF0aW9uKHJlZ2lzdGVyU3Vic2NyaWJlckxhbWJkYSwge1xuICAgICAgcHJveHk6IGZhbHNlLFxuICAgICAgcGFzc3Rocm91Z2hCZWhhdmlvcjogUGFzc3Rocm91Z2hCZWhhdmlvci5XSEVOX05PX1RFTVBMQVRFUyxcbiAgICAgIHJlcXVlc3RUZW1wbGF0ZXM6IHtcbiAgICAgICAgJ2FwcGxpY2F0aW9uL2pzb24nOiBge1xuICAgIFwiYm9keVwiOiAkaW5wdXQuanNvbignJCcpLFxuICAgIFwiaGVhZGVyc1wiOiB7XG4gICAgICAgICNmb3JlYWNoKCRwYXJhbSBpbiAkaW5wdXQucGFyYW1zKCkuaGVhZGVyLmtleVNldCgpKVxuICAgICAgICBcIiRwYXJhbVwiOiBcIiR1dGlsLmVzY2FwZUphdmFTY3JpcHQoJGlucHV0LnBhcmFtcygpLmhlYWRlci5nZXQoJHBhcmFtKSlcIlxuICAgICAgICAjaWYoJGZvcmVhY2guaGFzTmV4dCksI2VuZFxuICAgICAgICAjZW5kXG4gICAgfVxufWBcbiAgICAgIH0sXG4gICAgICBpbnRlZ3JhdGlvblJlc3BvbnNlczogW1xuICAgICAgICB7IHN0YXR1c0NvZGU6ICcyMDAnLCByZXNwb25zZVRlbXBsYXRlczogeyAnYXBwbGljYXRpb24vanNvbic6IGAkaW5wdXQucGF0aCgnJCcpYCB9IH0sXG4gICAgICAgIHsgc3RhdHVzQ29kZTogJzQwMCcsIHNlbGVjdGlvblBhdHRlcm46ICcuKmVycm9yTWVzc2FnZS4qJywgcmVzcG9uc2VUZW1wbGF0ZXM6IHsgJ2FwcGxpY2F0aW9uL2pzb24nOiBgI3NldCgkaW5wdXRSb290ID0gJGlucHV0LnBhdGgoJyQnKSlgIH0gfVxuICAgICAgXVxuICAgIH0pO1xuXG4gICAgc3Vic2NyaXB0aW9uc1Jlc291cmNlLmFkZE1ldGhvZCgnUE9TVCcsIHBvc3RTdWJzY3JpcHRpb25JbnRlZ3JhdGlvbiwge1xuICAgICAgcmVxdWVzdFZhbGlkYXRvck9wdGlvbnM6IHtcbiAgICAgICAgcmVxdWVzdFZhbGlkYXRvck5hbWU6ICdWYWxpZGF0ZSBib2R5JyxcbiAgICAgICAgdmFsaWRhdGVSZXF1ZXN0Qm9keTogdHJ1ZVxuICAgICAgfSxcbiAgICAgIHJlcXVlc3RNb2RlbHM6IHsgJ2FwcGxpY2F0aW9uL2pzb24nOiBjaGFubmVsU3Vic2NyaXB0aW9uTW9kZWwgfSxcbiAgICAgIG1ldGhvZFJlc3BvbnNlczogW1xuICAgICAgICB7IHN0YXR1c0NvZGU6ICcyMDAnLCByZXNwb25zZU1vZGVsczogeyAndGV4dC9wbGFpbiAnOiBNb2RlbC5FTVBUWV9NT0RFTCB9IH0sXG4gICAgICAgIHsgc3RhdHVzQ29kZTogJzQwMCcsIHJlc3BvbnNlTW9kZWxzOiB7ICdhcHBsaWNhdGlvbi9qc29uJzogTW9kZWwuRU1QVFlfTU9ERUwgfSB9XG4gICAgICBdXG4gICAgfSk7XG4gIH1cbn0iXX0=