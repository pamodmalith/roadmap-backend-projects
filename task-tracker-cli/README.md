# Task Tracker CLI 📝

A lightweight, command-line interface (CLI) application to manage your tasks. This project was built to practice foundational backend concepts, including file system operations, data persistence with JSON, and command-line argument parsing in Node.js.

This is a solution to the [Task Tracker project](https://roadmap.sh/projects/task-tracker) on roadmap.sh.

## ✨ Features

- **Add Tasks:** Quickly add new tasks to your list.
- **List Tasks:** View all tasks, or filter them specifically by their status (`todo`, `in-progress`, `done`).
- **Update & Delete:** Modify existing tasks or remove them entirely.
- **Data Persistence:** Tasks are saved locally to a `tasks.json` file, ensuring no data is lost between terminal sessions.

## 🛠️ Tech Stack

- **Language:** TypeScript / Node.js
- **Storage:** Local JSON file (`fs` module)
- **Dependencies:** None (Zero external libraries used for core functionality)

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

Make sure you have Node.js installed on your system.

### Installation

1. Clone the parent repository:

```bash
git clone https://github.com/pamodmalith/roadmap-backend-projects.git
```

2. Navigate to the project directory:

```bash
cd roadmap-backend-projects/task-tracker-cli
```

3. Install the TypeScript development dependencies:

```bash
npm install
```

4. Compile the TypeScript code into JavaScript:

```bash
npm run build
```

### 🌍 Global Setup (Recommended)

To use this CLI tool from anywhere on your system without navigating to the project folder, you can link it globally.

1. Make the compiled output executable (Linux/macOS):

```bash
chmod +x dist/main.js
```

2. Create a global symlink:

```bash
npm link
```

_(To uninstall the global command later, run `npm rm -g task-tracker-cli`)._

## 💻 Usage

If you set up the global link, you can interact with the CLI from any folder using the `task-cli` command. _(If running locally without the **link**, substitute `task-cli` with `npm start`)._
**Adding a new task:**

```bash
task-cli add "Buy groceries"
```

**Updating a task:**

```bash
task-cli update 1 "Buy groceries and cook dinner"
```

**Managing status:**

```bash
task-cli mark-in-progress 1
task-cli mark-done 1
```

**Listing tasks:**

```bash
task-cli list
task-cli list done
task-cli list todo
```

**Deleting a task:**

```bash
task-cli delete 1
```

<!--
Once the code is compiled, you can interact with the CLI using the `npm start` command followed by your desired action.
**Adding a new task:**
```bash
npm start add "Buy groceries"
```
**Listing all tasks:**
```bash
npm start list
```
**Listing tasks by status:**
```bash
npm start list done
npm start list todo
```
-->

---

_Built by Pamod Malith as part of the backend developer roadmap._
