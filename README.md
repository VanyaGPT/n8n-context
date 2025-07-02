# n8n-context

## О проекте / About the Project

### n8n-context — Коллекция инструкций для [n8n](https://n8n.io)

**Репозиторий для хранения валидных инструкций/промптов, которые помогают нейросетям собирать актуальные json-флоу под n8n.**

n8n — это платформа автоматизации workflow с node-based интерфейсом, позволяющая создавать автоматизированные процессы без программирования. Этот репозиторий содержит материалы, которые помогают AI моделям генерировать корректные n8n конфигурации.

### n8n-context — Collection of instructions for [n8n](https://n8n.io)

**A repository for storing valid instructions/prompts that help neural networks assemble up-to-date JSON flows for n8n.**

n8n is a workflow automation platform with a node-based interface that allows creating automated processes without programming. This repository contains materials that help AI models generate correct n8n configurations.

---

## Структура репозитория / Repository Structure

### [`context/`](https://github.com/VanyaGPT/n8n-context/tree/main/context)

Базовые знания и правила работы с n8n. Содержит промпты и инструкции для AI моделей:
- `base-prompt.md` — основной промпт с описанием n8n, типов нод и структуры JSON
- `arch-patterns.md` — архитектурные паттерны для построения workflow
- `step-by-step.md` — пошаговые инструкции по созданию workflow
- `context7.md` — дополнительный контекст для работы с n8n

Basic knowledge and rules for working with n8n. Contains prompts and instructions for AI models:
- `base-prompt.md` — main prompt with description of n8n, node types, and JSON structure
- `arch-patterns.md` — architectural patterns for building workflows
- `step-by-step.md` — step-by-step instructions for creating workflows
- `context7.md` — additional context for working with n8n

### [`snippets/`](https://github.com/VanyaGPT/n8n-context/tree/main/snippets)

JSON примеры для конкретных типов нод. Включает примеры для:
- Switch, Merge, AI Agent, HTTP Request, Webhook
- Telegram, Code, Set Fields, Error Handling, Schedule
- И других типов нод

JSON examples for specific node types. Includes examples for:
- Switch, Merge, AI Agent, HTTP Request, Webhook
- Telegram, Code, Set Fields, Error Handling, Schedule
- And other node types

### [`workflows/`](https://github.com/VanyaGPT/n8n-context/tree/main/workflows)

Примеры полных json-флоу, реальные и синтетические. Содержит готовые workflow для импорта в n8n, охватывающие различные сценарии использования:
- AI агенты для чата и анализа данных
- Автоматизация HR процессов
- Интеграции с Telegram, Email, базами данных
- И многие другие примеры

Examples of complete JSON flows, both real and synthetic. Contains ready-made workflows for import into n8n, covering various use cases:
- AI agents for chat and data analysis
- HR process automation
- Integrations with Telegram, Email, databases
- And many other examples

### [`tools/`](https://github.com/VanyaGPT/n8n-context/tree/main/tools)

Инструменты для работы с репозиторием:
- `context-builder.js` — утилита для построения контекста

Tools for working with the repository:
- `context-builder.js` — utility for building context

---

## Как использовать / How to Use

### 🇷🇺 Использование промптов

1. Выберите подходящий промпт из директории `context/`
2. Используйте его для инструктирования AI модели (ChatGPT, Claude и т.д.)
3. При необходимости дополните примерами из `snippets/`
4. Для готовых решений импортируйте workflow из директории `workflows/`

### 🇬🇧 Using Prompts

1. Choose an appropriate prompt from the `context/` directory
2. Use it to instruct an AI model (ChatGPT, Claude, etc.)
3. If needed, supplement with examples from `snippets/`
4. For ready-made solutions, import workflows from the `workflows/` directory

### 🇷🇺 Импорт workflow в n8n

1. Скопируйте содержимое нужного JSON-файла из директории `workflows/`
2. В интерфейсе n8n нажмите на "Import from JSON"
3. Вставьте скопированный JSON
4. Настройте учетные данные
5. Активируйте workflow

### 🇬🇧 Importing Workflows into n8n

1. Copy the content of the desired JSON file from the `workflows/` directory
2. In the n8n interface, click on "Import from JSON"
3. Paste the copied JSON
4. Configure credentials
5. Activate the workflow

---

## Вклад в проект / Contributing

### Бот [@VanyaGPTn8nContextBot](https://t.me/VanyaGPTn8nContextBot)

**🇷🇺**
* Присланные инструкции попадают в соответствующие папки
* Бот проверяет, что такого промпта или примера еще не было
* Если инструкция уже есть — скажет сразу

**🇬🇧**
* All submitted instructions go into corresponding folders
* The bot checks that there are no duplicate prompts or examples
* If your instruction already exists, the bot will tell you

**🇷🇺** Альтернативно: можно прислать pull request напрямую, если не хочется использовать бота или нужен формат сложнее, чем текст.

**🇬🇧** Alternatively: you can submit a pull request directly if you don't want to use the bot or need a more complex format than plain text.

---
