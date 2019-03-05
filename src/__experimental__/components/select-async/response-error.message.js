export default `The server response does not contain an $items attribute.

The SelectAsync component expects the data to be in the format of:

  $items: [Array] - required, the items to render
  $page: [Integer] - optional, for paginated responses
  $total: [Integer] - optional, for paginated responses

If your API response does not match this, you can modify it using the 'formatResponse' prop:

<SelectAsync formatResponse={ response => ({ ...response, data: { $items: response.myItems } }) } />

This follows the axios response schema: https://github.com/axios/axios#response-schema`;
