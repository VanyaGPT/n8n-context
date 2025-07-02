# Архитектурные паттерны workflow

Правила и особенности построения корректных n8n workflow.

## Правила генерации JSON

### 1. Никаких комментариев в JSON
❌ **НИКОГДА** не используйте комментарии:
```json
{
  "parameters": {
    // Это сломает JSON!
  }
}
```


### 2. Один workflow на JSON
- Генерировать только один workflow в JSON
- Если нужно несколько — создавать отдельные блоки
- Не использовать массивы workflow

### 3. Обязательные поля
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


## Правила соединений (connections)

### 1. Точное соответствие имен
- Поле "node" в connections ТОЧНО совпадает с "name" ноды
- При изменении имени ноды — обновить connections
- Использовать читаемые имена (не UUID)

### 2. AI компоненты: направление ОТ компонента К агенту
❌ **Неправильно:** AI Agent → Chat Model  
✅ **Правильно:** Chat Model → AI Agent

```json
"connections": {
  "OpenAI Chat Model": {
    "ai_languageModel": [
      [{"node": "AI Agent", "type": "ai_languageModel", "index": 0}]
    ]
  }
}
```


### 3. Обработка ошибок
- Первый элемент массива — успех
- Второй элемент массива — ошибка
- Обязательно `"onError": "continueErrorOutput"`

## Паттерны объединения потоков

### 1. Merge node для параллельных потоков
**ВСЕГДА** используйте Merge для ожидания нескольких потоков:

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


### 2. Последовательность подключения к Merge
```
Flow 1 ──┐
         ├──> Merge ──> Next Node
Flow 2 ──┘
```


## Паттерны условного ветвления

### 1. Switch node с именованными выходами
**ВСЕГДА** используйте `renameOutput: true` и `outputKey`:

```json
{
  "renameOutput": true,
  "outputKey": "success",
  "conditions": {...}
}
```

## Обработка ошибок

### 1. Включение второго выхода
```json
{
  "parameters": {...},
  "onError": "continueErrorOutput"
}
```

### 2. Структура connections с ошибками
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


## AI Agent структура

### 1. Базовая архитектура
```
Chat Model ──ai_languageModel──┐
Memory ────────ai_memory───────┤──> AI Agent ──main──> Response  
Tools ──────────ai_tool────────┘
```


### 2. Актуальные префиксы для AI
❌ **Устарело:** `n8n-nodes-langchain.agent`  
✅ **Актуально:** `@n8n/n8n-nodes-langchain.agent`

### 3. Типы соединений для AI
- `ai_languageModel` — от Chat Model к агенту
- `ai_memory` — от Memory к агенту  
- `ai_tool` — от Tool к агенту

## Memory паттерны

### 1. Уникальные ключи сессий
```json
{
  "sessionIdType": "customKey",
  "sessionKey": "user_{{ $json.userId }}",
  "contextWindowLength": 10
}
```


### 2. TTL для автоочистки
```json
{
  "sessionTTL": 864000
}
```


## Webhook паттерны

### 1. Trigger + Response связка
```
Webhook Trigger → Process → Respond to Webhook
```


### 2. Правильный ответ
```json
{
  "parameters": {
    "options": {"responseCode": 200},
    "responseBody": "={{ $json.result }}"
  },
  "type": "n8n-nodes-base.respondToWebhook"
}
```


## Валидация и тестирование

### 1. Перед выдачей JSON
- Проверить синтаксис JSON
- Убедиться в отсутствии комментариев
- Проверить соответствие имен в connections
- Убедиться в актуальности typeVersion

### 2. Отладка workflow
- Сохранить и активировать
- Протестировать триггер  
- Проверить логи выполнения
- Использовать Error Output для диагностики
