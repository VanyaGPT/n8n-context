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

TITLE: HTTP Request Node: Authentication Parameter
DESCRIPTION: Configures authentication for the HTTP request. n8n recommends 'Predefined Credential Type' for ease of use with supported integrations. 'Generic credentials' are available for unsupported integrations, requiring manual configuration of authentication methods like Basic, Custom, Digest, Header, OAuth1, OAuth2, or Query auth.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/index.md#_snippet_3

LANGUAGE: APIDOC
CODE:
```
Authentication:
  Description: Configure authentication for the HTTP request.
  Options:
    - Predefined Credential Type:
        Description: For integrations supported by n8n (built-in and community nodes).
        Usage: Recommended for custom operations without extra setup.
    - Generic credentials:
        Description: For integrations not supported by n8n; requires manual configuration.
        Available Methods:
          - Basic auth
          - Custom auth
          - Digest auth
          - Header auth
          - OAuth1 API
          - OAuth2 API
          - Query auth
```

----------------------------------------

TITLE: Installing Node Project Dependencies (Shell)
DESCRIPTION: This command installs all required project dependencies listed in the `package.json` file. It is a standard step after cloning a new JavaScript/TypeScript project to ensure all necessary libraries and tools are available for development.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/creating-nodes/build/programmatic-style-node.md#_snippet_1

LANGUAGE: shell
CODE:
```
npm i
```

----------------------------------------

TITLE: HTTP Node Pagination Configuration
DESCRIPTION: Defines how the HTTP Request node handles large datasets by splitting them into multiple pages. Includes modes for parameter updates and next URL extraction.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/index.md#_snippet_17

LANGUAGE: APIDOC
CODE:
```
Pagination Settings:
  Pagination Mode:
    Description: Strategy for fetching paginated results.
    Options:
      - Off: Disable pagination.
      - Update a Parameter in Each Request: Dynamically set parameters for each request.
      - Response Contains Next URL: Use when API response includes the URL of the next page. Requires an expression for 'Next URL'.
```

----------------------------------------

TITLE: Excluding specific n8n nodes using NODES_EXCLUDE
DESCRIPTION: This configuration snippet demonstrates how to use the `NODES_EXCLUDE` environment variable to prevent n8n users from accessing certain nodes. It specifies an array of node names, such as 'n8n-nodes-base.executeCommand' and 'n8n-nodes-base.readWriteFile', which will then be blocked across the n8n instance.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/hosting/securing/blocking-nodes.md#_snippet_0

LANGUAGE: Configuration
CODE:
```
NODES_EXCLUDE: \
```

LANGUAGE: undefined
CODE:
```
undefined
```

LANGUAGE: undefined
CODE:
```
undefined
```

LANGUAGE: undefined
CODE:
```
undefined
```

----------------------------------------

TITLE: Dynamically Populating SQL IN Clause with n8n Parameters
DESCRIPTION: This advanced SQL snippet, combined with an n8n expression, demonstrates how to dynamically generate indexed placeholders (`$1`, `$2`, etc.) for a Postgres `IN` clause. It allows n8n to automatically create prepared statement placeholders based on the size of an input array, ensuring safe and flexible queries.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/app-nodes/n8n-nodes-base.postgres/common-issues.md#_snippet_2

LANGUAGE: SQL
CODE:
```
SELECT color, shirt_size FROM shirts WHERE shirt_size IN ({{ $json.input_shirt_sizes.map((i, pos) => "$" + (pos+1)).join(', ') }});
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

TITLE: Resolving Undefined Returns in n8n Code Node (JavaScript)
DESCRIPTION: This error occurs when the Code node returns nothing or an unexpected 'undefined' result, indicating that the output does not conform to n8n's expected data structure. The provided snippet shows the correct format for returning data, an array of objects with a 'json' key pointing to an object. Users must ensure that all referenced data exists and matches the expected structure during execution to prevent this error.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/core-nodes/n8n-nodes-base.code/common-issues.md#_snippet_2

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

TITLE: Set n8n Task Runner Environment Variables
DESCRIPTION: Specifies the environment variables required to configure the n8n task runner's behavior, such as authentication, maximum concurrent tasks, task broker URI, automatic shutdown timeout, Node.js memory limits, and the default timezone.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/hosting/configuration/task-runners.md#_snippet_2

LANGUAGE: Configuration
CODE:
```
N8N_RUNNERS_AUTH_TOKEN=<random secure shared secret>
N8N_RUNNERS_MAX_CONCURRENCY=5
N8N_RUNNERS_TASK_BROKER_URI=localhost:5679
N8N_RUNNERS_AUTO_SHUTDOWN_TIMEOUT=15
NODE_OPTIONS=--max-old-space-size=<limit>
GENERIC_TIMEZONE=<same default timezone as configured for the n8n instance>
```

----------------------------------------

TITLE: Defining n8n Pod Resource Requests and Limits (YAML)
DESCRIPTION: This YAML snippet from the `n8n-deployment.yaml` manifest specifies the resource requirements for the n8n application containers within Kubernetes. It sets a minimum memory request of 250MiB and a maximum memory limit of 500MiB, allowing Kubernetes to manage CPU allocation automatically. These values can be adjusted based on specific performance needs.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/hosting/installation/server-setups/aws.md#_snippet_5

LANGUAGE: yaml
CODE:
```
…
resources:
  requests:
    memory: "250Mi"
  limits:
    memory: "500Mi"
…    
```

----------------------------------------

TITLE: Extracting First Names with JMESPath List Projection
DESCRIPTION: This snippet demonstrates how to use JMESPath list projections to extract a list of all 'first' names from the 'people' array within the input JSON. It shows implementation in both n8n expressions and Code nodes for JavaScript and Python, returning an array of strings.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/code/cookbook/jmespath.md#_snippet_4

LANGUAGE: JavaScript
CODE:
```
{{$jmespath($json.body.people, "[*].first" )}}
// Returns ["James", "Jacob", "Jayden"]
```

LANGUAGE: JavaScript
CODE:
```
let firstNames = $jmespath($json.body.people, "[*].first" )
return {firstNames};
/* Returns:
[
	{
		"firstNames": [
			"James",
			"Jacob",
			"Jayden"
		]
	}
]
*/
```

LANGUAGE: Python
CODE:
```
firstNames = _jmespath(_json.body.people, "[*].first" )
return {"firstNames":firstNames}
"""
Returns:
[
 	{
		"firstNames": [
			"James",
			"Jacob",
			"Jayden"
		]
	}
]
"""
```

----------------------------------------

TITLE: Finding Data Across Datasets in n8n Code Node - JavaScript
DESCRIPTION: This JavaScript snippet demonstrates how to find a specific Notion user's ID based on a Slack user's email. It accesses data from two different nodes ('Mock Slack' and the current input) and handles cases where the email property might be null. The output is an array containing an object with the found 'notionId' or an empty array if not found.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/code/ai-code.md#_snippet_0

LANGUAGE: JavaScript
CODE:
```
const slackUser = $("Mock Slack").all()[0];
const notionUsers = $input.all();
const slackUserEmail = slackUser.json.email;

const notionUser = notionUsers.find(
  (user) => user.json.person && user.json.person.email === slackUserEmail
);

return notionUser ? [{ json: { notionId: notionUser.json.id } }] : [];
```

----------------------------------------

TITLE: Defining Generic API Credentials in n8n (TypeScript)
DESCRIPTION: This snippet outlines the basic structure for defining API credentials in n8n. It imports necessary interfaces, defines a class 'ExampleNode' implementing 'ICredentialType', and sets up properties like 'name', 'displayName', 'documentationUrl', 'properties' (for UI input), 'authenticate' (for request injection), and 'test' (for credential validation). It demonstrates how to configure an API key for query string authentication.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/creating-nodes/build/reference/credentials-files.md#_snippet_0

LANGUAGE: typescript
CODE:
```
import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class ExampleNode implements ICredentialType {
	name = 'exampleNodeApi';
	displayName = 'Example Node API';
	documentationUrl = '';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			default: '',
		},
	];
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
    		// Can be body, header, qs or auth
			qs: {
        		// Use the value from `apiKey` above
				'api_key': '={{$credentials.apiKey}}'
			}

		},
	};
	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials?.domain}}',
			url: '/bearer',
		},
	};
}
```

----------------------------------------

TITLE: Passing Data to Embedded Chat Trigger Node - JavaScript
DESCRIPTION: This snippet demonstrates how to pass custom metadata from a website to an embedded n8n Chat Trigger node using the `createChat` function. The `metadata` field allows arbitrary data, such as a user ID, to be included with the chat session, which can then be processed by downstream n8n nodes. This is useful for associating external context with chat interactions.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/core-nodes/n8n-nodes-langchain.chattrigger/common-issues.md#_snippet_0

LANGUAGE: javascript
CODE:
```
createChat({
	webhookUrl: 'YOUR_PRODUCTION_WEBHOOK_URL',
	metadata: {
		'YOUR_KEY': 'YOUR_DATA'
	}
});
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

TITLE: Updating Docker Container Permissions for n8n v1.0 (Bash)
DESCRIPTION: This command updates file permissions within an n8n Docker container, changing ownership from `root` to `node:node` for the `~/.n8n` directory. This is necessary for Docker-based deployments of n8n v1.0, as the n8n process now runs as the `node` user for increased security. Execute this command on the Docker host if permission errors appear in container logs after updating to ensure proper operation.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/1-0-migration-checklist.md#_snippet_0

LANGUAGE: bash
CODE:
```
docker run --rm -it --user root -v ~/.n8n:/home/node/.n8n --entrypoint chown n8nio/base:16 -R node:node /home/node/.n8n
```

----------------------------------------

TITLE: General Syntax for Data Transformation Functions (JavaScript)
DESCRIPTION: This snippet illustrates the general syntax for calling data transformation functions within n8n expressions. These functions are invoked on a `dataItem` using dot notation, followed by the function name and parentheses, allowing for various data manipulations.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/code/builtin/data-transformation-functions/index.md#_snippet_0

LANGUAGE: JavaScript
CODE:
```
{{ dataItem.function() }}
```

----------------------------------------

TITLE: Setting n8n Timezone in Docker
DESCRIPTION: This command starts n8n in a Docker container and configures its timezone. It sets both the GENERIC_TIMEZONE for n8n's internal scheduling and the system-wide TZ environment variable to 'Europe/Berlin', ensuring consistent timezone behavior.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/hosting/installation/docker.md#_snippet_2

LANGUAGE: sh
CODE:
```
docker volume create n8n_data

docker run -it --rm \
 --name n8n \
 -p 5678:5678 \
 -e GENERIC_TIMEZONE="Europe/Berlin" \
 -e TZ="Europe/Berlin" \
 -v n8n_data:/home/node/.n8n \
 docker.n8n.io/n8nio/n8n
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

TITLE: Exposing Local Server with ngrok (Shell)
DESCRIPTION: This shell command initiates ngrok to create a secure tunnel from the internet to a local server running on port 5678. It's used to expose a local development environment to the public internet, which is necessary for services like GetResponse that do not accept localhost as a redirect URL for OAuth2.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/credentials/getresponse.md#_snippet_0

LANGUAGE: sh
CODE:
```
ngrok http 5678
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

TITLE: Checking for Empty Variable with Ternary Operator in n8n
DESCRIPTION: This snippet demonstrates using the ternary operator within an n8n expression to check if a variable from a previous node (`$json["variable_name"]`) is present. If the variable has a value, it is returned; otherwise, the string 'not found' is returned as a fallback. This is useful for handling missing or null data gracefully.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/code/cookbook/expressions/check-incoming-data.md#_snippet_0

LANGUAGE: JavaScript
CODE:
```
{{$json["variable_name"]? $json["variable_name"] :"not found"}}
```

----------------------------------------

TITLE: Populating a Field with AI-Generated Name (Simplified) - JavaScript
DESCRIPTION: Shows a simplified usage of the `$fromAI()` expression when optional parameters are not required. It dynamically populates a field with a name using only the field key.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/advanced-ai/examples/using-the-fromai-function.md#_snippet_2

LANGUAGE: javascript
CODE:
```
$fromAI("name")
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

TITLE: Building and Linking Custom n8n Node Locally (Shell)
DESCRIPTION: These commands are executed within your custom node's directory. `npm run build` compiles your node's source code, and `npm link` creates a symlink, making your node package available for local installation into other projects, such as your n8n instance.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/_snippets/integrations/creating-nodes/testing.md#_snippet_1

LANGUAGE: shell
CODE:
```
npm run build
npm link
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

TITLE: Calling $fromAI() Function for Dynamic Parameter Population - JavaScript
DESCRIPTION: This snippet illustrates the basic syntax for calling the `$fromAI()` function within an n8n expression. It uses 'email' as a 'key' parameter, which acts as a hint for the AI model to identify and populate an email-related value dynamically. This function is specifically designed for app node tools integrated with the Tools AI agent to intelligently fill in required parameters.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/advanced-ai/examples/using-the-fromai-function.md#_snippet_0

LANGUAGE: JavaScript
CODE:
```
{{ $fromAI('email') }}
```

----------------------------------------

TITLE: Managing Global Workflow Static Data in JavaScript
DESCRIPTION: This snippet demonstrates how to retrieve, access, update, and delete global static data within an n8n workflow using JavaScript. Global static data is accessible by all nodes in the workflow and is automatically saved if changed upon successful workflow execution. It's suitable for small, persistent data like timestamps.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/code/cookbook/builtin/get-workflow-static-data.md#_snippet_0

LANGUAGE: JavaScript
CODE:
```
// Get the global workflow static data
const workflowStaticData = $getWorkflowStaticData('global');

// Access its data
const lastExecution = workflowStaticData.lastExecution;

// Update its data
workflowStaticData.lastExecution = new Date().getTime();

// Delete data
delete workflowStaticData.lastExecution;
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

TITLE: Mounting n8n Persistent Volume Claim (YAML)
DESCRIPTION: This YAML snippet from the `n8n-deployment.yaml` manifest demonstrates how a Persistent Volume Claim (PVC) named `n8n-claim0` is mounted into the n8n deployment. This ensures that files uploaded via n8n and manual encryption keys are persisted across pod restarts, enhancing data durability.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/hosting/installation/server-setups/aws.md#_snippet_4

LANGUAGE: yaml
CODE:
```
…
volumes:
  - name: n8n-claim0
    persistentVolumeClaim:
      claimName: n8n-claim0
…
```

----------------------------------------

TITLE: Transforming Specific Field with Multiple Values to Multiple Items in n8n Code Node (JavaScript)
DESCRIPTION: This snippet shows how to transform a specific field within an n8n item that contains an array of values into multiple individual n8n items. It accesses the `workEmail` field of the first input item and maps each value in its array to a new output item.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/courses/level-two/chapter-1.md#_snippet_7

LANGUAGE: JavaScript
CODE:
```
let items = $input.all();
return items[0].json.workEmail.map(item => {
	return {
		json: item
	}
});
```