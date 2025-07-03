# Switch Node

Data routing by conditions with named outputs.

### Example 1: Simple String Condition
```json
{
  "parameters": {
    "rules": {
      "values": [
        {
          "renameOutput": true,
          "outputKey": "success",
          "conditions": {
            "options": {"version": 2},
            "conditions": [
              {
                "leftValue": "={{ $json.status }}",
                "rightValue": "ok", 
                "operator": {"type": "string", "operation": "equals"}
              }
            ]
          }
        }
      ]
    }
  },
  "type": "n8n-nodes-base.switch",
  "typeVersion": 3.2
}
```

### Example 2: Multiple Webhook Events
```json
{
  "parameters": {
    "rules": {
      "values": [
        {
          "renameOutput": true,
          "outputKey": "ONAPPINSTALL",
          "conditions": {
            "options": {"version": 2},
            "conditions": [
              {
                "leftValue": "={{ $json.body.event }}",
                "rightValue": "ONAPPINSTALL",
                "operator": {"type": "string", "operation": "equals"}
              }
            ]
          }
        },
        {
          "renameOutput": true,
          "outputKey": "ONIMBOTMESSAGEADD",
          "conditions": {
            "options": {"version": 2},
            "conditions": [
              {
                "leftValue": "={{ $json.body.event }}",
                "rightValue": "ONIMBOTMESSAGEADD",
                "operator": {"type": "string", "operation": "equals"}
              }
            ]
          }
        }
      ]
    }
  },
  "type": "n8n-nodes-base.switch",
  "typeVersion": 3.2
}
```
