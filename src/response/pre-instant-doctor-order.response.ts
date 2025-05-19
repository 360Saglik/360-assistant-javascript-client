import { ApiResponse } from '../response';

/**
 * Data structure for pre-instant doctor order response
 */
export interface PreInstantDoctorOrderResponseData {
  orderId: string;
  patientId: string;
  userId: string;
  startDate: string;
  employee: {
    id: string;
    firstName: string;
    lastName: string;
    branch: {
      id: string;
      name: string;
    };
  };
  slot: {
    id: string;
    startDate: string;
    endDate: string;
  };
}

/**
 * Complete response for pre-instant doctor order
 */
export interface PreInstantDoctorOrderResponse extends ApiResponse {
  /**
   * PreInstantDoctorOrder response data
   */
  data?: PreInstantDoctorOrderResponseData;
}
