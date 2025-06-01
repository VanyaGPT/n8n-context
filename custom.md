---

## n8n Context

Сборник полезных инструкций, шаблонов, code-нодов, багфиксов и json-фрагментов для n8n.

Всё автоматически попадает в открытый репозиторий, где можно брать чужое или делиться своим.


### JSON snippets

Тут можно хранить полезные фрагменты JSON, например, настройки нод или payload для API.

### Workflows

Тут можно хранить полезные workflows.

### Багфиксы

Тут можно хранить решения проблем и обходные пути.

### Code nodes

Тут можно хранить полезные code nodes.

### HowTo

Полезные инструкции и советы.

---

## Примеры Switch node

[custom context update] {Пример Switch node для обработки событий Bitrix24} (username: i_van_afanasov, userid: not provided, datetime: 2025-05-25T15:37:25)

```json
{
  "nodes": [
    {
      "parameters": {
        "rules": {
          "values": [
            {
              "conditions": {
                "options": {
                  "caseSensitive": true,
                  "leftValue": "",
                  "typeValidation": "strict",
                  "version": 2
                },
                "conditions": [
                  {
                    "id": "526732c3-65b9-4d36-a2dc-e68d7d7f7b4b",
                    "leftValue": "={{ $json.body.event }}",
                    "rightValue": "ONAPPINSTALL",
                    "operator": {
                      "type": "string",
                      "operation": "equals",
                      "name": "filter.operator.equals"
                    }
                  }
                ],
                "combinator": "and"
              },
              "renameOutput": true,
              "outputKey": "ONAPPINSTALL"
            },
            {
              "conditions": {
                "options": {
                  "version": 2,
                  "leftValue": "",
                  "caseSensitive": true,
                  "typeValidation": "strict"
                },
                "conditions": [
                  {
                    "operator": {
                      "type": "string",
                      "operation": "equals"
                    },
                    "leftValue": "={{ $json.body.event }}",
                    "rightValue": "ONIMBOTMESSAGEADD",
                    "id": "7cc769fa-d69e-4862-8efd-c12114be2f5d"
                  }
                ],
                "combinator": "and"
              },
              "renameOutput": true,
              "outputKey": "ONIMBOTMESSAGEADD"
            },
            {
              "conditions": {
                "options": {
                  "version": 2,
                  "leftValue": "",
                  "caseSensitive": true,
                  "typeValidation": "strict"
                },
                "combinator": "and",
                "conditions": [
                  {
                    "id": "e9125f57-129e-4026-86ff-746d40b92b04",
                    "operator": {
                      "name": "filter.operator.equals",
                      "type": "string",
                      "operation": "equals"
                    },
                    "leftValue": "={{ $json.body.event }}",
                    "rightValue": "ONIMBOTJOINCHAT"
                  }
                ]
              },
              "renameOutput": true,
              "outputKey": "ONIMBOTJOINCHAT"
            },
            {
              "conditions": {
                "options": {
                  "version": 2,
                  "leftValue": "",
                  "caseSensitive": true,
                  "typeValidation": "strict"
                },
                "conditions": [
                  {
                    "id": "b708d339-fd46-470d-b0d5-ff2eb405f5ce",
                    "operator": {
                      "name": "filter.operator.equals",
                      "type": "string",
                      "operation": "equals"
                    },
                    "leftValue": "={{ $json.body.event }}",
                    "rightValue": "ONIMBOTDELETE"
                  }
                ],
                "combinator": "and"
              },
              "renameOutput": true,
              "outputKey": "ONIMBOTDELETE"
            }
          ]
        },
        "options": {}
      },
      "id": "9e17fa00-ad3e-4d20-9259-2089f82df9a6",
      "name": "Route Event",
      "type": "n8n-nodes-base.switch",
      "position": [
        680,
        1180
      ],
      "typeVersion": 3.2
    }
  ],
  "connections": {
    "Route Event": {
      "main": [
        [],
        [],
        [],
        []
      ]
    }
  },
  "pinData": {},
  "meta": {
    "templateCredsSetupCompleted": true,
    "instanceId": "bc5e6699e44c05f63c9770e2a8f0b97ffbe4901f143cf1ead652d71b004f9bd6"
  }
}
```

---

[custom context update] {Нельзя из кода ноды Code работать с файловой системой.} (username: i_van_afanasov, userid: not provided, datetime: 2025-06-01T10:53:01)

Нельзя из кода ноды Code работать с файловой системой.
