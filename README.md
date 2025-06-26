# NGZ AI Tools

A modern monorepo containing a collection of AI-focused TypeScript packages designed for seamless AI integration and development.

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Nx](https://img.shields.io/badge/Powered%20By-Nx-blue)](https://nx.dev/)

## 📦 Packages

- **mcp-core**: Core types, interfaces and utilities for MCP (Model Context Protocol) implementations

## Examples

- **mcp-server-wrapper**: A flexible server wrapper for AI integrations

## 🚀 Quick Start

### Installation

```bash
# Using the published package
npx -y @anoguez/mcp-server-wrapper@latest

# Running in stdio mode
npx -y @anoguez/mcp-server-wrapper@latest --mode=stdio
```

### Local Development

```bash
# Run the server wrapper in development mode
npx npm run dev -w @anoguez/mcp-server-wrapper
```

## 🔍 MCP Inspector

The MCP Inspector provides a visual interface for monitoring and debugging:

![MCP Inspector](./docs/mcp-Inspector.jpeg)

To launch the inspector:

```bash
npx npm run inspector -w @anoguez/mcp-server-wrapper
```

## 🛠️ Development

This project uses Nx for monorepo management. To visualize the project structure:

```bash
npx nx graph
```

## 🧰 Tech Stack

- TypeScript
- Nx Monorepo
- Node.js
- Conventional Commits
- Husky for Git Hooks
- ESLint + Prettier

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Built with ❤️ by [anoguez](https://github.com/anoguez)
