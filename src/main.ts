import {
  initializeStorage,
  readTasks,
  addTasks,
  updateTasks,
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
  if (args.length > 3) {
    console.log("Too many arguments provided. Please check your command.");
    return;
  }

  // Extract the command
  const command = args[0];

  switch (command) {
    case "add":
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
      if (!args[1]) {
        console.error("Please provide a task ID to update.");
        return;
      } else if (!args[2]) {
        console.error("Please provide a new description for the task.");
        return;
      }
      const idToUpdate = parseInt(args[1]);
      const newDescription = args[2].trim();
      const success = updateTasks(idToUpdate, newDescription);
      if (success) {
        console.log(`Task updated successfully (ID: ${idToUpdate})`);
      } else {
        console.log("Error occurred when updating task. Please try again!");
      }
      break;

    case "list":
      const param = args[1];
      if (param) {
        if (param === "done" || param === "todo" || param === "in-progress") {
          console.log(param);
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

    default:
      console.log(
        "Unknown command. Available commands: add, list, update, delete",
      );
  }
}

// Run the app
main();
