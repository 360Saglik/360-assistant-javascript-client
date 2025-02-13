import { Helpers } from '../src/util';
import { ServerEnum } from '../src/enum';

describe('Helpers', () => {
  describe('getServerUrl', () => {
    it('should return development URL when ServerType is Development', () => {
      const url = Helpers.getServerUrl(ServerEnum.Development);
      expect(url).toBe('https://integration-api-gateway.360saglik.dev');
    });

    it('should return production URL when ServerType is Production', () => {
      const url = Helpers.getServerUrl(ServerEnum.Production);
      expect(url).toBe('https://integration-api-gateway.360saglik.com');
    });

    it('should throw error for invalid server type', () => {
      expect(() => {
        Helpers.getServerUrl('invalid' as ServerEnum);
      }).toThrow('Invalid server type');
    });
  });

  describe('fromJsonToObject', () => {
    it('should parse JSON and add status info', () => {
      const result = Helpers.fromJsonToObject('{"name":"test"}', 200, true);
      expect(result).toEqual({
        name: 'test',
        statusCode: 200,
        success: true,
      });
    });

    it('should throw error for invalid JSON', () => {
      expect(() => {
        Helpers.fromJsonToObject('invalid json', 200, true);
      }).toThrow('Failed to parse response');
    });
  });
});
