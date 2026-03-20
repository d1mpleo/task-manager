# TaskFlow - Task Management Platform

![NestJS](https://img.shields.io/badge/NestJS-10.x-red)
![React](https://img.shields.io/badge/React-18.x-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16.x-blue)
![JWT](https://img.shields.io/badge/JWT-Authentication-orange)

A modern fullstack task management platform built with **NestJS**, **React**, **TypeScript**, and **PostgreSQL**. Organize your tasks with dynamic statuses, track deadlines, and manage your workflow efficiently.

## 📋 Table of Contents
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [API Endpoints](#-api-endpoints)
- [Project Structure](#-project-structure)
- [Database Schema](#-database-schema)
- [Contributing](#-contributing)
- [License](#-license)

## 🚀 Features

### Authentication & Security
- **JWT Authentication** - Secure login and registration with token-based authentication
- **Protected Routes** - API endpoints protected with JWT guards
- **Password Hashing** - User passwords encrypted with bcrypt

### Task Management
- **Dynamic Status System** - 4 task statuses with visual indicators:
  - 🔴 **Urgent** - High priority tasks requiring immediate attention
  - 🔵 **Future** - Tasks planned for later execution
  - 🟡 **Pending Approval** - Tasks waiting for review
  - ✅ **Done** - Completed tasks with timestamp tracking
- **Real-time Filtering** - Tab-based task filtering with live counter updates
- **Task Details Modal** - Comprehensive view with descriptions, deadlines, and technologies
- **One-click Status Updates** - Quick status changes directly from task list
- **Task Deletion** - Secure deletion with confirmation dialog

### Organization & Tracking
- **Technology Tagging** - Categorize tasks by tech stack with dynamic tags
- **Deadline Management** - Set and track task deadlines with visual indicators
- **Completion Logging** - Automatic `doneAt` timestamp when tasks are completed
- **Author Tracking** - Track who created each task with user relations
- **Creation Date** - Automatic `createdAt` timestamp

### User Interface
- **Responsive Design** - Fully responsive layout that works on desktop, tablet, and mobile
- **Live Counters** - Real-time task counts per category in navigation tabs
- **Visual Status Indicators** - Color-coded badges for instant status recognition
- **Hover Effects** - Smooth animations and visual feedback on interactions
- **Modal Windows** - Clean modal dialogs for task creation and details

## 🛠️ Tech Stack

### Backend
| Technology | Description |
|------------|-------------|
| **NestJS** | Progressive Node.js framework for building efficient server-side applications |
| **TypeScript** | Typed JavaScript for better code quality and developer experience |
| **PostgreSQL** | Powerful, open-source object-relational database system |
| **TypeORM** | ORM that supports Active Record and Data Mapper patterns |
| **JWT** | JSON Web Tokens for secure authentication |
| **bcrypt** | Library for hashing passwords |
| **class-validator** | Decorator-based validation for DTOs |

### Frontend
| Technology | Description |
|------------|-------------|
| **React 18** | Library for building user interfaces with hooks and functional components |
| **TypeScript** | Type-safe JavaScript for frontend development |
| **React Router DOM** | Declarative routing for React applications |
| **Fetch API** | Native JavaScript API for HTTP requests |
| **CSS-in-JS** | Inline styles for component-scoped styling |

### Development Tools
- **Git** - Version control system
- **Postman** - API testing and documentation
- **VS Code** - Primary code editor
- **GitHub Copilot** - AI-assisted development

## 📋 Prerequisites

- **Node.js** (v18 or higher)
- **PostgreSQL** (v14 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/d1mpleo/task-manager.git
cd task-manager