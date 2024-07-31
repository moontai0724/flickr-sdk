export interface Paginated {
  /**
   * Current page number.
   */
  page: number | string;
  /**
   * Total amount of pages.
   */
  pages: number;
  /**
   * Items amount per page.
   */
  perpage: number | string;
  /**
   * Total amount of items.
   */
  total: number;
}
