export interface ValidationPropTypes {
  /** Indicate that error has occurred
   * Pass string to display icon, tooltip and red border
   * Pass true boolean to only display red border
   */
  error?: boolean | string;
  /** Indicate additional information
   * Pass string to display icon, tooltip and blue border
   * Pass true boolean to only display blue border
   */
  info?: boolean | string;
  /** Indicate that warning has occurred
   * Pass string to display icon, tooltip and orange border
   * Pass true boolean to only display orange border
   */
  warning?: boolean | string;
}
