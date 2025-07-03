# Telegram Nodes

Working with Telegram Bot API.

### Example 1: Telegram Trigger
```json
{
  "parameters": {},
  "type": "n8n-nodes-base.telegramTrigger",
  "typeVersion": 1.1,
  "credentials": {
    "telegramApi": {
      "id": "telegram_credential_id",
      "name": "Telegram Bot"
    }
  }
}
```


### Example 2: Send Message
```json
{
  "parameters": {
    "chatId": "={{ $json.chatId }}",
    "text": "={{ $json.response }}"
  },
  "type": "n8n-nodes-base.telegram", 
  "typeVersion": 1.2,
  "credentials": {
    "telegramApi": {
      "id": "telegram_credential_id",
      "name": "Telegram Bot"
    }
  }
}
```
