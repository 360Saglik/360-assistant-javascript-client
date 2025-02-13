"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../src/util");
const enum_1 = require("../src/enum");
describe('Helpers', () => {
    describe('getServerUrl', () => {
        it('should return development URL when ServerType is Development', () => {
            const url = util_1.Helpers.getServerUrl(enum_1.ServerEnum.Development);
            expect(url).toBe('https://integration-api-gateway.360saglik.dev');
        });
        it('should return production URL when ServerType is Production', () => {
            const url = util_1.Helpers.getServerUrl(enum_1.ServerEnum.Production);
            expect(url).toBe('https://integration-api-gateway.360saglik.com');
        });
        it('should throw error for invalid server type', () => {
            expect(() => {
                util_1.Helpers.getServerUrl('invalid');
            }).toThrow('Invalid server type');
        });
    });
    describe('fromJsonToObject', () => {
        it('should parse JSON and add status info', () => {
            const result = util_1.Helpers.fromJsonToObject('{"name":"test"}', 200, true);
            expect(result).toEqual({
                name: 'test',
                statusCode: 200,
                success: true,
            });
        });
        it('should throw error for invalid JSON', () => {
            expect(() => {
                util_1.Helpers.fromJsonToObject('invalid json', 200, true);
            }).toThrow('Failed to parse response');
        });
    });
});
