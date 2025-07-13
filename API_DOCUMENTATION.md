# n8n-context API Documentation

## Table of Contents

1. [Overview](#overview)
2. [Core Components](#core-components)
3. [Context Builder API](#context-builder-api)
4. [Node Types and Snippets](#node-types-and-snippets)
5. [Workflow Patterns](#workflow-patterns)
6. [AI Agent Architecture](#ai-agent-architecture)
7. [Integration Examples](#integration-examples)
8. [Best Practices](#best-practices)
9. [Error Handling](#error-handling)
10. [Troubleshooting](#troubleshooting)

## Overview

The n8n-context project provides a comprehensive system for creating AI-powered n8n workflow automation. It consists of several key components:

- **Context Builder**: A Node.js utility for generating unified system prompts
- **Node Snippets**: Reusable JSON templates for common n8n nodes
- **Workflow Examples**: Complete workflow implementations
- **Architectural Patterns**: Design patterns and best practices
- **AI Agent Integration**: Specialized components for AI-powered workflows

## Core Components

### Context Builder (`tools/context-builder.js`)

The main utility for building unified system prompts from individual components.

#### Class: `ContextBuilder`

**Constructor:**
```javascript
const ContextBuilder = require('./tools/context-builder.js');
const builder = new ContextBuilder();
```

**Methods:**

#### `buildContext(workflowCount = 2, includeSteps = false)`

Builds a complete system prompt by combining all context components.

**Parameters:**
- `workflowCount` (number, optional): Number of workflow examples to include (default: 2)
- `includeSteps` (boolean, optional): Whether to include step-by-step instructions (default: false)

**Returns:** (string) Complete system prompt

**Example:**
```javascript
const context = builder.buildContext(5, true);
console.log(context);
```

#### `getSnippets()`

Retrieves and formats JSON snippets from the snippets directory.

**Returns:** (string) Formatted snippets section

#### `getWorkflowExamples(count)`

Retrieves and formats workflow examples from the workflows directory.

**Parameters:**
- `count` (number): Number of examples to include

**Returns:** (string) Formatted workflow examples section

#### `readFile(relativePath)`

Reads a file from the project directory.

**Parameters:**
- `relativePath` (string): Path relative to project root

**Returns:** (string) File contents or empty string if file not found

#### `saveContext(context, filename = 'full-context.md')`

Saves the built context to a file.

**Parameters:**
- `context` (string): The context content to save
- `filename` (string, optional): Output filename (default: 'full-context.md')

**Example:**
```javascript
const context = builder.buildContext();
builder.saveContext(context, 'my-context.md');
```

### CLI Usage

The ContextBuilder can be used from the command line:

```bash
# Basic usage with default settings
node tools/context-builder.js

# Include 5 workflow examples
node tools/context-builder.js 5

# Include step-by-step instructions
node tools/context-builder.js 2 --steps

# Combine both options
node tools/context-builder.js 5 --steps
```

## Node Types and Snippets

### AI Agent Components

#### AI Agent Node (`@n8n/n8n-nodes-langchain.agent`)

**Purpose:** Central component for AI-powered workflows

**Parameters:**
- `promptType` (string): Type of prompt ("define" for custom prompts)
- `text` (string): The user message or prompt
- `options.systemMessage` (string): System message for the AI

**Example:**
```json
{
  "parameters": {
    "promptType": "define",
    "text": "={{ $json.userMessage }}",
    "options": {
      "systemMessage": "You are a helpful assistant."
    }
  },
  "type": "@n8n/n8n-nodes-langchain.agent",
  "typeVersion": 2
}
```

#### OpenAI Chat Model (`@n8n/n8n-nodes-langchain.lmChatOpenAi`)

**Purpose:** Language model for AI processing

**Parameters:**
- `model` (object): Model configuration
  - `value` (string): Model name (e.g., "gpt-4o", "gpt-4o-mini")
  - `mode` (string): Selection mode ("list")
- `options` (object): Additional options
  - `responseFormat` (string): Response format ("text", "json")
  - `temperature` (number): Creativity level (0-2)

**Credentials:**
- `openAiApi`: OpenAI API credentials

**Example:**
```json
{
  "parameters": {
    "model": {
      "__rl": true,
      "mode": "list",
      "value": "gpt-4o-mini"
    },
    "options": {
      "responseFormat": "text",
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

#### Memory Components

##### Buffer Window Memory (`@n8n/n8n-nodes-langchain.memoryBufferWindow`)

**Purpose:** In-memory conversation context storage

**Parameters:**
- `sessionIdType` (string): Session ID type ("customKey")
- `sessionKey` (string): Unique session identifier
- `contextWindowLength` (number): Maximum number of messages to remember

**Example:**
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

##### Redis Chat Memory (`@n8n/n8n-nodes-langchain.memoryRedisChat`)

**Purpose:** Persistent conversation context storage

**Parameters:**
- `sessionIdType` (string): Session ID type ("customKey")
- `sessionKey` (string): Unique session identifier
- `contextWindowLength` (number): Maximum number of messages to remember
- `sessionTTL` (number, optional): Time-to-live in milliseconds

**Credentials:**
- `redis`: Redis connection credentials

**Example:**
```json
{
  "parameters": {
    "sessionIdType": "customKey",
    "sessionKey": "user_{{ $json.userId }}",
    "contextWindowLength": 10,
    "sessionTTL": 864000
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

### HTTP and API Components

#### HTTP Request Node (`n8n-nodes-base.httpRequest`)

**Purpose:** Make HTTP requests to external APIs

**Parameters:**
- `url` (string): Target URL
- `method` (string): HTTP method (GET, POST, PUT, DELETE, etc.)
- `authentication` (string): Authentication type ("none", "headerAuth", "basicAuth")
- `sendHeaders` (boolean): Whether to send custom headers
- `headerParameters` (object): Custom headers
- `sendBody` (boolean): Whether to send request body
- `bodyParameters` (object): Request body parameters

**Example - GET Request:**
```json
{
  "parameters": {
    "url": "https://api.example.com/data",
    "method": "GET",
    "authentication": "none",
    "options": {}
  },
  "type": "n8n-nodes-base.httpRequest",
  "typeVersion": 4.2
}
```

**Example - POST Request with JSON:**
```json
{
  "parameters": {
    "url": "https://api.example.com/create",
    "method": "POST",
    "authentication": "none",
    "sendHeaders": true,
    "headerParameters": {
      "parameters": [
        {
          "name": "Content-Type",
          "value": "application/json"
        }
      ]
    },
    "sendBody": true,
    "bodyParameters": {
      "parameters": [
        {
          "name": "name",
          "value": "={{ $json.name }}"
        },
        {
          "name": "email",
          "value": "={{ $json.email }}"
        }
      ]
    },
    "options": {}
  },
  "type": "n8n-nodes-base.httpRequest",
  "typeVersion": 4.2
}
```

**Example - Authenticated Request:**
```json
{
  "parameters": {
    "url": "https://api.example.com/secure-endpoint",
    "method": "GET",
    "authentication": "headerAuth",
    "options": {}
  },
  "type": "n8n-nodes-base.httpRequest",
  "typeVersion": 4.2,
  "credentials": {
    "httpHeaderAuth": {
      "id": "credential_id",
      "name": "API Auth"
    }
  }
}
```

### Data Processing Components

#### Code Node (`n8n-nodes-base.code`)

**Purpose:** Execute JavaScript code for data processing

**Parameters:**
- `mode` (string): Execution mode ("runOnceForAllItems", "runOnceForEachItem")
- `jsCode` (string): JavaScript code to execute

**Example - Array Processing:**
```json
{
  "parameters": {
    "mode": "runOnceForAllItems",
    "jsCode": "// Transform all array elements\nconst newItems = items.map(item => {\n  return {\n    ...item,\n    fullName: `${item.firstName} ${item.lastName}`,\n    age: calculateAge(item.birthDate),\n    formattedDate: new Date(item.createdAt).toLocaleDateString()\n  };\n});\n\nfunction calculateAge(birthDate) {\n  const today = new Date();\n  const birth = new Date(birthDate);\n  let age = today.getFullYear() - birth.getFullYear();\n  const monthDiff = today.getMonth() - birth.getMonth();\n  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {\n    age--;\n  }\n  return age;\n}\n\nreturn newItems;"
  },
  "type": "n8n-nodes-base.code",
  "typeVersion": 2
}
```

**Example - Data Filtering:**
```json
{
  "parameters": {
    "mode": "runOnceForAllItems",
    "jsCode": "// Filter active users with email\nconst filteredItems = items.filter(item => {\n  return item.active === true && item.email && item.email.includes('@');\n});\n\n// Sort by name\nfilteredItems.sort((a, b) => a.name.localeCompare(b.name));\n\nreturn filteredItems;"
  },
  "type": "n8n-nodes-base.code",
  "typeVersion": 2
}
```

**Example - Error Handling:**
```json
{
  "parameters": {
    "mode": "runOnceForAllItems",
    "jsCode": "try {\n  // Input data validation\n  if (!items || !Array.isArray(items) || items.length === 0) {\n    throw new Error('Input data is missing or invalid');\n  }\n  \n  // Check required fields\n  const validItems = items.filter(item => {\n    if (!item.id || !item.name) {\n      console.log(`Skipped item without id or name: ${JSON.stringify(item)}`);\n      return false;\n    }\n    return true;\n  });\n  \n  return validItems;\n} catch (error) {\n  console.error(`Processing error: ${error.message}`);\n  return [{\n    error: true,\n    message: error.message\n  }];\n}"
  },
  "type": "n8n-nodes-base.code",
  "typeVersion": 2
}
```

#### Set/Edit Fields Node (`n8n-nodes-base.set`)

**Purpose:** Modify data fields and structure

**Parameters:**
- `values` (object): Field values to set
- `options` (object): Additional options
  - `dotNotation` (boolean): Use dot notation for nested fields
  - `ignoreConversionErrors` (boolean): Ignore type conversion errors

**Example:**
```json
{
  "parameters": {
    "values": {
      "string": [
        {
          "name": "fullName",
          "value": "={{ $json.firstName }} {{ $json.lastName }}"
        },
        {
          "name": "timestamp",
          "value": "={{ $now }}"
        }
      ],
      "number": [
        {
          "name": "age",
          "value": "={{ $json.birthYear ? $now.getFullYear() - $json.birthYear : 0 }}"
        }
      ],
      "boolean": [
        {
          "name": "isActive",
          "value": "={{ $json.status === 'active' }}"
        }
      ]
    },
    "options": {
      "dotNotation": true,
      "ignoreConversionErrors": true
    }
  },
  "type": "n8n-nodes-base.set",
  "typeVersion": 3.4
}
```

#### Switch Node (`n8n-nodes-base.switch`)

**Purpose:** Conditional branching based on data values

**Parameters:**
- `dataType` (string): Data type for comparison ("string", "number", "boolean")
- `conditions` (object): Condition definitions
- `options` (object): Additional options
  - `renameOutput` (boolean): Rename output branches
  - `outputKey` (string): Output key name

**Example:**
```json
{
  "parameters": {
    "dataType": "string",
    "conditions": {
      "string": [
        {
          "value1": "={{ $json.status }}",
          "operation": "equals",
          "value2": "active"
        },
        {
          "value1": "={{ $json.status }}",
          "operation": "equals",
          "value2": "pending"
        }
      ]
    },
    "options": {
      "renameOutput": true,
      "outputKey": "status"
    }
  },
  "type": "n8n-nodes-base.switch",
  "typeVersion": 3.2
}
```

#### Merge Node (`n8n-nodes-base.merge`)

**Purpose:** Combine multiple data streams

**Parameters:**
- `mode` (string): Merge mode ("combine", "append")
- `combineBy` (string): How to combine data ("combineAll", "combineByPosition")
- `options` (object): Additional options

**Example:**
```json
{
  "parameters": {
    "mode": "combine",
    "combineBy": "combineAll"
  },
  "type": "n8n-nodes-base.merge",
  "typeVersion": 3.1
}
```

### Integration Components

#### Telegram Integration

##### Telegram Trigger (`n8n-nodes-base.telegramTrigger`)

**Purpose:** Receive Telegram messages as workflow triggers

**Parameters:** None (uses credentials for authentication)

**Credentials:**
- `telegramApi`: Telegram Bot API credentials

**Example:**
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

##### Telegram Send Message (`n8n-nodes-base.telegram`)

**Purpose:** Send messages via Telegram

**Parameters:**
- `chatId` (string): Target chat ID
- `text` (string): Message text
- `additionalFields` (object): Additional message options

**Example:**
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

#### Webhook Components

##### Webhook Trigger (`n8n-nodes-base.webhook`)

**Purpose:** Receive HTTP requests as workflow triggers

**Parameters:**
- `httpMethod` (string): HTTP method to accept
- `path` (string): Webhook path
- `options` (object): Additional options

**Example:**
```json
{
  "parameters": {
    "httpMethod": "POST",
    "path": "webhook",
    "options": {}
  },
  "type": "n8n-nodes-base.webhook",
  "typeVersion": 1.1
}
```

##### Respond to Webhook (`n8n-nodes-base.respondToWebhook`)

**Purpose:** Send HTTP responses for webhook requests

**Parameters:**
- `options` (object): Response options
  - `responseCode` (number): HTTP status code
- `responseBody` (string): Response body content

**Example:**
```json
{
  "parameters": {
    "options": {
      "responseCode": 200
    },
    "responseBody": "={{ $json.result }}"
  },
  "type": "n8n-nodes-base.respondToWebhook",
  "typeVersion": 1.1
}
```

## Workflow Patterns

### Basic Workflow Structure

Every n8n workflow follows this JSON structure:

```json
{
  "name": "Workflow Name",
  "nodes": [
    {
      "parameters": {...},
      "type": "node-type",
      "typeVersion": 1.0,
      "position": [x, y],
      "id": "unique-id",
      "name": "Node Name"
    }
  ],
  "connections": {
    "Source Node": {
      "main": [
        [{"node": "Target Node", "type": "main", "index": 0}]
      ]
    }
  },
  "settings": {},
  "active": false,
  "meta": {...}
}
```

### AI Agent Architecture Pattern

The standard AI agent pattern connects three components:

```json
{
  "connections": {
    "OpenAI Chat Model": {
      "ai_languageModel": [
        [{"node": "AI Agent", "type": "ai_languageModel", "index": 0}]
      ]
    },
    "Memory Buffer": {
      "ai_memory": [
        [{"node": "AI Agent", "type": "ai_memory", "index": 0}]
      ]
    },
    "Tool Node": {
      "ai_tool": [
        [{"node": "AI Agent", "type": "ai_tool", "index": 0}]
      ]
    }
  }
}
```

### Error Handling Pattern

Enable error handling with dual outputs:

```json
{
  "parameters": {...},
  "onError": "continueErrorOutput"
}
```

**Connections with Error Handling:**
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

### Parallel Processing Pattern

Use Merge node to wait for multiple parallel streams:

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

## AI Agent Architecture

### Component Hierarchy

```
Chat Model (Language Model)
    ↓ ai_languageModel
AI Agent (Central Processor)
    ↓ main
Response Handler

Memory (Context Storage)
    ↓ ai_memory
AI Agent

Tools (External Capabilities)
    ↓ ai_tool
AI Agent
```

### Connection Types

- **`ai_languageModel`**: From Chat Model to AI Agent
- **`ai_memory`**: From Memory to AI Agent
- **`ai_tool`**: From Tool to AI Agent
- **`main`**: Standard data flow

### Memory Management

**Session Key Patterns:**
```javascript
// User-specific sessions
"user_{{ $json.userId }}"

// Workflow-specific sessions
"{{ $json.sessionId }}-{{ $workflow.id }}"

// Time-based sessions
"session_{{ $now.getTime() }}"
```

**TTL Configuration:**
```json
{
  "sessionTTL": 864000  // 24 hours in milliseconds
}
```

## Integration Examples

### Complete Telegram AI Bot

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
        "sessionIdType": "customKey",
        "sessionKey": "user_{{ $json.chatId }}",
        "contextWindowLength": 10
      },
      "type": "@n8n/n8n-nodes-langchain.memoryBufferWindow",
      "typeVersion": 1.3,
      "name": "Memory"
    },
    {
      "parameters": {
        "promptType": "define",
        "text": "={{ $json.message }}",
        "options": {
          "systemMessage": "You are a helpful assistant."
        }
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
    "Memory": {
      "ai_memory": [
        [{"node": "AI Agent", "type": "ai_memory", "index": 0}]
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

### Webhook API with AI Processing

```json
{
  "name": "Webhook AI API",
  "nodes": [
    {
      "parameters": {
        "httpMethod": "POST",
        "path": "ai-process"
      },
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 1.1,
      "name": "Webhook Trigger"
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
        "promptType": "define",
        "text": "={{ $json.body.text }}",
        "options": {
          "systemMessage": "Process the user request and provide a helpful response."
        }
      },
      "type": "@n8n/n8n-nodes-langchain.agent",
      "typeVersion": 2,
      "name": "AI Agent"
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

## Best Practices

### JSON Generation Rules

1. **No Comments**: Never use comments in JSON files
2. **One Workflow**: Generate only one workflow per JSON file
3. **Required Fields**: Always include name, nodes, connections, settings, active, and meta
4. **Exact Naming**: Node names in connections must exactly match node names

### Connection Best Practices

1. **AI Component Direction**: Always connect FROM component TO agent
2. **Error Handling**: Use `onError: "continueErrorOutput"` for error handling
3. **Parallel Processing**: Use Merge node for combining parallel streams
4. **Conditional Branching**: Use Switch node with `renameOutput: true`

### Performance Optimization

1. **Memory Management**: Use appropriate TTL values for memory components
2. **Batch Processing**: Use Split In Batches for large datasets
3. **Error Recovery**: Implement proper error handling and retry logic
4. **Resource Cleanup**: Use Wait nodes for rate limiting

### Security Considerations

1. **Credential Management**: Store sensitive data in n8n credentials
2. **Input Validation**: Validate all user inputs in Code nodes
3. **API Rate Limiting**: Implement rate limiting for external API calls
4. **Error Information**: Avoid exposing sensitive information in error messages

## Error Handling

### Common Error Patterns

1. **Connection Errors**: Missing or incorrect node connections
2. **Credential Errors**: Invalid or missing API credentials
3. **Data Type Errors**: Incorrect data types in parameters
4. **Timeout Errors**: Long-running operations exceeding limits

### Error Handling Strategies

1. **Try-Catch Blocks**: Use Code nodes with try-catch for data processing
2. **Error Outputs**: Enable error outputs for critical nodes
3. **Fallback Logic**: Implement fallback paths for failed operations
4. **Logging**: Use console.log for debugging and monitoring

### Error Recovery

```json
{
  "parameters": {
    "mode": "runOnceForAllItems",
    "jsCode": "try {\n  // Main processing logic\n  return processData(items);\n} catch (error) {\n  // Error recovery\n  console.error('Processing failed:', error.message);\n  return [{\n    error: true,\n    message: error.message,\n    fallback: true\n  }];\n}"
  },
  "type": "n8n-nodes-base.code",
  "typeVersion": 2,
  "onError": "continueErrorOutput"
}
```

## Troubleshooting

### Common Issues

1. **Workflow Won't Activate**: Check JSON syntax and required fields
2. **AI Agent Not Responding**: Verify model credentials and connection types
3. **Memory Not Working**: Check session key uniqueness and TTL settings
4. **Webhook Not Receiving**: Verify webhook URL and authentication

### Debugging Steps

1. **Check Execution Logs**: Review n8n execution history
2. **Validate JSON**: Use JSON validator for syntax errors
3. **Test Components**: Test individual nodes in isolation
4. **Check Credentials**: Verify all API credentials are valid

### Performance Issues

1. **Memory Leaks**: Check memory component TTL settings
2. **Slow Processing**: Optimize data processing in Code nodes
3. **API Limits**: Implement rate limiting for external APIs
4. **Resource Usage**: Monitor CPU and memory usage

### Getting Help

1. **Documentation**: Refer to n8n official documentation
2. **Community**: Join n8n community forums
3. **Examples**: Study workflow examples in the workflows directory
4. **Testing**: Use n8n's built-in testing tools

---

This documentation provides a comprehensive guide to the n8n-context project's APIs, components, and best practices. For additional examples and advanced usage patterns, refer to the workflow examples in the `workflows/` directory and the architectural patterns in `context/arch-patterns.md`.