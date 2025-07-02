# Error Handling

Примеры обработки ошибок в n8n.

### Пример 1: Обработка ошибок с continueErrorOutput
```json
{
  "parameters": {
    "url": "https://api.example.com/data",
    "options": {}
  },
  "type": "n8n-nodes-base.httpRequest",
  "typeVersion": 4.2,
  "onError": "continueErrorOutput"
}
```

### Пример 2: Полная структура с обработкой ошибок
```json
{
  "nodes": [
    {
      "parameters": {
        "url": "https://api.example.com/data",
        "options": {}
      },
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "id": "1a2b3c",
      "name": "API Call",
      "onError": "continueErrorOutput"
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "name": "success",
              "value": "true",
              "type": "boolean"
            }
          ]
        }
      },
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "id": "4d5e6f",
      "name": "Success Handler"
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "name": "error",
              "value": "={{ $json }}",
              "type": "json"
            }
          ]
        }
      },
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "id": "7g8h9i",
      "name": "Error Handler"
    }
  ],
  "connections": {
    "API Call": {
      "main": [
        [
          {
            "node": "Success Handler",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "Error Handler",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  }
}
```
