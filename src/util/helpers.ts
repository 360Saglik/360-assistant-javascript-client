import { ServerType } from '../enum';

/**
 * Helper class for various utility functions.
 */
export class Helpers {
  /**
   * Get the server URL based on the server type.
   * @param serverType The server type to get the URL for.
   * @returns The server URL.
   */
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

  /**
   * Convert a JSON string to an object.
   * @param responseContent The JSON string to convert.
   * @param statusCode The status code of the response.
   * @param isSuccessStatusCode Whether the status code is a success status code.
   * @returns The object.
   */
  static fromJsonToObject<T>(responseContent: string, statusCode: number, isSuccessStatusCode: boolean): T {
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
