"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanObjectData = exports.commarisedAmount = exports.minutesToSeconds = exports.generateOTP = exports.generateReferralId = void 0;
const generateReferralId = () => {
    const length = 8;
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let retVal = '';
    for (let i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
};
exports.generateReferralId = generateReferralId;
const generateOTP = () => {
    const length = 4;
    const charset = '0123456789';
    let retVal = '';
    for (let i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
};
exports.generateOTP = generateOTP;
const minutesToSeconds = (minutes) => minutes * 60;
exports.minutesToSeconds = minutesToSeconds;
const commarisedAmount = (amount) => {
    let arr = [];
    let strr = [];
    for (let i = amount.length - 1; i >= 0; i--) {
        strr.unshift(amount[i]);
        if (strr.length == 3) {
            arr.unshift(strr.join(''));
            strr = [];
        }
    }
    if (strr.length > 0) {
        arr.unshift(strr.join(''));
    }
    return arr.join();
};
exports.commarisedAmount = commarisedAmount;
const cleanObjectData = (obj) => {
    for (const key in obj)
        if ( /*obj[key].trim === '' ||*/obj[key] === '' || obj[key] === null || obj[key] === undefined)
            delete obj[key];
};
exports.cleanObjectData = cleanObjectData;
