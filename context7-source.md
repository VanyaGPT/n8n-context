TITLE: Exposing Local Server with ngrok (Shell)
DESCRIPTION: This command uses ngrok to expose a local server running on port 5678 to the internet, generating a publicly accessible URL. This is useful for configuring OAuth credentials in a local development environment where `localhost` URLs are not accepted by services like Twist.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/credentials/twist.md#_snippet_0

LANGUAGE: sh
CODE:
```
ngrok http 5678
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

TITLE: Converting ISO Date String to Luxon in n8n Expressions (JavaScript)
DESCRIPTION: This example demonstrates how to convert an ISO 8601 formatted date string into a Luxon DateTime object directly within n8n expressions. The `DateTime.fromISO()` function is used for this conversion, which is suitable for parsing standard technical date formats.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/code/cookbook/luxon.md#_snippet_3

LANGUAGE: JavaScript
CODE:
```
{{DateTime.fromISO('2019-06-23T00:00:00.00')}}
```

----------------------------------------

TITLE: Calculating Days to Christmas using n8n Code Node (JavaScript)
DESCRIPTION: This snippet shows how to achieve the Christmas countdown functionality within an n8n Code node. It uses the same logic as the expression example, utilizing n8n's `$today` variable, Luxon's `DateTime.fromISO` and `diff` methods, `toObject()`, JMESPath (`.days`), and JavaScript string manipulation (`toString().substring(1)`) to calculate and store the remaining days in a variable. The result can then be used in subsequent nodes.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/code/cookbook/luxon.md#_snippet_11

LANGUAGE: JavaScript
CODE:
```
let daysToChristmas = "There are " + $today.diff(DateTime.fromISO($today.year + '-12-25'), 'days').toObject().days.toString().substring(1) + " days to Christmas!";
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

TITLE: Scheduling Every 5 Minutes with n8n Schedule Trigger (Cron)
DESCRIPTION: This Cron expression schedules a workflow to run every 5 minutes. The `*/5` in the minute field indicates that the workflow will execute every fifth minute of the hour.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/core-nodes/n8n-nodes-base.scheduletrigger/index.md#_snippet_1

LANGUAGE: Cron
CODE:
```
*/5 * * * *
```

----------------------------------------

TITLE: MongoDB Atlas Vector Search Index Configuration Example
DESCRIPTION: This JSON snippet provides an example configuration for creating a Vector Search index in MongoDB Atlas. It defines a vector field with specified dimensions and a similarity function, which is crucial for enabling vector search capabilities in your collection before using the n8n node.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoremongodbatlas.md#_snippet_0

LANGUAGE: json
CODE:
```
{
  "fields": [
    {
      "type": "vector",
      "path": "<field-name>",
      "numDimensions": 1536, // any other value
      "similarity": "<similarity-function>"
    }
  ]
}
```

----------------------------------------

TITLE: Starting Redis in Docker
DESCRIPTION: This command starts a Redis instance within a Docker container, mapping port 6379 from the container to the host. It runs Redis in detached mode, naming the container 'some-redis'. This Redis instance will serve as the message broker for n8n's queue system.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/hosting/scaling/queue-mode.md#_snippet_2

LANGUAGE: Shell
CODE:
```
docker run --name some-redis -p 6379:6379 -d redis
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

TITLE: Generating RSA Key Pair for Wise SCA
DESCRIPTION: This shell script uses the 'openssl' command-line tool to generate an RSA key pair. It first creates a 2048-bit private key named 'private.pem' and then extracts the corresponding public key from it, saving it as 'public.pem'. This key pair is essential for authenticating with Wise API endpoints that require Strong Customer Authentication (SCA).
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/credentials/wise.md#_snippet_0

LANGUAGE: sh
CODE:
```
$ openssl genrsa -out private.pem 2048
$ openssl rsa -pubout -in private.pem -out public.pem
```

----------------------------------------

TITLE: Inserting Data into n8n Vector Store
DESCRIPTION: This section describes the steps to upload custom data into a vector store within n8n for RAG workflows. It covers adding source data nodes, configuring the Vector Store node for insertion, selecting an embedding model, and using a Default Data Loader for chunking, with an option for metadata.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/advanced-ai/rag-in-n8n.md#_snippet_0

LANGUAGE: APIDOC
CODE:
```
1. Add nodes to fetch your source data.
2. Insert a Vector Store node (e.g., Simple Vector Store):
   - Operation: Insert Documents
   - Embedding model: Select one (converts text into vector embeddings)
3. Add a Default Data Loader node:
   - Splits content into chunks.
   - Chunking strategies:
     - Character Text Splitter
     - Recursive Character Text Splitter (recommended)
     - Token Text Splitter
4. (Optional) Add metadata to each chunk to enrich context and allow better filtering.
```

----------------------------------------

TITLE: Defining Query Parameters for Postgres - JavaScript
DESCRIPTION: This JavaScript expression defines the values for the query parameters used in the SQL query. It dynamically pulls the table name ('users') and the email address from the current input item (`$json.email`), allowing the query to be executed for each incoming item.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/app-nodes/n8n-nodes-base.postgres/index.md#_snippet_2

LANGUAGE: JavaScript
CODE:
```
// users is an example table name
{{ [ 'users', $json.email ] }}
```

----------------------------------------

TITLE: Processing Input with JavaScript in Custom Code Tool
DESCRIPTION: This JavaScript snippet demonstrates how to access the tool's input using the `query` variable and perform a simple string manipulation (lowercasing) before returning the result. It shows a basic example of processing data provided to the Custom Code Tool node.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolcode.md#_snippet_0

LANGUAGE: JavaScript
CODE:
```
let myString = query;
return myString.toLowerCase();
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

TITLE: LangChain Chains Root Nodes in n8n
DESCRIPTION: Chains are a series of LLMs and tools linked together to support complex functionality. n8n offers several root nodes to implement various types of LangChain chains.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/advanced-ai/langchain/langchain-n8n.md#_snippet_1

LANGUAGE: APIDOC
CODE:
```
Chains Root Nodes:
  - Basic LLM Chain
  - Retrieval Q&A Chain
  - Summarization Chain
  - Sentiment Analysis
  - Text Classifier
```

----------------------------------------

TITLE: Google Sheets Update Row Operation Parameters in n8n
DESCRIPTION: Details the parameters required for the 'Update Row' operation in n8n for Google Sheets. This includes credential selection, resource and operation type, document and sheet identification, and mapping column modes (manual, automatic, or none). It also provides guidance on finding `spreadsheetId` and `sheetId` from Google Sheets URLs.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/app-nodes/n8n-nodes-base.googlesheets/sheet-operations.md#_snippet_8

LANGUAGE: APIDOC
CODE:
```
{
  "Credential to connect with": "Create or select an existing Google Sheets credentials.",
  "Resource": "Select Sheet Within Document.",
  "Operation": "Select Update Row.",
  "Document": {
    "description": "Choose a spreadsheet with the sheet you want to update.",
    "options": {
      "From list": "to choose the spreadsheet title from the dropdown list",
      "By URL": "to enter the url of the spreadsheet",
      "By ID": "to enter the `spreadsheetId` (found in URL: `https://docs.google.com/spreadsheets/d/spreadsheetId/edit#gid=0`)"
    }
  },
  "Sheet": {
    "description": "Choose a sheet you want to update.",
    "options": {
      "From list": "to choose the sheet title from the dropdown list",
      "By URL": "to enter the url of the sheet",
      "By ID": "to enter the `sheetId` (found in URL: `https://docs.google.com/spreadsheets/d/aBC-123_xYz/edit#gid=sheetId`)",
      "By Name": "to enter the sheet title"
    }
  },
  "Mapping Column Mode": {
    "Map Each Column Manually": "Enter Values to Send for each column.",
    "Map Automatically": "n8n looks for incoming data that matches the columns in Google Sheets automatically. In this mode, make sure the incoming data fields are the same as the columns in Google Sheets.",
    "Nothing": "Don't map any data."
  }
}
```

----------------------------------------

TITLE: Troubleshooting Command Not Found in Running n8n Docker Container (Shell)
DESCRIPTION: This snippet provides shell commands to troubleshoot 'command not found' errors when n8n is running in a Docker container. It first helps identify the n8n container ID and then demonstrates how to execute a specific command within that running container to verify its availability and functionality.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/core-nodes/n8n-nodes-base.executecommand/common-issues.md#_snippet_0

LANGUAGE: sh
CODE:
```
# Find n8n's container ID, it will be the first column
docker ps | grep n8n
# Try to execute the command within the running container
docker container exec <container_ID> <command_to_run>
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

TITLE: Configuring Human Message Prompt for Conversational AI Agent (LangChain Expression)
DESCRIPTION: This example demonstrates how to structure the 'Human Message' prompt for the Conversational AI Agent node in n8n. It includes placeholders for available tools, output format instructions, and the user's input, guiding the agent on how to interact and utilize tools effectively.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/conversational-agent.md#_snippet_0

LANGUAGE: LangChain Expression
CODE:
```
TOOLS\n------\nAssistant can ask the user to use tools to look up information that may be helpful in answering the user's original question. The tools the human can use are:\n\n{tools}\n\n{format_instructions}\n\nUSER'S INPUT\n--------------------\nHere is the user's input (remember to respond with a markdown code snippet of a JSON blob with a single action, and NOTHING else):\n\n{{input}}
```

----------------------------------------

TITLE: Transforming PokéAPI Results with n8n Code Node (JavaScript)
DESCRIPTION: This JavaScript code snippet is designed for use within an n8n Code node. It retrieves all input items, accesses the `results` array from the first item's JSON payload (expected from the PokéAPI HTTP request), and maps each result item into a new n8n-compatible JSON object. This prepares the data for further processing within the n8n workflow.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/courses/level-two/chapter-1.md#_snippet_8

LANGUAGE: JavaScript
CODE:
```
let items = $input.all();
return items[0].json.results.map(item => {
	return {
		json: item
	}
});
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

TITLE: Starting Docker Compose Services (Bash)
DESCRIPTION: This command initiates the Docker Compose services defined in the `compose.yaml` file. The `-d` flag runs the containers in detached mode, allowing them to run in the background without blocking the terminal.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/hosting/installation/server-setups/docker-compose.md#_snippet_9

LANGUAGE: bash
CODE:
```
sudo docker compose up -d
```

----------------------------------------

TITLE: n8n Deployment Environment Variables Reference
DESCRIPTION: A comprehensive reference of environment variables used to configure a self-hosted n8n instance, detailing their data types, default values, and functional descriptions for various deployment aspects.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/hosting/configuration/environment-variables/deployment.md#_snippet_0

LANGUAGE: APIDOC
CODE:
```
Variable: N8N_EDITOR_BASE_URL
	Type: String
	Default: -
	Description: Public URL where users can access the editor. Also used for emails sent from n8n and the redirect URL for SAML based authentication.

Variable: N8N_CONFIG_FILES
	Type: String
	Default: -
	Description: Use to provide the path to any JSON configuration file.

Variable: N8N_DISABLE_UI
	Type: Boolean
	Default: false
	Description: Set to true to disable the UI.

Variable: N8N_PREVIEW_MODE
	Type: Boolean
	Default: false
	Description: Set to true to run in preview mode.

Variable: N8N_TEMPLATES_ENABLED
	Type: Boolean
	Default: false
	Description: Enables workflow templates (true) or disable (false).

Variable: N8N_TEMPLATES_HOST
	Type: String
	Default: https://api.n8n.io
	Description: Change this if creating your own workflow template library. Note that to use your own workflow templates library, your API must provide the same endpoints and response structure as n8n's. Refer to Workflow templates for more information.

Variable: N8N_ENCRYPTION_KEY
	Type: String
	Default: Random key generated by n8n
	Description: Provide a custom key used to encrypt credentials in the n8n database. By default n8n generates a random key on first launch.

Variable: N8N_USER_FOLDER
	Type: String
	Default: user-folder
	Description: Provide the path where n8n will create the .n8n folder. This directory stores user-specific data, such as database file and encryption key.

Variable: N8N_PATH
	Type: String
	Default: /
	Description: The path n8n deploys to.

Variable: N8N_HOST
	Type: String
	Default: localhost
	Description: Host name n8n runs on.

Variable: N8N_PORT
	Type: Number
	Default: 5678
	Description: The HTTP port n8n runs on.

Variable: N8N_LISTEN_ADDRESS
	Type: String
	Default: 0.0.0.0
	Description: The IP address n8n should listen on.

Variable: N8N_PROTOCOL
	Type: Enum string: http, https
	Default: http
	Description: The protocol used to reach n8n.

Variable: N8N_SSL_KEY
	Type: String
	Default: -
	Description: The SSL key for HTTPS protocol.

Variable: N8N_SSL_CERT
	Type: String
	Default: -
	Description: The SSL certificate for HTTPS protocol.

Variable: N8N_PERSONALIZATION_ENABLED
	Type: Boolean
	Default: true
	Description: Whether to ask users personalisation questions and then customise n8n accordingly.

Variable: N8N_VERSION_NOTIFICATIONS_ENABLED
	Type: Boolean
	Default: true
	Description: When enabled, n8n sends notifications of new versions and security updates.

Variable: N8N_VERSION_NOTIFICATIONS_ENDPOINT
	Type: String
	Default: https://api.n8n.io/versions/
	Description: The endpoint to retrieve where version information.

Variable: N8N_VERSION_NOTIFICATIONS_INFO_URL
	Type: String
	Default: https://docs.n8n.io/getting-started/installation/updating.html
	Description: The URL displayed in the New Versions panel for more information.

Variable: N8N_DIAGNOSTICS_ENABLED
	Type: Boolean
	Default: true
	Description: Whether to share selected, anonymous telemetry with n8n. Note that if you set this to false, you can't enable Ask AI in the Code node.

Variable: N8N_DIAGNOSTICS_CONFIG_FRONTEND
	Type: String
	Default: 1zPn9bgWPzlQc0p8Gj1uiK6DOTn;https://telemetry.n8n.io
	Description: Telemetry configuration for the frontend.

Variable: N8N_DIAGNOSTICS_CONFIG_BACKEND
	Type: String
	Default: 1zPn7YoGC3ZXE9zLeTKLuQCB4F6;https://telemetry.n8n.io/v1/batch
	Description: Telemetry configuration for the backend.

Variable: N8N_PUSH_BACKEND
	Type: String
	Default: websocket
	Description: Choose whether the n8n backend uses server-sent events (sse) or WebSockets (websocket) to send changes to the UI.

Variable: VUE_APP_URL_BASE_API
	Type: String
	Default: http://localhost:5678/
	Description: Used when building the n8n-editor-ui package manually to set how the frontend can reach the backend API. Refer to Configure the Base URL.

Variable: N8N_HIRING_BANNER_ENABLED
	Type: Boolean
	Default: true
	Description: Whether to show the n8n hiring banner in the console (true) or not (false).

Variable: N8N_PUBLIC_API_SWAGGERUI_DISABLED
	Type: Boolean
	Default: false
	Description: Whether the Swagger UI (API playground) is disabled (true) or not (false).

Variable: N8N_PUBLIC_API_DISABLED
	Type: Boolean
	Default: false
	Description: Whether to disable the public API (true) or not (false).

Variable: N8N_PUBLIC_API_ENDPOINT
	Type: String
	Default: api
	Description: Path for the public API endpoints.

Variable: N8N_GRACEFUL_SHUTDOWN_TIMEOUT
	Type: Number
	Default: 30
	Description: How long should the n8n process wait (in seconds) for components to shut down before exiting the process.

Variable: N8N_DEV_RELOAD
	Type: Boolean
	Default: false
	Description: When working on the n8n source code, set this to true to automatically reload or restart the application when changes occur in the source code files.

Variable: N8N_REINSTALL_MISSING_PACKAGES
	Type: Boolean
	Default: false
	Description: If set to true, n8n will automatically attempt to reinstall any missing packages.

Variable: N8N_TUNNEL_SUBDOMAIN
	Type: String
	Default: -
	Description: Specifies the subdomain for the n8n tunnel. If not set, n8n generates a random subdomain.

Variable: N8N_PROXY_HOPS
	Type: Number
	Default: 0
	Description: Number of reverse-proxies n8n is running behind.
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

TITLE: Configuring OpenAI Assistant Instructions
DESCRIPTION: This snippet provides an example of system instructions for an OpenAI Assistant. It defines the assistant's persona, communication style, and how it should handle user queries, emphasizing a friendly, concise, and supportive tone while avoiding jargon.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/app-nodes/n8n-nodes-langchain.openai/assistant-operations.md#_snippet_1

LANGUAGE: Plain Text
CODE:
```
Always respond in a friendly and engaging manner. When a user asks a question, provide a concise answer first, followed by a brief explanation or additional context if necessary. If the question is open-ended, offer a suggestion or ask a clarifying question to guide the conversation. Keep the tone positive and supportive, and avoid technical jargon unless specifically requested by the user.
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

TITLE: Creating n8n Workflow via REST API (POST)
DESCRIPTION: This snippet demonstrates how to create a new workflow in n8n by sending a POST request to the `/rest/workflows/` endpoint. It requires a JSON request body containing the workflow definition.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/embed/managing-workflows.md#_snippet_4

LANGUAGE: HTTP
CODE:
```
POST https://<n8n-domain>/rest/workflows/
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

TITLE: Simple Vector Store: Connecting as a Tool to an AI Agent
DESCRIPTION: Explains how to connect the Simple Vector Store node directly to the 'tool' connector of an AI agent. This allows the AI agent to utilize the vector store as a resource when processing queries and generating responses.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoreinmemory.md#_snippet_1

LANGUAGE: APIDOC
CODE:
```
AI agent (tools connector) -> Simple Vector Store node
```

----------------------------------------

TITLE: Basic JMESPath Method Syntax - JavaScript
DESCRIPTION: Illustrates the basic syntax for using the `jmespath()` method in n8n's JavaScript expressions to query a JSON object. The method takes the JSON object and a JMESPath search string as arguments.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/code/cookbook/jmespath.md#_snippet_0

LANGUAGE: JavaScript
CODE:
```
$jmespath(object, searchString)
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

TITLE: Checking Node Execution Status in n8n (JavaScript)
DESCRIPTION: This JavaScript snippet allows you to programmatically check if a specific n8n node has been executed within a workflow. It's useful for conditional logic to ensure a node has produced output before attempting to reference its values, preventing 'Referenced node is unexecuted' errors. Replace '<node-name>' with the actual name of the node you want to check.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/_snippets/integrations/referenced-node-unexecuted.md#_snippet_0

LANGUAGE: JavaScript
CODE:
```
$("<node-name>").isExecuted
```