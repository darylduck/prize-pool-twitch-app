"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const axios_1 = require("axios");
const graphql_tag_1 = require("graphql-tag");
const graphql = require("graphql");
exports.handler = async (event, context) => {
    const body = event.body;
    const headers = event.headers;
    const twitchMessageType = headers['twitch-eventsub-message-type'];
    const verificationStatus = 'webhook_callback_verification';
    if (!body.challenge && twitchMessageType === verificationStatus) {
        context.fail(JSON.stringify({
            errorMessage: 'Could not locate challenge value in your payload'
        }));
    }
    if (twitchMessageType === verificationStatus) {
        return body.challenge;
    }
    const prizePoolApiKey = process.env.PRIZE_POOL_API_KEY || '';
    const prizePoolApiUrl = process.env.PRIZE_POOL_ENDPOINT || '';
    const { event: twitchEvent } = body;
    const createSubMutation = graphql_tag_1.default(`mutation CreateTwitchSub($twitchSubInput: CreateTwitchSubInput!) {
        createTwitchSub(input: $twitchSubInput) {
            DisplayName
            MonthYear
            UserId
            Username
        }
    }`);
    const { print } = graphql;
    await axios_1.default({
        url: prizePoolApiUrl,
        method: 'post',
        headers: {
            'x-api-key': prizePoolApiKey
        },
        data: {
            query: print(createSubMutation),
            variables: {
                twitchSubInput: {
                    DisplayName: twitchEvent.user_name,
                    MonthYear: '6-2021',
                    UserId: twitchEvent.user_id,
                    Username: twitchEvent.user_login
                }
            }
        }
    });
    return undefined;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxpQ0FBMEI7QUFDMUIsNkNBQThCO0FBQzlCLG1DQUFtQztBQUl0QixRQUFBLE9BQU8sR0FBRyxLQUFLLEVBQUUsS0FBVSxFQUFFLE9BQVksRUFBRSxFQUFFO0lBQ3RELE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUM7SUFDeEIsTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQztJQUM5QixNQUFNLGlCQUFpQixHQUFHLE9BQU8sQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO0lBQ2xFLE1BQU0sa0JBQWtCLEdBQUcsK0JBQStCLENBQUM7SUFFM0QsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksaUJBQWlCLEtBQUssa0JBQWtCLEVBQUU7UUFDN0QsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQ3hCLFlBQVksRUFBQyxrREFBa0Q7U0FDbEUsQ0FBQyxDQUFDLENBQUM7S0FDUDtJQUVELElBQUksaUJBQWlCLEtBQUssa0JBQWtCLEVBQUU7UUFDMUMsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0tBQ3pCO0lBRUQsTUFBTSxlQUFlLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsSUFBSSxFQUFFLENBQUM7SUFDN0QsTUFBTSxlQUFlLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsSUFBSSxFQUFFLENBQUM7SUFDOUQsTUFBTSxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsR0FBRyxJQUFJLENBQUM7SUFFcEMsTUFBTSxpQkFBaUIsR0FBRyxxQkFBRyxDQUFDOzs7Ozs7O01BTzVCLENBQUMsQ0FBQztJQUVKLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxPQUFPLENBQUM7SUFFMUIsTUFBTSxlQUFLLENBQUM7UUFDUixHQUFHLEVBQUUsZUFBZTtRQUNwQixNQUFNLEVBQUUsTUFBTTtRQUNkLE9BQU8sRUFBRTtZQUNMLFdBQVcsRUFBRSxlQUFlO1NBQy9CO1FBQ0QsSUFBSSxFQUFFO1lBQ0YsS0FBSyxFQUFFLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQztZQUMvQixTQUFTLEVBQUU7Z0JBQ1gsY0FBYyxFQUFFO29CQUNaLFdBQVcsRUFBRSxXQUFXLENBQUMsU0FBUztvQkFDbEMsU0FBUyxFQUFFLFFBQVE7b0JBQ25CLE1BQU0sRUFBRSxXQUFXLENBQUMsT0FBTztvQkFDM0IsUUFBUSxFQUFFLFdBQVcsQ0FBQyxVQUFVO2lCQUNuQzthQUNBO1NBQ0o7S0FDSixDQUFDLENBQUM7SUFFSCxPQUFPLFNBQVMsQ0FBQztBQUNyQixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xuaW1wb3J0IGdxbCBmcm9tICdncmFwaHFsLXRhZyc7XG5pbXBvcnQgKiBhcyBncmFwaHFsIGZyb20gJ2dyYXBocWwnO1xuXG5pbXBvcnQgeyBpc1ZhbGlkVHdpdGNoUmVxdWVzdCB9IGZyb20gJy4vdmVyaWZ5LXR3aXRjaCc7XG5cbmV4cG9ydCBjb25zdCBoYW5kbGVyID0gYXN5bmMgKGV2ZW50OiBhbnksIGNvbnRleHQ6IGFueSkgPT4ge1xuICAgIGNvbnN0IGJvZHkgPSBldmVudC5ib2R5O1xuICAgIGNvbnN0IGhlYWRlcnMgPSBldmVudC5oZWFkZXJzO1xuICAgIGNvbnN0IHR3aXRjaE1lc3NhZ2VUeXBlID0gaGVhZGVyc1sndHdpdGNoLWV2ZW50c3ViLW1lc3NhZ2UtdHlwZSddO1xuICAgIGNvbnN0IHZlcmlmaWNhdGlvblN0YXR1cyA9ICd3ZWJob29rX2NhbGxiYWNrX3ZlcmlmaWNhdGlvbic7XG4gICAgXG4gICAgaWYgKCFib2R5LmNoYWxsZW5nZSAmJiB0d2l0Y2hNZXNzYWdlVHlwZSA9PT0gdmVyaWZpY2F0aW9uU3RhdHVzKSB7XG4gICAgICAgIGNvbnRleHQuZmFpbChKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICBlcnJvck1lc3NhZ2U6J0NvdWxkIG5vdCBsb2NhdGUgY2hhbGxlbmdlIHZhbHVlIGluIHlvdXIgcGF5bG9hZCdcbiAgICAgICAgfSkpO1xuICAgIH1cbiAgICBcbiAgICBpZiAodHdpdGNoTWVzc2FnZVR5cGUgPT09IHZlcmlmaWNhdGlvblN0YXR1cykge1xuICAgICAgICByZXR1cm4gYm9keS5jaGFsbGVuZ2U7XG4gICAgfVxuXG4gICAgY29uc3QgcHJpemVQb29sQXBpS2V5ID0gcHJvY2Vzcy5lbnYuUFJJWkVfUE9PTF9BUElfS0VZIHx8ICcnO1xuICAgIGNvbnN0IHByaXplUG9vbEFwaVVybCA9IHByb2Nlc3MuZW52LlBSSVpFX1BPT0xfRU5EUE9JTlQgfHwgJyc7XG4gICAgY29uc3QgeyBldmVudDogdHdpdGNoRXZlbnQgfSA9IGJvZHk7XG5cbiAgICBjb25zdCBjcmVhdGVTdWJNdXRhdGlvbiA9IGdxbChgbXV0YXRpb24gQ3JlYXRlVHdpdGNoU3ViKCR0d2l0Y2hTdWJJbnB1dDogQ3JlYXRlVHdpdGNoU3ViSW5wdXQhKSB7XG4gICAgICAgIGNyZWF0ZVR3aXRjaFN1YihpbnB1dDogJHR3aXRjaFN1YklucHV0KSB7XG4gICAgICAgICAgICBEaXNwbGF5TmFtZVxuICAgICAgICAgICAgTW9udGhZZWFyXG4gICAgICAgICAgICBVc2VySWRcbiAgICAgICAgICAgIFVzZXJuYW1lXG4gICAgICAgIH1cbiAgICB9YCk7XG5cbiAgICBjb25zdCB7IHByaW50IH0gPSBncmFwaHFsO1xuXG4gICAgYXdhaXQgYXhpb3Moe1xuICAgICAgICB1cmw6IHByaXplUG9vbEFwaVVybCxcbiAgICAgICAgbWV0aG9kOiAncG9zdCcsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICd4LWFwaS1rZXknOiBwcml6ZVBvb2xBcGlLZXlcbiAgICAgICAgfSxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgcXVlcnk6IHByaW50KGNyZWF0ZVN1Yk11dGF0aW9uKSxcbiAgICAgICAgICAgIHZhcmlhYmxlczoge1xuICAgICAgICAgICAgdHdpdGNoU3ViSW5wdXQ6IHtcbiAgICAgICAgICAgICAgICBEaXNwbGF5TmFtZTogdHdpdGNoRXZlbnQudXNlcl9uYW1lLFxuICAgICAgICAgICAgICAgIE1vbnRoWWVhcjogJzYtMjAyMScsXG4gICAgICAgICAgICAgICAgVXNlcklkOiB0d2l0Y2hFdmVudC51c2VyX2lkLFxuICAgICAgICAgICAgICAgIFVzZXJuYW1lOiB0d2l0Y2hFdmVudC51c2VyX2xvZ2luXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xufTtcbiJdfQ==