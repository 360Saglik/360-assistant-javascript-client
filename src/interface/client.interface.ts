import { ServerType } from '../enum';

export interface Client {
  /**
   * Unique identifier for the client.
   * @example 11e4ae4a-5c3c-4f4c-b959-cd0e45259ee1
   */
  clientId: string;

  /**
   * Number of remaining session rights for the product
   * @example Av125BjxADzrI2C8C6PKrwTe9lp441lI7TFzqTlOSHPrteJMb1VkSKcEPx1bFQxc
   */
  secretKey: string;

  /**
   * Server type for the client.
   * @default ServerType.Development
   * @example ServerType.Development
   */
  serverType?: ServerType;
}
