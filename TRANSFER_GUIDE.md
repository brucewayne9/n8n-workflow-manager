# Transfer Guide: Moving n8n Workflow Manager to Another Machine

## 📦 What to Transfer

### Essential Files:
- `config.json` - Contains your n8n connection credentials
- `package.json` - Node.js dependencies
- All `.js` files - The workflow management tools

### Optional Files:
- `README.md` - Documentation
- `TRANSFER_GUIDE.md` - This guide
- `workflow-templates.js` - Pre-built workflow templates

## 🔄 Transfer Methods

### Method 1: Manual File Copy
1. Copy the entire `n8n-workflow-manager` folder to the new machine
2. On the new machine, navigate to the folder:
   ```bash
   cd n8n-workflow-manager
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Test the connection:
   ```bash
   node test-connection.js
   ```

### Method 2: Git Repository (Recommended)
1. Initialize git in the current folder:
   ```bash
   git init
   git add .
   git commit -m "Initial n8n workflow manager setup"
   ```
2. Push to a private repository (GitHub, GitLab, etc.)
3. Clone on the new machine:
   ```bash
   git clone <your-repo-url>
   cd n8n-workflow-manager
   npm install
   node test-connection.js
   ```

### Method 3: Archive and Transfer
1. Create a zip archive:
   ```bash
   zip -r n8n-workflow-manager.zip n8n-workflow-manager/
   ```
2. Transfer the zip file to the new machine
3. Extract and install:
   ```bash
   unzip n8n-workflow-manager.zip
   cd n8n-workflow-manager
   npm install
   ```

## ⚙️ Prerequisites for New Machine

### Required Software:
- **Node.js** (version 14 or higher)
- **npm** (comes with Node.js)

### Installation Commands:
```bash
# Check if Node.js is installed
node --version
npm --version

# If not installed, install Node.js from https://nodejs.org/
```

## 🔒 Security Considerations

### Protecting Your Credentials:
- The `config.json` file contains your API key
- Consider adding it to `.gitignore` if using git:
  ```bash
  echo "config.json" >> .gitignore
  ```
- Or use environment variables instead of the config file

### Environment Variable Alternative:
Create a `.env` file:
```
N8N_BASE_URL=https://automate.groundrushlabs.com
N8N_API_KEY=your-api-key-here
```

Then modify the tools to read from environment variables instead of config.json.

## 🧪 Testing After Transfer

Run these commands to verify everything works:

```bash
# Test connection
node test-connection.js

# List existing workflows
node list-workflows.js

# Test authentication
node test-auth.js
```

## 📋 Quick Setup Script

Create this script on the new machine for easy setup:

```bash
#!/bin/bash
# setup-n8n-manager.sh

echo "Setting up n8n workflow manager..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed. Please install it from https://nodejs.org/"
    exit 1
fi

# Install dependencies
npm install

# Test connection
echo "Testing connection to n8n instance..."
node test-connection.js

echo "Setup complete! You can now use the workflow management tools."
```

## 🔧 Troubleshooting

### Common Issues:

1. **Node.js not found**: Install Node.js from https://nodejs.org/
2. **Connection errors**: Verify your n8n instance is accessible and API key is valid
3. **Permission errors**: Ensure you have read/write permissions for the folder

### Debug Steps:
```bash
# Check Node.js version
node --version

# Check folder permissions
ls -la

# Test network connectivity
curl -I https://automate.groundrushlabs.com

# Check config file
cat config.json
```

## 📞 Support

If you encounter issues during transfer, you can:
1. Run the diagnostic tool: `node diagnose-api.js`
2. Check the README.md for usage instructions
3. Verify your n8n instance is running and accessible

The connection settings in `config.json` will work on any machine with internet access to your n8n instance.
