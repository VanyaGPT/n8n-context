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
                ],
                "combinator": "and"
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

---

[custom context update] {Примеры правильных связей AI Agent с Tool и Chat Model} (username: i_van_afanasov, userid: not provided, datetime: 2025-06-01T13:34:01)

1. Тут показано как правильно сделать связь root ноды и sub ноды {
  "nodes": [
    {
      "parameters": {},
      "id": "1684dd75-8b23-4184-bdf9-662b9cb12b77",
      "name": "Pinecone Tool1",
      "type": "@n8n/n8n-nodes-langchain.toolVectorStore",
      "typeVersion": 1,
      "position": [
        5620,
        -1040
      ]
    },
    {
      "parameters": {
        "options": {}
      },
      "id": "0ae241c1-e281-4eba-9c5d-5eb1b2834f95",
      "name": "AI Agent2",
      "type": "@n8n/n8n-nodes-langchain.agent",
      "typeVersion": 1.9,
      "position": [
        5660,
        -1320
      ]
    }
  ],
  "connections": {
    "Pinecone Tool1": {
      "ai_tool": [
        [
          {
            "node": "AI Agent2",
            "type": "ai_tool",
            "index": 0
          }
        ]
      ]
    },
    "AI Agent2": {
      "main": [
        []
      ]
    }
  },
  "pinData": {},
  "meta": {
    "templateCredsSetupCompleted": true,
    "instanceId": "d11bcfe2a6c88adcbd756ad320fe8856e5c92b6b9f8008915132b73c441cad97"
  }
}
2. Тут показано, как правильно сделать связь между моделью и рут нодой {
  "nodes": [
    {
      "parameters": {
        "options": {}
      },
      "id": "0ae241c1-e281-4eba-9c5d-5eb1b2834f95",
      "name": "AI Agent2",
      "type": "@n8n/n8n-nodes-langchain.agent",
      "typeVersion": 1.9,
      "position": [
        5660,
        -1320
      ]
    },
    {
      "parameters": {
        "modelName": "models/gemini-1.5-flash",
        "options": {}
      },
      "type": "@n8n/n8n-nodes-langchain.lmChatGoogleGemini",
      "typeVersion": 1,
      "position": [
        5640,
        -1120
      ],
      "id": "a89e57ec-48ca-4e5b-83b3-a447b8d6e07b",
      "name": "Google Gemini Chat Model",
      "credentials": {
        "googlePalmApi": {
          "id": "vFPnLHHOG9IHCMg2",
          "name": "Google Gemini(PaLM) Api account"
        }
      }
    }
  ],
  "connections": {
    "AI Agent2": {
      "main": [
        []
      ]
    },
    "Google Gemini Chat Model": {
      "ai_languageModel": [
        [
          {
            "node": "AI Agent2",
            "type": "ai_languageModel",
            "index": 0
          }
        ]
      ]
    }
  },
  "pinData": {},
  "meta": {
    "templateCredsSetupCompleted": true,
    "instanceId": "d11bcfe2a6c88adcbd756ad320fe8856e5c92b6b9f8008915132b73c441cad97"
  }
}

---

[custom context update] {Всегда использовать последние версии нод из документации.} (username: i_van_afanasov, datetime: 2025-06-26T10:16:25)

Всегда использовать последние версии нод из документации.
