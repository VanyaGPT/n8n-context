# Set/Edit Fields Node

Трансформация данных и создание новых полей.

### Пример 1: Основной пример
```json
{
  "parameters": {
    "assignments": {
      "assignments": [
        {
          "id": "1",
          "name": "username",
          "value": "={{ $json.user.name }}",
          "type": "string"
        },
        {
          "id": "2",
          "name": "fullName",
          "value": "={{ $json.user.firstName + ' ' + $json.user.lastName }}",
          "type": "string"
        },
        {
          "id": "3",
          "name": "isActive",
          "value": true,
          "type": "boolean"
        }
      ]
    },
    "options": {}
  },
  "type": "n8n-nodes-base.set",
  "typeVersion": 3.4
}
```

### Пример 2: Извлечение данных из Telegram
```json
{
  "parameters": {
    "assignments": {
      "assignments": [
        {
          "id": "1",
          "name": "userMessage",
          "value": "={{ $json.message.text }}",
          "type": "string"
        },
        {
          "id": "2",
          "name": "chatId",
          "value": "={{ $json.message.chat.id }}",
          "type": "string"
        },
        {
          "id": "3",
          "name": "userId",
          "value": "={{ $json.message.from.id }}",
          "type": "string"
        },
        {
          "id": "4",
          "name": "userName",
          "value": "={{ $json.message.from.username }}",
          "type": "string"
        }
      ]
    },
    "options": {}
  },
  "type": "n8n-nodes-base.set",
  "typeVersion": 3.4
}
```

### Пример 3: JSON преобразование
```json
{
  "parameters": {
    "assignments": {
      "assignments": [
        {
          "id": "1",
          "name": "data",
          "value": "={{ JSON.parse($json.rawData) }}",
          "type": "json"
        }
      ]
    },
    "options": {}
  },
  "type": "n8n-nodes-base.set",
  "typeVersion": 3.4
}
```
