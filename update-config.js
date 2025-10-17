import fs from 'fs';

// Function to update n8n configuration
function updateN8nConfig(newConfig) {
    try {
        // Read current config
        const currentConfig = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

        // Update n8n settings
        currentConfig.n8n = {
            ...currentConfig.n8n,
            ...newConfig
        };

        // Write updated config back
        fs.writeFileSync('./config.json', JSON.stringify(currentConfig, null, 2));

        console.log('✅ Configuration updated successfully!');
        console.log('📋 New configuration:');
        console.log(JSON.stringify(currentConfig.n8n, null, 2));

    } catch (error) {
        console.log('❌ Error updating configuration:', error.message);
    }
}

// Command line interface
if (import.meta.url === `file://${process.argv[1]}`) {
    const args = process.argv.slice(2);

    if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
        console.log('Usage: node update-config.js [options]');
        console.log('');
        console.log('Options:');
        console.log('  --baseUrl <url>          Update n8n instance URL');
        console.log('  --apiKey <key>          Update API key');
        console.log('  --username <username>    Update username');
        console.log('  --password <password>    Update password');
        console.log('  --all <url> <key> <username> <password>  Update all credentials');
        console.log('  --help, -h              Show this help message');
        console.log('');
        console.log('Examples:');
        console.log('  node update-config.js --baseUrl https://new-n8n-instance.com');
        console.log('  node update-config.js --apiKey new-api-key-here');
        console.log('  node update-config.js --username newuser@example.com --password newpass123');
        console.log('  node update-config.js --all https://new.com new-key user@test.com pass123');
        process.exit(0);
    }

    const newConfig = {};

    // Parse command line arguments
    for (let i = 0; i < args.length; i++) {
        const arg = args[i];

        if (arg === '--all' && args.length >= i + 5) {
            newConfig.baseUrl = args[i + 1];
            newConfig.apiKey = args[i + 2];
            newConfig.username = args[i + 3];
            newConfig.password = args[i + 4];
            break;
        } else if (arg === '--baseUrl' && args[i + 1]) {
            newConfig.baseUrl = args[i + 1];
        } else if (arg === '--apiKey' && args[i + 1]) {
            newConfig.apiKey = args[i + 1];
        } else if (arg === '--username' && args[i + 1]) {
            newConfig.username = args[i + 1];
        } else if (arg === '--password' && args[i + 1]) {
            newConfig.password = args[i + 1];
        }
    }

    if (Object.keys(newConfig).length === 0) {
        console.log('❌ No valid configuration options provided');
        process.exit(1);
    }

    updateN8nConfig(newConfig);
}

export default updateN8nConfig;
