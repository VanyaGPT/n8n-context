TITLE: Starting n8n after installation (Bash)
DESCRIPTION: These commands initiate the n8n application after it has been installed globally. Both commands achieve the same result, launching the n8n server and making the UI accessible.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/hosting/installation/npm.md#_snippet_4

LANGUAGE: bash
CODE:
```
n8n
# or
n8n start
```

----------------------------------------

TITLE: Referencing External Secrets in n8n Expressions (JavaScript)
DESCRIPTION: This snippet demonstrates how to reference an external secret within an n8n credential field using an expression. The expression allows dynamic retrieval of secret values from configured vaults. Replace <vault-name> with the specific vault provider (e.g., vault, infisical, awsSecretsManager) and <secret-name> with the actual name of the secret as stored in the vault.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/external-secrets.md#_snippet_2

LANGUAGE: JavaScript
CODE:
```
{{ $secrets.<vault-name>.<secret-name> }}
```

----------------------------------------

TITLE: Calling n8n API using API Key (Shell)
DESCRIPTION: This shell script demonstrates how to make a GET request to the n8n API to retrieve active workflows. It shows examples for both self-hosted and n8n Cloud instances, including how to pass the API key in the 'X-N8N-API-KEY' header.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/api/authentication.md#_snippet_0

LANGUAGE: shell
CODE:
```
# For a self-hosted n8n instance
curl -X 'GET' \
  '<N8N_HOST>:<N8N_PORT>/<N8N_PATH>/api/v<version-number>/workflows?active=true' \
  -H 'accept: application/json' \
  -H 'X-N8N-API-KEY: <your-api-key>'

# For n8n Cloud
curl -X 'GET' \
  '<your-cloud-instance>/api/v<version-number>/workflows?active=true' \
  -H 'accept: application/json' \
  -H 'X-N8N-API-KEY: <your-api-key>'
```

----------------------------------------

TITLE: GitHub Action to Pull N8n Version Control Changes (YAML)
DESCRIPTION: This GitHub Action workflow automates pulling version control changes into an n8n instance. It triggers on pushes to the 'production' branch or can be dispatched manually. It uses `curl` to send a POST request to the n8n instance's version control pull endpoint, authenticating with API keys stored as GitHub secrets.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/_snippets/source-control-environments/github-action.md#_snippet_0

LANGUAGE: yaml
CODE:
```
name: CI
on:
  # Trigger the workflow on push or pull request events for the "production" branch
  push:
    branches: [ "production" ]
  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:
jobs:
  run-pull:
    runs-on: ubuntu-latest
    steps:
      - name: PULL
		# Use GitHub secrets to protect sensitive information
        run: >
          curl --location '${{ secrets.INSTANCE_URL }}/version-control/pull' --header
          'Content-Type: application/json' --header 'X-N8N-API-KEY: ${{ secrets.INSTANCE_API_KEY }}'
```

----------------------------------------

TITLE: Example n8n Workflow JSON Structure (JSON)
DESCRIPTION: This JSON snippet illustrates the detailed structure of an n8n workflow, including its ID, name, active status, and an array of configured nodes. Each node specifies its parameters, name, type, type version, position, and sometimes credentials, demonstrating various n8n node types like Start, HTTP Request, Airtable, IF, Set, Function, Discord, and Cron, along with their connections.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/embed/managing-workflows.md#_snippet_2

LANGUAGE: JSON
CODE:
```
{
  "data": {
    "id": "1012",
    "name": "Nathan's Workflow",
    "active": false,
    "nodes": [
      {
        "parameters": {},
        "name": "Start",
        "type": "n8n-nodes-base.start",
        "typeVersion": 1,
        "position": [
          130,
          640
        ]
      },
      {
        "parameters": {
          "authentication": "headerAuth",
          "url": "https://internal.users.n8n.cloud/webhook/custom-erp",
          "options": {
            "splitIntoItems": true
          },
          "headerParametersUi": {
            "parameter": [
              {
                "name": "unique_id",
                "value": "recLhLYQbzNSFtHNq"
              }
            ]
          }
        },
        "name": "HTTP Request",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 1,
        "position": [
          430,
          300
        ],
        "credentials": {
          "httpHeaderAuth": "beginner_course"
        }
      },
      {
        "parameters": {
          "operation": "append",
          "application": "appKBGQfbm6NfW6bv",
          "table": "processingOrders",
          "options": {}
        },
        "name": "Airtable",
        "type": "n8n-nodes-base.airtable",
        "typeVersion": 1,
        "position": [
          990,
          210
        ],
        "credentials": {
          "airtableApi": "Airtable"
        }
      },
      {
        "parameters": {
          "conditions": {
            "string": [
              {
                "value1": "={{$json[\"orderStatus\"]}}",
                "value2": "processing"
              }
            ]
          }
        },
        "name": "IF",
        "type": "n8n-nodes-base.if",
        "typeVersion": 1,
        "position": [
          630,
          300
        ]
      },
      {
        "parameters": {
          "keepOnlySet": true,
          "values": {
            "number": [
              {
                "name": "=orderId",
                "value": "={{$json[\"orderID\"]}}"
              }
            ],
            "string": [
              {
                "name": "employeeName",
                "value": "={{$json[\"employeeName\"]}}"
              }
            ]
          },
          "options": {}
        },
        "name": "Set",
        "type": "n8n-nodes-base.set",
        "typeVersion": 1,
        "position": [
          800,
          210
        ]
      },
      {
        "parameters": {
          "functionCode": "let totalBooked = items.length;\nlet bookedSum = 0;\n\nfor(let i=0; i < items.length; i++) {\n  bookedSum = bookedSum + items[i].json.orderPrice;\n}\nreturn [{json:{totalBooked, bookedSum}}]\n"
        },
        "name": "Function",
        "type": "n8n-nodes-base.function",
        "typeVersion": 1,
        "position": [
          800,
          400
        ]
      },
      {
        "parameters": {
          "webhookUri": "https://discord.com/api/webhooks/865213348202151968/oD5_WPDQwtr22Vjd_82QP3-_4b_lGhAeM7RynQ8Js5DzyXrQEnj0zeAQIA6fki1JLtXE",
          "text": "=This week we have {{$json[\"totalBooked\"]}} booked orders with a total value of {{$json[\"bookedSum\"]}}. My Unique ID: {{$node[\"HTTP Request\"].parameter[\"headerParametersUi\"][\"parameter\"][0][\"value\"]}}"
        },
        "name": "Discord",
        "type": "n8n-nodes-base.discord",
        "typeVersion": 1,
        "position": [
          1000,
          400
        ]
      },
      {
        "parameters": {
          "triggerTimes": {
            "item": [
              {
                "mode": "everyWeek",
                "hour": 9
              }
            ]
          }
        },
        "name": "Cron",
        "type": "n8n-nodes-base.cron",
        "typeVersion": 1,
        "position": [
          220,
          300
        ]
      }
    ],
    "connections": {
      "HTTP Request": {
        "main": [
          [
            {
              "node": "IF",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Start": {
        "main": [
          []
        ]
      },
      "IF": {

```

----------------------------------------

TITLE: Managing Custom Execution Data in JavaScript
DESCRIPTION: This method allows setting and getting custom data associated with the current workflow execution. Refer to Custom executions data for more information on its usage and persistence.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/code/builtin/n8n-metadata.md#_snippet_1

LANGUAGE: JavaScript
CODE:
```
$execution.customData
```

----------------------------------------

TITLE: Verifying Docker and Docker Compose Installation
DESCRIPTION: This snippet shows how to verify that Docker and Docker Compose have been successfully installed by checking their versions from the command line.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/hosting/installation/server-setups/docker-compose.md#_snippet_1

LANGUAGE: bash
CODE:
```
docker --version
docker compose version
```

----------------------------------------

TITLE: Configuring OpenAI Assistant Instructions
DESCRIPTION: This snippet provides an example of system instructions for an OpenAI Assistant. It defines the assistant's persona, communication style, and how it should handle user queries, emphasizing a friendly, concise, and supportive tone while avoiding jargon.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/app-nodes/n8n-nodes-langchain.openai/assistant-operations.md#_snippet_1

LANGUAGE: Plain Text
CODE:
```
Always respond in a friendly and engaging manner. When a user asks a question, provide a concise answer first, followed by a brief explanation or additional context if necessary. If the question is open-ended, offer a suggestion or ask a clarifying question to guide the conversation. Keep the tone positive and supportive, and avoid technical jargon unless specifically requested by the user.
```

----------------------------------------

TITLE: Defining an n8n Workflow with Multiple Nodes (JSON)
DESCRIPTION: This JSON snippet defines an n8n workflow, illustrating the configuration of various nodes such as conditional logic ('If'), time delays ('Wait'), data manipulation ('Edit Fields'), and scheduled triggers. It also details the connections between these nodes, outlining the flow of data and execution within the workflow. The snippet demonstrates how to set parameters for each node, including specific values for assignments, wait times, and scheduling rules.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/courses/level-two/chapter-2.md#_snippet_5

LANGUAGE: json
CODE:
```
		"type": "n8n-nodes-base.if",
		"typeVersion": 2,
		"position": [
			1280,
			360
		]
		},
		{
		"parameters": {
			"amount": 1,
			"unit": "minutes"
		},
		"id": "5aa860b7-c73c-4df0-ad63-215850166f13",
		"name": "Wait",
		"type": "n8n-nodes-base.wait",
		"typeVersion": 1.1,
		"position": [
			1480,
			260
		],
		"webhookId": "be78732e-787d-463e-9210-2c7e8239761e"
		},
		{
		"parameters": {
			"assignments": {
			"assignments": [
				{
				"id": "e058832a-2461-4c6d-b584-043ecc036427",
				"name": "outputValue",
				"value": "={{ $json['new-date'] }}",
				"type": "string"
				}
			]
			},
			"includeOtherFields": true
```

----------------------------------------

TITLE: n8n Workflow Configuration JSON
DESCRIPTION: This JSON object represents a complete n8n workflow, providing the configuration details for various nodes including Gmail, Manual Trigger, HTTP Request, and Airtable. It can be imported into the n8n Editor UI to replicate the described workflow for generating total sales files and sending notifications.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/courses/level-two/chapter-5/chapter-5.2.md#_snippet_0

LANGUAGE: JSON
CODE:
```
    {
    "meta": {
        "templateCredsSetupCompleted": true,
        "instanceId": "cb484ba7b742928a2048bf8829668bed5b5ad9787579adea888f05980292a4a7"
    },
    "nodes": [
        {
        "parameters": {
            "sendTo": "bart@n8n.io",
            "subject": "Your TPS Reports",
            "emailType": "text",
            "message": "Please find your TPS report attached.",
            "options": {
            "attachmentsUi": {
                "attachmentsBinary": [
                {}
                ]
            }
            }
        },
        "id": "d889eb42-8b34-4718-b961-38c8e7839ea6",
        "name": "Gmail",
        "type": "n8n-nodes-base.gmail",
        "typeVersion": 2.1,
        "position": [
            2100,
            500
        ],
        "credentials": {
            "gmailOAuth2": {
            "id": "HFesCcFcn1NW81yu",
            "name": "Gmail account 7"
            }
        }
        },
        {
        "parameters": {},
        "id": "c0236456-40be-4f8f-a730-e56cb62b7b5c",
        "name": "When clicking \"Execute workflow\"",
        "type": "n8n-nodes-base.manualTrigger",
        "typeVersion": 1,
        "position": [
            780,
            600
        ]
        },
        {
        "parameters": {
            "url": "https://internal.users.n8n.cloud/webhook/level2-erp",
            "authentication": "genericCredentialType",
            "genericAuthType": "httpHeaderAuth",
            "sendHeaders": true,
            "headerParameters": {
            "parameters": [
                {
                "name": "unique_id",
                "value": "recFIcD6UlSyxaVMQ"
                }
            ]
            },
            "options": {}
        },
        "id": "cc106fa0-6630-4c84-aea4-a4c7a3c149e9",
        "name": "HTTP Request",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 4.1,
        "position": [
            1000,
            500
        ],
        "credentials": {
            "httpHeaderAuth": {
            "id": "qeHdJdqqqaTC69cm",
            "name": "Course L2 Credentials"
            }
        }
        },
        {
        "parameters": {
            "operation": "search",
            "base": {
            "__rl": true,
            "value": "apprtKkVasbQDbFa1",
            "mode": "list",
            "cachedResultName": "All your base",
            "cachedResultUrl": "https://airtable.com/apprtKkVasbQDbFa1"
            },
            "table": {
            "__rl": true,
            "value": "tblInZ7jeNdlUOvxZ",
            "mode": "list",
            "cachedResultName": "Course L2, Workflow 1",
            "cachedResultUrl": "https://airtable.com/apprtKkVasbQDbFa1/tblInZ7jeNdlUOvxZ"
            },
            "options": {}
        },
        "id": "e5ae1927-b531-401c-9cb2-ec1f2836ba6",
```

----------------------------------------

TITLE: n8n Workflow: Merging Customer Data and Custom Code (JSON)
DESCRIPTION: This n8n workflow demonstrates how to merge data from a 'Customer Datastore' node and a 'Code' node. It uses a 'Merge' node configured to combine inputs based on matching 'name' fields. The 'Code' node generates custom data in a specific format, which is then merged with customer records. This example shows how to set up a complete data merging process within n8n.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/courses/level-two/chapter-3.md#_snippet_0

LANGUAGE: JSON
CODE:
```
{
  "meta": {
    "templateCredsSetupCompleted": true,
    "instanceId": "cb484ba7b742928a2048bf8829668bed5b5ad9787579adea888f05980292a4a7"
  },
  "nodes": [
    {
      "parameters": {
        "mode": "combine",
        "mergeByFields": {
          "values": [
            {
              "field1": "name",
              "field2": "name"
            }
          ]
        },
        "options": {}
      },
      "id": "578365f3-26dd-4fa6-9858-f0a5fdfc413b",
      "name": "Merge",
      "type": "n8n-nodes-base.merge",
      "typeVersion": 2.1,
      "position": [
        720,
        580
      ]
    },
    {
      "parameters": {},
      "id": "71aa5aad-afdf-4f8a-bca0-34450eee8acc",
      "name": "When clicking \"Execute workflow\"",
      "type": "n8n-nodes-base.manualTrigger",
      "typeVersion": 1,
      "position": [
        260,
        560
      ]
    },
    {
      "parameters": {
        "operation": "getAllPeople"
      },
      "id": "497174fe-3cab-4160-8103-78b44efd038d",
      "name": "Customer Datastore (n8n training)",
      "type": "n8n-nodes-base.n8nTrainingCustomerDatastore",
      "typeVersion": 1,
      "position": [
        500,
        460
      ]
    },
    {
      "parameters": {
        "jsCode": "return [\n  {\n    'name': 'Jay Gatsby',\n    'language': 'English',\n    'country': {\n      'code': 'US',\n      'name': 'United States'\n    }\n    \n  }\n  \n];"
      },
      "id": "387e8a1e-e796-4f05-8e75-7ce25c786c5f",
      "name": "Code",
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [
        500,
        720
      ]
    }
  ],
  "connections": {
    "When clicking \"Execute workflow\"": {
      "main": [
        [
          {
            "node": "Customer Datastore (n8n training)",
            "type": "main",
            "index": 0
          },
          {
            "node": "Code",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Customer Datastore (n8n training)": {
      "main": [
        [
          {
            "node": "Merge",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Code": {
      "main": [
        [
          {
            "node": "Merge",
            "type": "main",
            "index": 1
          }
        ]
      ]
    }
  },
  "pinData": {}
}
```

----------------------------------------

TITLE: Retrieve First Item from Node - JavaScript
DESCRIPTION: These methods retrieve data items from a specified upstream node. They allow for optional branchIndex and runIndex parameters to target specific outputs or workflow runs. When branchIndex is omitted, the method defaults to the output directly connecting the source node to the current node, making them suitable for use within the n8n Code node.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/code/builtin/output-other-nodes.md#_snippet_1

LANGUAGE: JavaScript
CODE:
```
$("<node-name>").first(branchIndex?, runIndex?)
```

----------------------------------------

TITLE: Accessing Current Timestamp in n8n Code Node (JavaScript)
DESCRIPTION: This example shows how to use the `$now` Luxon object within a JavaScript Code node. Directly referencing `$now` outputs an ISO formatted timestamp. When `$now` is implicitly converted to a string (e.g., through concatenation), it yields a Unix timestamp, similar to its behavior in expressions.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/code/cookbook/luxon.md#_snippet_1

LANGUAGE: JavaScript
CODE:
```
$now
// n8n displays <ISO formatted timestamp>
// For example 2022-03-09T14:00:25.058+00:00
let rightNow = "Today's date is " + $now
// n8n displays "Today's date is <unix timestamp>"
// For example "Today's date is 1646834498755"
```

----------------------------------------

TITLE: Setting a Custom Encryption Key for n8n (Bash)
DESCRIPTION: This command sets the N8N_ENCRYPTION_KEY environment variable, which n8n uses to encrypt sensitive credentials before saving them to the database. It's essential to replace '<SOME RANDOM STRING>' with a strong, randomly generated key. This variable must be set for all workers when n8n is running in queue mode to ensure consistent encryption.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/hosting/configuration/configuration-examples/encryption-key.md#_snippet_0

LANGUAGE: bash
CODE:
```
export N8N_ENCRYPTION_KEY=<SOME RANDOM STRING>
```

----------------------------------------

TITLE: Setting N8N Encryption Key for Workers (Bash)
DESCRIPTION: This command sets the N8N_ENCRYPTION_KEY environment variable for n8n worker nodes. It is crucial for workers to have the same encryption key as the main n8n instance to decrypt and access credentials stored in the database, ensuring proper workflow execution.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/hosting/scaling/queue-mode.md#_snippet_0

LANGUAGE: Bash
CODE:
```
export N8N_ENCRYPTION_KEY=<main_instance_encryption_key>
```

----------------------------------------

TITLE: Configuring Human Message Prompt for Conversational AI Agent (LangChain Expression)
DESCRIPTION: This example demonstrates how to structure the 'Human Message' prompt for the Conversational AI Agent node in n8n. It includes placeholders for available tools, output format instructions, and the user's input, guiding the agent on how to interact and utilize tools effectively.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/conversational-agent.md#_snippet_0

LANGUAGE: LangChain Expression
CODE:
```
TOOLS\n------\nAssistant can ask the user to use tools to look up information that may be helpful in answering the user's original question. The tools the human can use are:\n\n{tools}\n\n{format_instructions}\n\nUSER'S INPUT\n--------------------\nHere is the user's input (remember to respond with a markdown code snippet of a JSON blob with a single action, and NOTHING else):\n\n{{input}}
```

----------------------------------------

TITLE: Making HTTP Requests with Built-in Helpers (TypeScript)
DESCRIPTION: This snippet demonstrates how to use n8n's built-in `this.helpers.httpRequest` for unauthenticated requests and `this.helpers.httpRequestWithAuthentication` for authenticated requests. These helpers internally use Axios and help avoid adding external npm dependencies to your n8n node, improving performance and security.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/creating-nodes/build/reference/code-standards.md#_snippet_1

LANGUAGE: TypeScript
CODE:
```
// If no auth needed
const response = await this.helpers.httpRequest(options);

// If auth needed
const response = await this.helpers.httpRequestWithAuthentication.call(
	this, 
	'credentialTypeName', // For example: pipedriveApi
	options,
);
```

----------------------------------------

TITLE: n8n Standard Data Structure Example (JSON)
DESCRIPTION: This JSON snippet illustrates the standard data structure for data items in n8n, showing how to wrap regular data in a 'json' key and binary data in a 'binary' key. It includes required and optional properties for binary files, such as 'data', 'mimeType', 'fileExtension', and 'fileName'.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/data/data-structure.md#_snippet_0

LANGUAGE: json
CODE:
```
[
	{
		"json": {
			"apple": "beets",
			"carrot": {
				"dill": 1
			}
		},
		"binary": {
			"apple-picture": {
				"data": "....",
				"mimeType": "image/png",
				"fileExtension": "png",
				"fileName": "example.png"
			}
		}
	}
]
```

----------------------------------------

TITLE: Updating n8n using Docker Compose (Shell)
DESCRIPTION: This snippet provides the necessary shell commands to update an n8n instance managed by Docker Compose. It first pulls the latest image, then stops and removes the existing container, and finally starts a new container in detached mode with the updated image.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/_snippets/self-hosting/installation/docker-compose-updating.md#_snippet_0

LANGUAGE: sh
CODE:
```
# Pull latest version
docker compose pull

# Stop and remove older version
docker compose down

# Start the container
docker compose up -d
```

----------------------------------------

TITLE: Configuring an n8n Error Workflow with Slack Notification (JSON)
DESCRIPTION: This n8n workflow configuration in JSON format defines an error handling mechanism. It starts with an 'Error Trigger' node that activates upon a monitored workflow's failure, then proceeds to a 'Slack' node to send a detailed error message, including the failed workflow's name and execution URL, to a specified Slack channel. This setup is crucial for automated error alerting.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/courses/level-two/chapter-4.md#_snippet_0

LANGUAGE: JSON
CODE:
```
{
		"nodes": [
			{
				"parameters": {},
				"name": "Error Trigger",
				"type": "n8n-nodes-base.errorTrigger",
				"typeVersion": 1,
				"position": [
					720,
					-380
				]
			},
			{
				"parameters": {
					"channel": "channelname",
					"text": "=This workflow {{$node[\"Error Trigger\"].json[\"workflow\"][\"name\"]}}failed.\nHave a look at it here: {{$node[\"Error Trigger\"].json[\"execution\"][\"url\"]}}",
					"attachments": [],
					"otherOptions": {}
				},
				"name": "Slack",
				"type": "n8n-nodes-base.slack",
				"position": [
					900,
					-380
				],
				"typeVersion": 1,
				"credentials": {
					"slackApi": {
						"id": "17",
						"name": "slack_credentials"
					}
				}
			}
		],
		"connections": {
			"Error Trigger": {
				"main": [
					[
						{
							"node": "Slack",
							"type": "main",
							"index": 0
						}
					]
				]
			}
		}
	}
```

----------------------------------------

TITLE: Trace Linked Item in Code Node - Python
DESCRIPTION: Designed specifically for the n8n Code node, this method serves as a robust alternative to the .item property for tracing linked items. By providing a currentNodeInputIndex, it enables precise traceback from an input item to its originating item in an upstream node, facilitating complex data manipulation within code. Refer to Retrieve linked items from earlier in the workflow for an example.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/code/builtin/output-other-nodes.md#_snippet_13

LANGUAGE: Python
CODE:
```
_("<node-name>").itemMatching(currentNodeInputIndex)
```

----------------------------------------

TITLE: Calling $fromAI() Function for Dynamic Parameter Population - JavaScript
DESCRIPTION: This snippet illustrates the basic syntax for calling the `$fromAI()` function within an n8n expression. It uses 'email' as a 'key' parameter, which acts as a hint for the AI model to identify and populate an email-related value dynamically. This function is specifically designed for app node tools integrated with the Tools AI agent to intelligently fill in required parameters.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/advanced-ai/examples/using-the-fromai-function.md#_snippet_0

LANGUAGE: JavaScript
CODE:
```
{{ $fromAI('email') }}
```

----------------------------------------

TITLE: Exporting a Specific n8n Workflow to a File
DESCRIPTION: This command exports a single n8n workflow, identified by its ID, to a specified JSON file. Replace `<ID>` with the workflow's actual ID and `file.json` with your desired output filename.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/hosting/cli-commands.md#_snippet_7

LANGUAGE: bash
CODE:
```
n8n export:workflow --id=<ID> --output=file.json
```

----------------------------------------

TITLE: Mitigating OpenAI Rate Limits with n8n Loop and Wait Nodes (JSON)
DESCRIPTION: This n8n workflow template demonstrates how to handle OpenAI rate limits by splitting input data into smaller batches using the 'Loop Over Items' node and introducing a delay with the 'Wait' node after each OpenAI API call. This helps prevent 'Too Many Requests' errors by pacing requests.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/_snippets/integrations/openai-api-issues.md#_snippet_0

LANGUAGE: JSON
CODE:
```
{
    "nodes": [
    {
        "parameters": {},
        "id": "35d05920-ad75-402a-be3c-3277bff7cc67",
        "name": "When clicking ‘Execute workflow’",
        "type": "n8n-nodes-base.manualTrigger",
        "typeVersion": 1,
        "position": [
        880,
        400
        ]
    },
    {
        "parameters": {
        "batchSize": 500,
        "options": {}
        },
        "id": "ae9baa80-4cf9-4848-8953-22e1b7187bf6",
        "name": "Loop Over Items",
        "type": "n8n-nodes-base.splitInBatches",
        "typeVersion": 3,
        "position": [
        1120,
        420
        ]
    },
    {
        "parameters": {
        "resource": "chat",
        "options": {},
        "requestOptions": {}
        },
        "id": "a519f271-82dc-4f60-8cfd-533dec580acc",
        "name": "OpenAI",
        "type": "n8n-nodes-base.openAi",
        "typeVersion": 1,
        "position": [
        1380,
        440
        ]
    },
    {
        "parameters": {
        "unit": "minutes"
        },
        "id": "562d9da3-2142-49bc-9b8f-71b0af42b449",
        "name": "Wait",
        "type": "n8n-nodes-base.wait",
        "typeVersion": 1,
        "position": [
        1620,
        440
        ],
        "webhookId": "714ab157-96d1-448f-b7f5-677882b92b13"
    }
    ],
    "connections": {
    "When clicking ‘Execute workflow’": {
        "main": [
        [
            {
            "node": "Loop Over Items",
            "type": "main",
            "index": 0
            }
        ]
        ]
    },
    "Loop Over Items": {
        "main": [
        null,
        [
            {
            "node": "OpenAI",
            "type": "main",
            "index": 0
            }
        ]
        ]
    },
    "OpenAI": {
        "main": [
        [
            {
            "node": "Wait",
            "type": "main",
            "index": 0
            }
        ]
        ]
    },
    "Wait": {
        "main": [
        [
            {
            "node": "Loop Over Items",
            "type": "main",
            "index": 0
            }
        ]
        ]
    }
    },
    "pinData": {}
}
```

----------------------------------------

TITLE: n8n Workflow: Date Transformation and Conditional Processing
DESCRIPTION: This n8n workflow automates date processing. It fetches customer data, rounds the 'created' date to the end of the month, checks if the rounded date is after January 1, 1960, waits for one minute if the condition is true, and finally sets the calculated date as 'outputValue'. The workflow is configured to trigger every 30 minutes and includes a manual trigger for testing.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/courses/level-two/chapter-2.md#_snippet_4

LANGUAGE: n8n Workflow JSON
CODE:
```
{
	"name": "Course 2, Ch 2, Date exercise",
	"nodes": [
		{
		"parameters": {},
		"id": "6bf64d5c-4b00-43cf-8439-3cbf5e5f203b",
		"name": "When clicking \"Execute workflow\"",
		"type": "n8n-nodes-base.manualTrigger",
		"typeVersion": 1,
		"position": [
			620,
			280
		]
		},
		{
		"parameters": {
			"operation": "getAllPeople",
			"returnAll": true
		},
		"id": "a08a8157-99ee-4d50-8fe4-b6d7e16e858e",
		"name": "Customer Datastore (n8n training)",
		"type": "n8n-nodes-base.n8nTrainingCustomerDatastore",
		"typeVersion": 1,
		"position": [
			840,
			360
		]
		},
		{
		"parameters": {
			"operation": "roundDate",
			"date": "={{ $json.created }}",
			"mode": "roundUp",
			"outputFieldName": "new-date",
			"options": {
			"includeInputFields": true
			}
		},
		"id": "f66a4356-2584-44b6-a4e9-1e3b5de53e71",
		"name": "Date & Time",
		"type": "n8n-nodes-base.dateTime",
		"typeVersion": 2,
		"position": [
			1080,
			360
		]
		},
		{
		"parameters": {
			"conditions": {
			"options": {
				"caseSensitive": true,
				"leftValue": "",
				"typeValidation": "strict"
			},
			"conditions": [
				{
				"id": "7c82823a-e603-4166-8866-493f643ba354",
				"leftValue": "={{ $json['new-date'] }}",
				"rightValue": "1960-01-01T00:00:00",
				"operator": {
					"type": "dateTime",
					"operation": "after"
				}
				}
			],
			"combinator": "and"
			},
			"options": {}
		},
		"id": "cea39877-6183-4ea0-9400-e80523636912",
		"name": "If"
```

----------------------------------------

TITLE: Creating n8n Credentials via REST API
DESCRIPTION: This snippet demonstrates how to programmatically create new n8n credentials using the REST API. It includes the HTTP POST request to the `/rest/credentials` endpoint, the JSON payload required for an Airtable API key, and the expected JSON response containing the ID of the newly created credential. This method is an alternative to using the n8n Editor UI for credential management.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/embed/managing-workflows.md#_snippet_0

LANGUAGE: HTTP
CODE:
```
POST https://<n8n-domain>/rest/credentials
```

LANGUAGE: JSON
CODE:
```
{
   "name":"MyAirtable",
   "type":"airtableApi",
   "nodesAccess":[
      {
         "nodeType":"n8n-nodes-base.airtable"
      }
   ],
   "data":{
      "apiKey":"q12we34r5t67yu"
   }
}
```

LANGUAGE: JSON
CODE:
```
{
   "data":{
      "name":"MyAirtable",
      "type":"airtableApi",
      "data":{
         "apiKey":"q12we34r5t67yu"
      },
      "nodesAccess":[
         {
            "nodeType":"n8n-nodes-base.airtable",
            "date":"2021-09-10T07:41:27.770Z"
         }
      ],
      "id":"29",
      "createdAt":"2021-09-10T07:41:27.777Z",
      "updatedAt":"2021-09-10T07:41:27.777Z"
   }
}
```

----------------------------------------

TITLE: Starting n8n with Docker (SQLite)
DESCRIPTION: This command initializes a Docker volume for persistent data, downloads the n8n image, and starts the container, exposing it on port 5678. It mounts the n8n_data volume to /home/node/.n8n to ensure data persistence across restarts.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/hosting/installation/docker.md#_snippet_0

LANGUAGE: sh
CODE:
```
docker volume create n8n_data

docker run -it --rm --name n8n -p 5678:5678 -v n8n_data:/home/node/.n8n docker.n8n.io/n8nio/n8n
```

----------------------------------------

TITLE: Enabling n8n Execution Data Pruning (Docker Compose)
DESCRIPTION: This snippet illustrates how to enable and configure automatic data pruning for n8n within a Docker Compose setup. Environment variables are defined under the `environment` key for the `n8n` service to activate pruning, set the maximum age, and specify the maximum number of executions.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/hosting/scaling/execution-data.md#_snippet_5

LANGUAGE: yaml
CODE:
```
# Docker Compose
n8n:
    environment:
      - EXECUTIONS_DATA_PRUNE=true
      - EXECUTIONS_DATA_MAX_AGE=168
	  	- EXECUTIONS_DATA_PRUNE_MAX_COUNT=50000
```

----------------------------------------

TITLE: Defining API Call Details with `routing` and `requestDefaults` in TypeScript
DESCRIPTION: This example illustrates how `routing` is used within an `options` array to specify API call details for operations, complementing `requestDefaults`. `requestDefaults` sets up common API parameters like `baseURL` and `headers`, while `routing` provides operation-specific information such as the `method` and `url` for a particular API endpoint, as shown with a NASA API integration.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/creating-nodes/build/reference/node-base-files/declarative-style-parameters.md#_snippet_1

LANGUAGE: TypeScript
CODE:
```
description: INodeTypeDescription = {
  // Other node info here
  requestDefaults: {
			baseURL: 'https://api.nasa.gov',
			url: '',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
    properties: [
      // Resources here
      {
        displayName: 'Operation'
        // Other operation details
        options: [
          {
            name: 'Get'
            value: 'get',
            description: '',
            routing: {
              request: {
                method: 'GET',
                url: '/planetary/apod'
              }
            }
          }
        ]
      }
    ]
}
```

----------------------------------------

TITLE: Setting up NASA API Key Authentication in n8n (TypeScript)
DESCRIPTION: This TypeScript code defines a custom credential type, `NasaPicsApi`, for the NASA API within n8n. It includes an 'API Key' property for user input and configures generic authentication to pass the API key via a query string parameter named 'api_key'. This setup enables n8n nodes to securely authenticate with the NASA API.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/creating-nodes/build/declarative-style-node.md#_snippet_8

LANGUAGE: TypeScript
CODE:
```
import {
	IAuthenticateGeneric,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class NasaPicsApi implements ICredentialType {
	name = 'NasaPicsApi';
	displayName = 'NASA Pics API';
	// Uses the link to this tutorial as an example
	// Replace with your own docs links when building your own nodes
	documentationUrl = 'https://docs.n8n.io/integrations/creating-nodes/build/declarative-style-node/';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			default: '',
		},
	];
	authenticate = {
		type: 'generic',
		properties: {
			qs: {
				'api_key': '={{$credentials.apiKey}}'
			}
		},
	} as IAuthenticateGeneric;
}
```

----------------------------------------

TITLE: Extracting Nested Data Fields in n8n (JavaScript)
DESCRIPTION: This snippet iterates through incoming items and extracts specific nested fields, 'personal_info.first_name' and 'work_info.job_title', from each item's JSON payload. It returns a new array of items, each containing only these two extracted fields. This is useful for flattening or selecting specific data points from complex nested structures.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/code/ai-code.md#_snippet_3

LANGUAGE: JavaScript
CODE:
```
const items = $input.all();
const newItems = items.map((item) => {
  const firstName = item.json.personal_info.first_name;
  const jobTitle = item.json.work_info.job_title;
  return {
    json: {
      firstName,
      jobTitle,
    },
  };
});
return newItems;
```

----------------------------------------

TITLE: Merging Data with Custom SQL Query in n8n
DESCRIPTION: This SQL query demonstrates how to merge data from two previous nodes (input1 and input2) using a LEFT JOIN operation based on matching 'name' and 'id' fields. Data from previous n8n nodes are accessible as tables named input1, input2, etc., according to their order in the workflow. This allows for complex custom merge logic.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/core-nodes/n8n-nodes-base.merge.md#_snippet_0

LANGUAGE: sql
CODE:
```
SELECT * FROM input1 LEFT JOIN input2 ON input1.name = input2.id
```