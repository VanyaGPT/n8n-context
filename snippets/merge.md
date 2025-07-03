# Merge Node

Merging parallel data streams.

### Example 1: Combine All (standard)
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

### Example 2: Merge by Position
```json
{
  "parameters": {
    "mode": "combine",
    "combineBy": "mergeByPosition"
  },
  "type": "n8n-nodes-base.merge",
  "typeVersion": 3.1
}
```