export interface Paginated {
  /**
   * Current page number.
   */
  page: number;
  /**
   * Total amount of pages.
   */
  pages: number;
  /**
   * Items amount per page.
   */
  perpage: number;
  /**
   * Total amount of items.
   */
  total: number;
}
