# Schedule Trigger Node

Запуск workflow по расписанию.

### Пример 1: Ежедневный запуск
```json
{
  "parameters": {
    "triggerTimes": {
      "item": [
        {
          "mode": "everyDay",
          "hour": 9,
          "minute": 0
        }
      ]
    }
  },
  "type": "n8n-nodes-base.scheduleTrigger",
  "typeVersion": 1.1
}
```

### Пример 2: Запуск по cron-выражению
```json
{
  "parameters": {
    "triggerTimes": {
      "item": [
        {
          "mode": "cronExpression",
          "cronExpression": "0 0 * * 1" 
        }
      ]
    }
  },
  "type": "n8n-nodes-base.scheduleTrigger",
  "typeVersion": 1.1
}
```

### Пример 3: Запуск каждый час
```json
{
  "parameters": {
    "triggerTimes": {
      "item": [
        {
          "mode": "everyX",
          "unit": "hours",
          "value": 1
        }
      ]
    }
  },
  "type": "n8n-nodes-base.scheduleTrigger",
  "typeVersion": 1.1
}
```

### Пример 4: Запуск в определенные дни недели
```json
{
  "parameters": {
    "triggerTimes": {
      "item": [
        {
          "mode": "specificDays", 
          "days": {
            "monday": true,
            "wednesday": true,
            "friday": true
          },
          "hour": 8,
          "minute": 30
        }
      ]
    }
  },
  "type": "n8n-nodes-base.scheduleTrigger",
  "typeVersion": 1.1
}
```
