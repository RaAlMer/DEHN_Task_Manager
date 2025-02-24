# Task Manager App

This is a Simple Task Manager application built using Vue 3, Pinia for state management, and Tailwind CSS for styling. It allows users to create, edit, delete, and list tasks with various properties such as title, description, due date, and completion status.

## Features

- Add tasks with title, description, due date, and status.
- Edit tasks to update their details.
- Toggle the completion status of tasks.
- Delete tasks.
- Persist tasks to `localStorage` to maintain data across sessions.

## Tech Stack

- **Vue 3**: For building the user interface.
- **Pinia**: For state management.
- **Tailwind CSS**: For styling the app.
- **LocalStorage**: To persist tasks across sessions.

## Prerequisites

Make sure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** (v7 or higher) or **yarn**

You can check if you have Node.js and npm installed by running:

```bash
node -v
npm -v
```

## Project Setup

### Clone the repository

```sh
git clone https://github.com/RaAlMer/DEHN_Task_Manager.git
cd DEHN_Task_Manager
```

### Install the dependencies

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
