"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidTwitchRequest = void 0;
exports.isValidTwitchRequest = (secretKey, currentSignature, messageId, timestamp, messageBody) => {
    /*const bodyBuff = new Buffer(JSON.stringify(messageBody));
    const unencodedValue = `${messageId}${timestamp}${bodyBuff}`;
    
    const calculatedSignature = crypto.createHmac("sha256", secretKey)
                                      .update(unencodedValue)
                                      .digest("hex");
                                      
    console.log('Signature', currentSignature);
    console.log('Calculated Signature', calculatedSignature);
    
    return currentSignature === calculatedSignature;*/
    return true;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVyaWZ5LXR3aXRjaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInZlcmlmeS10d2l0Y2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRWEsUUFBQSxvQkFBb0IsR0FBRyxDQUNoQyxTQUFpQixFQUNqQixnQkFBd0IsRUFDeEIsU0FBaUIsRUFDakIsU0FBaUIsRUFDakIsV0FBbUIsRUFDckIsRUFBRTtJQUNBOzs7Ozs7Ozs7O3NEQVVrRDtJQUVsRCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVIbWFjIH0gZnJvbSAnY3J5cHRvJztcblxuZXhwb3J0IGNvbnN0IGlzVmFsaWRUd2l0Y2hSZXF1ZXN0ID0gKFxuICAgIHNlY3JldEtleTogc3RyaW5nLCBcbiAgICBjdXJyZW50U2lnbmF0dXJlOiBzdHJpbmcsXG4gICAgbWVzc2FnZUlkOiBzdHJpbmcsXG4gICAgdGltZXN0YW1wOiBzdHJpbmcsXG4gICAgbWVzc2FnZUJvZHk6IHN0cmluZ1xuKSA9PiB7XG4gICAgLypjb25zdCBib2R5QnVmZiA9IG5ldyBCdWZmZXIoSlNPTi5zdHJpbmdpZnkobWVzc2FnZUJvZHkpKTtcbiAgICBjb25zdCB1bmVuY29kZWRWYWx1ZSA9IGAke21lc3NhZ2VJZH0ke3RpbWVzdGFtcH0ke2JvZHlCdWZmfWA7XG4gICAgXG4gICAgY29uc3QgY2FsY3VsYXRlZFNpZ25hdHVyZSA9IGNyeXB0by5jcmVhdGVIbWFjKFwic2hhMjU2XCIsIHNlY3JldEtleSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnVwZGF0ZSh1bmVuY29kZWRWYWx1ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRpZ2VzdChcImhleFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgY29uc29sZS5sb2coJ1NpZ25hdHVyZScsIGN1cnJlbnRTaWduYXR1cmUpO1xuICAgIGNvbnNvbGUubG9nKCdDYWxjdWxhdGVkIFNpZ25hdHVyZScsIGNhbGN1bGF0ZWRTaWduYXR1cmUpO1xuICAgIFxuICAgIHJldHVybiBjdXJyZW50U2lnbmF0dXJlID09PSBjYWxjdWxhdGVkU2lnbmF0dXJlOyovXG4gICAgXG4gICAgcmV0dXJuIHRydWU7XG59Il19