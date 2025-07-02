# Code Node

Выполнение JavaScript кода для обработки данных.

### Пример 1: Обработка массива данных
```json
{
  "parameters": {
    "mode": "runOnceForAllItems",
    "jsCode": "// Преобразование всех элементов массива\nconst newItems = items.map(item => {\n  // Добавление новых полей\n  return {\n    ...item,\n    fullName: `${item.firstName} ${item.lastName}`,\n    age: calculateAge(item.birthDate),\n    formattedDate: new Date(item.createdAt).toLocaleDateString()\n  };\n});\n\n// Функция для расчета возраста\nfunction calculateAge(birthDate) {\n  const today = new Date();\n  const birth = new Date(birthDate);\n  let age = today.getFullYear() - birth.getFullYear();\n  const monthDiff = today.getMonth() - birth.getMonth();\n  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {\n    age--;\n  }\n  return age;\n}\n\nreturn newItems;"
  },
  "type": "n8n-nodes-base.code",
  "typeVersion": 2
}
```

### Пример 2: Фильтрация данных
```json
{
  "parameters": {
    "mode": "runOnceForAllItems",
    "jsCode": "// Фильтрация активных пользователей с email\nconst filteredItems = items.filter(item => {\n  return item.active === true && item.email && item.email.includes('@');\n});\n\n// Сортировка по имени\nfilteredItems.sort((a, b) => a.name.localeCompare(b.name));\n\nreturn filteredItems;"
  },
  "type": "n8n-nodes-base.code",
  "typeVersion": 2
}
```

### Пример 3: Обработка ошибок
```json
{
  "parameters": {
    "mode": "runOnceForAllItems",
    "jsCode": "try {\n  // Валидация входных данных\n  if (!items || !Array.isArray(items) || items.length === 0) {\n    throw new Error('Входные данные отсутствуют или некорректны');\n  }\n  \n  // Проверка обязательных полей\n  const validItems = items.filter(item => {\n    if (!item.id || !item.name) {\n      console.log(`Пропущен элемент без id или name: ${JSON.stringify(item)}`);\n      return false;\n    }\n    return true;\n  });\n  \n  return validItems;\n} catch (error) {\n  console.error(`Ошибка обработки: ${error.message}`);\n  return [{\n    error: true,\n    message: error.message\n  }];\n}"
  },
  "type": "n8n-nodes-base.code",
  "typeVersion": 2
}
```
