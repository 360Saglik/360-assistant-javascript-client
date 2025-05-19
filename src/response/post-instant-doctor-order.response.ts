import { ApiResponse } from '../response';

/**
 * Data structure for post-instant doctor order response
 */
export interface PostInstantDoctorOrderResponseData {
  result: boolean;
}

/**
 * Complete response for token validation
 */
export interface PostInstantDoctorOrderResponse extends ApiResponse {
  /**
   * PostInstantDoctorOrder response data
   */
  data?: PostInstantDoctorOrderResponseData;
}
