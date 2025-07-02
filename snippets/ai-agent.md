# AI Agent

Настройки AI агентов и их компонентов.

### Пример 1: Базовый AI Agent
```json
{
  "parameters": {
    "promptType": "define",
    "text": "={{ $json.userMessage }}",
    "options": {
      "systemMessage": "Ты полезный помощник."
    }
  },
  "type": "@n8n/n8n-nodes-langchain.agent",
  "typeVersion": 2
}
```


### Пример 2: OpenAI Chat Model
```json
{
  "parameters": {
    "model": {
      "__rl": true,
      "mode": "list", 
      "value": "gpt-4o-mini"
    }
  },
  "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
  "typeVersion": 1.2,
  "credentials": {
    "openAiApi": {
      "id": "credential_id",
      "name": "OpenAI account"
    }
  }
}
```


### Пример 3: Redis Chat Memory
```json
{
  "parameters": {
    "sessionIdType": "customKey",
    "sessionKey": "user_{{ $json.userId }}",
    "contextWindowLength": 10
  },
  "type": "@n8n/n8n-nodes-langchain.memoryRedisChat",
  "typeVersion": 1.5,
  "credentials": {
    "redis": {
      "id": "redis_credential_id",
      "name": "Redis account"
    }
  }
}
```


### Пример 4: Connections для AI компонентов
```json
{
  "connections": {
    "OpenAI Chat Model": {
      "ai_languageModel": [
        [{"node": "AI Agent", "type": "ai_languageModel", "index": 0}]
      ]
    },
    "Redis Chat Memory": {
      "ai_memory": [
        [{"node": "AI Agent", "type": "ai_memory", "index": 0}]
      ]
    }
  }
}
```
