/**
 * Base response interface for API calls
 */
export interface ApiResponse {
  /**
   * Array of actions to be performed
   */
  actions?: unknown[];

  /**
   * Response message
   */
  message?: string;

  /**
   * Indicates if the request was successful
   */
  isSuccess: boolean;

  /**
   * HTTP status code
   */
  statusCode: number;

  /**
   * Error message if request failed
   */
  error?: string;
}
