"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelSubscriptionSchema = void 0;
const aws_apigateway_1 = require("@aws-cdk/aws-apigateway");
exports.ChannelSubscriptionSchema = {
    schema: aws_apigateway_1.JsonSchemaVersion.DRAFT4,
    title: 'ChannelSubscription',
    type: aws_apigateway_1.JsonSchemaType.OBJECT,
    properties: {
        challenge: {
            type: aws_apigateway_1.JsonSchemaType.STRING
        },
        subscription: {
            title: 'Subscription',
            type: aws_apigateway_1.JsonSchemaType.OBJECT,
            properties: {
                id: {
                    title: "Id",
                    type: aws_apigateway_1.JsonSchemaType.STRING
                },
                type: {
                    title: "Type",
                    type: aws_apigateway_1.JsonSchemaType.STRING,
                    enum: ['channel.subscribe']
                },
                version: {
                    title: "Version",
                    type: aws_apigateway_1.JsonSchemaType.STRING
                },
                status: {
                    title: "Status",
                    type: aws_apigateway_1.JsonSchemaType.STRING
                },
                cost: {
                    title: "Cost",
                    type: aws_apigateway_1.JsonSchemaType.INTEGER
                },
                condition: {
                    type: aws_apigateway_1.JsonSchemaType.OBJECT,
                    title: 'Condition',
                    properties: {
                        broadcaster_user_id: {
                            type: aws_apigateway_1.JsonSchemaType.STRING
                        }
                    },
                    required: ['broadcaster_user_id']
                },
                created_at: {
                    title: "Created At",
                    type: aws_apigateway_1.JsonSchemaType.STRING
                },
                transport: {
                    title: "Transport",
                    type: aws_apigateway_1.JsonSchemaType.OBJECT,
                    properties: {
                        method: {
                            title: "Method",
                            type: aws_apigateway_1.JsonSchemaType.STRING,
                            enum: ["webhook"]
                        },
                        callback: {
                            title: "Callback",
                            type: aws_apigateway_1.JsonSchemaType.STRING,
                            format: "uri"
                        }
                    },
                    required: ["method", "callback"]
                }
            },
            required: [
                "id",
                "type",
                "version",
                "status",
                "cost",
                "condition",
                "created_at",
                "transport"
            ]
        },
        event: {
            title: "Event",
            type: aws_apigateway_1.JsonSchemaType.OBJECT,
            properties: {
                user_id: {
                    title: "User Id",
                    type: aws_apigateway_1.JsonSchemaType.STRING
                },
                user_login: {
                    title: "Username",
                    type: aws_apigateway_1.JsonSchemaType.STRING
                },
                user_name: {
                    title: "Display Name",
                    type: aws_apigateway_1.JsonSchemaType.STRING
                },
                broadcaster_user_id: {
                    title: "Broadcaster User id",
                    type: aws_apigateway_1.JsonSchemaType.STRING
                },
                broadcaster_user_login: {
                    title: "Broadcaster Username",
                    type: aws_apigateway_1.JsonSchemaType.STRING
                },
                broadcaster_user_name: {
                    title: "Broadcaster Display Name",
                    type: aws_apigateway_1.JsonSchemaType.STRING
                },
                tier: {
                    title: "Subscription Tier",
                    type: aws_apigateway_1.JsonSchemaType.STRING
                },
                is_gift: {
                    title: "Is Gift",
                    type: aws_apigateway_1.JsonSchemaType.BOOLEAN
                }
            },
            required: [
                "user_id",
                "user_login",
                "user_name",
                "broadcaster_user_login",
                "broadcaster_user_name",
                "tier",
                "is_gift"
            ]
        }
    },
    required: ["subscription"]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhbm5lbC1zdWJzY3JpcHRpb24tc2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2hhbm5lbC1zdWJzY3JpcHRpb24tc2NoZW1hLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDREQUF3RjtBQUUzRSxRQUFBLHlCQUF5QixHQUFlO0lBQ2pELE1BQU0sRUFBRSxrQ0FBaUIsQ0FBQyxNQUFNO0lBQ2hDLEtBQUssRUFBRSxxQkFBcUI7SUFDNUIsSUFBSSxFQUFFLCtCQUFjLENBQUMsTUFBTTtJQUMzQixVQUFVLEVBQUU7UUFDUixTQUFTLEVBQUU7WUFDUCxJQUFJLEVBQUUsK0JBQWMsQ0FBQyxNQUFNO1NBQzlCO1FBQ0QsWUFBWSxFQUFFO1lBQ1YsS0FBSyxFQUFFLGNBQWM7WUFDckIsSUFBSSxFQUFFLCtCQUFjLENBQUMsTUFBTTtZQUMzQixVQUFVLEVBQUU7Z0JBQ1IsRUFBRSxFQUFFO29CQUNBLEtBQUssRUFBRSxJQUFJO29CQUNYLElBQUksRUFBRSwrQkFBYyxDQUFDLE1BQU07aUJBQzlCO2dCQUNELElBQUksRUFBRTtvQkFDRixLQUFLLEVBQUUsTUFBTTtvQkFDYixJQUFJLEVBQUUsK0JBQWMsQ0FBQyxNQUFNO29CQUMzQixJQUFJLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQztpQkFDOUI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNMLEtBQUssRUFBRSxTQUFTO29CQUNoQixJQUFJLEVBQUUsK0JBQWMsQ0FBQyxNQUFNO2lCQUM5QjtnQkFDRCxNQUFNLEVBQUU7b0JBQ0osS0FBSyxFQUFFLFFBQVE7b0JBQ2YsSUFBSSxFQUFFLCtCQUFjLENBQUMsTUFBTTtpQkFDOUI7Z0JBQ0QsSUFBSSxFQUFFO29CQUNGLEtBQUssRUFBRSxNQUFNO29CQUNiLElBQUksRUFBRSwrQkFBYyxDQUFDLE9BQU87aUJBQy9CO2dCQUNELFNBQVMsRUFBRTtvQkFDUCxJQUFJLEVBQUUsK0JBQWMsQ0FBQyxNQUFNO29CQUMzQixLQUFLLEVBQUUsV0FBVztvQkFDbEIsVUFBVSxFQUFFO3dCQUNSLG1CQUFtQixFQUFFOzRCQUNqQixJQUFJLEVBQUUsK0JBQWMsQ0FBQyxNQUFNO3lCQUM5QjtxQkFDSjtvQkFDRCxRQUFRLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQztpQkFDcEM7Z0JBQ0QsVUFBVSxFQUFFO29CQUNSLEtBQUssRUFBRSxZQUFZO29CQUNuQixJQUFJLEVBQUUsK0JBQWMsQ0FBQyxNQUFNO2lCQUM5QjtnQkFDRCxTQUFTLEVBQUU7b0JBQ1AsS0FBSyxFQUFFLFdBQVc7b0JBQ2xCLElBQUksRUFBRSwrQkFBYyxDQUFDLE1BQU07b0JBQzNCLFVBQVUsRUFBRTt3QkFDUixNQUFNLEVBQUU7NEJBQ0osS0FBSyxFQUFFLFFBQVE7NEJBQ2YsSUFBSSxFQUFFLCtCQUFjLENBQUMsTUFBTTs0QkFDM0IsSUFBSSxFQUFFLENBQUMsU0FBUyxDQUFDO3lCQUNwQjt3QkFDRCxRQUFRLEVBQUU7NEJBQ04sS0FBSyxFQUFFLFVBQVU7NEJBQ2pCLElBQUksRUFBRSwrQkFBYyxDQUFDLE1BQU07NEJBQzNCLE1BQU0sRUFBRSxLQUFLO3lCQUNoQjtxQkFDSjtvQkFDRCxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDO2lCQUNuQzthQUNKO1lBQ0QsUUFBUSxFQUFFO2dCQUNOLElBQUk7Z0JBQ0osTUFBTTtnQkFDTixTQUFTO2dCQUNULFFBQVE7Z0JBQ1IsTUFBTTtnQkFDTixXQUFXO2dCQUNYLFlBQVk7Z0JBQ1osV0FBVzthQUNkO1NBQ0o7UUFDRCxLQUFLLEVBQUU7WUFDSCxLQUFLLEVBQUUsT0FBTztZQUNkLElBQUksRUFBRSwrQkFBYyxDQUFDLE1BQU07WUFDM0IsVUFBVSxFQUFFO2dCQUNSLE9BQU8sRUFBRTtvQkFDTCxLQUFLLEVBQUUsU0FBUztvQkFDaEIsSUFBSSxFQUFFLCtCQUFjLENBQUMsTUFBTTtpQkFDOUI7Z0JBQ0QsVUFBVSxFQUFFO29CQUNSLEtBQUssRUFBRSxVQUFVO29CQUNqQixJQUFJLEVBQUUsK0JBQWMsQ0FBQyxNQUFNO2lCQUM5QjtnQkFDRCxTQUFTLEVBQUU7b0JBQ1AsS0FBSyxFQUFFLGNBQWM7b0JBQ3JCLElBQUksRUFBRSwrQkFBYyxDQUFDLE1BQU07aUJBQzlCO2dCQUNELG1CQUFtQixFQUFFO29CQUNqQixLQUFLLEVBQUUscUJBQXFCO29CQUM1QixJQUFJLEVBQUUsK0JBQWMsQ0FBQyxNQUFNO2lCQUM5QjtnQkFDRCxzQkFBc0IsRUFBRTtvQkFDcEIsS0FBSyxFQUFFLHNCQUFzQjtvQkFDN0IsSUFBSSxFQUFFLCtCQUFjLENBQUMsTUFBTTtpQkFDOUI7Z0JBQ0QscUJBQXFCLEVBQUU7b0JBQ25CLEtBQUssRUFBRSwwQkFBMEI7b0JBQ2pDLElBQUksRUFBRSwrQkFBYyxDQUFDLE1BQU07aUJBQzlCO2dCQUNELElBQUksRUFBRTtvQkFDRixLQUFLLEVBQUUsbUJBQW1CO29CQUMxQixJQUFJLEVBQUUsK0JBQWMsQ0FBQyxNQUFNO2lCQUM5QjtnQkFDRCxPQUFPLEVBQUU7b0JBQ0wsS0FBSyxFQUFFLFNBQVM7b0JBQ2hCLElBQUksRUFBRSwrQkFBYyxDQUFDLE9BQU87aUJBQy9CO2FBQ0o7WUFDRCxRQUFRLEVBQUU7Z0JBQ04sU0FBUztnQkFDVCxZQUFZO2dCQUNaLFdBQVc7Z0JBQ1gsd0JBQXdCO2dCQUN4Qix1QkFBdUI7Z0JBQ3ZCLE1BQU07Z0JBQ04sU0FBUzthQUNYO1NBQ0w7S0FDSjtJQUNELFFBQVEsRUFBRSxDQUFDLGNBQWMsQ0FBQztDQUM3QixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSnNvblNjaGVtYSwgSnNvblNjaGVtYVR5cGUsIEpzb25TY2hlbWFWZXJzaW9uIH0gZnJvbSBcIkBhd3MtY2RrL2F3cy1hcGlnYXRld2F5XCI7XG5cbmV4cG9ydCBjb25zdCBDaGFubmVsU3Vic2NyaXB0aW9uU2NoZW1hOiBKc29uU2NoZW1hID0ge1xuICAgIHNjaGVtYTogSnNvblNjaGVtYVZlcnNpb24uRFJBRlQ0LFxuICAgIHRpdGxlOiAnQ2hhbm5lbFN1YnNjcmlwdGlvbicsXG4gICAgdHlwZTogSnNvblNjaGVtYVR5cGUuT0JKRUNULFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgY2hhbGxlbmdlOiB7XG4gICAgICAgICAgICB0eXBlOiBKc29uU2NoZW1hVHlwZS5TVFJJTkdcbiAgICAgICAgfSxcbiAgICAgICAgc3Vic2NyaXB0aW9uOiB7XG4gICAgICAgICAgICB0aXRsZTogJ1N1YnNjcmlwdGlvbicsXG4gICAgICAgICAgICB0eXBlOiBKc29uU2NoZW1hVHlwZS5PQkpFQ1QsXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgICAgaWQ6IHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiSWRcIixcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogSnNvblNjaGVtYVR5cGUuU1RSSU5HXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB0eXBlOiB7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIlR5cGVcIixcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogSnNvblNjaGVtYVR5cGUuU1RSSU5HLFxuICAgICAgICAgICAgICAgICAgICBlbnVtOiBbJ2NoYW5uZWwuc3Vic2NyaWJlJ11cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHZlcnNpb246IHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiVmVyc2lvblwiLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBKc29uU2NoZW1hVHlwZS5TVFJJTkdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHN0YXR1czoge1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJTdGF0dXNcIixcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogSnNvblNjaGVtYVR5cGUuU1RSSU5HXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjb3N0OiB7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkNvc3RcIixcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogSnNvblNjaGVtYVR5cGUuSU5URUdFUlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgY29uZGl0aW9uOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IEpzb25TY2hlbWFUeXBlLk9CSkVDVCxcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdDb25kaXRpb24nLFxuICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBicm9hZGNhc3Rlcl91c2VyX2lkOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogSnNvblNjaGVtYVR5cGUuU1RSSU5HXG4gICAgICAgICAgICAgICAgICAgICAgICB9IFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICByZXF1aXJlZDogWydicm9hZGNhc3Rlcl91c2VyX2lkJ11cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGNyZWF0ZWRfYXQ6IHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiQ3JlYXRlZCBBdFwiLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBKc29uU2NoZW1hVHlwZS5TVFJJTkdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHRyYW5zcG9ydDoge1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJUcmFuc3BvcnRcIixcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogSnNvblNjaGVtYVR5cGUuT0JKRUNULFxuICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJNZXRob2RcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBKc29uU2NoZW1hVHlwZS5TVFJJTkcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW51bTogW1wid2ViaG9va1wiXVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiQ2FsbGJhY2tcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBKc29uU2NoZW1hVHlwZS5TVFJJTkcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0OiBcInVyaVwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHJlcXVpcmVkOiBbXCJtZXRob2RcIiwgXCJjYWxsYmFja1wiXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZXF1aXJlZDogW1xuICAgICAgICAgICAgICAgIFwiaWRcIixcbiAgICAgICAgICAgICAgICBcInR5cGVcIixcbiAgICAgICAgICAgICAgICBcInZlcnNpb25cIixcbiAgICAgICAgICAgICAgICBcInN0YXR1c1wiLFxuICAgICAgICAgICAgICAgIFwiY29zdFwiLFxuICAgICAgICAgICAgICAgIFwiY29uZGl0aW9uXCIsXG4gICAgICAgICAgICAgICAgXCJjcmVhdGVkX2F0XCIsXG4gICAgICAgICAgICAgICAgXCJ0cmFuc3BvcnRcIlxuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICBldmVudDoge1xuICAgICAgICAgICAgdGl0bGU6IFwiRXZlbnRcIixcbiAgICAgICAgICAgIHR5cGU6IEpzb25TY2hlbWFUeXBlLk9CSkVDVCxcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgICB1c2VyX2lkOiB7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIlVzZXIgSWRcIixcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogSnNvblNjaGVtYVR5cGUuU1RSSU5HXG4gICAgICAgICAgICAgICAgfSwgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdXNlcl9sb2dpbjoge1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJVc2VybmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBKc29uU2NoZW1hVHlwZS5TVFJJTkdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHVzZXJfbmFtZToge1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJEaXNwbGF5IE5hbWVcIixcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogSnNvblNjaGVtYVR5cGUuU1RSSU5HXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBicm9hZGNhc3Rlcl91c2VyX2lkOiB7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkJyb2FkY2FzdGVyIFVzZXIgaWRcIixcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogSnNvblNjaGVtYVR5cGUuU1RSSU5HXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBicm9hZGNhc3Rlcl91c2VyX2xvZ2luOiB7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkJyb2FkY2FzdGVyIFVzZXJuYW1lXCIsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IEpzb25TY2hlbWFUeXBlLlNUUklOR1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgYnJvYWRjYXN0ZXJfdXNlcl9uYW1lOiB7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkJyb2FkY2FzdGVyIERpc3BsYXkgTmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBKc29uU2NoZW1hVHlwZS5TVFJJTkdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHRpZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiU3Vic2NyaXB0aW9uIFRpZXJcIixcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogSnNvblNjaGVtYVR5cGUuU1RSSU5HXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBpc19naWZ0OiB7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIklzIEdpZnRcIixcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogSnNvblNjaGVtYVR5cGUuQk9PTEVBTlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZXF1aXJlZDogW1xuICAgICAgICAgICAgICAgIFwidXNlcl9pZFwiLFxuICAgICAgICAgICAgICAgIFwidXNlcl9sb2dpblwiLFxuICAgICAgICAgICAgICAgIFwidXNlcl9uYW1lXCIsXG4gICAgICAgICAgICAgICAgXCJicm9hZGNhc3Rlcl91c2VyX2xvZ2luXCIsXG4gICAgICAgICAgICAgICAgXCJicm9hZGNhc3Rlcl91c2VyX25hbWVcIixcbiAgICAgICAgICAgICAgICBcInRpZXJcIixcbiAgICAgICAgICAgICAgICBcImlzX2dpZnRcIlxuICAgICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgcmVxdWlyZWQ6IFtcInN1YnNjcmlwdGlvblwiXVxufTsiXX0=