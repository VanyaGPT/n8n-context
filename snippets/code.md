# Code Node

Executing JavaScript code for data processing.

### Example 1: Array Data Processing
```json
{
  "parameters": {
    "mode": "runOnceForAllItems",
    "jsCode": "// Transform all array elements\nconst newItems = items.map(item => {\n  // Add new fields\n  return {\n    ...item,\n    fullName: `${item.firstName} ${item.lastName}`,\n    age: calculateAge(item.birthDate),\n    formattedDate: new Date(item.createdAt).toLocaleDateString()\n  };\n});\n\n// Function to calculate age\nfunction calculateAge(birthDate) {\n  const today = new Date();\n  const birth = new Date(birthDate);\n  let age = today.getFullYear() - birth.getFullYear();\n  const monthDiff = today.getMonth() - birth.getMonth();\n  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {\n    age--;\n  }\n  return age;\n}\n\nreturn newItems;"
  },
  "type": "n8n-nodes-base.code",
  "typeVersion": 2
}
```

### Example 2: Data Filtering
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

### Example 3: Error Handling
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
