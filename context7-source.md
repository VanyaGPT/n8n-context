TITLE: Formatting JSON Parameters in n8n HTTP Request Node
DESCRIPTION: This snippet demonstrates how to correctly format JSON parameters when using an expression in the n8n HTTP Request node. It shows that the entire JSON object must be wrapped in double curly brackets {{ }} to be properly interpreted as an expression, ensuring valid JSON structure within.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/common-issues.md#_snippet_0

LANGUAGE: JSON
CODE:
```
{{    {
    "myjson":
    {
        "name1": "value1",
        "name2": "value2",
        "array1":
            ["value1","value2"]
    }
    }
}}
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

TITLE: Installing n8n globally with npm (Bash)
DESCRIPTION: This command installs the latest stable version of n8n globally on the system, making it accessible from any directory in the terminal. It requires Node.js 18 or above.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/hosting/installation/npm.md#_snippet_1

LANGUAGE: bash
CODE:
```
npm install n8n -g
```

----------------------------------------

TITLE: n8n JSON Output Configuration with Expressions
DESCRIPTION: This JSON configuration is used in the 'JSON Output' field of an n8n node. It defines a new JSON structure including a static key, an array containing values from input fields using n8n expressions ({{ $json.id }}, {{ $json.name }}), and a nested object also referencing input fields.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/core-nodes/n8n-nodes-base.set.md#_snippet_3

LANGUAGE: JSON
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

TITLE: Merging Data with Custom SQL Query in n8n
DESCRIPTION: This SQL query demonstrates how to merge data from two previous nodes (input1 and input2) using a LEFT JOIN operation based on matching 'name' and 'id' fields. Data from previous n8n nodes are accessible as tables named input1, input2, etc., according to their order in the workflow. This allows for complex custom merge logic.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/core-nodes/n8n-nodes-base.merge.md#_snippet_0

LANGUAGE: sql
CODE:
```
SELECT * FROM input1 LEFT JOIN input2 ON input1.name = input2.id
```

----------------------------------------

TITLE: Making HTTP Requests with n8n Helpers (TypeScript)
DESCRIPTION: This snippet demonstrates how to make HTTP requests within an n8n node's `execute` function using the built-in helpers. It shows two primary methods: `httpRequest` for requests without authentication and `httpRequestWithAuthentication` for requests requiring credentials, where `credentialTypeName` specifies the type of credential to use. Both methods accept an `options` object to configure the request.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/creating-nodes/build/reference/http-helpers.md#_snippet_0

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

TITLE: Using Nullish Coalescing Operator for Default Values in n8n
DESCRIPTION: This snippet illustrates the use of the nullish coalescing operator (??) in an n8n expression. It provides a concise way to assign a 'default value' if the variable `$x` is strictly `null` or `undefined`. If `$x` has any other value (including `false` or `0`), that value is used instead.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/code/cookbook/expressions/check-incoming-data.md#_snippet_1

LANGUAGE: JavaScript
CODE:
```
{{ $x ?? "default value" }}
```

----------------------------------------

TITLE: Checking Node Execution Status in n8n (JavaScript)
DESCRIPTION: This JavaScript snippet allows you to programmatically check if a specific n8n node has been executed within a workflow. It's useful for conditional logic to ensure a node has produced output before attempting to reference its values, preventing 'Referenced node is unexecuted' errors. Replace '<node-name>' with the actual name of the node you want to check.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/_snippets/integrations/referenced-node-unexecuted.md#_snippet_0

LANGUAGE: JavaScript
CODE:
```
$("<node-name>").isExecuted
```

----------------------------------------

TITLE: Parameterized SELECT Query for MySQL - SQL
DESCRIPTION: This SQL snippet demonstrates a parameterized SELECT query designed for use with n8n's MySQL node. It uses `$1:name` for a dynamic table name and `$2` for a dynamic email value, allowing for safe and flexible data retrieval while preventing SQL injection.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/app-nodes/n8n-nodes-base.mysql/index.md#_snippet_1

LANGUAGE: sql
CODE:
```
SELECT * FROM $1:name WHERE email = $2;
```

----------------------------------------

TITLE: Checking Node Execution Status in n8n JavaScript
DESCRIPTION: This JavaScript expression checks if a specific n8n node has been executed. It's useful for conditional logic to prevent errors when referencing unexecuted nodes, ensuring data availability before attempting to use it.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/code/cookbook/expressions/common-issues.md#_snippet_0

LANGUAGE: JavaScript
CODE:
```
$("<node-name>").isExecuted
```

----------------------------------------

TITLE: Invalid Multi-line JavaScript Expression (Luxon)
DESCRIPTION: This JavaScript snippet illustrates an invalid multi-line expression within n8n, even when formatted as a single line. n8n expressions are limited to a single line of JavaScript, preventing the use of functions, variable assignments, or multiple standalone operations directly within the `{{...}}` block. It attempts to calculate the difference between two dates using Luxon.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/code/expressions.md#_snippet_3

LANGUAGE: JavaScript
CODE:
```
{{
  function example() {
    let end = DateTime.fromISO('2017-03-13');
    let start = DateTime.fromISO('2017-02-13');
    let diffInMonths = end.diff(start, 'months');
    return diffInMonths.toObject();
  }
  example();
}}
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

TITLE: Granting Required Permissions for n8n PostgresDB User (SQL)
DESCRIPTION: This SQL snippet provides the necessary commands to set up a new database and user for n8n in PostgresDB. It creates a dedicated database, defines a new user with a specified password, and grants all privileges on the newly created database to that user, ensuring n8n has the required access to manage its schemas.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/hosting/configuration/supported-databases-settings.md#_snippet_1

LANGUAGE: sql
CODE:
```
CREATE DATABASE n8n-db;
CREATE USER n8n-user WITH PASSWORD 'random-password';
GRANT ALL PRIVILEGES ON DATABASE n8n-db TO n8n-user;
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

TITLE: Configuring n8n Logging with Environment Variables - Bash
DESCRIPTION: This snippet demonstrates how to configure n8n's logging behavior using environment variables. It covers setting the log level to 'debug', directing output to both console and a file, specifying the log file location, and defining maximum file size and count for log rotation. These variables control the verbosity and storage of n8n logs.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/hosting/logging-monitoring/logging.md#_snippet_0

LANGUAGE: bash
CODE:
```
# Set the logging level to 'debug'
export N8N_LOG_LEVEL=debug

# Set log output to both console and a log file
export N8N_LOG_OUTPUT=console,file

# Set a save location for the log file
export N8N_LOG_FILE_LOCATION=/home/jim/n8n/logs/n8n.log

# Set a 50 MB maximum size for each log file
export N8N_LOG_FILE_MAXSIZE=50

# Set 60 as the maximum number of log files to be kept
export N8N_LOG_FILE_MAXCOUNT=60
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

TITLE: Outline Structure for a Programmatic-style n8n Node (JavaScript)
DESCRIPTION: This snippet illustrates the fundamental class structure for a programmatic-style n8n node. It imports `IExecuteFunctions` from `n8n-core` and `INodeExecutionData`, `INodeType`, `INodeTypeDescription` from `n8n-workflow`. In addition to the `description` object, it includes an `async execute()` method, which is responsible for processing incoming data and parameters and returning the results.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/creating-nodes/build/reference/node-base-files/structure.md#_snippet_1

LANGUAGE: JavaScript
CODE:
```
import { IExecuteFunctions } from 'n8n-core';
import { INodeExecutionData, INodeType, INodeTypeDescription } from 'n8n-workflow';

export class ExampleNode implements INodeType {
	description: INodeTypeDescription = {
    // Basic node details here
    properties: [
      // Resources and operations here
    ]
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    // Process data and return
  }
};
```

----------------------------------------

TITLE: Creating a Customer Message using n8n Expressions
DESCRIPTION: This expression dynamically generates a personalized message for each customer by embedding their name and description. It relies on data previously processed and made available in the workflow's JSON context, specifically the 'customer_name' and 'customer_description' fields from an upstream node like 'Edit Fields1'. The output is a formatted string ready for use in a messaging node.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/try-it-out/quickstart.md#_snippet_0

LANGUAGE: n8n Expression
CODE:
```
Hi {{ $json.customer_name }}. Your description is: {{ $json.customer_description }}
```

----------------------------------------

TITLE: Referencing and Adding Data to Items in n8n Code Node (JavaScript)
DESCRIPTION: This snippet shows how to access and modify data from previous nodes within an n8n Code node. It retrieves all incoming items, adds a new property `workEmail` to the first item's JSON, and assigns it the value of the existing `email.work` property.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/courses/level-two/chapter-1.md#_snippet_4

LANGUAGE: JavaScript
CODE:
```
let items = $input.all();
items[0].json.workEmail = items[0].json.email['work'];
return items;
```

----------------------------------------

TITLE: Constructing Discord Message with n8n Expression
DESCRIPTION: This n8n expression dynamically generates the message content sent to a Discord channel. It retrieves 'totalBooked' and 'bookedSum' values from the workflow's current JSON data and extracts a unique ID from the 'HTTP Request' node's header parameters. This allows for automated, data-rich notifications.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/courses/level-one/chapter-5/chapter-5.6.md#_snippet_0

LANGUAGE: n8n Expression
CODE:
```
This week we've {{$json["totalBooked"]}} booked orders with a total value of {{$json["bookedSum"]}}. My Unique ID: {{ $('HTTP Request').params["headerParameters"]["parameters"][0]["value"] }}
```

----------------------------------------

TITLE: Updating Docker Container Permissions for n8n v1.0 (Bash)
DESCRIPTION: This command updates file permissions within an n8n Docker container, changing ownership from `root` to `node:node` for the `~/.n8n` directory. This is necessary for Docker-based deployments of n8n v1.0, as the n8n process now runs as the `node` user for increased security. Execute this command on the Docker host if permission errors appear in container logs after updating to ensure proper operation.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/1-0-migration-checklist.md#_snippet_0

LANGUAGE: bash
CODE:
```
docker run --rm -it --user root -v ~/.n8n:/home/node/.n8n --entrypoint chown n8nio/base:16 -R node:node /home/node/.n8n
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

TITLE: Referencing Input Parameters in n8n JSON Expression
DESCRIPTION: This JSON object demonstrates how to reference input parameters using an n8n expression. The `{{ $input.params }}` syntax attempts to access the parameters of the incoming data, which will cause an error if the node is tested without connected input.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/code/cookbook/expressions/common-issues.md#_snippet_1

LANGUAGE: JavaScript
CODE:
```
{
  "my_field_1": {{ $input.params }}
}
```

----------------------------------------

TITLE: Parameterized SELECT Query for Postgres - SQL
DESCRIPTION: This SQL query demonstrates how to select data from a table using parameterized values. The `$1:name` syntax is used for a table name parameter, and `$2` is used for a column value parameter, preventing SQL injection by sanitizing inputs.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/app-nodes/n8n-nodes-base.postgres/index.md#_snippet_1

LANGUAGE: SQL
CODE:
```
SELECT * FROM $1:name WHERE email = $2;
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

TITLE: Scheduling Custom Hourly Range with n8n Schedule Trigger (Cron)
DESCRIPTION: This Cron expression schedules a workflow to run every hour between 9:00 AM and 5:00 PM daily. The `9-17` in the hour field defines the inclusive range for hourly execution.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/core-nodes/n8n-nodes-base.scheduletrigger/index.md#_snippet_8

LANGUAGE: Cron
CODE:
```
0 9-17 * * *
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

TITLE: Increasing V8 Old Space Memory for n8n
DESCRIPTION: To prevent 'JavaScript heap out of memory' errors in self-hosted n8n, this snippet shows how to allocate more memory to the V8 engine's 'old memory' section. This is crucial for workflows processing large or long-lived data. The `SIZE` placeholder should be replaced with the desired memory in megabytes (e.g., 4096 for 4GB).
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/hosting/scaling/memory-errors.md#_snippet_0

LANGUAGE: Shell
CODE:
```
NODE_OPTIONS="--max-old-space-size=SIZE" n8n start
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

TITLE: Defining Backend External Hooks in n8n (JavaScript)
DESCRIPTION: This JavaScript code defines the structure for an n8n backend hook file, exporting an object where keys represent hook categories (e.g., 'frontend', 'workflow') and values are objects containing specific hook names. Each hook name maps to an array of asynchronous functions that are executed when the corresponding event occurs. The example demonstrates modifying OAuth callback URLs and enforcing a limit on active workflows by querying the database.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/embed/configuration.md#_snippet_4

LANGUAGE: JavaScript
CODE:
```
module.exports = {
    "frontend": {
        "settings": [
            async function (settings) {
                settings.oauthCallbackUrls.oauth1 = 'https://n8n.example.com/oauth1/callback';
                settings.oauthCallbackUrls.oauth2 = 'https://n8n.example.com/oauth2/callback';
            }
        ]
    },
    "workflow": {
        "activate": [
            async function (workflowData) {
                const activeWorkflows = await this.dbCollections.Workflow.count({ active: true });

                if (activeWorkflows > 1) {
                    throw new Error(
                        'Active workflow limit reached.'
                    );
                }
            }
        ]
    }
}
```

----------------------------------------

TITLE: Accessing Order Status with n8n Expression
DESCRIPTION: This expression is used within the n8n If node to dynamically retrieve the `orderStatus` value from the incoming JSON data, typically from a preceding HTTP Request node. It allows the If node to evaluate the status and route the workflow accordingly.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/courses/level-one/chapter-5/chapter-5.3.md#_snippet_0

LANGUAGE: n8n Expression
CODE:
```
{{ $json.orderStatus }}
```

----------------------------------------

TITLE: Installing Local n8n Node into n8n Instance (Shell)
DESCRIPTION: This command installs your locally linked custom node into your n8n installation. It must be run from the n8n nodes directory (e.g., `~/.n8n/custom/`) and uses the package name defined in your node's `package.json` to create a symlink to your local node.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/_snippets/integrations/creating-nodes/testing.md#_snippet_2

LANGUAGE: shell
CODE:
```
npm link <node-package-name>
```

----------------------------------------

TITLE: Extracting Name from Linked Item in Previous Node Output (JavaScript)
DESCRIPTION: This expression demonstrates how to access a specific property, 'name', from a linked item originating from a previous node's output. It navigates through the linked item's JSON data to retrieve the desired value.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/data/data-mapping/data-mapping-expressions.md#_snippet_2

LANGUAGE: JavaScript
CODE:
```
{{$("<node-name>").item.json.name}}
```

----------------------------------------

TITLE: Setting Environment Variables via Docker Run Command
DESCRIPTION: This Docker command demonstrates how to set environment variables using the `-e` flag when running an n8n container. It includes port mapping and disabling templates as an example, ensuring the variable is applied to the container instance.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/hosting/configuration/configuration-methods.md#_snippet_1

LANGUAGE: docker
CODE:
```
docker run -it --rm \
 --name n8n \
 -p 5678:5678 \
 -e N8N_TEMPLATES_ENABLED="false" \
 docker.n8n.io/n8nio/n8n
```

----------------------------------------

TITLE: Enabling n8n Execution Data Pruning (Docker)
DESCRIPTION: This snippet demonstrates how to enable and configure automatic data pruning for n8n when running via Docker. It sets environment variables within the `docker run` command to activate pruning and define the maximum age of execution data.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/hosting/scaling/execution-data.md#_snippet_4

LANGUAGE: sh
CODE:
```
# Docker
docker run -it --rm \
 --name n8n \
 -p 5678:5678 \
 -e EXECUTIONS_DATA_PRUNE=true \
 -e EXECUTIONS_DATA_MAX_AGE=168 \
 docker.n8n.io/n8nio/n8n
```

----------------------------------------

TITLE: Scheduling Every 5 Minutes with n8n Schedule Trigger (Cron)
DESCRIPTION: This Cron expression schedules a workflow to run every 5 minutes. The `*/5` in the minute field indicates that the workflow will execute every fifth minute of the hour.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/core-nodes/n8n-nodes-base.scheduletrigger/index.md#_snippet_1

LANGUAGE: Cron
CODE:
```
*/5 * * * *
```

----------------------------------------

TITLE: Constructing Postbin Content Expression in n8n (JavaScript)
DESCRIPTION: This expression is used within the n8n Postbin node to dynamically generate the content sent to Postbin. It combines a static string with the value of the 'classType' property from the incoming JSON data, retrieved using the '{{$json["classType"]}}' syntax. This allows for customized messages based on the solar flare classification.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/try-it-out/tutorial-first-workflow.md#_snippet_1

LANGUAGE: JavaScript
CODE:
```
There was a solar flare of class {{$json["classType"]}}
```

----------------------------------------

TITLE: Configuring `loadOptions` for Dynamic Data Loading in JavaScript
DESCRIPTION: This snippet demonstrates how to use the `loadOptions` object within the `methods` property to dynamically fetch user-specific settings from a service. It defines the `routing` for the API request (URL, method) and specifies `output` processing steps like extracting a `rootProperty`, setting key-value pairs using `setKeyValue`, and sorting the results alphabetically by `name` for GUI rendering.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/creating-nodes/build/reference/node-base-files/declarative-style-parameters.md#_snippet_0

LANGUAGE: JavaScript
CODE:
```
methods : {
	loadOptions: {
		routing: {
			request: {
				url: '/webhook/example-option-parameters',
				method: 'GET',
			},
			output: {
				postReceive: [
					{
						// When the returned data is nested under another property
						// Specify that property key
						type: 'rootProperty',
						properties: {
							property: 'responseData',
						},
					},
					{
						type: 'setKeyValue',
						properties: {
							name: '={{$responseItem.key}} ({{$responseItem.value}})',
							value: '={{$responseItem.value}}',
						},
					},
					{
						// If incoming data is an array of objects, sort alphabetically by key
						type: 'sort',
						properties: {
							key: 'name',
						},
					},
				],
			},
		},
	}
},
```