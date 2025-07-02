# Switch Node

Маршрутизация данных по условиям с именованными выходами.

### Пример 1: Простое строковое условие
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
```


### Пример 2: Множественные события webhook
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
