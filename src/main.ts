import { initializeStorage, readTasks, addTasks } from "./fileOperations.js";

// 3. Main function to handle CLI commands
function main() {
  initializeStorage();

  // process.argv returns an array: [node_path, script_path, command, arg1, arg2...]
  // The actual user command starts at index 2
  const args = process.argv.slice(2);

  const command = args[0];

  switch (command) {
    case "add":
      const description = args[1];
      if (!description) {
        console.error("Please provide a task description.");
        return;
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
