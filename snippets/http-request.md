# HTTP Request Node

Примеры для работы с внешними API.

### Пример 1: GET запрос
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

### Пример 2: POST запрос с JSON данными
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

### Пример 3: API с авторизацией
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
