# Simple eWallet System Design

The Simple eWallet System is a Node.js-based backend application designed to simulate the basic functionalities of an e-wallet system.

## Table of Contents

- [Overview](#overview)
- [Technology Stack](#technology-stack)
- [File Hierarchy](#file-hierarchy)
- [Swagger Documentation](#swagger-documentation)

## Overview

The Simple eWallet System is a Node.js-based backend application designed to simulate the basic functionalities of an e-wallet system. It allows users to securely manage financial transactions such as deposits and withdrawals, monitor account balances, and view transaction histories across multiple currencies. The system implements role-based access control (RBAC) to differentiate access levels between regular users, finance team members, support team members and administrators.

## Technology Stack

- **Backend Framework**: Node.js
- **Database**: MongoDB
- **Caching**: Redis
- **Authentication**: JWT
- **Documentation**: Swagger

## File Hierarchy

The file tree of the main branch of the application is shown below.

```
.
├── Controllers
│   ├── Account.js
│   ├── Admin.js
│   ├── Auth.js
│   ├── BankAccount.js
│   ├── Transaction.js
│   └── User.js
├── LICENSE
├── Middlewares
│   ├── LanguageHelper.js
│   ├── MailHelper.js
│   ├── RedisHelper.js
│   ├── RolePermissionHelper.js
│   └── TokenHelper.js
├── Models
│   ├── Account.js
│   ├── BankAccount.js
│   ├── Role.js
│   ├── Transaction.js
│   └── User.js
├── README.md
├── Routes
│   ├── Account.js
│   ├── Admin.js
│   ├── Auth.js
│   ├── BankAccount.js
│   ├── Transaction.js
│   ├── User.js
│   └── index.js
├── Services
│   ├── Account.js
│   ├── Admin.js
│   ├── Auth.js
│   ├── BankAccount.js
│   ├── RedisClient.js
│   ├── Transaction.js
│   └── User.js
├── index.js
├── package-lock.json
├── package.json
└── swaggerOptions.js
```

## Swagger Documentation

Swagger documentation is available at /api-docs. This provides a detailed overview of all API endpoints, request parameters, and response structures. To access the Swagger UI, navigate to http://localhost:3000/api-docs in your web browser.