# HTTP Request Node

Examples for working with external APIs.

### Example 1: GET Request
```json
{
  "parameters": {
    "url": "https://api.example.com/data",
    "method": "GET",
    "authentication": "none",
    "options": {}
  },
  "type": "n8n-nodes-base.httpRequest",
  "typeVersion": 4.2
}
```

### Example 2: POST Request with JSON Data
```json
{
  "parameters": {
    "url": "https://api.example.com/create",
    "method": "POST",
    "authentication": "none",
    "sendHeaders": true,
    "headerParameters": {
      "parameters": [
        {
          "name": "Content-Type",
          "value": "application/json"
        }
      ]
    },
    "sendBody": true,
    "bodyParameters": {
      "parameters": [
        {
          "name": "name",
          "value": "={{ $json.name }}"
        },
        {
          "name": "email",
          "value": "={{ $json.email }}"
        }
      ]
    },
    "options": {}
  },
  "type": "n8n-nodes-base.httpRequest",
  "typeVersion": 4.2
}
```

### Example 3: API with Authorization
```json
{
  "parameters": {
    "url": "https://api.example.com/secure-endpoint",
    "method": "GET",
    "authentication": "headerAuth",
    "options": {}
  },
  "type": "n8n-nodes-base.httpRequest",
  "typeVersion": 4.2,
  "credentials": {
    "httpHeaderAuth": {
      "id": "credential_id",
      "name": "API Auth"
    }
  }
}
```
