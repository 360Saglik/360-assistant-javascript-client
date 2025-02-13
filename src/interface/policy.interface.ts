import { Product } from './product.interface';

export interface Policy {
  /**
   * Unique identifier for the policy.
   * @example "987654321"
   */
  id: string;

  /**
   * Policy number assigned by the insurance provider.
   * @example "POL123456"
   */
  policyNumber: string;

  /**
   * Start date of the policy coverage period.
   * @example "2023-01-01"
   */
  startDate: Date;

  /**
   * End date of the policy coverage period.
   * @example "2024-01-01"
   */
  endDate: Date;

  /**
   * Custom Fields.
   */
  group?: string;

  /**
   * Detailed description of the policy.
   */
  description?: string;

  /**
   * List of products covered by the policy.
   * @example [{ "id": "1", "remainingSessionRights": 10 }]
   */
  products?: Product[];
}
