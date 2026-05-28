# Правила создания циклов в n8n

## Основной паттерн цикла

Цикл в n8n создается с помощью узла **Split In Batches** и обратной связи:

```
Split In Batches → Обработка элемента → [Rate Limit] → ← обратно к Split In Batches
```

## Структура Split In Batches

Split In Batches имеет **2 выхода**:

### Output 0 (index: 0) - Завершение цикла
- Срабатывает **ОДИН РАЗ** когда все элементы обработаны
- Используется для действий **после** завершения цикла
- В примере: пустой массив `[]`

### Output 1 (index: 1) - Тело цикла  
- Срабатывает для **КАЖДОГО** элемента батча
- Используется для основной обработки
- В примере: ведет к `Extract User Info`

## Connections для цикла

```json
{
  "Split Users Batch": {
    "main": [
      [],  // Output 0: завершение (пустой)
      [    // Output 1: обработка каждого элемента
        {
          "node": "Extract User Info",
          "type": "main",
          "index": 0
        }
      ]
    ]
  },
  // В конце цикла - обратная связь
  "Rate Limit (20 sec)": {
    "main": [
      [
        {
          "node": "Split Users Batch",  // Обратно к началу
          "type": "main",
          "index": 0
        }
      ]
    ]
  }
}
```

## Правила создания цикла

### 1. Структура узла Split In Batches
```json
{
  "parameters": {
    "options": {}  // Размер батча по умолчанию = 1
  },
  "type": "n8n-nodes-base.splitInBatches",
  "typeVersion": 3
}
```

### 2. Обработка в цикле
- Output 1 → основная логика обработки
- Может содержать условные ветвления (Switch)
- Может содержать параллельные потоки

### 3. Обратная связь
- **ОБЯЗАТЕЛЬНО**: последний узел цикла подключается к Split In Batches (index: 0)
- Часто используется Wait для rate limiting
- Connection: `"index": 0` - это важно!

### 4. Завершение цикла
- Output 0 используется для действий после завершения всех итераций
- Если не нужно - оставляем пустым массивом `[]`

## Пример полного цикла

```json
{
  "connections": {
    "Split Users Batch": {
      "main": [
        [],  // Завершение цикла - пустое
        [{"node": "Process Item", "type": "main", "index": 0}]  // Тело цикла
      ]
    },
    "Process Item": {
      "main": [
        [{"node": "Rate Limit", "type": "main", "index": 0}]
      ]
    },
    "Rate Limit": {
      "main": [
        [{"node": "Split Users Batch", "type": "main", "index": 0}]  // Обратно!
      ]
    }
  }
}
```

## Важные моменты

1. **Rate Limiting**: всегда добавляйте Wait между итерациями для внешних API
2. **Error Handling**: можно добавить `onError: "continueErrorOutput"` для обработки ошибок
3. **Batch Size**: можно настроить размер батча в параметрах Split In Batches
4. **Memory**: Split In Batches хранит состояние итераций внутри себя

## Альтернативные паттерны

- **Code Node**: можно использовать for/while циклы в JavaScript
- **Recursive Workflow**: вызов workflow самого себя (для сложных случаев)
- **HTTP Request Loop**: для пагинации API

Но **Split In Batches** - это стандартный и рекомендуемый способ для большинства случаев!

## Анализ приложенного примера

В предоставленном workflow реализован классический цикл:

1. **Daily 10:00 MSK** (Cron) → запускает workflow
2. **Get Active Users** → получает список пользователей  
3. **Split Users Batch** → разбивает на итерации
4. **Extract User Info** → обрабатывает каждого пользователя
5. **Day Type Router** → условное ветвление
6. **Generate Content** → генерация контента
7. **Send Content** → отправка сообщения
8. **Update Progress** → обновление данных
9. **Log Action** → логирование
10. **Rate Limit (20 sec)** → пауза 20 секунд
11. → **обратно к Split Users Batch** для следующего пользователя

Этот паттерн позволяет обрабатывать пользователей по одному с задержкой между отправками, что идеально для Telegram API лимитов.
