TITLE: Setting Default Form Field Values with Query Parameters - URL
DESCRIPTION: This URL demonstrates how to pre-populate form fields ('email' and 'name') using query parameters. Special characters like '@' and spaces are percent-encoded ('%40' and '%20' respectively) to ensure proper parsing by the n8n Form Trigger. This method is applicable for setting initial values on any page of a multi-step form and is only available in production mode.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/core-nodes/n8n-nodes-base.form.md#_snippet_0

LANGUAGE: Text
CODE:
```
https://my-account.n8n.cloud/form/my-form?email=jane.doe%40example.com&name=Jane%20Doe
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

TITLE: Transforming Data to Comma-Separated Usernames in n8n Code Node - JavaScript
DESCRIPTION: This JavaScript snippet transforms an array of input items into a single comma-separated string of usernames. Each username is enclosed in double quotation marks. It maps over the input items to extract and format usernames, then joins them into a single string, returning it as a JSON object.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/code/ai-code.md#_snippet_1

LANGUAGE: JavaScript
CODE:
```
const items = $input.all();
const usernames = items.map((item) => `"${item.json.username}"`);
const result = usernames.join(", ");
return [{ json: { usernames: result } }];
```

----------------------------------------

TITLE: Implementing `loadOptions` to Fetch Gmail Labels in JavaScript
DESCRIPTION: This snippet demonstrates how to implement the `loadOptions` method within a programmatic-style n8n node. It shows how to query the Gmail API to retrieve a user's email labels, format them as `INodePropertyOptions`, and return them for display in the n8n GUI. This allows users to select dynamic options based on their service data.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/creating-nodes/build/reference/node-base-files/programmatic-style-parameters.md#_snippet_0

LANGUAGE: JavaScript
CODE:
```
	methods = {
		loadOptions: {
			// Get all the labels and display them
			async getLabels(
				this: ILoadOptionsFunctions,
			): Promise<INodePropertyOptions[]> {
				const returnData: INodePropertyOptions[] = [];
				const labels = await googleApiRequestAllItems.call(
					this,
					'labels',
					'GET',
					'/gmail/v1/users/me/labels',
				);
				for (const label of labels) {
					const labelName = label.name;
					const labelId = label.id;
					returnData.push({
						name: labelName,
						value: labelId,
					});
				}
				return returnData;
			},
		},
	};
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

----------------------------------------

TITLE: Checking for Empty Variable with Ternary Operator in n8n
DESCRIPTION: This snippet demonstrates using the ternary operator within an n8n expression to check if a variable from a previous node (`$json["variable_name"]`) is present. If the variable has a value, it is returned; otherwise, the string 'not found' is returned as a fallback. This is useful for handling missing or null data gracefully.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/code/cookbook/expressions/check-incoming-data.md#_snippet_0

LANGUAGE: JavaScript
CODE:
```
{{$json["variable_name"]? $json["variable_name"] :"not found"}}
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

TITLE: Setting Resource Requests and Limits for Kubernetes Pods (YAML)
DESCRIPTION: This YAML snippet specifies the memory resource requests and limits for application containers within Kubernetes deployments. It sets a minimum memory request of 250Mi and a maximum limit of 500Mi, allowing Kubernetes to manage CPU resources automatically. These values can be adjusted based on specific application needs.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/hosting/installation/server-setups/google-cloud.md#_snippet_4

LANGUAGE: yaml
CODE:
```
resources:
  requests:
    memory: "250Mi"
  limits:
    memory: "500Mi"
```

----------------------------------------

TITLE: Handling 401 Unauthorized Error in n8n Gmail Node
DESCRIPTION: This snippet displays the full text of a "401 Unauthorized" error, which indicates issues with the credential's scopes or permissions when using the n8n Gmail node. It typically means the client is not authorized to retrieve access tokens or for the requested scopes. The solution involves enabling the Gmail API for OAuth2 credentials or enabling domain-wide delegation and adding the Gmail API for Service Account credentials.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/app-nodes/n8n-nodes-base.gmail/common-issues.md#_snippet_0

LANGUAGE: JSON
CODE:
```
401 - {"error":"unauthorized_client","error_description":"Client is unauthorized to retrieve access tokens using this method, or client not authorized for any of the scopes requested."}
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

TITLE: Outline Structure for a Declarative-style n8n Node (JavaScript)
DESCRIPTION: This snippet provides the basic class structure for a declarative-style n8n node. It imports necessary interfaces like `INodeType` and `INodeTypeDescription` from `n8n-workflow` and defines the `description` object, which contains the node's basic details and properties for resources and operations. Declarative nodes handle data processing via the `routing` key in `properties`.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/creating-nodes/build/reference/node-base-files/structure.md#_snippet_0

LANGUAGE: JavaScript
CODE:
```
import { INodeType, INodeTypeDescription } from 'n8n-workflow';

export class ExampleNode implements INodeType {
	description: INodeTypeDescription = {
		// Basic node details here
		properties: [
			// Resources and operations here
		]
	};
}
```

----------------------------------------

TITLE: Disabling Webhook Processing on Main Process
DESCRIPTION: This bash command sets an environment variable to disable production webhook processing on the main n8n instance. This ensures that all webhook executions are handled exclusively by dedicated webhook processors, preventing the main process from being overloaded and improving UI performance.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/hosting/scaling/queue-mode.md#_snippet_8

LANGUAGE: bash
CODE:
```
export N8N_DISABLE_PRODUCTION_MAIN_PROCESS=true
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

TITLE: Activating Credential Overwrite Endpoint (Shell)
DESCRIPTION: This snippet demonstrates how to activate a custom REST endpoint for credential overwrites by setting the `CREDENTIALS_OVERWRITE_ENDPOINT` environment variable. This endpoint will be used to load sensitive credential data into n8n.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/embed/configuration.md#_snippet_0

LANGUAGE: sh
CODE:
```
export CREDENTIALS_OVERWRITE_ENDPOINT=send-credentials
```

----------------------------------------

TITLE: Getting Execution Resume URL in JavaScript
DESCRIPTION: This method provides the webhook URL necessary to resume a workflow that is currently paused at a Wait node. It enables external systems to trigger workflow continuation.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/code/builtin/n8n-metadata.md#_snippet_4

LANGUAGE: JavaScript
CODE:
```
$execution.resumeUrl
```

----------------------------------------

TITLE: Managing Global Workflow Static Data in Python
DESCRIPTION: This snippet illustrates how to retrieve, access, update, and delete global static data within an n8n workflow using Python. Global static data is shared across all nodes and is automatically persisted if modified upon successful workflow execution. It's ideal for storing small, persistent values such as timestamps.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/code/cookbook/builtin/get-workflow-static-data.md#_snippet_1

LANGUAGE: Python
CODE:
```
# Get the global workflow static data
workflowStaticData = _getWorkflowStaticData('global')

# Access its data
lastExecution = workflowStaticData.lastExecution

# Update its data
workflowStaticData.lastExecution = new Date().getTime()

# Delete data
delete workflowStaticData.lastExecution
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

TITLE: Setting pairedItem for n8n Programmatic Nodes (TypeScript)
DESCRIPTION: This snippet demonstrates how to manually set the `pairedItem` property on new items returned by an n8n programmatic node. It shows two methods: using the `pairedItem` from an incoming item or setting the item index manually. The `input` property is optional and used when a node combines multiple inputs. This ensures proper data flow and prevents expressions in subsequent nodes from breaking.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/_snippets/data/data-mapping/item-linking-node-creators.md#_snippet_0

LANGUAGE: typescript
CODE:
```
// Use the pairedItem information of the incoming item
newItem = {
	"json": { . . . },
	"pairedItem": {
		"item": item.pairedItem,
		// Optional: choose the input to use
		// Set this if your node combines multiple inputs
		"input": 0
};

// Or set the index manually
newItem = {
		"json": { . . . }
		"pairedItem": {
			"item": i,
			// Optional: choose the input to use
			// Set this if your node combines multiple inputs
			"input": 0
		},
};
```

----------------------------------------

TITLE: Installing Docker and Docker Compose on Ubuntu
DESCRIPTION: This snippet provides a Bash script to remove old Docker installations, install prerequisites, download the Docker GPG key, configure the Docker APT repository, and finally install docker-ce, docker-ce-cli, containerd.io, docker-buildx-plugin, and docker-compose-plugin on Ubuntu.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/hosting/installation/server-setups/docker-compose.md#_snippet_0

LANGUAGE: bash
CODE:
```
# Remove incompatible or out of date Docker implementations if they exist
for pkg in docker.io docker-doc docker-compose docker-compose-v2 podman-docker containerd runc; do sudo apt-get remove $pkg; done
# Install prereq packages
sudo apt-get update
sudo apt-get install ca-certificates curl
# Download the repo signing key
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc
# Configure the repository
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Update and install Docker and Docker Compose
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
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

TITLE: Error Data Structure for n8n Trigger Node Errors (JSON)
DESCRIPTION: This JSON object illustrates the data structure received by the n8n Error Trigger when an error originates specifically from the trigger node of the main workflow. It provides less `execution` information and more detailed `trigger` context, including error name, cause, timestamp, and node details.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/_snippets/integrations/builtin/core-nodes/error-trigger/error-data.md#_snippet_1

LANGUAGE: json
CODE:
```
{
  "trigger": {
    "error": {
      "context": {},
      "name": "WorkflowActivationError",
      "cause": {
        "message": "",
        "stack": ""
      },
      "timestamp": 1654609328787,
      "message": "",
      "node": {
        ". . . "
      }
    },
    "mode": "trigger"
  },
  "workflow": {
    "id": "",
    "name": ""
  }
}
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

TITLE: Starting Docker Compose Services (Bash)
DESCRIPTION: This command initiates the Docker Compose services defined in the `compose.yaml` file. The `-d` flag runs the containers in detached mode, allowing them to run in the background without blocking the terminal.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/hosting/installation/server-setups/docker-compose.md#_snippet_9

LANGUAGE: bash
CODE:
```
sudo docker compose up -d
```

----------------------------------------

TITLE: Granting Restricted Access to AWS Secrets Manager for n8n (JSON)
DESCRIPTION: This IAM policy provides restricted access to AWS Secrets Manager, allowing n8n to list and batch retrieve all secrets, but limits the `secretsmanager:GetSecretValue` and `secretsmanager:DescribeSecret` permissions to specific Amazon Resource Names (ARNs). In this example, access is granted only to secrets whose ARNs start with `arn:aws:secretsmanager:us-west-2:123456789000:secret:n8n*`, ensuring n8n can only retrieve values for designated secrets.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/external-secrets.md#_snippet_1

LANGUAGE: JSON
CODE:
```
{
	"Version": "2012-10-17",
	"Statement": [
		{
			"Sid": "ListingSecrets",
			"Effect": "Allow",
			"Action": [
				"secretsmanager:ListSecrets",
				"secretsmanager:BatchGetSecretValue"
			],
			"Resource": "*"
		},
		{
			"Sid": "RetrievingSecrets",
			"Effect": "Allow",
			"Action": [
				"secretsmanager:GetSecretValue",
				"secretsmanager:DescribeSecret"
			],
			"Resource": [
				"arn:aws:secretsmanager:us-west-2:123456789000:secret:n8n*"
			]
		}
	]
}
```

----------------------------------------

TITLE: Creating an Array of Contact Objects in n8n Code Node (JavaScript)
DESCRIPTION: This snippet demonstrates how to initialize an array of contact objects (`myContacts`) within an n8n Code node. Each object contains a `name` and a nested `email` object with `personal` and `work` email addresses, showcasing how to structure complex JSON data for output.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/courses/level-two/chapter-1.md#_snippet_3

LANGUAGE: JavaScript
CODE:
```
var myContacts = [
	{
		json: {
			name: 'Alice',
			email: {
				personal: 'alice@home.com',
				work: 'alice@wonderland.org'
			},
		}
	},
	{
		json: {
			name: 'Bob',
			email: {
				personal: 'bob@mail.com',
				work: 'contact@thebuilder.com'
				},
		}
	},
];

return myContacts;
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

TITLE: Aggregating Multiple Items into a Single Item in n8n Code Node (JavaScript)
DESCRIPTION: This JavaScript snippet illustrates how to consolidate multiple incoming n8n items into a single output item. It collects the `json` payload of all input items into an array and assigns it to a new `data_object` property within a single output item.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/courses/level-two/chapter-1.md#_snippet_6

LANGUAGE: JavaScript
CODE:
```
return [
	{
    	json: {
    		data_object: $input.all().map(item => item.json)
    	}
    }
  ];
```

----------------------------------------

TITLE: Perform JMESPath Search with _jmespath() in Python
DESCRIPTION: The `_jmespath()` method provides n8n users with the capability to perform JMESPath searches on JSON objects when writing Python code. This method is accessible within the n8n Code node, facilitating advanced data manipulation and querying.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/code/builtin/jmespath.md#_snippet_1

LANGUAGE: Python
CODE:
```
_jmespath()
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

TITLE: Applying All Kubernetes Manifests (Shell)
DESCRIPTION: This shell command uses `kubectl apply -f .` to send all Kubernetes manifest files in the current directory to the cluster. This command is used to create or update the defined resources, such as deployments, services, and volumes, within the Kubernetes environment.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/hosting/installation/server-setups/google-cloud.md#_snippet_5

LANGUAGE: shell
CODE:
```
kubectl apply -f .
```

----------------------------------------

TITLE: Automating N8N Source Control Pull with cURL
DESCRIPTION: This cURL command automates the process of pulling source control changes into an n8n instance. It sends a POST request to the /api/v1/source-control/pull endpoint, typically after a Git merge, to synchronize workflows. The force: true data parameter ensures that the pull operation proceeds even if there are local uncommitted changes, making it suitable for CI/CD environments.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/source-control-environments/using/copy-work.md#_snippet_0

LANGUAGE: curl
CODE:
```
curl --request POST \
	--location '<YOUR-INSTANCE-URL>/api/v1/source-control/pull' \
	--header 'Content-Type: application/json' \
	--header 'X-N8N-API-KEY: <YOUR-API-KEY>' \
	--data '{"force": true}'
```