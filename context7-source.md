TITLE: Troubleshoot 'command not found' in running n8n Docker container
DESCRIPTION: This snippet provides commands to find the n8n Docker container ID and then execute a specific command within that running container to troubleshoot 'command not found' errors when n8n is already running.
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

TITLE: Provide Fallback Values with Nullish Coalescing or Logical OR in n8n
DESCRIPTION: These JavaScript expressions demonstrate alternative ways to provide fallback values for variables in n8n. The first uses the nullish coalescing operator (??), which returns 'default value' only if '$x' is null or undefined. The second uses the logical OR operator (||), which returns 'default value' if '$x' is any falsy value (e.g., null, undefined, 0, '', false). Both are effective for ensuring a default value is used when a variable is not set or is empty.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/code/cookbook/expressions/check-incoming-data.md#_snippet_1

LANGUAGE: javascript
CODE:
```
{{ $x ?? "default value" }}
{{ $x || "default value" }}
```

----------------------------------------

TITLE: Configure n8n Node Metadata in JSON Codex File
DESCRIPTION: This JSON snippet represents the 'codex file' for an n8n node. It specifies essential metadata such as the node's internal name, version, categories, and placeholders for credential and primary documentation URLs, enabling n8n to properly categorize and display the node.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/creating-nodes/build/declarative-style-node.md#_snippet_9

LANGUAGE: json
CODE:
```
{
	"node": "n8n-nodes-base.NasaPics",
	"nodeVersion": "1.0",
	"codexVersion": "1.0",
	"categories": [
		"Miscellaneous"
	],
	"resources": {
		"credentialDocumentation": [
			{
				"url": ""
			}
		],
		"primaryDocumentation": [
			{
				"url": ""
			}
		]
	}
}
```

----------------------------------------

TITLE: JavaScript Node Input API Reference
DESCRIPTION: Detailed documentation for JavaScript methods and variables available to interact with the current node's input data in n8n. This includes shorthands for JSON and binary data, methods for accessing single or multiple input items, and properties for node context and previous node parameters. Note the availability in the Code node.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/code/builtin/current-node-input.md#_snippet_0

LANGUAGE: APIDOC
CODE:
```
$binary: Shorthand for $input.item.binary. Incoming binary data from a node. Not available in Code node.
$input.item: The input item of the current node that's being processed. Refer to Item linking for more information on paired items and item linking. Available in Code node.
$input.all(): All input items in current node. Available in Code node.
$input.first(): First input item in current node. Available in Code node.
$input.last(): Last input item in current node. Available in Code node.
$input.params: Object containing the query settings of the previous node. This includes data such as the operation it ran, result limits, and so on. Available in Code node.
$json: Shorthand for $input.item.json. Incoming JSON data from a node. Refer to Data structure for information on item structure. Available in Code node (when running once for each item).
$input.context.noItemsLeft: Boolean. Only available when working with the Loop Over Items node. Provides information about what's happening in the node. Use this to determine whether the node is still processing items. Available in Code node.
```

----------------------------------------

TITLE: Declarative n8n Node Definition for FriendGrid Integration
DESCRIPTION: This JavaScript snippet demonstrates the declarative style for defining an n8n node. It configures API interactions and data transformations directly within the `description` object using properties like `requestDefaults`, `routing`, and `output`, often eliminating the need for an explicit `execute` method.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/creating-nodes/plan/choose-node-method.md#_snippet_1

LANGUAGE: javascript
CODE:
```
import { INodeType, INodeTypeDescription } from 'n8n-workflow';

// Create the FriendGrid class
export class FriendGrid implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'FriendGrid',
    name: 'friendGrid',
    . . .
    // Set up the basic request configuration
    requestDefaults: {
      baseURL: 'https://api.sendgrid.com/v3/marketing'
    },
    properties: [
      {
        displayName: 'Resource',
        . . .
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        displayOptions: {
          show: {
            resource: [
              'contact',
            ],
          },
        },
        options: [
          {
            name: 'Create',
            value: 'create',
            description: 'Create a contact',
            // Add the routing object
            routing: {
              request: {
                method: 'POST',
                url: '=/contacts',
                send: {
                  type: 'body',
                  properties: {
                    email: {{$parameter["email"]}}
                  }
                }
              }
            },
            // Handle the response to contact creation
            output: {
              postReceive: [
                {
                  type: 'set',
                  properties: {
                    value: '={{ { "success": $response } }}'
                  }
                }
              ]
            }
          },
        ],
        default: 'create',
        description: 'The operation to perform.',
      },
      {
        displayName: 'Email',
        . . .
      },
      {
        displayName: 'Additional Fields',
        // Sets up optional fields
      },
    ],
  }
  // No execute method needed
}
```

----------------------------------------

TITLE: Convert ISO 8601 date string to Luxon DateTime object
DESCRIPTION: Illustrates how to parse an ISO 8601 formatted date string into a Luxon DateTime object using `DateTime.fromISO()`. This is the recommended method for standard technical date formats in Luxon, requiring explicit format specification unlike vanilla JavaScript's `new Date()`.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/code/cookbook/luxon.md#_snippet_1

LANGUAGE: JavaScript
CODE:
```
{{DateTime.fromISO('2019-06-23T00:00:00.00')}}
```

LANGUAGE: JavaScript
CODE:
```
let luxonDateTime = DateTime.fromISO('2019-06-23T00:00:00.00')
```

----------------------------------------

TITLE: Define n8n Credential Type Class Structure
DESCRIPTION: This TypeScript code defines the basic structure for an n8n credential type, including necessary imports, class definition, display properties, API key configuration, generic authentication setup for query string, and a test request configuration.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/creating-nodes/build/reference/credentials-files.md#_snippet_0

LANGUAGE: TypeScript
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

TITLE: Access Linked Item from Previous Node Output in n8n Expression
DESCRIPTION: This n8n expression allows you to retrieve a linked item from the output of a specified previous node. It instructs n8n to trace back the item linking chain to locate the parent item associated with the current context.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/data/data-mapping/data-mapping-expressions.md#_snippet_0

LANGUAGE: js
CODE:
```
{{"$<node-name>".item}}
```

----------------------------------------

TITLE: Access current workflow execution ID
DESCRIPTION: Retrieves the unique identifier for the current workflow execution. This ID can be used for logging, tracking, or referencing specific workflow runs.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/code/cookbook/builtin/execution.md#_snippet_0

LANGUAGE: JavaScript
CODE:
```
let executionId = $execution.id;
```

LANGUAGE: Python
CODE:
```
executionId = _execution.id
```

----------------------------------------

TITLE: Valid Single-line JavaScript Expression for Date Calculation
DESCRIPTION: This example demonstrates a valid single-line JavaScript expression in n8n for calculating the difference between two dates using the Luxon library. It showcases how to chain method calls directly to perform complex operations like date parsing, difference calculation, and object conversion within the constraints of a single-line expression. This approach is necessary to work around the multi-line limitation of n8n expressions.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/code/expressions.md#_snippet_3

LANGUAGE: JavaScript
CODE:
```
{{DateTime.fromISO('2017-03-13').diff(DateTime.fromISO('2017-02-13'), 'months').toObject()}}
```

----------------------------------------

TITLE: Troubleshoot Shopify Forbidden Credentials Error
DESCRIPTION: Guidance on resolving a 'Couldn't connect with these settings / Forbidden' error when testing Shopify credentials. This issue is commonly caused by incorrect or insufficient API access scopes assigned to the Shopify app.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/credentials/shopify.md#_snippet_3

LANGUAGE: APIDOC
CODE:
```
Troubleshooting 'Forbidden credentials' Error:
Issue: "Couldn't connect with these settings / Forbidden - perhaps check your credentials" warning when testing credentials.
Cause: This may be due to your app's access scope dependencies. For example, the `read_orders` scope also requires `read_products` scope.
Resolution: Review the scopes you have assigned and the action you're trying to complete. Refer to Shopify's access scope documentation for details.
```

----------------------------------------

TITLE: Configure Shopify OAuth2 Credential in n8n
DESCRIPTION: Detailed steps to set up an n8n credential for Shopify using OAuth2. This process requires a Shopify partner account to create a custom app, generate Client ID and Client Secret, and configure redirect URLs for secure authentication.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/credentials/shopify.md#_snippet_0

LANGUAGE: APIDOC
CODE:
```
Shopify OAuth2 Credential Configuration Steps:
1. Open your Shopify Partner dashboard.
2. Select "Apps" from the left navigation.
3. Select "Create app".
4. In the "Use Shopify Partners" section, enter an "App name".
5. Select "Create app".
6. When the app details open, copy the "Client ID". Enter this in your n8n credential.
7. Copy the "Client Secret". Enter this in your n8n credential.
8. In the left menu, select "Configuration".
9. In n8n, copy the "OAuth Redirect URL" and paste it into the "Allowed redirection URL(s)" in the "URLs" section.
10. In the "URLs" section, enter an "App URL" for your app. The host entered here needs to match the host for the "Allowed redirection URL(s)", like the base URL for your n8n instance.
11. Select "Save and release".
12. Select "Overview" from the left menu. At this point, you can choose to "Test your app" by installing it to one of your stores, or "Choose distribution" to distribute it publicly.
13. In n8n, enter the "Shop Subdomain" of the store you installed the app to, either as a test or as a distribution. Your subdomain is within the URL: `https://<subdomain>.myshopify.com` (e.g., if the full URL is `https://n8n.myshopify.com`, the Shop Subdomain is `n8n`).
```

----------------------------------------

TITLE: Example n8n Webhook Node JSON Input
DESCRIPTION: This JSON structure represents typical data received from an n8n webhook node. It contains nested 'people' (array of objects) and 'dogs' (object of objects) data, which will serve as the input for subsequent JMESPath queries.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/code/cookbook/jmespath.md#_snippet_2

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
      "people": [
        {
          "first": "James",
          "last": "Green"
        },
        {
          "first": "Jacob",
          "last": "Jones"
        },
        {
          "first": "Jayden",
          "last": "Smith"
        }
      ],
      "dogs": {
        "Fido": {
          "color": "brown",
          "age": 7
        },
        "Spot": {
          "color": "black and white",
          "age": 5
        }
      }
    }
  }
]
```

----------------------------------------

TITLE: Multi-options Type Field for n8n Nodes (Multi-select)
DESCRIPTION: Describes the `multiOptions` type, allowing users to select multiple values from a predefined list. It specifies `displayName`, `name`, `type`, an `options` array, a `default` array for initially selected options, `description`, and `displayOptions` for conditional display based on resource and operation.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/creating-nodes/build/reference/ui-elements.md#_snippet_9

LANGUAGE: typescript
CODE:
```
{
	displayName: 'Events',
	name: 'events',
	type: 'multiOptions',
	options: [
		{
			name: 'Plan Created',
			value: 'planCreated',
		},
		{
			name: 'Plan Deleted',
			value: 'planDeleted',
		},
	],
	default: [], // Initially selected options
	description: 'The events to be monitored',
	displayOptions: { // the resources and operations to display this element with
		show: {
			resource: [
				// comma-separated list of resource names
			],
			operation: [
				// comma-separated list of operation names
			]
		}
	},
}
```

----------------------------------------

TITLE: Accessing Custom Environment Variables with `vars`
DESCRIPTION: The `vars` object provides read-only access to custom variables defined within the active n8n environment. These variables are distinct from system environment variables accessed via `env`. To set these variables, users must use the n8n UI. This feature is available on Self-hosted Enterprise, Pro, and Enterprise Cloud plans.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/code/cookbook/builtin/vars.md#_snippet_0

LANGUAGE: JavaScript
CODE:
```
// Access a variable
$vars.<variable-name>
```

LANGUAGE: Python
CODE:
```
# Access a variable
_vars.<variable-name>
```

----------------------------------------

TITLE: Access n8n Docker Container Shell
DESCRIPTION: Provides the command to enter the shell of your n8n Docker container, which is a prerequisite for performing node management operations.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/community-nodes/installation/manual-install.md#_snippet_0

LANGUAGE: sh
CODE:
```
docker exec -it n8n sh
```

----------------------------------------

TITLE: Uninstall n8n Community Nodes and Credentials
DESCRIPTION: Commands to uninstall community nodes and their associated credentials. This is useful for resolving instability caused by community nodes. Nodes are uninstalled by package name, while credentials require both the credential type and the user ID.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/hosting/cli-commands.md#_snippet_12

LANGUAGE: sh
CODE:
```
n8n community-node --uninstall --package <COMMUNITY_NODE_NAME>
```

LANGUAGE: sh
CODE:
```
n8n community-node --uninstall --package n8n-nodes-evolution-api
```

LANGUAGE: sh
CODE:
```
n8n community-node --uninstall --credential <CREDENTIAL_TYPE> --userId <ID>
```

LANGUAGE: sh
CODE:
```
n8n community-node --uninstall --credential evolutionApi --userId 1234
```

----------------------------------------

TITLE: Uninstall n8n Community Node via npm
DESCRIPTION: This command removes an installed community node package from your n8n instance using npm. Replace 'n8n-nodes-nodeName' with the name of the node to uninstall.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/community-nodes/installation/manual-install.md#_snippet_3

LANGUAGE: sh
CODE:
```
npm uninstall n8n-nodes-nodeName
```

----------------------------------------

TITLE: Example: Validating Email String with isEmail() Function in n8n Expressions
DESCRIPTION: This example demonstrates how to use a data transformation function, specifically `isEmail()`, to validate if a given string is a valid email address within an n8n expression. It also shows the expected boolean return value.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/code/builtin/data-transformation-functions/index.md#_snippet_1

LANGUAGE: JavaScript
CODE:
```
{{ "example@example.com".isEmail() }}

// Returns true
```

----------------------------------------

TITLE: Check for Empty Variable with Ternary Operator in n8n
DESCRIPTION: This JavaScript expression uses the ternary operator to check if a variable named 'variable_name' from the previous node's JSON output ('$json') is empty or falsy. If it is, it returns the string 'not found'; otherwise, it returns the value of 'variable_name'. This is useful for providing default values when data is missing or invalid.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/code/cookbook/expressions/check-incoming-data.md#_snippet_0

LANGUAGE: javascript
CODE:
```
{{$json["variable_name"]? $json["variable_name"] :"not found"}}
```

----------------------------------------

TITLE: n8n Node Operation: Write File to Disk
DESCRIPTION: Configures the n8n 'Read/Write Files from Disk' node to create a binary file on the machine where n8n is running. Allows specifying the destination path and optionally appending data to existing files.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/core-nodes/n8n-nodes-base.readwritefile.md#_snippet_1

LANGUAGE: APIDOC
CODE:
```
Operation: Write File to Disk
Description: Create a binary file on the computer that runs n8n.

Parameters:
  File Path and Name (string, required): Enter the destination for the file, the file's name, and the file's extension.
  Input Binary Field (string, required): Enter the name of the field in the node input data that will contain the binary file.

Options:
  Append (boolean, optional): If true, appends data to an existing file instead of creating a new one. If false (default), creates a new file.
```

----------------------------------------

TITLE: n8n UI: Password String Field Configuration
DESCRIPTION: JSON configuration for a string input field in n8n specifically for passwords, leveraging `typeOptions.password` to obscure input and ensure secure handling.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/creating-nodes/build/reference/ui-elements.md#_snippet_1

LANGUAGE: typescript
CODE:
```
{
	displayName: 'Password',
	name: 'password',
	type: 'string',
	required: true,
	typeOptions: {
		password: true,
	},
	default: '',
	description: `User's password`,
	displayOptions: { // the resources and operations to display this element with
		show: {
			resource: [
				// comma-separated list of resource names
			],
			operation: [
				// comma-separated list of operation names
			]
		}
	},
}
```

----------------------------------------

TITLE: Access n8n's built-in Luxon variables ($now, $today, _now)
DESCRIPTION: Demonstrates how to access the `now` and `today` Luxon objects provided by n8n in expressions and Code nodes. Note the different variable names (`$now`/`$today` for JavaScript, `_now` for Python) and how they are cast to strings, often resulting in Unix timestamps when concatenated.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/code/cookbook/luxon.md#_snippet_0

LANGUAGE: JavaScript
CODE:
```
{{$now}}
// n8n displays the ISO formatted timestamp
// For example 2022-03-09T14:02:37.065+00:00
{{"Today's date is " + $now}}
// n8n displays "Today's date is <unix timestamp>"
// For example "Today's date is 1646834498755"
```

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

LANGUAGE: Python
CODE:
```
_now
# n8n displays <ISO formatted timestamp>
# For example 2022-03-09T14:00:25.058+00:00
rightNow = "Today's date is " + str(_now)
# n8n displays "Today's date is <unix timestamp>"
# For example "Today's date is 1646834498755"
```

----------------------------------------

TITLE: Configure SSL Certificate Validation Behavior
DESCRIPTION: By default, n8n only downloads the response if SSL certificate validation succeeds. Turn this option on to download the response even if SSL certificate validation fails.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/index.md#_snippet_13

LANGUAGE: APIDOC
CODE:
```
Ignore SSL Issues: boolean (default: off)
  - Description: Turn on to download response even if SSL certificate validation fails.
```

----------------------------------------

TITLE: Define n8n Node Operations and Parameters for NASA APIs
DESCRIPTION: This TypeScript code defines the 'operation' property for an n8n node, including 'Get' operations for both APOD and Mars Rover photos. It also specifies additional parameters like 'Rover name' and 'Date' with routing logic to construct API request URLs dynamically. The `displayOptions.show` property conditionally displays these fields based on the selected resource.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/creating-nodes/build/declarative-style-node.md#_snippet_6

LANGUAGE: typescript
CODE:
```
{
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: [
				'astronomyPictureOfTheDay',
			],
		},
	},
	options: [
		{
			name: 'Get',
			value: 'get',
			action: 'Get the APOD',
			description: 'Get the Astronomy Picture of the day',
			routing: {
				request: {
					method: 'GET',
					url: '/planetary/apod',
				},
			},
		},
	],
	default: 'get',
},
{
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: [
				'marsRoverPhotos',
			],
		},
	},
	options: [
		{
			name: 'Get',
			value: 'get',
			action: 'Get Mars Rover photos',
			description: 'Get photos from the Mars Rover',
			routing: {
				request: {
					method: 'GET',
				},
			},
		},
	],
	default: 'get',
},
{
	displayName: 'Rover name',
	description: 'Choose which Mars Rover to get a photo from',
	required: true,
	name: 'roverName',
		type: 'options',
	options: [
		{name: 'Curiosity', value: 'curiosity'},
		{name: 'Opportunity', value: 'opportunity'},
		{name: 'Perseverance', value: 'perseverance'},
		{name: 'Spirit', value: 'spirit'},
	],
	routing: {
		request: {
			url: '=/mars-photos/api/v1/rovers/{{$value}}/photos',
		},
	},
	default: 'curiosity',
	displayOptions: {
		show: {
			resource: [
				'marsRoverPhotos',
			],
		},
	},
},
{
	displayName: 'Date',
	description: 'Earth date',
	required: true,
	name: 'marsRoverDate',
	type: 'dateTime',
	default:'',
	displayOptions: {
		show: {
			resource: [
				'marsRoverPhotos',
			],
		},
	},
	routing: {
		request: {
			// You've already set up the URL. qs appends the value of the field as a query string
			qs: {
				earth_date: '={{ new Date($value).toISOString().substr(0,10) }}',
			},
		},
	},
}
```

----------------------------------------

TITLE: Format Document Keyboard Shortcuts for n8n Editor
DESCRIPTION: Provides keyboard shortcuts to format the document in the n8n editor across Windows, macOS, and Linux operating systems.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/core-nodes/n8n-nodes-base.code/keyboard-shortcuts.md#_snippet_5

LANGUAGE: Windows
CODE:
```
| Action          | Shortcut                                     |
|-----------------|----------------------------------------------|
| Format document | shift+alt+f |
```

LANGUAGE: macOS
CODE:
```
| Action          | Shortcut                                     |
|-----------------|----------------------------------------------|
| Format document | shift+command+f |
```

LANGUAGE: Linux
CODE:
```
| Action          | Shortcut                                      |
|-----------------|-----------------------------------------------|
| Format document | control+shift+i |
```

----------------------------------------

TITLE: n8n HTTP Request Helper Basic Usage in TypeScript
DESCRIPTION: Demonstrates how to invoke n8n's HTTP request helper within a node's `execute` function. It illustrates two common patterns: making a request without authentication and making a request that leverages n8n's built-in credential management system for authentication.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/creating-nodes/build/reference/http-helpers.md#_snippet_0

LANGUAGE: typescript
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

TITLE: Example Nested Data Structure for n8n Mapping
DESCRIPTION: This JavaScript object array showcases a more complex data structure including a 'nested' object. It demonstrates how n8n displays and allows mapping of deeply structured fields, such as 'example-number-field' and 'example-string-field', within its UI.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/data/data-mapping/data-mapping-ui.md#_snippet_1

LANGUAGE: JavaScript
CODE:
```
[
  {
    "name": "First item",
    "nested": {
      "example-number-field": 1,
      "example-string-field": "apples"
    }
  },
  {
    "name": "Second item",
    "nested": {
      "example-number-field": 2,
      "example-string-field": "oranges"
    }
  }
]
```

----------------------------------------

TITLE: n8n Node Data Structure Example
DESCRIPTION: Illustrates the standard array of objects structure for data flowing between n8n nodes. It shows how general data is nested under a 'json' key and how binary data is nested under a 'binary' key, including optional metadata like mimeType, fileExtension, and fileName.
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

TITLE: Debug Python [object Object] output and JsProxy conversion
DESCRIPTION: Provides Python examples to troubleshoot `[object Object]` outputs in the console. It shows how to check data types using `type()` and how to convert `pyodide.ffi.JsProxy` objects, common in n8n's node data, to native Python dictionaries for proper display.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/code/cookbook/code-node/console-log.md#_snippet_1

LANGUAGE: python
CODE:
```
print(type(myData))
```

LANGUAGE: python
CODE:
```
previousNodeData = _("<node-name>").all();
for item in previousNodeData:
	# item is of type <class 'pyodide.ffi.JsProxy'>
	# You need to convert it to a Dict
	itemDict = item.json.to_py()
	print(itemDict)
```

----------------------------------------

TITLE: Basic usage of $fromAI() function
DESCRIPTION: Demonstrates the simplest way to call the $fromAI() function with a required 'key' parameter, which acts as a hint for the AI model to populate data.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/advanced-ai/examples/using-the-fromai-function.md#_snippet_0

LANGUAGE: javascript
CODE:
```
{{ $fromAI('email') }}
```

----------------------------------------

TITLE: Incorrect n8n Code Node Output: 'json' as Array
DESCRIPTION: Demonstrates an incorrect data structure where the 'json' key within the output object is set to an array instead of an object. This configuration will lead to a "json property isn't an object" error in the n8n Code node, as it expects an object value for the 'json' key.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/core-nodes/n8n-nodes-base.code/common-issues.md#_snippet_1

LANGUAGE: javascript
CODE:
```
[
  {
    "json": [
	  // Setting `json` to an array like this will produce an error
	]
  }
]
```

----------------------------------------

TITLE: AI Tool HTML Response Optimization
DESCRIPTION: Configures how HTML responses are processed for LLMs, allowing content selection, tag stripping, and truncation.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/index.md#_snippet_22

LANGUAGE: APIDOC
CODE:
```
HTML Response Optimization:
  Selector (CSS):
    Description: A specific CSS selector to include in the response HTML. Defaults to 'body'.
    Type: string (CSS selector)
  Return Only Content:
    Description: Whether to strip HTML tags and attributes, leaving only content.
    Type: boolean
    Elements To Omit: Comma-separated list of CSS selectors to exclude when extracting content.
  Truncate Response:
    Description: Whether to limit the response size to save tokens.
    Type: boolean
    Max Response Characters: The maximum number of characters to include in the HTML response. Default: 1000.
    Type: integer
```

----------------------------------------

TITLE: Configure API Response Handling
DESCRIPTION: Use this option to set details about the expected API response. This includes options to include response headers and status, to never error regardless of the response code, and to select the format in which the data gets returned (Autodetect, File, JSON, or Text).
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/index.md#_snippet_16

LANGUAGE: APIDOC
CODE:
```
Options:
  - Include Response Headers and Status: boolean (default: off)
    Description: Return full response (headers and status code) as well as the body.
  - Never Error: boolean (default: off)
    Description: Return success regardless of the response status code (e.g., non-2xx).
  - Response Format: enum
    Values:
      - Autodetect (default): Node detects and formats the response based on the data returned.
      - File: Select this option to put the response into a file.
        Put Output in Field: string (field name where the file is returned)
      - JSON: Select this option to format the response as JSON.
      - Text: Select this option to format the response as plain text.
        Put Output in Field: string (field name where the text is returned)
```

----------------------------------------

TITLE: Configuring Custom Auth with Two Headers (JSON)
DESCRIPTION: This JSON configuration demonstrates how to send authentication credentials as two separate headers, 'X-AUTH-USERNAME' and 'X-AUTH-PASSWORD', within a custom authentication setup. It's suitable for services that expect authentication details in HTTP headers.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/credentials/httprequest.md#_snippet_0

LANGUAGE: JSON
CODE:
```
{
	"headers": {
		"X-AUTH-USERNAME": "username",
		"X-AUTH-PASSWORD": "password"
	}
}
```

----------------------------------------

TITLE: Configure n8n Workflow Settings
DESCRIPTION: Details the customizable settings for n8n workflows, allowing users to override global defaults and define specific behaviors for individual workflows.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/courses/level-one/chapter-5/chapter-5.8.md#_snippet_1

LANGUAGE: APIDOC
CODE:
```
WorkflowSettings:
  Execution Order: string
    description: Choose the execution logic for multi-branch workflows. Default is 'v1'.
    notes: Leave as 'v1' unless workflows rely on legacy ordering.
  Error Workflow: string (workflow ID/name)
    description: A workflow to run if the execution of the current workflow fails.
    reference: /flow-logic/error-handling.md
  This workflow can be called by: array of strings (workflow IDs/names)
    description: Workflows allowed to call this workflow using the Execute Sub-workflow node.
    reference: /integrations/builtin/core-nodes/n8n-nodes-base.executeworkflow.md
  Timezone: string
    description: The timezone to use in the current workflow. If not set, the global timezone is used. Important for Schedule Trigger node.
    reference: /integrations/builtin/core-nodes/n8n-nodes-base.scheduletrigger/index.md
  Save failed production executions: boolean
    description: If n8n should save the Execution data of the workflow when it fails.
    default: true
  Save successful production executions: boolean
    description: If n8n should save the Execution data of the workflow when it succeeds.
    default: true
  Save manual executions: boolean
    description: If n8n should save executions started from the Editor UI.
    default: true
  Save execution progress: boolean
    description: If n8n should save the execution data of each node.
    notes: If set to Save, can resume workflow from error, but may slow execution.
    default: false
  Timeout Workflow: boolean
    description: Whether to cancel a workflow execution after a specific period of time.
    default: false
```

----------------------------------------

TITLE: n8n UI: DateTime Field Configuration
DESCRIPTION: JSON configuration for a `dateTime` type UI element in n8n, which provides an interactive date and time picker for user input, useful for fields like 'Modified Since'.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/creating-nodes/build/reference/ui-elements.md#_snippet_5

LANGUAGE: typescript
CODE:
```
{
	displayName: 'Modified Since',
	name: 'modified_since',
	type: 'dateTime',
	default: '',
	description: 'The date and time when the file was last modified',
	displayOptions: { // the resources and operations to display this element with
		show: {
			resource: [
				// comma-separated list of resource names
			],
			operation: [
				// comma-separated list of operation names
			]
		}
	},
}
```

----------------------------------------

TITLE: n8n Credential Authentication: Body Property
DESCRIPTION: Example of configuring generic authentication to send username and password in the request body using n8n credentials.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/creating-nodes/build/reference/credentials-files.md#_snippet_1

LANGUAGE: TypeScript
CODE:
```
authenticate: IAuthenticateGeneric = {
	type: 'generic',
	properties: {
		body: {
			username: '={{$credentials.username}}',
			password: '={{$credentials.password}}',
		},
	},
};
```

----------------------------------------

TITLE: Enable Custom App Development in Shopify Admin
DESCRIPTION: Steps to enable custom app development within the Shopify Admin panel. This permission is crucial for creating custom apps and generating the necessary credentials (Client ID, Client Secret) for OAuth2 configuration.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/credentials/shopify.md#_snippet_2

LANGUAGE: APIDOC
CODE:
```
Enable Custom App Development in Shopify:
(Requires login as a store owner or a user with the "Enable app development" permission)
1. In Shopify, go to "Admin > Settings > Apps and sales channels".
2. Select "Develop apps".
3. Select "Allow custom app development".
4. Read the warning and information provided and select "Allow custom app development".
```

----------------------------------------

TITLE: Example JSON Input for Fields to Skip Comparing
DESCRIPTION: This JSON snippet provides two example input datasets (Input 1 and Input 2) to illustrate the 'Fields to Skip Comparing' feature. It demonstrates how, by skipping 'person.name', the datasets can be considered matching based solely on 'person.language', despite differences in names.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/core-nodes/n8n-nodes-base.comparedatasets.md#_snippet_0

LANGUAGE: json
CODE:
```
	// Input 1
	[
		{
			"person":
			{
				"name":	"Stefan",
				"language":	"de"
			}
		},
		{
			"person":
			{
				"name":	"Jim",
				"language":	"en"
			}
		},
		{
			"person":
			{
				"name":	"Hans",
				"language":	"de"
			}
		}
	]
	// Input 2
		[
		{
			"person":
			{
				"name":	"Sara",
				"language":	"de"
			}
		},
		{
			"person":
			{
				"name":	"Jane",
				"language":	"en"
			}
		},
		{
			"person":
			{
				"name":	"Harriet",
				"language":	"de"
			}
		}
	]
```

----------------------------------------

TITLE: Simplified Customer Data Structure
DESCRIPTION: JSON structure showing customer data after simplification by the 'Edit Fields' node, retaining only the 'name' field.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/code/cookbook/builtin/itemmatching.md#_snippet_1

LANGUAGE: JSON
CODE:
```
[
		{
			"name": "Jay Gatsby"
		},
		{
			"name": "José Arcadio Buendía"
		},
        ...
	]
```

----------------------------------------

TITLE: Iterate and log data from retrieved n8n items
DESCRIPTION: Shows how to retrieve all items from a previous node and then iterate through them to access and log their JSON data. Includes a note on type conversion for Python.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/code/cookbook/builtin/all.md#_snippet_2

LANGUAGE: JavaScript
CODE:
```
previousNodeData = $("<node-name>").all();
for(let i=0; i<previousNodeData.length; i++) {
	console.log(previousNodeData[i].json);
}
```

LANGUAGE: Python
CODE:
```
previousNodeData = _("<node-name>").all();
for item in previousNodeData:
	# item is of type <class 'pyodide.ffi.JsProxy'>
	# You need to convert it to a Dict
  	itemDict = item.json.to_py()
  	print(itemDict)
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

TITLE: Paginate by Incrementing Body Parameter with $pageCount
DESCRIPTION: Configure pagination for APIs that require the page number to be sent as a body parameter, typically in a POST request. Similar to query parameter pagination, `$pageCount` is used and incremented by one to align with APIs that start page numbering from one, ensuring correct sequential page requests.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/code/cookbook/http-node/pagination.md#_snippet_2

LANGUAGE: javascript
CODE:
```
{{ $pageCount + 1 }}
```

----------------------------------------

TITLE: Run n8n Docker Container
DESCRIPTION: This command initializes a Docker volume for persistent data, downloads the n8n Docker image, and starts the n8n container. It maps port 5678 and mounts the created volume to ensure data persistence across restarts.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/hosting/installation/docker.md#_snippet_0

LANGUAGE: sh
CODE:
```
docker volume create n8n_data

docker run -it --rm --name n8n -p 5678:5678 -v n8n_data:/home/node/.n8n docker.n8n.io/n8nio/n8n
```

----------------------------------------

TITLE: Start n8n Docker Container with Tunnel
DESCRIPTION: This command sequence first creates a Docker volume for persistent n8n data. Then, it runs the n8n Docker container, mapping port 5678, mounting the created volume, and starting n8n with the `--tunnel` option for public access, useful for testing webhooks or external integrations.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/hosting/installation/docker.md#_snippet_6

LANGUAGE: sh
CODE:
```
docker volume create n8n_data

docker run -it --rm \
 --name n8n \
 -p 5678:5678 \
 -v n8n_data:/home/node/.n8n \
 docker.n8n.io/n8nio/n8n \
 start --tunnel
```

----------------------------------------

TITLE: n8n Date & Time Node: Get Current Date Operation
DESCRIPTION: Describes the parameters for the 'Get Current Date' operation in the n8n Date & Time node, which retrieves the current date and optionally includes the current time.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/core-nodes/n8n-nodes-base.datetime.md#_snippet_3

LANGUAGE: APIDOC
CODE:
```
Operation: Get Current Date
Parameters:
  Include Current Time:
    Type: Boolean
    Description: If true, the current time is included; otherwise, the time is set to midnight.
  Output Field Name:
    Type: String
    Description: The name of the field where the current date will be output.
```

----------------------------------------

TITLE: APIDOC: Get Time Between Dates Node Options
DESCRIPTION: Options for the 'Get Time Between Dates' operation, including whether to output input fields and format the duration as an ISO string. If 'Output as ISO String' is off, the output is like 'timeDifference\nyears : 1\nmonths : 3\ndays : 13'. If on, it's a single ISO duration string like 'P1Y3M13D'.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/core-nodes/n8n-nodes-base.datetime.md#_snippet_6

LANGUAGE: APIDOC
CODE:
```
Get Time Between Dates Options:
  Include Input Fields: boolean
    description: If true, all input fields are included in the output.
  Output as ISO String: boolean
    description: If true, the node formats the output as a single ISO duration string (e.g., 'P1Y3M13D'). If false, each selected unit returns its own time difference calculation.
    ISO Duration Format Breakdown:
      P: period (duration), begins all ISO duration strings.
      Y: years
      M: months
      W: weeks
      D: days
      T: delineator between dates and times
      H: hours
      M: minutes
      S: seconds (milliseconds are decimal seconds, e.g., 2.1ms is 0.0021S).
```

----------------------------------------

TITLE: APIDOC: Round a Date Node Options
DESCRIPTION: Option for the 'Round a Date' operation, allowing inclusion of input fields in the output.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/core-nodes/n8n-nodes-base.datetime.md#_snippet_8

LANGUAGE: APIDOC
CODE:
```
Round a Date Options:
  Include Input Fields: boolean
    description: If true, all input fields are included in the output. If false, only the Output Field Name and its contents are output.
```

----------------------------------------

TITLE: n8n Switch Node Configuration (APIDOC)
DESCRIPTION: Detailed configuration parameters for the n8n Switch node, including 'Rules' and 'Expression' modes, routing rules, output renaming, and various options for conditional routing.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/core-nodes/n8n-nodes-base.switch.md#_snippet_0

LANGUAGE: APIDOC
CODE:
```
Switch Node:
  Description: Routes workflow conditionally based on comparison operations. Similar to IF node but supports multiple output routes.
  Modes:
    Rules:
      Description: Select this mode to build a matching rule for each output.
      Parameters:
        Routing Rules:
          Description: Define comparison conditions.
          Details:
            - Use data type dropdown to select data type and comparison operation (e.g., 'Date & Time > is after').
            - Fields and values change based on data type and comparison selected.
            - Refer to 'Available data type comparisons' for full list.
        Rename Output:
          Type: Boolean
          Description: Turn on to rename the output field for matching data.
          Sub-parameter:
            Output Name:
              Type: String
              Description: Your desired output name.
      Options:
        Fallback Output:
          Description: Choose how to route the workflow when an item doesn't match any rules or conditions.
          Values:
            - None: Ignore the item (default).
            - Extra Output: Send items to an extra, separate output.
            - Output 0: Send items to the same output as those matching the first rule.
        Ignore Case:
          Type: Boolean
          Description: Set whether to ignore letter case when evaluating conditions (turned on) or enforce letter case (turned off).
        Less Strict Type Validation:
          Type: Boolean
          Description: Set whether n8n attempts to convert value types based on the operator (turned on) or not (turned off).
        Send data to all matching outputs:
          Type: Boolean
          Description: Set whether to send data to all outputs meeting conditions (turned on) or whether to send the data to the first output matching the conditions (turned off).
    Expression:
      Description: Select this mode to write an expression to return the output index programmatically.
      Parameters:
        Number of Outputs:
          Type: Number
          Description: Set how many outputs the node should have.
        Output Index:
          Type: Expression (must return a number)
          Description: Create an expression to calculate which input item should be routed to which output.
```

----------------------------------------

TITLE: Set n8n If Node Comparison Operation
DESCRIPTION: Defines the comparison logic for the n8n If node. This configuration specifies that the comparison should be a string-based 'is equal to' operation, ensuring accurate evaluation of text values.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/courses/level-one/chapter-5/chapter-5.3.md#_snippet_1

LANGUAGE: n8n Configuration
CODE:
```
Operation: String > is equal to
```

----------------------------------------

TITLE: Resolving 'Invalid syntax' in n8n Expressions
DESCRIPTION: This snippet demonstrates an example of an invalid expression syntax in n8n, specifically a trailing period after a data reference. Such errors lead to an 'Invalid syntax' message, highlighting the importance of correct expression formatting.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/code/cookbook/expressions/common-issues.md#_snippet_1

LANGUAGE: jsx
CODE:
```
{
  "my_field_1": "value",
  "my_field_2": {{ $('If').item.json. }}
}
```

----------------------------------------

TITLE: Clone n8n Node Starter Repository
DESCRIPTION: This shell command clones the n8n node starter repository from GitHub and navigates into the newly created directory. It uses a custom name 'n8n-nodes-friendgrid' to avoid conflicts with existing nodes.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/creating-nodes/build/programmatic-style-node.md#_snippet_0

LANGUAGE: shell
CODE:
```
git clone https://github.com/<your-organization>/<your-repo-name>.git n8n-nodes-friendgrid
cd n8n-nodes-friendgrid
```

----------------------------------------

TITLE: Authenticate n8n API calls with API Key using cURL
DESCRIPTION: This example demonstrates how to make an authenticated GET request to the n8n API using `curl`. It shows how to include the API key in the `X-N8N-API-KEY` header to retrieve all active workflows for both self-hosted n8n instances and n8n Cloud.
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

TITLE: n8n Expression for Deduplication Field
DESCRIPTION: This n8n expression specifies the 'id' field from the input JSON data to be used by the Remove Duplicates node for comparison. It ensures that the deduplication logic operates on the value of the 'id' property.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/core-nodes/n8n-nodes-base.removeduplicates/templates-and-examples.md#_snippet_2

LANGUAGE: n8n Expression
CODE:
```
{{ $json.id }}
```

----------------------------------------

TITLE: APIDOC: Round a Date Node Parameters
DESCRIPTION: Parameters for configuring the 'Round a Date' operation in the n8n Date & Time node, used to round a given date up or down to the nearest specified unit.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/core-nodes/n8n-nodes-base.datetime.md#_snippet_7

LANGUAGE: APIDOC
CODE:
```
Round a Date Parameters:
  Date: date
    description: The date to round.
  Mode: string
    description: Choose whether to round the date 'Round Down' or 'Round Up'.
    values: Round Down, Round Up
  To Nearest: string
    description: The unit to round to.
    values: Year, Month, Week, Day, Hour, Minute, Second
  Output Field Name: string
    description: The name of the field to output the rounded date to.
```

----------------------------------------

TITLE: n8n Schedule Trigger Node Configuration Parameters
DESCRIPTION: Defines the configurable parameters for the n8n Schedule Trigger node, allowing users to set various time-based intervals for workflow execution, including seconds, minutes, hours, days, weeks, months, and custom Cron expressions. Each interval type has specific fields to control the frequency and exact timing of the trigger.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/core-nodes/n8n-nodes-base.scheduletrigger/index.md#_snippet_0

LANGUAGE: APIDOC
CODE:
```
Schedule Trigger Node:
  Trigger Rules:
    - Trigger Interval:
        Seconds trigger interval:
          Seconds Between Triggers: integer (e.g., 30)
        Minutes trigger interval:
          Minutes Between Triggers: integer (e.g., 5)
        Hours trigger interval:
          Hours Between Triggers: integer
          Trigger at Minute: integer (0-59)
        Days trigger interval:
          Days Between Triggers: integer
          Trigger at Hour: string (e.g., "9am")
          Trigger at Minute: integer (0-59)
        Weeks trigger interval:
          Weeks Between Triggers: integer
          Trigger on Weekdays: array of strings (e.g., ["Monday"])
          Trigger at Hour: string (e.g., "3pm")
          Trigger at Minute: integer (0-59)
        Months trigger interval:
          Months Between Triggers: integer
          Trigger at Day of Month: integer (1-31)
          Trigger at Hour: string (e.g., "9am")
          Trigger at Minute: integer (0-59)
        Custom (Cron) interval:
          Expression: string (Cron expression, e.g., "0 0 * * *")
```

----------------------------------------

TITLE: n8n Wait Node Operations Overview
DESCRIPTION: An overview of the different conditions under which the n8n Wait node can resume workflow execution.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/core-nodes/n8n-nodes-base.wait.md#_snippet_0

LANGUAGE: APIDOC
CODE:
```
Wait Node Operations:
  Resume Conditions:
    - After Time Interval
    - At Specified Time
    - On Webhook Call
    - On Form Submitted
```

----------------------------------------

TITLE: Configure HTTP Request Body as Raw Data
DESCRIPTION: Use this option to send raw data in the request body. You must specify the `Content-Type` header for the raw body content and then enter the raw content itself. Refer to your service's API documentation for detailed guidance.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/index.md#_snippet_10

LANGUAGE: APIDOC
CODE:
```
Content Type: string (MIME type, e.g., "application/json")
Body: string (raw content to send)
```

----------------------------------------

TITLE: Configure HTTP Request Body as JSON
DESCRIPTION: Use this option to send your request body as JSON. You can specify the body using Name/Value pairs for fields or by directly entering raw JSON content. Refer to your service's API documentation for detailed guidance.
SOURCE: https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/index.md#_snippet_8

LANGUAGE: APIDOC
CODE:
```
Specify Body:
  - Using Fields Below:
    Body Parameters:
      Name: string
      Value: string
  - Using JSON:
    JSON: string (raw JSON content)
```