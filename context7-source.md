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

TITLE: Understanding n8n Standard Data Structure (JSON)
DESCRIPTION: This JSON snippet illustrates the standard data structure used by n8n to pass information between nodes. It shows how textual data is stored under the 'json' key and optional binary data under the 'binary' key, including details like mime type and file name. This structure is crucial for interacting with n8n items programmatically.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/courses/level-one/chapter-5/chapter-5.5.md#_snippet_0

LANGUAGE: json
CODE:
```
[
    {
   	 "json": { // (1)!
   	 	 "apple": "beets",
   	 	 "carrot": {
   	 	 	 "dill": 1
   	 	 }
   	 },
   	 "binary": { // (2)!
   	 	 "apple-picture": { // (3)!
   	 	 	 "data": "....", // (4)!
   	 	 	 "mimeType": "image/png", // (5)!
   	 	 	 "fileExtension": "png", // (6)!
   	 	 	 "fileName": "example.png", // (7)!
   	 	 }
   	 }
    },
    ...
]
```

----------------------------------------

TITLE: Configuring n8n and Traefik with Docker Compose (YAML)
DESCRIPTION: This Docker Compose configuration defines two services: `traefik` for reverse proxying and SSL/TLS management, and `n8n` for the workflow automation platform. It sets up port mappings, persistent volumes for data and certificates, and environment variables for n8n, while Traefik is configured to use Docker as a provider and handle ACME challenges for SSL certificates.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/hosting/installation/server-setups/docker-compose.md#_snippet_8

LANGUAGE: yaml
CODE:
```
services:
  traefik:
    image: "traefik"
    restart: always
    command:
      - "--api.insecure=true"
      - "--providers.docker=true"
      - "--providers.docker.exposedbydefault=false"
      - "--entrypoints.web.address=:80"
      - "--entrypoints.web.http.redirections.entryPoint.to=websecure"
      - "--entrypoints.web.http.redirections.entrypoint.scheme=https"
      - "--entrypoints.websecure.address=:443"
      - "--certificatesresolvers.mytlschallenge.acme.tlschallenge=true"
      - "--certificatesresolvers.mytlschallenge.acme.email=${SSL_EMAIL}"
      - "--certificatesresolvers.mytlschallenge.acme.storage=/letsencrypt/acme.json"
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - traefik_data:/letsencrypt
      - /var/run/docker.sock:/var/run/docker.sock:ro

  n8n:
    image: docker.n8n.io/n8nio/n8n
    restart: always
    ports:
      - "127.0.0.1:5678:5678"
    labels:
      - traefik.enable=true
      - traefik.http.routers.n8n.rule=Host(`${SUBDOMAIN}.${DOMAIN_NAME}`)
      - traefik.http.routers.n8n.tls=true
      - traefik.http.routers.n8n.entrypoints=web,websecure
      - traefik.http.routers.n8n.tls.certresolver=mytlschallenge
      - traefik.http.middlewares.n8n.headers.SSLRedirect=true
      - traefik.http.middlewares.n8n.headers.STSSeconds=315360000
      - traefik.http.middlewares.n8n.headers.browserXSSFilter=true
      - traefik.http.middlewares.n8n.headers.contentTypeNosniff=true
      - traefik.http.middlewares.n8n.headers.forceSTSHeader=true
      - traefik.http.middlewares.n8n.headers.SSLHost=${DOMAIN_NAME}
      - traefik.http.middlewares.n8n.headers.STSIncludeSubdomains=true
      - traefik.http.middlewares.n8n.headers.STSPreload=true
      - traefik.http.routers.n8n.middlewares=n8n@docker
    environment:
      - N8N_HOST=${SUBDOMAIN}.${DOMAIN_NAME}
      - N8N_PORT=5678
      - N8N_PROTOCOL=https
      - NODE_ENV=production
      - WEBHOOK_URL=https://${SUBDOMAIN}.${DOMAIN_NAME}/
      - GENERIC_TIMEZONE=${GENERIC_TIMEZONE}
    volumes:
      - n8n_data:/home/node/.n8n
      - ./local-files:/files

volumes:
  n8n_data:
  traefik_data:
```

----------------------------------------

TITLE: Configuring n8n with PostgreSQL in Docker
DESCRIPTION: This command starts n8n in a Docker container, configuring it to use PostgreSQL as its database. It sets environment variables for the PostgreSQL database type, host, port, user, schema, and password, while also persisting n8n's user data and encryption key via a Docker volume.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/hosting/installation/docker.md#_snippet_1

LANGUAGE: sh
CODE:
```
docker volume create n8n_data

docker run -it --rm \
 --name n8n \
 -p 5678:5678 \
 -e DB_TYPE=postgresdb \
 -e DB_POSTGRESDB_DATABASE=<POSTGRES_DATABASE> \
 -e DB_POSTGRESDB_HOST=<POSTGRES_HOST> \
 -e DB_POSTGRESDB_PORT=<POSTGRES_PORT> \
 -e DB_POSTGRESDB_USER=<POSTGRES_USER> \
 -e DB_POSTGRESDB_SCHEMA=<POSTGRES_SCHEMA> \
 -e DB_POSTGRESDB_PASSWORD=<POSTGRES_PASSWORD> \
 -v n8n_data:/home/node/.n8n \
 docker.n8n.io/n8nio/n8n
```

----------------------------------------

TITLE: Configure n8n JSON Output with Arrays and Expressions
DESCRIPTION: This JSON object defines the structure for the n8n JSON Output field, demonstrating how to add new static keys, create arrays, and embed objects. It uses n8n expressions like `{{ $json.id }}` and `{{ $json.name }}` to dynamically reference input data fields.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/core-nodes/n8n-nodes-base.set.md#_snippet_3

LANGUAGE: json
CODE:
```
{
  "newKey": "new value",
  "array": [{{ $json.id }},"{{ $json.name }}"],
  "object": {
    "innerKey1": "new value",
    "innerKey2": "{{ $json.id }}",
    "innerKey3": "{{ $json.name }}"
 }
}
```

----------------------------------------

TITLE: HTTP Request Node: Send Query Parameters
DESCRIPTION: Enables sending query parameters to filter HTTP requests. Parameters can be specified using 'Fields Below' (Name/Value pairs) or 'JSON' format. Refer to the service's API documentation for specific parameter guidance.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/index.md#_snippet_4

LANGUAGE: APIDOC
CODE:
```
Send Query Parameters: boolean
  Description: Filters HTTP requests.
  Configuration Options:
    - Using Fields Below:
        Parameters: Array of {Name: string, Value: string}
        Description: Enter Name/Value pairs for query parameters.
    - Using JSON:
        Parameters: JSON string
        Description: Enter JSON to define query parameters.
```

----------------------------------------

TITLE: Defining an Array of Objects in JavaScript
DESCRIPTION: This JavaScript snippet defines an array named 'turtles' containing four objects. Each object represents a turtle with 'name' and 'color' properties, demonstrating the structure n8n expects for collections of items.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/courses/level-two/chapter-1.md#_snippet_1

LANGUAGE: JavaScript
CODE:
```
var turtles = [
	{
		name: 'Michelangelo',
		color: 'orange',
	},
	{
		name: 'Donatello',
		color: 'purple',
	},
	{
		name: 'Raphael',
		color: 'red',
	},
	{
		name: 'Leonardo',
		color: 'blue',
	}
];
```

----------------------------------------

TITLE: Example Webhook Data Structure (JSON)
DESCRIPTION: This JSON snippet illustrates the typical structure of data received by an n8n webhook trigger. It includes headers, parameters, query, and a 'body' property containing example user information (name, age, city) that can be accessed in subsequent workflow steps.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/code/expressions.md#_snippet_0

LANGUAGE: JSON
CODE:
```
[
  {
    "headers": {
      "host": "n8n.instance.address",
      ...
    },
    "params": {},
    "query": {},
    "body": {
      "name": "Jim",
      "age": 30,
      "city": "New York"
    }
  }
]
```

----------------------------------------

TITLE: Accessing Custom Variables in n8n Workflows - JavaScript
DESCRIPTION: This snippet demonstrates how to access custom variables within n8n workflows using the `$vars` object. Variables are read-only strings and their values are replaced during workflow execution. If a variable has no value, it's treated as `undefined`.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/code/variables.md#_snippet_0

LANGUAGE: JavaScript
CODE:
```
// Access a variable
$vars.<variable-name>
```

----------------------------------------

TITLE: Implementing Execute Method for FriendGrid Node in TypeScript
DESCRIPTION: This snippet defines the `execute` method for an n8n node, which processes input data, makes API calls to SendGrid for contact creation, and returns the results. It demonstrates handling multiple input items and mapping node UI parameters to API request bodies.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/creating-nodes/build/programmatic-style-node.md#_snippet_8

LANGUAGE: TypeScript
CODE:
```
// Handle data coming from previous nodes
const items = this.getInputData();
let responseData;
const returnData = [];
const resource = this.getNodeParameter('resource', 0) as string;
const operation = this.getNodeParameter('operation', 0) as string;

// For each item, make an API call to create a contact
for (let i = 0; i < items.length; i++) {
	if (resource === 'contact') {
		if (operation === 'create') {
			// Get email input
			const email = this.getNodeParameter('email', i) as string;
			// Get additional fields input
			const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
			const data: IDataObject = {
				email,
			};

			Object.assign(data, additionalFields);

			// Make HTTP request according to https://sendgrid.com/docs/api-reference/
			const options: OptionsWithUri = {
				headers: {
					'Accept': 'application/json',
				},
				method: 'PUT',
				body: {
					contacts: [
						data,
					],
				},
				uri: `https://api.sendgrid.com/v3/marketing/contacts`,
				json: true,
			};
			responseData = await this.helpers.requestWithAuthentication.call(this, 'friendGridApi', options);
			returnData.push(responseData);
		}
	}
}
// Map data to n8n data structure
return [this.helpers.returnJsonArray(returnData)];
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

TITLE: Referencing External Secrets in n8n Expressions (JavaScript)
DESCRIPTION: This snippet demonstrates the syntax for referencing an external secret within an n8n expression. It allows users to dynamically retrieve secret values from configured vaults like HashiCorp, Infisical, or AWS Secrets Manager. The <vault-name> placeholder should be replaced with the specific vault identifier, and <secret-name> with the actual name of the secret.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/external-secrets.md#_snippet_2

LANGUAGE: JavaScript
CODE:
```
{{ $secrets.<vault-name>.<secret-name> }}
```

----------------------------------------

TITLE: Disabling n8n Features via Environment Variables - Shell
DESCRIPTION: This snippet shows how to disable n8n's default features like diagnostics, version notifications, and workflow templates by setting their respective environment variables to 'false'. This prevents the n8n instance from connecting to n8n's servers for these purposes.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/hosting/configuration/configuration-examples/isolation.md#_snippet_0

LANGUAGE: Shell
CODE:
```
N8N_DIAGNOSTICS_ENABLED=false
N8N_VERSION_NOTIFICATIONS_ENABLED=false
N8N_TEMPLATES_ENABLED=false
```

----------------------------------------

TITLE: Register an Application with Microsoft Identity Platform for n8n OAuth2
DESCRIPTION: This section provides step-by-step instructions to register a new application with the Microsoft Identity Platform. This is a prerequisite for setting up OAuth2 authentication for n8n, involving naming the app, selecting supported account types, configuring the redirect URI with n8n's OAuth Callback URL, and finally obtaining the Application (client) ID for use in n8n.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/credentials/microsoftentra.md#_snippet_0

LANGUAGE: APIDOC
CODE:
```
1. Open the [Microsoft Application Registration Portal](https://aka.ms/appregistrations).
2. Select **Register an application**.
3. Enter a **Name** for your app.
4. In **Supported account types**, select **Accounts in any organizational directory (Any Azure AD directory - Multi-tenant) and personal Microsoft accounts (for example, Skype, Xbox)**.
5. In **Register an application**:
    1. Copy the **OAuth Callback URL** from your n8n credential.
    2. Paste it into the **Redirect URI (optional)** field.
    3. Select **Select a platform** > **Web**.
6. Select **Register** to finish creating your application.
7. Copy the **Application (client) ID** and paste it into n8n as the **Client ID**.
```

----------------------------------------

TITLE: n8n Workflow for PDF to JSON Conversion (JSON)
DESCRIPTION: This n8n workflow configuration demonstrates how to fetch a PDF file from a URL using an HTTP Request node and then convert its binary content into a structured JSON format using the Extract From File node. It includes a manual trigger to initiate the workflow and defines the connections between the nodes.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/courses/level-two/chapter-2.md#_snippet_6

LANGUAGE: JSON
CODE:
```
{
	"name": "Binary to JSON",
	"nodes": [
		{
		"parameters": {},
		"id": "78639a25-b69a-4b9c-84e0-69e045bed1a3",
		"name": "When clicking \"Execute Workflow\"",
		"type": "n8n-nodes-base.manualTrigger",
		"typeVersion": 1,
		"position": [
			480,
			520
		]
		},
		{
		"parameters": {
			"url": "https://media.kaspersky.com/pdf/Kaspersky_Lab_Whitepaper_Anti_blocker.pdf",
			"options": {}
		},
		"id": "a11310df-1287-4e9a-b993-baa6bd4265a6",
		"name": "HTTP Request",
		"type": "n8n-nodes-base.httpRequest",
		"typeVersion": 4.1,
		"position": [
			700,
			520
		]
		},
		{
		"parameters": {
			"operation": "pdf",
			"options": {}
		},
		"id": "88697b6b-fb02-4c3d-a715-750d60413e9f",
		"name": "Extract From File",
		"type": "n8n-nodes-base.extractFromFile",
		"typeVersion": 1,
		"position": [
			920,
			520
		]
		}
	],
	"pinData": {},
	"connections": {
		"When clicking \"Execute Workflow\"": {
		"main": [
			[
			{
				"node": "HTTP Request",
				"type": "main",
				"index": 0
			}
			]
		]
		},
		"HTTP Request": {
		"main": [
			[
			{
				"node": "Extract From File",
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

TITLE: Retrieve Last Item from Node - Python
DESCRIPTION: These methods retrieve data items from a specified upstream node. They allow for optional branchIndex and runIndex parameters to target specific outputs or workflow runs. When branchIndex is omitted, the method defaults to the output directly connecting the source node to the current node, making them suitable for use within the n8n Code node.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/code/builtin/output-other-nodes.md#_snippet_9

LANGUAGE: Python
CODE:
```
_("<node-name>").last(branchIndex?, runIndex?)
```

----------------------------------------

TITLE: n8n Workflow for Batch RSS Feed Processing (JSON)
DESCRIPTION: This JSON represents a complete n8n workflow that demonstrates how to read multiple RSS feeds in batches. It includes a Manual Trigger, a Code node to define the RSS feed URLs, a Loop Over Items node to process each URL individually, and an RSS Read node to fetch the content.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/courses/level-two/chapter-3.md#_snippet_2

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
		"parameters": {},
		"id": "ed8dc090-ae8c-4db6-a93b-0fa873015c25",
		"name": "When clicking \"Execute workflow\"",
		"type": "n8n-nodes-base.manualTrigger",
		"typeVersion": 1,
		"position": [
			460,
			460
		]
		},
		{
		"parameters": {
			"jsCode": "let urls = [\n  {\n    json: {\n      url: 'https://medium.com/feed/n8n-io'\n    }\n  },\n  {\n   json: {\n     url: 'https://dev.to/feed/n8n'\n   } \n  }\n]\n\nreturn urls;"
		},
		"id": "1df2a9bf-f970-4e04-b906-92dbbc9e8d3a",
		"name": "Code",
		"type": "n8n-nodes-base.code",
		"typeVersion": 2,
		"position": [
			680,
			460
		]
		},
		{
		"parameters": {
			"options": {}
		},
		"id": "3cce249a-0eab-42e2-90e3-dbdf3684e012",
		"name": "Loop Over Items",
		"type": "n8n-nodes-base.splitInBatches",
		"typeVersion": 3,
		"position": [
			900,
			460
		]
		},
		{
		"parameters": {
			"url": "={{ $json.url }}",
			"options": {}
		},
		"id": "50e1c1dc-9a5d-42d3-b7c0-accc31636aa6",
		"name": "RSS Read",
		"type": "n8n-nodes-base.rssFeedRead",
		"typeVersion": 1,
		"position": [
			1120,
			460
		]
		}
	],
	"connections": {
		"When clicking \"Execute workflow\"": {
		"main": [
			[
			{
				"node": "Code",
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
				"node": "RSS Read",
				"type": "main",
				"index": 0
			}
			]
		]
		},
		"RSS Read": {
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

TITLE: Installing n8n globally with npm (Bash)
DESCRIPTION: This command installs the latest stable version of n8n globally on the system, making it accessible from any directory in the terminal. It requires Node.js 18 or above.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/hosting/installation/npm.md#_snippet_1

LANGUAGE: bash
CODE:
```
npm install n8n -g
```

----------------------------------------

TITLE: Accessing Environment Variables in JavaScript
DESCRIPTION: This method contains the Variables available in the active n8n environment. It provides access to user-defined or system-defined variables.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/code/builtin/n8n-metadata.md#_snippet_14

LANGUAGE: JavaScript
CODE:
```
$vars
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

TITLE: Using Logical OR Operator for Default Values in n8n
DESCRIPTION: This snippet shows how to use the logical OR operator (||) in an n8n expression to provide a fallback. If the variable `$x` is a falsy value (e.g., `null`, `undefined`, `false`, `0`, `''`), the 'default value' string is used. Otherwise, the value of `$x` is returned. This is a common pattern for setting defaults.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/code/cookbook/expressions/check-incoming-data.md#_snippet_2

LANGUAGE: JavaScript
CODE:
```
{{ $x || "default value" }}
```

----------------------------------------

TITLE: Scheduling Every 3rd Day at Midnight with n8n Schedule Trigger (Cron)
DESCRIPTION: This Cron expression schedules a workflow to run every third day at midnight. The `*/3` in the day-of-month field indicates execution on the 1st, 4th, 7th, etc., day of the month.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/core-nodes/n8n-nodes-base.scheduletrigger/index.md#_snippet_6

LANGUAGE: Cron
CODE:
```
0 0 */3 * *
```

----------------------------------------

TITLE: Configuring n8n with PostgresDB Environment Variables (Bash)
DESCRIPTION: This Bash script demonstrates how to configure n8n to use PostgresDB by setting essential environment variables such as database type, host, port, user, password, and schema. It also includes optional SSL configuration for secure connections and initiates the n8n service.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/hosting/configuration/supported-databases-settings.md#_snippet_0

LANGUAGE: bash
CODE:
```
export DB_TYPE=postgresdb
export DB_POSTGRESDB_DATABASE=n8n
export DB_POSTGRESDB_HOST=postgresdb
export DB_POSTGRESDB_PORT=5432
export DB_POSTGRESDB_USER=n8n
export DB_POSTGRESDB_PASSWORD=n8n
export DB_POSTGRESDB_SCHEMA=n8n

# optional:
export DB_POSTGRESDB_SSL_CA=$(pwd)/ca.crt
export DB_POSTGRESDB_SSL_REJECT_UNAUTHORIZED=false

n8n start
```

----------------------------------------

TITLE: Summarizing Data and Creating Slack Message in n8n (JavaScript)
DESCRIPTION: This snippet processes incoming data to count ideas, features, and bugs based on their 'property_type'. It then sorts submissions by 'property_votes' to identify the top 5, and finally constructs a markdown-formatted Slack message summarizing the counts and listing the top submissions. It requires input data with 'json.property_type', 'json.url', 'json.name', and 'json.property_votes' fields.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/code/ai-code.md#_snippet_2

LANGUAGE: JavaScript
CODE:
```
const submissions = $input.all();

// Count the number of ideas, features, and bugs
let ideaCount = 0;
let featureCount = 0;
let bugCount = 0;

submissions.forEach((submission) => {
  switch (submission.json.property_type[0]) {
    case "Idea":
      ideaCount++;
      break;
    case "Feature":
      featureCount++;
      break;
    case "Bug":
      bugCount++;
      break;
  }
});

// Sort submissions by votes and take the top 5
const topSubmissions = submissions
  .sort((a, b) => b.json.property_votes - a.json.property_votes)
  .slice(0, 5);

let topSubmissionText = "";
topSubmissions.forEach((submission) => {
  topSubmissionText += `<${submission.json.url}|${submission.json.name}> with ${submission.json.property_votes} votes\n`;
});

// Construct the Slack message
const slackMessage = `*Summary of Submissions*\n\nIdeas: ${ideaCount}\nFeatures: ${featureCount}\nBugs: ${bugCount}\nTop 5 Submissions:\n${topSubmissionText}`;

return [{ json: { slackMessage } }];
```

----------------------------------------

TITLE: Configuring Node Description Properties (TypeScript)
DESCRIPTION: This TypeScript snippet adds essential configuration properties to the node's `description` object. It defines the node's display name, internal name, icon path, group, version, dynamic subtitle, general description, default name, input/output types, required credentials, and default request settings including the base URL and headers for API calls.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/creating-nodes/build/declarative-style-node.md#_snippet_4

LANGUAGE: typescript
CODE:
```
displayName: 'NASA Pics',
name: 'NasaPics',
icon: 'file:nasapics.svg',
group: ['transform'],
version: 1,
subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
description: 'Get data from NASAs API',
defaults: {
	name: 'NASA Pics',
},
inputs: ['main'],
outputs: ['main'],
credentials: [
	{
		name: 'NasaPicsApi',
		required: true,
	},
],
requestDefaults: {
	baseURL: 'https://api.nasa.gov',
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
},
```

----------------------------------------

TITLE: Loading Sensitive Data from Files in Docker Compose
DESCRIPTION: This YAML snippet illustrates how to configure n8n to load sensitive data, such as credentials or database settings, from separate files using the `_FILE` suffix for environment variables in Docker Compose. This method enhances security by avoiding direct exposure of sensitive values.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/hosting/configuration/configuration-methods.md#_snippet_7

LANGUAGE: yaml
CODE:
```
CREDENTIALS_OVERWRITE_DATA_FILE=/path/to/credentials_data
DB_TYPE_FILE=/path/to/db_type
DB_POSTGRESDB_DATABASE_FILE=/path/to/database_name
DB_POSTGRESDB_HOST_FILE=/path/to/database_host
DB_POSTGRESDB_PORT_FILE=/path/to/database_port
DB_POSTGRESDB_USER_FILE=/path/to/database_user
DB_POSTGRESDB_PASSWORD_FILE=/path/to/database_password
DB_POSTGRESDB_SCHEMA_FILE=/path/to/database_schema
DB_POSTGRESDB_SSL_CA_FILE=/path/to/ssl_ca
DB_POSTGRESDB_SSL_CERT_FILE=/path/to/ssl_cert
DB_POSTGRESDB_SSL_KEY_FILE=/path/to/ssl_key
DB_POSTGRESDB_SSL_REJECT_UNAUTHORIZED_FILE=/path/to/ssl_reject_unauth
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

TITLE: Configuring OpenAI Assistant Instructions
DESCRIPTION: This snippet provides an example of system instructions for an OpenAI Assistant. It defines the assistant's persona, communication style, and how it should handle user queries, emphasizing a friendly, concise, and supportive tone while avoiding jargon.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/app-nodes/n8n-nodes-langchain.openai/assistant-operations.md#_snippet_1

LANGUAGE: Plain Text
CODE:
```
Always respond in a friendly and engaging manner. When a user asks a question, provide a concise answer first, followed by a brief explanation or additional context if necessary. If the question is open-ended, offer a suggestion or ask a clarifying question to guide the conversation. Keep the tone positive and supportive, and avoid technical jargon unless specifically requested by the user.
```

----------------------------------------

TITLE: Incrementing Page Number for Pagination (n8n Expression)
DESCRIPTION: This snippet shows how to paginate by incrementing a page number parameter. It utilizes the built-in n8n variable $pageCount, which tracks the number of pages already fetched, adding +1 to it to request the next sequential page, assuming APIs typically start page counts from one.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/code/cookbook/http-node/pagination.md#_snippet_1

LANGUAGE: JavaScript
CODE:
```
{{ $pageCount + 1 }}
```

----------------------------------------

TITLE: Ensuring Proper Data Return Format in n8n Code Node (JavaScript)
DESCRIPTION: This error occurs when the Code node does not return data in the expected n8n format, which requires an array of objects, each containing a 'json' key pointing to an object. The snippet demonstrates the correct structure for outputting data from the Code node, ensuring compatibility with subsequent nodes in the workflow. Users should verify their code adheres to this structure to prevent data parsing issues.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/core-nodes/n8n-nodes-base.code/common-issues.md#_snippet_0

LANGUAGE: JavaScript
CODE:
```
[
  {
    "json": {
	  // your data goes here
	}
  }
]
```

----------------------------------------

TITLE: Applying All Kubernetes Manifests (Shell)
DESCRIPTION: This command applies all Kubernetes manifest files (e.g., .yaml) found in the current directory to the cluster. It's used to create or update all defined resources, including deployments, services, and secrets, in one go.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/hosting/installation/server-setups/azure.md#_snippet_4

LANGUAGE: shell
CODE:
```
kubectl apply -f .
```

----------------------------------------

TITLE: HTTP Request Node: Send Body Parameter
DESCRIPTION: Enables sending a request body. Users select a 'Body Content Type' that matches the content format. For 'Form URLencoded', body parameters can be specified using 'Fields Below' (Name/Value pairs) or 'Single Field' (fieldname1=value1&fieldname2=value2 format). Refer to the service's API documentation for body content guidance.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/index.md#_snippet_6

LANGUAGE: APIDOC
CODE:
```
Send Body: boolean
  Description: Sends a body with the API request.
  Body Content Type: string
    Description: Selects the format for the body content.
  Form URLencoded (application/x-www-form-urlencoded):
    Configuration Options:
      - Using Fields Below:
          Body Parameters: Array of {Name: string, Value: string}
          Description: Enter Name/Value pairs for body parameters.
      - Using Single Field:
          Body: string
          Description: Enter name/value pairs in a single string (e.g., 'fieldname1=value1&fieldname2=value2').
```

----------------------------------------

TITLE: Access Node Parameters - JavaScript
DESCRIPTION: This property returns an object containing the configuration and query settings of the specified node. It includes details such as the operation performed by the node and any result limits applied, offering insight into how the upstream node processed data. This property is fully supported within the n8n Code node.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/code/builtin/output-other-nodes.md#_snippet_4

LANGUAGE: JavaScript
CODE:
```
$("<node-name>").params
```

----------------------------------------

TITLE: Slicing First Names with JMESPath Slice Projection
DESCRIPTION: This snippet demonstrates how to use JMESPath slice projections to extract a subset of 'first' names from the 'people' array. It shows implementation in both n8n expressions and Code nodes for JavaScript and Python, returning an array containing the first two names.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/code/cookbook/jmespath.md#_snippet_5

LANGUAGE: JavaScript
CODE:
```
{{$jmespath($json.body.people, "[:2].first")}}
// Returns ["James", "Jacob"]
```

LANGUAGE: JavaScript
CODE:
```
let firstTwoNames = $jmespath($json.body.people, "[:2].first");
return {firstTwoNames};
/* Returns:
[
	{
		"firstTwoNames": [
			"James",
			"Jacob"
		]
	}
]
*/
```

LANGUAGE: Python
CODE:
```
firstTwoNames = _jmespath(_json.body.people, "[:2].first" )
return {"firstTwoNames":firstTwoNames}
"""
Returns:
[
  	{
		"firstTwoNames": [
		"James",
		"Jacob"
		]
	}
]
"""
```

----------------------------------------

TITLE: Scheduling Hourly with n8n Schedule Trigger (Cron)
DESCRIPTION: This Cron expression schedules a workflow to run at the beginning of every hour. The `0` in the minute field ensures that the execution occurs precisely on the hour.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/core-nodes/n8n-nodes-base.scheduletrigger/index.md#_snippet_2

LANGUAGE: Cron
CODE:
```
0 * * * *
```

----------------------------------------

TITLE: Returning Data from n8n Code Node
DESCRIPTION: This JavaScript snippet shows the required structure for returning data from an n8n Code node. It demonstrates wrapping the actual data object (e.g., { apple: 'beets' }) within a 'json' key inside an array, which is the expected format for n8n items.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/courses/level-two/chapter-1.md#_snippet_2

LANGUAGE: JavaScript
CODE:
```
return [
	{
		json: {
			apple: 'beets',
		}
	}
];
```