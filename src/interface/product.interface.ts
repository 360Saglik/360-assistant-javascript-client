export interface Product {
  /**
   * Unique identifier for the product.
   * @example "1"
   */
  id: string;

  /**
   * Number of remaining session rights for the product
   * @example 10
   */
  remainingSessionRights: number;
}
