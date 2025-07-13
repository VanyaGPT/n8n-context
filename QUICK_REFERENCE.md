# n8n-context Quick Reference Guide

## Quick Start

### 1. Build Context
```bash
# Basic context with 2 workflow examples
node tools/context-builder.js

# Advanced context with 5 examples and step-by-step instructions
node tools/context-builder.js 5 --steps
```

### 2. Use in JavaScript
```javascript
const ContextBuilder = require('./tools/context-builder.js');
const builder = new ContextBuilder();

// Build context
const context = builder.buildContext(3, true);

// Save to file
builder.saveContext(context, 'my-context.md');
```

## Common Node Patterns

### AI Agent Setup
```json
{
  "parameters": {
    "promptType": "define",
    "text": "={{ $json.message }}",
    "options": {
      "systemMessage": "You are a helpful assistant."
    }
  },
  "type": "@n8n/n8n-nodes-langchain.agent",
  "typeVersion": 2
}
```

### OpenAI Integration
```json
{
  "parameters": {
    "model": {
      "value": "gpt-4o-mini"
    },
    "options": {
      "temperature": 0.3
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

### Memory Configuration
```json
{
  "parameters": {
    "sessionIdType": "customKey",
    "sessionKey": "user_{{ $json.userId }}",
    "contextWindowLength": 10
  },
  "type": "@n8n/n8n-nodes-langchain.memoryBufferWindow",
  "typeVersion": 1.3
}
```

### HTTP Request
```json
{
  "parameters": {
    "url": "https://api.example.com/data",
    "method": "GET",
    "authentication": "none"
  },
  "type": "n8n-nodes-base.httpRequest",
  "typeVersion": 4.2
}
```

### Data Processing
```json
{
  "parameters": {
    "mode": "runOnceForAllItems",
    "jsCode": "return items.map(item => ({...item, processed: true}));"
  },
  "type": "n8n-nodes-base.code",
  "typeVersion": 2
}
```

## Connection Patterns

### AI Agent Connections
```json
{
  "connections": {
    "OpenAI Chat Model": {
      "ai_languageModel": [
        [{"node": "AI Agent", "type": "ai_languageModel", "index": 0}]
      ]
    },
    "Memory": {
      "ai_memory": [
        [{"node": "AI Agent", "type": "ai_memory", "index": 0}]
      ]
    }
  }
}
```

### Error Handling
```json
{
  "connections": {
    "API Call": {
      "main": [
        [{"node": "Success Handler", "type": "main", "index": 0}],
        [{"node": "Error Handler", "type": "main", "index": 0}]
      ]
    }
  }
}
```

### Parallel Processing
```json
{
  "connections": {
    "Process 1": {
      "main": [
        [{"node": "Merge", "type": "main", "index": 0}]
      ]
    },
    "Process 2": {
      "main": [
        [{"node": "Merge", "type": "main", "index": 1}]
      ]
    }
  }
}
```

## Common Use Cases

### 1. Telegram Bot
```json
{
  "name": "Telegram AI Bot",
  "nodes": [
    {
      "parameters": {},
      "type": "n8n-nodes-base.telegramTrigger",
      "typeVersion": 1.1,
      "name": "Telegram Trigger"
    },
    {
      "parameters": {
        "model": {"value": "gpt-4o-mini"}
      },
      "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
      "typeVersion": 1.2,
      "name": "OpenAI Chat Model"
    },
    {
      "parameters": {
        "promptType": "define",
        "text": "={{ $json.message }}"
      },
      "type": "@n8n/n8n-nodes-langchain.agent",
      "typeVersion": 2,
      "name": "AI Agent"
    },
    {
      "parameters": {
        "chatId": "={{ $json.chatId }}",
        "text": "={{ $json.text }}"
      },
      "type": "n8n-nodes-base.telegram",
      "typeVersion": 1.2,
      "name": "Send Response"
    }
  ],
  "connections": {
    "Telegram Trigger": {
      "main": [[{"node": "AI Agent", "type": "main", "index": 0}]]
    },
    "OpenAI Chat Model": {
      "ai_languageModel": [[{"node": "AI Agent", "type": "ai_languageModel", "index": 0}]]
    },
    "AI Agent": {
      "main": [[{"node": "Send Response", "type": "main", "index": 0}]]
    }
  }
}
```

### 2. Webhook API
```json
{
  "name": "Webhook API",
  "nodes": [
    {
      "parameters": {
        "httpMethod": "POST",
        "path": "api"
      },
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 1.1,
      "name": "Webhook Trigger"
    },
    {
      "parameters": {
        "model": {"value": "gpt-4o"}
      },
      "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
      "typeVersion": 1.2,
      "name": "OpenAI Chat Model"
    },
    {
      "parameters": {
        "promptType": "define",
        "text": "={{ $json.body.text }}"
      },
      "type": "@n8n/n8n-nodes-langchain.agent",
      "typeVersion": 2,
      "name": "AI Agent"
    },
    {
      "parameters": {
        "options": {"responseCode": 200},
        "responseBody": "={{ $json.text }}"
      },
      "type": "n8n-nodes-base.respondToWebhook",
      "typeVersion": 1.1,
      "name": "Respond to Webhook"
    }
  ],
  "connections": {
    "Webhook Trigger": {
      "main": [[{"node": "AI Agent", "type": "main", "index": 0}]]
    },
    "OpenAI Chat Model": {
      "ai_languageModel": [[{"node": "AI Agent", "type": "ai_languageModel", "index": 0}]]
    },
    "AI Agent": {
      "main": [[{"node": "Respond to Webhook", "type": "main", "index": 0}]]
    }
  }
}
```

### 3. Data Processing Pipeline
```json
{
  "name": "Data Processing",
  "nodes": [
    {
      "parameters": {
        "mode": "runOnceForAllItems",
        "jsCode": "return items.filter(item => item.active);"
      },
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "name": "Filter Active"
    },
    {
      "parameters": {
        "values": {
          "string": [
            {
              "name": "processedAt",
              "value": "={{ $now }}"
            }
          ]
        }
      },
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "name": "Add Timestamp"
    },
    {
      "parameters": {
        "url": "https://api.example.com/process",
        "method": "POST",
        "sendBody": true,
        "bodyParameters": {
          "parameters": [
            {
              "name": "data",
              "value": "={{ $json }}"
            }
          ]
        }
      },
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "name": "Send to API"
    }
  ],
  "connections": {
    "Filter Active": {
      "main": [[{"node": "Add Timestamp", "type": "main", "index": 0}]]
    },
    "Add Timestamp": {
      "main": [[{"node": "Send to API", "type": "main", "index": 0}]]
    }
  }
}
```

## Node Type Versions

| Node Type | Current Version |
|-----------|----------------|
| AI Agent | 2 |
| OpenAI Chat Model | 1.2 |
| Memory Buffer Window | 1.3 |
| Memory Redis Chat | 1.5 |
| HTTP Request | 4.2 |
| Code | 2 |
| Set/Edit Fields | 3.4 |
| Switch | 3.2 |
| Merge | 3.1 |
| Telegram Trigger | 1.1 |
| Telegram | 1.2 |
| Webhook | 1.1 |
| Respond to Webhook | 1.1 |

## Common Credentials

| Service | Credential Type | Description |
|---------|----------------|-------------|
| OpenAI | `openAiApi` | OpenAI API key |
| Anthropic | `anthropicApi` | Anthropic API key |
| Telegram | `telegramApi` | Telegram Bot token |
| HTTP Auth | `httpHeaderAuth` | HTTP header authentication |
| HTTP Basic | `httpBasicAuth` | HTTP basic authentication |
| Redis | `redis` | Redis connection |

## Expression Examples

### Data Access
```javascript
// Current item data
$json.fieldName

// Previous node data
$('Node Name').item.json.fieldName

// Current timestamp
$now

// Workflow ID
$workflow.id

// Random values
$random.number(1, 100)
$random.string(10)
```

### Conditional Logic
```javascript
// Simple condition
$json.status === 'active' ? 'Yes' : 'No'

// Complex condition
$json.age >= 18 && $json.verified ? 'Adult' : 'Minor'

// Null check
$json.email || 'No email provided'
```

### String Operations
```javascript
// Concatenation
`${$json.firstName} ${$json.lastName}`

// Template with variables
"user_{{ $json.userId }}"

// Date formatting
$now.toLocaleDateString()
```

## Error Handling Patterns

### Try-Catch in Code Node
```javascript
try {
  // Main logic
  return processData(items);
} catch (error) {
  console.error('Error:', error.message);
  return [{
    error: true,
    message: error.message
  }];
}
```

### Error Output Configuration
```json
{
  "parameters": {...},
  "onError": "continueErrorOutput"
}
```

### Conditional Error Handling
```json
{
  "parameters": {
    "dataType": "string",
    "conditions": {
      "string": [
        {
          "value1": "={{ $json.error }}",
          "operation": "equals",
          "value2": "true"
        }
      ]
    }
  },
  "type": "n8n-nodes-base.switch",
  "typeVersion": 3.2
}
```

## Performance Tips

1. **Use appropriate memory TTL**: Set `sessionTTL` for Redis memory
2. **Batch processing**: Use Split In Batches for large datasets
3. **Rate limiting**: Add Wait nodes between API calls
4. **Error recovery**: Implement retry logic for critical operations
5. **Resource cleanup**: Use appropriate context window lengths

## Security Best Practices

1. **Store credentials securely**: Use n8n credential management
2. **Validate inputs**: Check user data in Code nodes
3. **Rate limiting**: Prevent API abuse
4. **Error sanitization**: Don't expose sensitive data in errors
5. **Access control**: Implement proper authentication

---

This quick reference provides the most commonly used patterns and configurations. For detailed documentation, see `API_DOCUMENTATION.md`.