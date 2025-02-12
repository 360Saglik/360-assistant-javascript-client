import { ServerType } from '../enum/server.type';

export class Helpers {
  static getServerUrl(serverType: ServerType): string {
    switch (serverType) {
      case ServerType.Development:
        return 'https://integration-api-gateway.360saglik.dev';
      case ServerType.Production:
        return 'https://integration-api-gateway.360saglik.com';
      default:
        throw new Error('Invalid server type');
    }
  }

  static fromJsonToObject<T>(
    responseContent: string,
    statusCode: number,
    isSuccessStatusCode: boolean,
  ): T {
    try {
      const response = JSON.parse(responseContent) as T;
      return {
        ...response,
        statusCode,
        success: isSuccessStatusCode,
      } as T;
    } catch (error) {
      throw new Error(`Failed to parse response: ${error}`);
    }
  }
}
