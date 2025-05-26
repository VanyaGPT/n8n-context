# n8n-context

## 🇷🇺 n8n-context — Коллекция инструкций для n8n

**Репозиторий для хранения валидных инструкций/промптов, которые помогают нейросетям собирать актуальные json-флоу под n8n.**

---

### Файлы и структура

* [`custom.md`](https://github.com/VanyaGPT/n8n-context/blob/main/custom.md) — свежие инструкции, которые пользователи присылают через бота [@VanyaGPTn8nContextBot](https://t.me/VanyaGPTn8nContextBot)
* [`base.md`](https://github.com/VanyaGPT/n8n-context/blob/main/base.md) — базовый системный промпт для пошаговой генерации json-флоу
* [`examples/`](https://github.com/VanyaGPT/n8n-context/tree/main/examples) — примеры json-флоу, реальные и синтетические
* [`context7-source.md`](https://github.com/VanyaGPT/n8n-context/blob/main/context7-source.md) — импортированный контекст из [context7](https://context7.com/n8n-io/n8n-docs?tokens=87961), обновляется регулярно автоматически

---

### Бот [@VanyaGPTn8nContextBot](https://t.me/VanyaGPTn8nContextBot)

* присланные инструкции попадают в [`custom.md`](https://github.com/VanyaGPT/n8n-context/blob/main/custom.md) 
* бот проверяет, что такого промпта или примера еще не было
* если инструкция уже есть — скажет сразу

альтернативно: можно прислать pull request напрямую, если не хочется юзать бота или нужен формат сложнее, чем текст.

---

## 🇬🇧 n8n-context — Collection of instructions for n8n

A repository for storing valid instructions/prompts that help neural networks assemble up-to-date JSON flows for n8n.

---

### Files and structure

* [`custom.md`](https://github.com/VanyaGPT/n8n-context/blob/main/custom.md) — latest instructions submitted by users through the [@VanyaGPTn8nContextBot](https://t.me/VanyaGPTn8nContextBot) bot
* [`base.md`](https://github.com/VanyaGPT/n8n-context/blob/main/base.md) — the base system prompt for step-by-step JSON flow generation
* [`examples/`](https://github.com/VanyaGPT/n8n-context/tree/main/examples) — real and synthetic JSON flow examples
* [`context7-source.md`](https://github.com/VanyaGPT/n8n-context/blob/main/context7-source.md) — imported context from [context7](https://context7.com/n8n-io/n8n-docs?tokens=87961), updated automatically and regularly

---

### Bot [@VanyaGPTn8nContextBot](https://t.me/VanyaGPTn8nContextBot)

* all submitted instructions go into [`custom.md`](https://github.com/VanyaGPT/n8n-context/blob/main/custom.md)
* the bot checks that there are no duplicate prompts or examples
* if your instruction already exists, the bot will tell you

alternatively: you can submit a pull request directly if you don’t want to use the bot or need a more complex format than plain text.

---
