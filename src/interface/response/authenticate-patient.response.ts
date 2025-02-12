import { ApiResponse } from '../response';

/**
 * Complete response for patient authentication
 */
export interface AuthenticatePatientResponse extends ApiResponse {
  /**
   * Authentication response data
   */
  data: AuthenticatePatientDataResponse;
}

/**
 * Data structure for authentication response
 */
export interface AuthenticatePatientDataResponse {
  /**
   * JWT access token
   */
  accessToken?: string;

  /**
   * Expiration time of the access token
   */
  accessTokenExpiredTime?: Date;

  /**
   * URL to redirect the user to
   */
  redirectUrl?: string;
}
