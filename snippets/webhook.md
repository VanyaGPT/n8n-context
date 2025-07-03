# Webhook Node

Working with HTTP requests.

### Example 1: Basic Webhook
```json
{
  "parameters": {
    "path": "webhook",
    "responseMode": "lastNode",
    "options": {}
  },
  "type": "n8n-nodes-base.webhook",
  "typeVersion": 1.1
}
```

### Example 2: Webhook with Authorization
```json
{
  "parameters": {
    "path": "secure-webhook",
    "authentication": "basicAuth",
    "responseMode": "lastNode",
    "options": {}
  },
  "type": "n8n-nodes-base.webhook",
  "typeVersion": 1.1,
  "credentials": {
    "httpBasicAuth": {
      "id": "webhook_auth_id",
      "name": "Webhook Auth"
    }
  }
}
```

### Example 3: Respond to Webhook
```json
{
  "parameters": {
    "respondWith": "json",
    "responseCode": 200,
    "responseData": "firstEntryJson",
    "options": {}
  },
  "type": "n8n-nodes-base.respondToWebhook",
  "typeVersion": 1
}
```

### Example 4: Webhook with JSON Parsing
```json
{
  "parameters": {
    "path": "api/data",
    "responseMode": "onReceived",
    "responseData": "noData",
    "options": {
      "bodyContentType": "json"
    }
  },
  "type": "n8n-nodes-base.webhook",
  "typeVersion": 1.1
}
```
