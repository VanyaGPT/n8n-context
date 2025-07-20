# Schedule Trigger Node

Running workflows on schedule.

### Example 1: Daily Run
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

### Example 2: Run by Cron Expression
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

### Example 3: Run Every Hour
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

### Example 4: Run on Specific Days of the Week
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
