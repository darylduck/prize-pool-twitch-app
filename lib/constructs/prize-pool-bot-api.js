"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrizePoolBotApi = void 0;
const core_1 = require("@aws-cdk/core");
const aws_appsync_1 = require("@aws-cdk/aws-appsync");
const aws_dynamodb_1 = require("@aws-cdk/aws-dynamodb");
const app_sync_1 = require("../schema/app-sync");
class PrizePoolBotApi extends core_1.Construct {
    constructor(scope, id) {
        var _a;
        super(scope, id);
        const table = new aws_dynamodb_1.Table(this, 'PrizePool', {
            tableName: 'PrizePool',
            partitionKey: { name: 'MonthYear', type: aws_dynamodb_1.AttributeType.STRING },
            sortKey: { name: 'UserId', type: aws_dynamodb_1.AttributeType.STRING }
        });
        const api = new aws_appsync_1.GraphqlApi(this, 'Api', {
            name: 'TwitchBotPrizeAPI',
            schema: app_sync_1.schema,
            authorizationConfig: {
                defaultAuthorization: {
                    authorizationType: aws_appsync_1.AuthorizationType.API_KEY
                },
            }
        });
        this.apiKey = (_a = api.apiKey) !== null && _a !== void 0 ? _a : '';
        this.endpoint = api.graphqlUrl;
        const prizePoolDatasource = api.addDynamoDbDataSource('PrizePoolDatasource', table);
        api.addQuery('getTwitchSub', new aws_appsync_1.ResolvableField({
            returnType: app_sync_1.twitchSubType.attribute(),
            args: app_sync_1.getTwitchArg,
            dataSource: prizePoolDatasource,
            requestMappingTemplate: aws_appsync_1.MappingTemplate.dynamoDbQuery(aws_appsync_1.KeyCondition.eq('MonthYear', 'MonthYear').and(aws_appsync_1.KeyCondition.eq('UserId', 'UserId'))),
            responseMappingTemplate: aws_appsync_1.MappingTemplate.dynamoDbResultItem()
        }));
        api.addMutation('createTwitchSub', new aws_appsync_1.ResolvableField({
            returnType: app_sync_1.twitchSubType.attribute(),
            args: app_sync_1.createTwitchArg,
            dataSource: prizePoolDatasource,
            requestMappingTemplate: aws_appsync_1.MappingTemplate.dynamoDbPutItem(aws_appsync_1.PrimaryKey.partition("MonthYear")
                .is("input.MonthYear")
                .sort('UserId')
                .is('input.UserId'), aws_appsync_1.Values.projecting('input')),
            responseMappingTemplate: aws_appsync_1.MappingTemplate.dynamoDbResultItem()
        }));
        // api.addSubscription('onTwitchSubCreated', new ResolvableField({
        //   returnType: twitchSubType.attribute(),
        //   directives: [Directive.subscribe('createTwitchSub')],
        // }));
    }
}
exports.PrizePoolBotApi = PrizePoolBotApi;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpemUtcG9vbC1ib3QtYXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicHJpemUtcG9vbC1ib3QtYXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHdDQUEwQztBQUMxQyxzREFBb0o7QUFDcEosd0RBQTZEO0FBRTdELGlEQUs0QjtBQUU1QixNQUFhLGVBQWdCLFNBQVEsZ0JBQVM7SUFJNUMsWUFBWSxLQUFnQixFQUFFLEVBQVU7O1FBQ3RDLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFakIsTUFBTSxLQUFLLEdBQUcsSUFBSSxvQkFBSyxDQUFDLElBQUksRUFBRSxXQUFXLEVBQUU7WUFDekMsU0FBUyxFQUFFLFdBQVc7WUFDdEIsWUFBWSxFQUFFLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsNEJBQWEsQ0FBQyxNQUFNLEVBQUU7WUFDL0QsT0FBTyxFQUFFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsNEJBQWEsQ0FBQyxNQUFNLEVBQUU7U0FDeEQsQ0FBQyxDQUFDO1FBRUgsTUFBTSxHQUFHLEdBQUcsSUFBSSx3QkFBVSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUU7WUFDdEMsSUFBSSxFQUFFLG1CQUFtQjtZQUN6QixNQUFNLEVBQU4saUJBQU07WUFDTixtQkFBbUIsRUFBRTtnQkFDbkIsb0JBQW9CLEVBQUU7b0JBQ3BCLGlCQUFpQixFQUFFLCtCQUFpQixDQUFDLE9BQU87aUJBQzdDO2FBQ0Y7U0FDRixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsTUFBTSxTQUFHLEdBQUcsQ0FBQyxNQUFNLG1DQUFJLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxVQUFVLENBQUM7UUFFL0IsTUFBTSxtQkFBbUIsR0FBRyxHQUFHLENBQUMscUJBQXFCLENBQUMscUJBQXFCLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFcEYsR0FBRyxDQUFDLFFBQVEsQ0FBQyxjQUFjLEVBQUUsSUFBSSw2QkFBZSxDQUFDO1lBQy9DLFVBQVUsRUFBRSx3QkFBYSxDQUFDLFNBQVMsRUFBRTtZQUNyQyxJQUFJLEVBQUUsdUJBQVk7WUFDbEIsVUFBVSxFQUFFLG1CQUFtQjtZQUMvQixzQkFBc0IsRUFBRSw2QkFBZSxDQUFDLGFBQWEsQ0FDbkQsMEJBQVksQ0FBQyxFQUFFLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFDLEdBQUcsQ0FBQywwQkFBWSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FDbkY7WUFDRCx1QkFBdUIsRUFBRSw2QkFBZSxDQUFDLGtCQUFrQixFQUFFO1NBQzlELENBQUMsQ0FBQyxDQUFDO1FBRUosR0FBRyxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLDZCQUFlLENBQUM7WUFDckQsVUFBVSxFQUFFLHdCQUFhLENBQUMsU0FBUyxFQUFFO1lBQ3JDLElBQUksRUFBRSwwQkFBZTtZQUNyQixVQUFVLEVBQUUsbUJBQW1CO1lBQy9CLHNCQUFzQixFQUFFLDZCQUFlLENBQUMsZUFBZSxDQUNyRCx3QkFBVSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUM7aUJBQzlCLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQztpQkFDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQztpQkFDZCxFQUFFLENBQUMsY0FBYyxDQUFDLEVBQ3JCLG9CQUFNLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUMzQjtZQUNELHVCQUF1QixFQUFFLDZCQUFlLENBQUMsa0JBQWtCLEVBQUU7U0FDOUQsQ0FBQyxDQUFDLENBQUM7UUFFSixrRUFBa0U7UUFDbEUsMkNBQTJDO1FBQzNDLDBEQUEwRDtRQUMxRCxPQUFPO0lBQ1QsQ0FBQztDQUNGO0FBekRELDBDQXlEQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gXCJAYXdzLWNkay9jb3JlXCI7XG5pbXBvcnQgeyBBdXRob3JpemF0aW9uVHlwZSwgRGlyZWN0aXZlLCBHcmFwaHFsQXBpLCBLZXlDb25kaXRpb24sIE1hcHBpbmdUZW1wbGF0ZSwgUHJpbWFyeUtleSwgUmVzb2x2YWJsZUZpZWxkLCBWYWx1ZXMgfSBmcm9tICdAYXdzLWNkay9hd3MtYXBwc3luYyc7XG5pbXBvcnQgeyBBdHRyaWJ1dGVUeXBlLCBUYWJsZSB9IGZyb20gXCJAYXdzLWNkay9hd3MtZHluYW1vZGJcIjtcblxuaW1wb3J0IHtcbiAgY3JlYXRlVHdpdGNoQXJnLFxuICBnZXRUd2l0Y2hBcmcsXG4gIHNjaGVtYSxcbiAgdHdpdGNoU3ViVHlwZVxufSBmcm9tICcuLi9zY2hlbWEvYXBwLXN5bmMnO1xuXG5leHBvcnQgY2xhc3MgUHJpemVQb29sQm90QXBpIGV4dGVuZHMgQ29uc3RydWN0IHtcbiAgcHVibGljIGFwaUtleTogc3RyaW5nO1xuICBwdWJsaWMgZW5kcG9pbnQ6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkKTtcblxuICAgIGNvbnN0IHRhYmxlID0gbmV3IFRhYmxlKHRoaXMsICdQcml6ZVBvb2wnLCB7XG4gICAgICB0YWJsZU5hbWU6ICdQcml6ZVBvb2wnLFxuICAgICAgcGFydGl0aW9uS2V5OiB7IG5hbWU6ICdNb250aFllYXInLCB0eXBlOiBBdHRyaWJ1dGVUeXBlLlNUUklORyB9LFxuICAgICAgc29ydEtleTogeyBuYW1lOiAnVXNlcklkJywgdHlwZTogQXR0cmlidXRlVHlwZS5TVFJJTkcgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgYXBpID0gbmV3IEdyYXBocWxBcGkodGhpcywgJ0FwaScsIHtcbiAgICAgIG5hbWU6ICdUd2l0Y2hCb3RQcml6ZUFQSScsXG4gICAgICBzY2hlbWEsXG4gICAgICBhdXRob3JpemF0aW9uQ29uZmlnOiB7XG4gICAgICAgIGRlZmF1bHRBdXRob3JpemF0aW9uOiB7XG4gICAgICAgICAgYXV0aG9yaXphdGlvblR5cGU6IEF1dGhvcml6YXRpb25UeXBlLkFQSV9LRVlcbiAgICAgICAgfSxcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuYXBpS2V5ID0gYXBpLmFwaUtleSA/PyAnJztcbiAgICB0aGlzLmVuZHBvaW50ID0gYXBpLmdyYXBocWxVcmw7XG4gICAgXG4gICAgY29uc3QgcHJpemVQb29sRGF0YXNvdXJjZSA9IGFwaS5hZGREeW5hbW9EYkRhdGFTb3VyY2UoJ1ByaXplUG9vbERhdGFzb3VyY2UnLCB0YWJsZSk7XG5cbiAgICBhcGkuYWRkUXVlcnkoJ2dldFR3aXRjaFN1YicsIG5ldyBSZXNvbHZhYmxlRmllbGQoe1xuICAgICAgcmV0dXJuVHlwZTogdHdpdGNoU3ViVHlwZS5hdHRyaWJ1dGUoKSxcbiAgICAgIGFyZ3M6IGdldFR3aXRjaEFyZyxcbiAgICAgIGRhdGFTb3VyY2U6IHByaXplUG9vbERhdGFzb3VyY2UsXG4gICAgICByZXF1ZXN0TWFwcGluZ1RlbXBsYXRlOiBNYXBwaW5nVGVtcGxhdGUuZHluYW1vRGJRdWVyeShcbiAgICAgICAgS2V5Q29uZGl0aW9uLmVxKCdNb250aFllYXInLCAnTW9udGhZZWFyJykuYW5kKEtleUNvbmRpdGlvbi5lcSgnVXNlcklkJywgJ1VzZXJJZCcpKVxuICAgICAgKSxcbiAgICAgIHJlc3BvbnNlTWFwcGluZ1RlbXBsYXRlOiBNYXBwaW5nVGVtcGxhdGUuZHluYW1vRGJSZXN1bHRJdGVtKClcbiAgICB9KSk7XG5cbiAgICBhcGkuYWRkTXV0YXRpb24oJ2NyZWF0ZVR3aXRjaFN1YicsIG5ldyBSZXNvbHZhYmxlRmllbGQoe1xuICAgICAgcmV0dXJuVHlwZTogdHdpdGNoU3ViVHlwZS5hdHRyaWJ1dGUoKSxcbiAgICAgIGFyZ3M6IGNyZWF0ZVR3aXRjaEFyZyxcbiAgICAgIGRhdGFTb3VyY2U6IHByaXplUG9vbERhdGFzb3VyY2UsXG4gICAgICByZXF1ZXN0TWFwcGluZ1RlbXBsYXRlOiBNYXBwaW5nVGVtcGxhdGUuZHluYW1vRGJQdXRJdGVtKFxuICAgICAgICBQcmltYXJ5S2V5LnBhcnRpdGlvbihcIk1vbnRoWWVhclwiKVxuICAgICAgICAgIC5pcyhcImlucHV0Lk1vbnRoWWVhclwiKVxuICAgICAgICAgIC5zb3J0KCdVc2VySWQnKVxuICAgICAgICAgIC5pcygnaW5wdXQuVXNlcklkJyksXG4gICAgICAgIFZhbHVlcy5wcm9qZWN0aW5nKCdpbnB1dCcpXG4gICAgICApLFxuICAgICAgcmVzcG9uc2VNYXBwaW5nVGVtcGxhdGU6IE1hcHBpbmdUZW1wbGF0ZS5keW5hbW9EYlJlc3VsdEl0ZW0oKVxuICAgIH0pKTtcblxuICAgIC8vIGFwaS5hZGRTdWJzY3JpcHRpb24oJ29uVHdpdGNoU3ViQ3JlYXRlZCcsIG5ldyBSZXNvbHZhYmxlRmllbGQoe1xuICAgIC8vICAgcmV0dXJuVHlwZTogdHdpdGNoU3ViVHlwZS5hdHRyaWJ1dGUoKSxcbiAgICAvLyAgIGRpcmVjdGl2ZXM6IFtEaXJlY3RpdmUuc3Vic2NyaWJlKCdjcmVhdGVUd2l0Y2hTdWInKV0sXG4gICAgLy8gfSkpO1xuICB9XG59Il19