# Error Handling

Examples of error handling in n8n.

### Example 1: Error Handling with continueErrorOutput
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

### Example 2: Complete Structure with Error Handling
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
