# n8n-context

## About the Project

### n8n-context — Collection of components for creating a system prompt for [n8n](https://n8n.io)

**A repository for storing components needed to create a unified system prompt that helps neural networks efficiently create n8n workflow JSON files.**

n8n is a workflow automation platform with a node-based interface that allows creating automated processes without programming. This repository contains materials that collectively form a system prompt for AI models, enabling them to generate correct n8n workflow JSON files. The repository is not intended for copying workflows in the n8n interface, but specifically for creating workflow JSON files programmatically.

---

## Repository Structure

### [`context/`](https://github.com/VanyaGPT/n8n-context/tree/main/context)

Components for creating a unified system prompt. These files are not intended to be used independently, but serve as constituent parts of the system prompt:
- `base-prompt.md` — main component with description of n8n, node types, and JSON structure
- `arch-patterns.md` — architectural patterns for building workflows
- `step-by-step.md` — step-by-step instructions for creating workflows
- `ai-workflow-rules.md` — AI-specific workflow rules and guidelines

### [`snippets/`](https://github.com/VanyaGPT/n8n-context/tree/main/snippets)

JSON examples for specific node types. Includes examples for:
- Switch, Merge, AI Agent, HTTP Request, Webhook
- Telegram, Code, Set Fields, Error Handling, Schedule
- And other node types

### [`workflows/`](https://github.com/VanyaGPT/n8n-context/tree/main/workflows)

Examples of complete JSON flows, both real and synthetic. Contains workflow examples that demonstrate various use cases for creating n8n JSON files:
- AI agents for chat and data analysis
- HR process automation
- Integrations with Telegram, Email, databases
- And many other examples

### [`tools/`](https://github.com/VanyaGPT/n8n-context/tree/main/tools)

Tools for working with the repository:
- `context-builder.js` — utility for building a unified system prompt from files in the `context/` folder. The script combines the base prompt, current context, architectural patterns, optionally step-by-step instructions, and also adds examples of JSON snippets and workflows. The result is saved to a `full-context.md` file.

---

## How to Use

### Creating and Using the System Prompt

1. To create a unified system prompt, use the `tools/context-builder.js` script:
   ```
   node tools/context-builder.js [workflow_examples_count] [--steps] [--filename output.md]
   ```
   - `workflow_examples_count` (optional) - number of workflow examples to include (default is 2)
   - `--steps` (optional) - flag to include step-by-step instructions
   - `--filename` (optional) - custom output filename (default is full-context.md)
   - The result is saved to the `dist/` directory
   
   You can also use the npm script:
   ```
   npm run build
   ```

2. When receiving a request from a user to create an n8n JSON workflow, the AI should first use the created system prompt from the `dist/full-context.md` file.

3. Use examples from the `workflows/` directory as reference for creating similar JSON workflow files

**Important:** Files in the `context/` directory are not intended for independent use. They are components for creating a unified system prompt.

---

## Contributing

### Bot [@VanyaGPTn8nContextBot](https://t.me/VanyaGPTn8nContextBot)

* All submitted instructions go into corresponding folders
* The bot checks that there are no duplicate prompts or examples
* If your instruction already exists, the bot will tell you

Alternatively: you can submit a pull request directly if you don't want to use the bot or need a more complex format than plain text.

---
