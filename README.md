# AI Agents Tutorial

This repository contains a step-by-step tutorial that guides you through building increasingly sophisticated AI agent systems. Each level builds upon the previous one, demonstrating core concepts in AI agent development.

## Tutorial Levels

The tutorial is structured in progressive levels:

1. **Basic LLM**: Use only an AI and nothing else
2. **Agent with Context**: Adds short-term memory to maintain conversation relevance
3. **Agent with Context and System Prompt**: Uses a persistent system prompt to guide behavior and tone
4. **Agent with Context and Read-Only Tools**: Agent can query live crypto prices and view historical trends
5. **Agent with Context, Write Access, and Wallet Integration**: Agent can execute trades and interact with blockchain via wallet


## Companion Guide

For a guided walkthrough of using this demo and understanding each level, check out the companion guide: [AI Agents: From 0 to 1](https://melboudi.substack.com/p/ai-agents-from-0-to-1)

## Getting Started

## Development

- The frontend is built with Remix
- The backend uses Koa and implements the Model Context Protocol
- Each level demonstrates a different aspect of AI agent architecture

For more information on the Remix framework, visit [remix.run](https://remix.run).


### Prerequisites

- Node.js v22.13.1 (this repository has only been tested with this version)
  - You can use [nvm](https://github.com/nvm-sh/nvm) to install and manage Node.js versions:
    ```sh
    nvm install 22.13.1
    nvm use 22.13.1
    ```

### Setup

1. Clone this repository
2. Install dependencies:
   ```sh
   npm ci
   ```
3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Fill in the required API keys and wallet information:
     - OpenAI API key OR Gemini API key for having access to an LLM model
     - Alchemy API key (for interacting with the blockchain)
     - Wallet private key (use the keygen script in scripts/keygen.ts to generate)

To get the wallet private key run

```sh
npm run keygen
```

### Running the Application

Start both the Remix frontend and the MCP server:

```sh
npm run dev:all
```

- Frontend will be available at: http://localhost:5173
- MCP server will run in the background

## Testing the MCP Server

You can test the Model Context Protocol server using the [MCP Inspector](https://github.com/modelcontextprotocol/inspector):

This will open the MCP Inspector interface where you can interact with your MCP server and debug requests/responses.

For more information on the Model Context Protocol, visit [modelcontextprotocol.io](https://modelcontextprotocol.io).
