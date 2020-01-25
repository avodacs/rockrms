# Rock RMS API Client

An API Client for Rock RMS.

## Example

This example demonstrates how to authenticate and pull a list of Defined Values, given a specific Defined Type.  Parameters are as follows:

- **`<USERNAME>`**: A valid username in your Rock installation.
- **`<PASSWORD>`**: The password for the username specified above.
- **`<URL>`**: The URL to your Rock installation, _not_ including `/api`.

```js
const RockClient = require('rockrms');

const client = new RockClient({
  username: '<USERNAME>',
  password: '<PASSWORD>',
  url: '<URL>'
});

(async() => {
  await client.authenticate();

  let definedValues = await client.request({
    path: '/api/DefinedValues',
    params: {
      $filter: `DefinedTypeId eq 84`,
      loadAttributes: 'simple'
    }
  })

  console.dir(definedValues);
})();
```