// Workflow templates for common automation scenarios

export const workflowTemplates = {
    // Simple webhook trigger workflow
    webhookTrigger: {
        name: "Webhook Data Processor",
        nodes: [
            {
                parameters: {},
                name: "Webhook",
                type: "n8n-nodes-base.webhook",
                typeVersion: 1,
                position: [250, 300],
                webhookId: "webhook-data-processor"
            },
            {
                parameters: {
                    jsCode: "// Process incoming webhook data\nreturn {\n  processed: true,\n  timestamp: new Date().toISOString(),\n  data: $json\n};"
                },
                name: "Process Data",
                type: "n8n-nodes-base.code",
                typeVersion: 1,
                position: [450, 300]
            },
            {
                parameters: {
                    options: {}
                },
                name: "Success Response",
                type: "n8n-nodes-base.httpResponse",
                typeVersion: 1,
                position: [650, 300]
            }
        ],
        connections: {
            "Webhook": {
                main: [
                    [
                        {
                            node: "Process Data",
                            type: "main",
                            index: 0
                        }
                    ]
                ]
            },
            "Process Data": {
                main: [
                    [
                        {
                            node: "Success Response",
                            type: "main",
                            index: 0
                        }
                    ]
                ]
            }
        },
        settings: {
            saveExecutionProgress: true,
            saveManualExecutions: true,
            saveDataErrorExecution: "all",
            saveDataSuccessExecution: "all",
            executionTimeout: 3600,
            timezone: "America/New_York"
        }
    },

    // Scheduled data fetch workflow
    scheduledFetch: {
        name: "Scheduled Data Fetcher",
        nodes: [
            {
                parameters: {
                    triggerTimes: {
                        mode: "everyMinute",
                        options: {}
                    }
                },
                name: "Schedule Trigger",
                type: "n8n-nodes-base.scheduleTrigger",
                typeVersion: 1,
                position: [250, 300]
            },
            {
                parameters: {
                    url: "https://jsonplaceholder.typicode.com/posts",
                    sendHeaders: true,
                    headerParameters: {
                        parameters: [
                            {
                                name: "Content-Type",
                                value: "application/json"
                            }
                        ]
                    }
                },
                name: "HTTP Request",
                type: "n8n-nodes-base.httpRequest",
                typeVersion: 1,
                position: [450, 300]
            },
            {
                parameters: {
                    jsCode: "// Log fetched data\nconsole.log('Fetched data:', $json);\nreturn $json;"
                },
                name: "Process Results",
                type: "n8n-nodes-base.code",
                typeVersion: 1,
                position: [650, 300]
            }
        ],
        connections: {
            "Schedule Trigger": {
                main: [
                    [
                        {
                            node: "HTTP Request",
                            type: "main",
                            index: 0
                        }
                    ]
                ]
            },
            "HTTP Request": {
                main: [
                    [
                        {
                            node: "Process Results",
                            type: "main",
                            index: 0
                        }
                    ]
                ]
            }
        },
        settings: {
            saveExecutionProgress: true,
            saveManualExecutions: true,
            saveDataErrorExecution: "all",
            saveDataSuccessExecution: "all",
            executionTimeout: 3600,
            timezone: "America/New_York"
        }
    },

    // Email notification workflow
    emailNotification: {
        name: "Email Notification System",
        nodes: [
            {
                parameters: {
                    triggerTimes: {
                        mode: "everyHour",
                        options: {}
                    }
                },
                name: "Schedule Trigger",
                type: "n8n-nodes-base.scheduleTrigger",
                typeVersion: 1,
                position: [250, 300]
            },
            {
                parameters: {
                    toEmail: "admin@agentertainment.com",
                    subject: "Automated Notification",
                    text: "This is an automated notification from your n8n workflow.",
                    additionalFields: {}
                },
                name: "Send Email",
                type: "n8n-nodes-base.emailSend",
                typeVersion: 1,
                position: [450, 300]
            }
        ],
        connections: {
            "Schedule Trigger": {
                main: [
                    [
                        {
                            node: "Send Email",
                            type: "main",
                            index: 0
                        }
                    ]
                ]
            }
        },
        settings: {
            saveExecutionProgress: true,
            saveManualExecutions: true,
            saveDataErrorExecution: "all",
            saveDataSuccessExecution: "all",
            executionTimeout: 3600,
            timezone: "America/New_York"
        }
    }
};

// Helper function to create custom workflows
export function createCustomWorkflow(name, nodes, connections, settings = {}) {
    return {
        name,
        nodes,
        connections,
        settings: {
            saveExecutionProgress: true,
            saveManualExecutions: true,
            saveDataErrorExecution: "all",
            saveDataSuccessExecution: "all",
            executionTimeout: 3600,
            timezone: "America/New_York",
            ...settings
        }
    };
}
