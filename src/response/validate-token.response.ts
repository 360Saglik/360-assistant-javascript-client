import { ApiResponse } from '../response';

/**
 * Data structure for token validation response
 */
export interface ValidateTokenDataResponse {
  /**
   * Gets the result of the token validation
   */
  result: boolean;
}

/**
 * Complete response for token validation
 */
export interface ValidateTokenResponse extends ApiResponse {
  /**
   * Token validation response data
   */
  data?: ValidateTokenDataResponse;
}

/**
 * Represents a token validation request.
 */
export interface ValidateToken {
  /**
   * The token to be validated was obtained from Authenticate Endpoint.
   */
  token: string;
}
