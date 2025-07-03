# Workflow Architectural Patterns

Rules and features for building correct n8n workflows.

## JSON Generation Rules

### 1. No Comments in JSON
❌ **NEVER** use comments:
```json
{
  "parameters": {
    // This will break JSON!
  }
}
```


### 2. One Workflow per JSON
- Generate only one workflow in JSON
- If multiple are needed — create separate blocks
- Do not use workflow arrays

### 3. Required Fields
```json
{
  "name": "Workflow Name",
  "nodes": [...],
  "connections": {...},
  "settings": {...},
  "active": false,
  "meta": {...}
}
```


## Connection Rules (connections)

### 1. Exact Name Matching
- The "node" field in connections EXACTLY matches the "name" of the node
- When changing node name — update connections
- Use readable names (not UUID)

### 2. AI Components: Direction FROM Component TO Agent
❌ **Incorrect:** AI Agent → Chat Model  
✅ **Correct:** Chat Model → AI Agent

```json
"connections": {
  "OpenAI Chat Model": {
    "ai_languageModel": [
      [{"node": "AI Agent", "type": "ai_languageModel", "index": 0}]
    ]
  }
}
```


### 3. Error Handling
- First array element — success
- Second array element — error
- Required `"onError": "continueErrorOutput"`

## Stream Merging Patterns

### 1. Merge node for parallel streams
**ALWAYS** use Merge to wait for multiple streams:

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


### 2. Connection Sequence to Merge
```
Flow 1 ──┐
         ├──> Merge ──> Next Node
Flow 2 ──┘
```


## Conditional Branching Patterns

### 1. Switch node with named outputs
**ALWAYS** use `renameOutput: true` and `outputKey`:

```json
{
  "renameOutput": true,
  "outputKey": "success",
  "conditions": {...}
}
```

## Error Handling

### 1. Enabling Second Output
```json
{
  "parameters": {...},
  "onError": "continueErrorOutput"
}
```

### 2. Connections Structure with Errors
```json
"connections": {
  "API Call": {
    "main": [
      [{"node": "Success Handler", "type": "main", "index": 0}],
      [{"node": "Error Handler", "type": "main", "index": 0}]
    ]
  }
}
```


## AI Agent Structure

### 1. Basic Architecture
```
Chat Model ──ai_languageModel──┐
Memory ────────ai_memory───────┤──> AI Agent ──main──> Response  
Tools ──────────ai_tool────────┘
```


### 2. Current Prefixes for AI
❌ **Deprecated:** `n8n-nodes-langchain.agent`  
✅ **Current:** `@n8n/n8n-nodes-langchain.agent`

### 3. Connection Types for AI
- `ai_languageModel` — from Chat Model to agent
- `ai_memory` — from Memory to agent  
- `ai_tool` — from Tool to agent

## Memory Patterns

### 1. Unique Session Keys
```json
{
  "sessionIdType": "customKey",
  "sessionKey": "user_{{ $json.userId }}",
  "contextWindowLength": 10
}
```


### 2. TTL for Auto-cleanup
```json
{
  "sessionTTL": 864000
}
```


## Webhook Patterns

### 1. Trigger + Response Pair
```
Webhook Trigger → Process → Respond to Webhook
```


### 2. Correct Response
```json
{
  "parameters": {
    "options": {"responseCode": 200},
    "responseBody": "={{ $json.result }}"
  },
  "type": "n8n-nodes-base.respondToWebhook"
}
```


## Validation and Testing

### 1. Before JSON Output
- Check JSON syntax
- Ensure no comments are present
- Verify name matching in connections
- Ensure typeVersion is current

### 2. Workflow Debugging
- Save and activate
- Test trigger  
- Check execution logs
- Use Error Output for diagnostics
