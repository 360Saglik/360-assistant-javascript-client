"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../src");
describe('AssistantClient', () => {
    const CLIENT_ID = 'client_id';
    const CLIENT_SECRET = 'client_secret';
    it('should throw error when clientId is null', () => {
        expect(() => {
            new src_1.AssistantClient({ clientId: null, secretKey: CLIENT_SECRET });
        }).toThrow('clientId cannot be null');
    });
    it('should throw error when clientSecret is null', () => {
        expect(() => {
            new src_1.AssistantClient({ clientId: CLIENT_ID, secretKey: null });
        }).toThrow('secretKey cannot be null');
    });
    it('should throw error when patient is null in authenticatePatientAsync', async () => {
        const client = new src_1.AssistantClient({ clientId: CLIENT_ID, secretKey: CLIENT_SECRET });
        await expect(client.authenticatePatient(null)).rejects.toThrow('patient cannot be null');
    });
    it('should throw error when token is null in validateTokenAsync', async () => {
        const client = new src_1.AssistantClient({ clientId: CLIENT_ID, secretKey: CLIENT_SECRET });
        await expect(client.validateToken(null)).rejects.toThrow('token cannot be null');
    });
});
