To create the openapi definitions use 
`typegen http://localhost:8000/api/openapi.json > openapi.d.ts`. Make sure you are on the right folder.

API Notes:

API
- Api.ts -> openapi getApiClient (https://openapistack.co/docs/examples/tanstack-query/)
- Api-queries.ts -> functions that use api.ts

To consume api in our app we use TanStack Query ex(https://openapistack.co/docs/examples/tanstack-query/)

To grab the json file use ```npx openapicmd read --strip openapi_client_axios --format json http://localhost:8000/api/openapi.json > openapi-runtime.json```