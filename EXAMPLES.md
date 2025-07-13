# n8n-context Examples

## Basic Examples

### 1. Simple AI Chat Bot

**Use Case:** Basic AI assistant that responds to user messages

```json
{
  "name": "Simple AI Chat Bot",
  "nodes": [
    {
      "parameters": {
        "promptType": "define",
        "text": "={{ $json.message }}",
        "options": {
          "systemMessage": "You are a helpful AI assistant. Provide clear and concise responses."
        }
      },
      "type": "@n8n/n8n-nodes-langchain.agent",
      "typeVersion": 2,
      "name": "AI Agent"
    },
    {
      "parameters": {
        "model": {
          "value": "gpt-4o-mini"
        }
      },
      "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
      "typeVersion": 1.2,
      "name": "OpenAI Chat Model",
      "credentials": {
        "openAiApi": {
          "id": "openai_credential_id",
          "name": "OpenAI account"
        }
      }
    }
  ],
  "connections": {
    "OpenAI Chat Model": {
      "ai_languageModel": [
        [{"node": "AI Agent", "type": "ai_languageModel", "index": 0}]
      ]
    }
  }
}
```

### 2. Data Processing Pipeline

**Use Case:** Process and transform data with validation

```json
{
  "name": "Data Processing Pipeline",
  "nodes": [
    {
      "parameters": {
        "mode": "runOnceForAllItems",
        "jsCode": "// Validate and clean data\nconst validItems = items.filter(item => {\n  return item.id && item.name && item.email;\n});\n\n// Transform data\nreturn validItems.map(item => ({\n  ...item,\n  fullName: `${item.firstName || ''} ${item.lastName || ''}`.trim(),\n  processedAt: new Date().toISOString(),\n  isValid: true\n}));"
      },
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "name": "Process Data"
    },
    {
      "parameters": {
        "dataType": "string",
        "conditions": {
          "string": [
            {
              "value1": "={{ $json.isValid }}",
              "operation": "equals",
              "value2": "true"
            }
          ]
        },
        "options": {
          "renameOutput": true,
          "outputKey": "validation"
        }
      },
      "type": "n8n-nodes-base.switch",
      "typeVersion": 3.2,
      "name": "Validate Data"
    }
  ],
  "connections": {
    "Process Data": {
      "main": [
        [{"node": "Validate Data", "type": "main", "index": 0}]
      ]
    }
  }
}
```

## AI Agent Examples

### 3. AI Agent with Memory

**Use Case:** Conversational AI with context retention

```json
{
  "name": "AI Agent with Memory",
  "nodes": [
    {
      "parameters": {
        "promptType": "define",
        "text": "={{ $json.message }}",
        "options": {
          "systemMessage": "You are a helpful assistant. Remember previous conversations and provide contextual responses."
        }
      },
      "type": "@n8n/n8n-nodes-langchain.agent",
      "typeVersion": 2,
      "name": "AI Agent"
    },
    {
      "parameters": {
        "model": {
          "value": "gpt-4o"
        }
      },
      "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
      "typeVersion": 1.2,
      "name": "OpenAI Chat Model",
      "credentials": {
        "openAiApi": {
          "id": "openai_credential_id",
          "name": "OpenAI account"
        }
      }
    },
    {
      "parameters": {
        "sessionIdType": "customKey",
        "sessionKey": "user_{{ $json.userId }}",
        "contextWindowLength": 20
      },
      "type": "@n8n/n8n-nodes-langchain.memoryBufferWindow",
      "typeVersion": 1.3,
      "name": "Memory"
    }
  ],
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

### 4. AI Agent with Tools

**Use Case:** AI agent with external capabilities

```json
{
  "name": "AI Agent with Tools",
  "nodes": [
    {
      "parameters": {
        "promptType": "define",
        "text": "={{ $json.message }}",
        "options": {
          "systemMessage": "You can search the web and perform calculations. Use tools when needed."
        }
      },
      "type": "@n8n/n8n-nodes-langchain.agent",
      "typeVersion": 2,
      "name": "AI Agent"
    },
    {
      "parameters": {
        "model": {
          "value": "gpt-4o"
        }
      },
      "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
      "typeVersion": 1.2,
      "name": "OpenAI Chat Model",
      "credentials": {
        "openAiApi": {
          "id": "openai_credential_id",
          "name": "OpenAI account"
        }
      }
    },
    {
      "parameters": {},
      "type": "@n8n/n8n-nodes-langchain.toolCalculator",
      "typeVersion": 1,
      "name": "Calculator Tool"
    },
    {
      "parameters": {
        "url": "https://api.example.com/search",
        "method": "GET"
      },
      "type": "@n8n/n8n-nodes-langchain.toolHttpRequest",
      "typeVersion": 1,
      "name": "Search Tool"
    }
  ],
  "connections": {
    "OpenAI Chat Model": {
      "ai_languageModel": [
        [{"node": "AI Agent", "type": "ai_languageModel", "index": 0}]
      ]
    },
    "Calculator Tool": {
      "ai_tool": [
        [{"node": "AI Agent", "type": "ai_tool", "index": 0}]
      ]
    },
    "Search Tool": {
      "ai_tool": [
        [{"node": "AI Agent", "type": "ai_tool", "index": 1}]
      ]
    }
  }
}
```

## Integration Examples

### 5. Telegram Bot

**Use Case:** AI-powered Telegram bot

```json
{
  "name": "Telegram AI Bot",
  "nodes": [
    {
      "parameters": {},
      "type": "n8n-nodes-base.telegramTrigger",
      "typeVersion": 1.1,
      "name": "Telegram Trigger",
      "credentials": {
        "telegramApi": {
          "id": "telegram_credential_id",
          "name": "Telegram Bot"
        }
      }
    },
    {
      "parameters": {
        "promptType": "define",
        "text": "={{ $json.message }}",
        "options": {
          "systemMessage": "You are a helpful Telegram bot. Keep responses concise and friendly."
        }
      },
      "type": "@n8n/n8n-nodes-langchain.agent",
      "typeVersion": 2,
      "name": "AI Agent"
    },
    {
      "parameters": {
        "model": {
          "value": "gpt-4o-mini"
        }
      },
      "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
      "typeVersion": 1.2,
      "name": "OpenAI Chat Model",
      "credentials": {
        "openAiApi": {
          "id": "openai_credential_id",
          "name": "OpenAI account"
        }
      }
    },
    {
      "parameters": {
        "chatId": "={{ $json.chatId }}",
        "text": "={{ $json.text }}"
      },
      "type": "n8n-nodes-base.telegram",
      "typeVersion": 1.2,
      "name": "Send Response",
      "credentials": {
        "telegramApi": {
          "id": "telegram_credential_id",
          "name": "Telegram Bot"
        }
      }
    }
  ],
  "connections": {
    "Telegram Trigger": {
      "main": [
        [{"node": "AI Agent", "type": "main", "index": 0}]
      ]
    },
    "OpenAI Chat Model": {
      "ai_languageModel": [
        [{"node": "AI Agent", "type": "ai_languageModel", "index": 0}]
      ]
    },
    "AI Agent": {
      "main": [
        [{"node": "Send Response", "type": "main", "index": 0}]
      ]
    }
  }
}
```

### 6. Webhook API

**Use Case:** AI-powered webhook endpoint

```json
{
  "name": "Webhook AI API",
  "nodes": [
    {
      "parameters": {
        "httpMethod": "POST",
        "path": "ai-chat"
      },
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 1.1,
      "name": "Webhook Trigger"
    },
    {
      "parameters": {
        "promptType": "define",
        "text": "={{ $json.body.message }}",
        "options": {
          "systemMessage": "You are an AI API endpoint. Process requests and provide helpful responses."
        }
      },
      "type": "@n8n/n8n-nodes-langchain.agent",
      "typeVersion": 2,
      "name": "AI Agent"
    },
    {
      "parameters": {
        "model": {
          "value": "gpt-4o"
        }
      },
      "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
      "typeVersion": 1.2,
      "name": "OpenAI Chat Model",
      "credentials": {
        "openAiApi": {
          "id": "openai_credential_id",
          "name": "OpenAI account"
        }
      }
    },
    {
      "parameters": {
        "options": {
          "responseCode": 200
        },
        "responseBody": "={{ $json.text }}"
      },
      "type": "n8n-nodes-base.respondToWebhook",
      "typeVersion": 1.1,
      "name": "Respond to Webhook"
    }
  ],
  "connections": {
    "Webhook Trigger": {
      "main": [
        [{"node": "AI Agent", "type": "main", "index": 0}]
      ]
    },
    "OpenAI Chat Model": {
      "ai_languageModel": [
        [{"node": "AI Agent", "type": "ai_languageModel", "index": 0}]
      ]
    },
    "AI Agent": {
      "main": [
        [{"node": "Respond to Webhook", "type": "main", "index": 0}]
      ]
    }
  }
}
```

## Advanced Examples

### 7. Error Handling Workflow

**Use Case:** Robust workflow with error handling

```json
{
  "name": "Error Handling Workflow",
  "nodes": [
    {
      "parameters": {
        "url": "https://api.example.com/data",
        "method": "GET"
      },
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "name": "API Call",
      "onError": "continueErrorOutput"
    },
    {
      "parameters": {
        "mode": "runOnceForAllItems",
        "jsCode": "// Process successful response\nreturn items.map(item => ({\n  ...item,\n  status: 'success',\n  processedAt: new Date().toISOString()\n}));"
      },
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "name": "Success Handler"
    },
    {
      "parameters": {
        "mode": "runOnceForAllItems",
        "jsCode": "// Handle errors\nreturn items.map(item => ({\n  error: true,\n  message: item.error || 'Unknown error occurred',\n  timestamp: new Date().toISOString()\n}));"
      },
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "name": "Error Handler"
    }
  ],
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

### 8. Parallel Processing

**Use Case:** Process multiple data streams in parallel

```json
{
  "name": "Parallel Processing",
  "nodes": [
    {
      "parameters": {
        "url": "https://api.example.com/users",
        "method": "GET"
      },
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "name": "Get Users"
    },
    {
      "parameters": {
        "url": "https://api.example.com/posts",
        "method": "GET"
      },
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "name": "Get Posts"
    },
    {
      "parameters": {
        "mode": "combine",
        "combineBy": "combineAll"
      },
      "type": "n8n-nodes-base.merge",
      "typeVersion": 3.1,
      "name": "Merge Results"
    },
    {
      "parameters": {
        "mode": "runOnceForAllItems",
        "jsCode": "// Combine and process results\nconst combined = {\n  users: items[0]?.json || [],\n  posts: items[1]?.json || [],\n  combinedAt: new Date().toISOString()\n};\n\nreturn [combined];"
      },
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "name": "Process Combined"
    }
  ],
  "connections": {
    "Get Users": {
      "main": [
        [{"node": "Merge Results", "type": "main", "index": 0}]
      ]
    },
    "Get Posts": {
      "main": [
        [{"node": "Merge Results", "type": "main", "index": 1}]
      ]
    },
    "Merge Results": {
      "main": [
        [{"node": "Process Combined", "type": "main", "index": 0}]
      ]
    }
  }
}
```

## Usage Instructions

### Running Examples

1. **Copy the JSON**: Copy the desired workflow JSON
2. **Import to n8n**: Import the JSON into your n8n instance
3. **Configure Credentials**: Set up required API credentials
4. **Test the Workflow**: Activate and test the workflow

### Customization

- **System Messages**: Modify the `systemMessage` in AI Agent nodes
- **Model Selection**: Change the model in Chat Model nodes
- **Memory Settings**: Adjust `contextWindowLength` for memory nodes
- **Error Handling**: Add `onError: "continueErrorOutput"` to nodes

### Best Practices

1. **Test Incrementally**: Test each node individually before connecting
2. **Monitor Resources**: Watch memory usage with large context windows
3. **Handle Errors**: Always implement error handling for production workflows
4. **Secure Credentials**: Store sensitive data in n8n credentials
5. **Rate Limiting**: Add delays between API calls to avoid rate limits

---

These examples demonstrate common patterns and can be used as starting points for your own workflows. Modify them according to your specific requirements and integrate with your existing systems.