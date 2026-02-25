#!/usr/bin/env node

import {
  initializeStorage,
  readTasks,
  addTasks,
  updateTasks,
  deleteTask,
  updateTaskStatus,
} from "./fileOperations.js";

// 3. Main function to handle CLI commands
function main() {
  initializeStorage();

  // process.argv returns an array: [node_path, script_path, command, arg1, arg2...]
  // The actual user command starts at index 2
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log(
      "No command provided. Available commands: add, list, update, delete",
    );
    return;
  }

  // Extract the command
  const command = args[0];

  switch (command) {
    case "add":
      if (args.length > 2) {
        console.log(
          'Too many arguments. If your task has spaces, wrap it in quotes: add "My task"',
        );
        return;
      }
      const description = args[1];
      if (!description) {
        console.error("Please provide a task description.");
        return;
      }
      const id = addTasks(description);
      if (id > 0) {
        console.log(`Task added successfully (ID: ${id})`);
      } else {
        console.log("Error occured when adding task. Please try again!");
      }
      break;

    case "update":
      if (args.length > 3) {
        console.log('Too many arguments. Usage: update <id> "New Description"');
        return;
      }
      if (!args[1] || !args[2]) {
        console.error("Please provide both a task ID and a new description.");
        return;
      }
      const idToUpdate = parseInt(args[1]);
      const newDescription = args[2].trim();
      if (updateTasks(idToUpdate, newDescription)) {
        console.log(`Task updated successfully (ID: ${idToUpdate})`);
      } else {
        console.log("Error occurred when updating task. Please try again!");
      }
      break;

    case "list":
      if (args.length > 2) {
        console.log("Too many arguments. Usage: list OR list <status>");
        return;
      }
      const param = args[1];
      if (param) {
        if (param === "done" || param === "todo" || param === "in-progress") {
          // console.log(param); // Uncomment for debugging
          const tasks = readTasks(param);
          if (tasks.length === 0) {
            return console.log("No tasks found with status:", param);
          }
          console.log(tasks);
          break;
        } else {
          console.log(
            `Unknown status: ${param}. Available status are: 'todo', 'in-progress', 'done'`,
          );
          break;
        }
      } else {
        console.log("Command received: List tasks");
        const tasks = readTasks();
        if (tasks.length === 0) {
          return console.log("No tasks found.");
        }
        console.log("Tasks:", tasks);
      }
      break;

    case "delete":
      if (args.length > 2) {
        console.log("Too many arguments. Usage: delete <id>");
        return;
      }
      if (!args[1]) {
        console.error("Please provide a task ID to delete.");
        return;
      }
      const idToDelete = parseInt(args[1]);
      const status = deleteTask(idToDelete);
      if (status) {
        console.log(`Task deleted successfully (ID: ${idToDelete})`);
      } else {
        console.log("Error occurred when deleting task. Please try again!");
      }
      break;

    case "mark-in-progress":
      if (args.length > 2) {
        console.log("Too many arguments. Usage: mark-in-progress <id>");
        return;
      }
      if (!args[1]) {
        console.error("Please provide a task ID to update.");
        return;
      }
      const idToMarkInProgress = parseInt(args[1]);
      const statusInProgress = updateTaskStatus(
        idToMarkInProgress,
        "in-progress",
      );
      if (statusInProgress) {
        console.log(`Task marked as in-progress (ID: ${idToMarkInProgress})`);
      } else {
        console.log(
          "Error occurred when marking task as in-progress. Please try again!",
        );
      }
      break;

    case "mark-done":
      if (args.length > 2) {
        console.log("Too many arguments. Usage: mark-done <id>");
        return;
      }
      if (!args[1]) {
        console.error("Please provide a task ID to update.");
        return;
      }
      const idToMarkDone = parseInt(args[1]);
      const statusDone = updateTaskStatus(idToMarkDone, "done");
      if (statusDone) {
        console.log(`Task marked as done (ID: ${idToMarkDone})`);
      } else {
        console.log(
          "Error occurred when marking task as done. Please try again!",
        );
      }
      break;

    default:
      console.log(
        "Unknown command. Available commands: add, list, update, mark-in-progress, mark-done, delete",
      );
  }
}

// Run the app
main();
