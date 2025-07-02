# Webhook Node

Работа с HTTP запросами.

### Пример 1: Базовый Webhook
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

### Пример 2: Webhook с авторизацией
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

### Пример 3: Respond to Webhook
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

### Пример 4: Webhook с парсингом JSON
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
