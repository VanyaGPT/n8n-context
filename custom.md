# n8n Context

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

---

[custom context update] {Верная ноды set - edit fields} (username: i_van_afanasov, datetime: 2025-06-26T15:16:25)

```json
{
  "nodes": [
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "639fe452-d282-4ca2-8571-8dbdbe9aaa95",
              "name": "field",
              "value": "value",
              "type": "string"
            }
          ]
        },
        "options": {}
      },
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        1280,
        1820
      ],
      "id": "40f36e6c-938f-4345-9652-16c1c288c984",
      "name": "Edit Fields"
    }
  ],
  "connections": {
    "Edit Fields": {
      "main": [
        []
      ]
    }
  },
  "pinData": {},
  "meta": {
    "instanceId": "bc5e6699e44c05f63c9770e2a8f0b97ffbe4901f143cf1ead652d71b004f9bd6"
  }
}
```
---

## HowTo

Чтобы показывался второй выход из ноды для ошибки – ВСЕГДА нужно указывать поле `"onError": "continueErrorOutput"` для нод на верхнем уровне json-ноды. В связях 2 выхода указываются через массив – первый элемент – успех, второй - ошибка.  Смотри пример json ниже.

```json
{
  "nodes": [
    {
      "parameters": {
        "authentication": "nocoDbApiToken",
        "operation": "create",
        "projectId": "py7tp2nznrh5dc4",
        "table": "mse8rq955cnpwsd",
        "dataToSend": "autoMapInputData"
      },
      "type": "n8n-nodes-base.nocoDb",
      "typeVersion": 3,
      "position": [
        520,
        520
      ],
      "id": "adde7758-ebee-45cf-9483-3d26fc914771",
      "name": "NocoDB",
      "credentials": {
        "nocoDbApiToken": {
          "id": "0u8Y46FoI7N4Rp9A",
          "name": "NocoDB Token account"
        }
      },
      "onError": "continueErrorOutput"
    },
    {
      "parameters": {},
      "type": "n8n-nodes-base.stopAndError",
      "typeVersion": 1,
      "position": [
        740,
        620
      ],
      "id": "2e9d00f6-6466-42c3-885d-8b9dbabdb880",
      "name": "Stop and Error"
    },
    {
      "parameters": {
        "options": {}
      },
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        740,
        420
      ],
      "id": "2d92ad7e-1f33-4850-a6ad-0d47f07f4a37",
      "name": "set next request"
    }
  ],
  "connections": {
    "NocoDB": {
      "main": [
        [
          {
            "node": "set next request",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "Stop and Error",
            "type": "main",
            "index": 0
          }
        ]
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

[custom context update] {Всегда Используй Merge-ноду для объединения параллельных потоков данных в n8n} (username: i_van_afanasov, datetime: 2025-06-26T19:58:26)

```json
{
  "nodes": [
    {
      "parameters": {
        "mode": "combine",
        "combineBy": "combineAll",
        "options": {}
      },
      "type": "n8n-nodes-base.merge",
      "typeVersion": 3.1,
      "position": [
        1340,
        220
      ],
      "id": "7fefd7e6-a793-41d2-8873-95f0da580c9f",
      "name": "Merge1"
    }
  ],
  "connections": {
    "Merge1": {
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

```

Примеры связей:
```json
{
  "nodes": [
    {
      "parameters": {
        "mode": "combine",
        "combineBy": "combineAll",
        "options": {}
      },
      "type": "n8n-nodes-base.merge",
      "typeVersion": 3.1,
      "position": [
        1060,
        -100
      ],
      "id": "24fed7a8-f10b-45d6-820f-255bae517afc",
      "name": "Merge"
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "d5b9d7c5-428f-4bbb-b404-7fdba9ec4343",
              "name": "userMessage",
              "value": "={{ $json.message.text }}",
              "type": "string"
            },
            {
              "id": "9ea74de1-0b22-4b63-8567-e05d689dfbf3",
              "name": "chatId",
              "value": "={{ $json.message.chat.id }}",
              "type": "string"
            },
            {
              "id": "87b74afb-421f-4f0d-afd1-7d506b30e5c6",
              "name": "from",
              "value": "={{ $json.message.from.id }}",
              "type": "string"
            },
            {
              "id": "8dcc0279-1b13-4449-907d-d7a3a7c225ae",
              "name": "userName",
              "value": "={{ $json.message.from.username }}",
              "type": "string"
            },
            {
              "id": "6df07e1e-78f8-453b-9861-dd48c46c9209",
              "name": "message_id",
              "value": "={{ $json.message.message_id }}",
              "type": "number"
            }
          ]
        },
        "options": {}
      },
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        -580,
        460
      ],
      "id": "6b1c4565-97b3-44f8-8a0a-50265d7f12e1",
      "name": "Edit Fields4"
    },
    {
      "parameters": {
        "mode": "combine",
        "combineBy": "combineAll",
        "options": {}
      },
      "type": "n8n-nodes-base.merge",
      "typeVersion": 3.1,
      "position": [
        1340,
        220
      ],
      "id": "7fefd7e6-a793-41d2-8873-95f0da580c9f",
      "name": "Merge1"
    }
  ],
  "connections": {
    "Merge": {
      "main": [
        [
          {
            "node": "Merge1",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Edit Fields4": {
      "main": [
        []
      ]
    },
    "Merge1": {
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
```
---

[custom context update] {JSON генерировать только по одному флоу в теле json-а. Если попросили несколько – сделать отдельно в разных блоках, а не в массиве.} (username: i_van_afanasov, datetime: 2025-06-26T20:59:26)

JSON генерировать только по одному флоу в теле json-а. Если попросили несколько – сделать отдельно в разных блоках, а не в массиве.

---

## HowTo

В секции "connections" перечисляйте ВСЕ связи между нодами.

1.  Для каждой связи указывайте объект вида:

      { "node": "Target Node Name", "type": "main", "index": 0 }
   
2.  Значение поля "node" должно точно совпадать с полем "name" целевой ноды. Если имя ноды меняется — обновите соответствующие записи в connections. Используйте читаемые алиасы в id/name нод (например, ReadMapping1), а не случайные UUID – это упрощает ручную правку.
3.  Пример связей:
```json
{
  ....
  "connections": {
    "Edit Fields2": {
      "main": [
        [
          {
            "node": "prompt?",
            "type": "main",
            "index": 0
          },
          {
            "node": "Merge2",
            "type": "main",
            "index": 1
          }
        ]
      ]
    },
    "prompt?": {
      "main": [
        [
          {
            "node": "Redis1",
            "type": "main",
            "index": 0
          }
        ],
        []
      ]
    }
  }
}
```

(username: i_van_afanasov, datetime: 2025-06-26T11:01:26)
