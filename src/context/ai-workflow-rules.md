# AI Workflow Generation Rules

Rules for creating AI agents and workflows with proper architecture.

## Basic Principles

### 1. Always use AI Agent architecture
❌ **NEVER use simple OpenAI nodes**:
```json
{
  "type": "nodes-base.openAi",  // Outdated approach
  "type": "@n8n/n8n-nodes-langchain.openAi"  // Wrong for agents
}
```

✅ **ALWAYS use AI Agent architecture**:
```json
{
  "type": "@n8n/n8n-nodes-langchain.agent",  // Central AI Agent
  "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi"  // Chat Model Example
}
```


### 2. Mandatory AI Tools for workflow analysis
When creating workflows for analysis or working with documentation ALWAYS include:

**Think Tool** - for planning and structuring thoughts:
```json
{
  "type": "@n8n/n8n-nodes-langchain.toolThink",
  "parameters": {
    "description": "Use for step-by-step analysis planning and thought structuring"
  }
}
```

**SerpApi Tool** - for searching current documentation:
```json
{
  "type": "@n8n/n8n-nodes-langchain.toolSerpApi",
  "parameters": {}
}
```

### 3. Correct connections for Tools
Tools connect to AI Agent through `ai_tool`:
```json
"Think Tool": {
  "ai_tool": [
    [{"node": "AI Agent", "type": "ai_tool", "index": 0}]
  ]
},
"SerpApi Tool": {
  "ai_tool": [
    [{"node": "AI Agent", "type": "ai_tool", "index": 0}]
  ]
}
```

## System prompts for AI Agent

### 1. Include instructions for using tools
```json
{
  "systemMessage": "You have access to tools:\n- serp — for searching documentation\n- think — for planning (don't show thoughts to user)"
}
```

### 2. Specify the order of working with tools
```json
{
  "systemMessage": "# Work order (think → serp)\n1. **think**: Form analysis plan\n2. Use **serp** when necessary\n3. Conduct analysis\n4. Compile result"
}
```

## Using system prompt from repository

### 1. Always use current context
Before creating workflow run:
```bash
node tools/context-builder.js 1
```

### 3. Integrate prompt into AI Agent
System prompt from `full-context.md`/`arch.md` should be adapted for specific task and included in AI Agent's `systemMessage` parameter.

## Specific rules for different workflow types

### Workflow for document/code analysis
- MANDATORY include Think Tool and SerpApi Tool
- Use system prompt with instructions for using tools
- Include planning stages through think

### Workflow for Telegram publishing
- Add Markdown V2 escaping stage
- Use `parseMode: "MarkdownV2"`
- Check message length (≤ 4000 characters)

### Workflow with external APIs
- Always include error handling
- Use environment variables for sensitive data
- Add API response validation

## AI Workflow Validation

### Check connections
- Language Model → AI Agent through `ai_languageModel`
- Memory → AI Agent through `ai_memory` (if used)
- Tools → AI Agent through `ai_tool`

### Check node types
- AI Agent: `@n8n/n8n-nodes-langchain.agent`
- Chat Models: `@n8n/n8n-nodes-langchain.lmChat*`
- Tools: `@n8n/n8n-nodes-langchain.tool*`

### Check versions
- AI Agent: `typeVersion: 2`
- OpenAI Chat Model: `typeVersion: 1.2`
- Other nodes: use latest versions
