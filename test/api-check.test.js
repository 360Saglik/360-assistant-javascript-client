"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const enum_1 = require("../src/enum");
const src_1 = require("../src");
describe('API Check Tests', () => {
    const CLIENT_ID = 'b2318dc3-c5c6-490a-add3-10bd15cd1aa9';
    const CLIENT_SECRET = '8zXLVIREJ1noR1PXBN63F1xXwDlfRmdvNzwLseys1dabm6DmuCCVvc9HOskfZ1Q2';
    const ENV = enum_1.ServerEnum.Development;
    let client;
    let policyInstance;
    let patientInstance;
    beforeEach(() => {
        policyInstance = {
            id: (0, crypto_1.randomUUID)(),
            policyNumber: '12345678901',
            startDate: new Date(),
            endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
            group: 'Custom Field',
            description: 'Test Policy',
        };
        patientInstance = {
            id: (0, crypto_1.randomUUID)(),
            gsmCountryCode: '+90',
            gsm: '5551231234',
            firstName: 'Richard',
            lastName: 'Stallman',
            countryCode: 'TUR',
            nationalId: '12345678901',
            passportNumber: '12345678901',
            policy: policyInstance,
            birthDate: new Date('1988-06-25'),
            gender: enum_1.GenderEnum.Male,
        };
        client = new src_1.AssistantClient({
            clientId: CLIENT_ID,
            secretKey: CLIENT_SECRET,
            serverType: ENV,
        });
    });
    it('should authenticate patient successfully', async () => {
        const auth = await client.authenticatePatient(patientInstance);
        expect(auth).toBeDefined();
        expect(auth.data).toBeDefined();
        expect(auth.data.accessToken).toBeTruthy();
        expect(auth.data.accessTokenExpiredTime).toBeDefined();
        expect(new Date(auth.data.accessTokenExpiredTime)).toBeInstanceOf(Date);
        expect(new Date(auth.data.accessTokenExpiredTime).getTime()).toBeGreaterThan(new Date().getTime());
        expect(auth.data.redirectUrl).toBeTruthy();
        expect(auth.actions).toBeDefined();
        expect(auth.message).toBe('success');
    });
    it('should validate token successfully', async () => {
        var _a;
        const auth = await client.authenticatePatient(patientInstance);
        expect(auth.data.accessToken).toBeDefined();
        if (auth.data.accessToken) {
            const validate = await client.validateToken({
                token: auth.data.accessToken,
            });
            expect(validate).toBeDefined();
            expect(validate.data).toBeDefined();
            expect((_a = validate.data) === null || _a === void 0 ? void 0 : _a.result).toBe(true);
            expect(validate.actions).toBeDefined();
            expect(validate.message).toBe('success');
        }
    });
});
