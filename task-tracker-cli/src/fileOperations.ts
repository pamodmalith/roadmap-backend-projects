import * as fs from "fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define where the JSON file will be stored
const FILE_PATH = path.join(__dirname, "..", "tasks.json");

// Ensure the JSON file exists
function initializeStorage() {
  if (!fs.existsSync(FILE_PATH)) {
    fs.writeFileSync(FILE_PATH, JSON.stringify([]), "utf-8");
  }
}

// Read tasks from the JSON file
const readTasks = (status?: TStatus): TTask[] => {
  try {
    const data = fs.readFileSync(FILE_PATH, "utf-8");
    const tasks: TTask[] = JSON.parse(data) as TTask[];
    if (!status) {
      return tasks;
    }
    return tasks.filter((task) => task.status === status);
  } catch (error) {
    // console.error("Error reading tasks:", error); // Uncomment for debugging
    return [];
  }
};

// Add tasks to the JSON file
function addTasks(task: string): number {
  try {
    const tasks = readTasks();
    const newId = Math.max(0, ...tasks.map((task) => task?.id || 0)) + 1;
    const newTask: TTask = {
      id: newId,
      description: task,
      status: "todo",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    tasks.push(newTask);
    fs.writeFileSync(FILE_PATH, JSON.stringify(tasks, null, 2), "utf-8");
    return newId;
  } catch (error) {
    // console.error("Error in addTask:", error); // Uncomment for debugging
    return -1;
  }
}

// Update task in the JSON file
const updateTasks = (id: number, task: string): boolean => {
  try {
    const tasks = readTasks();
    const taskIndex = tasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) {
      console.error(`Task with ID ${id} not found.`);
      return false;
    }
    tasks[taskIndex]!.description = task;
    tasks[taskIndex]!.updatedAt = new Date().toISOString();
    fs.writeFileSync(FILE_PATH, JSON.stringify(tasks, null, 2), "utf-8");
    return true;
  } catch (error) {
    // console.error("Error in updateTasks:", error); // Uncomment for debugging
    return false;
  }
};

//update task status in the JSON file
const updateTaskStatus = (id: number, status: TStatus): boolean => {
  try {
    const tasks = readTasks();
    const taskIndex = tasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) {
      console.error(`Task with ID ${id} not found.`);
      return false;
    }
    tasks[taskIndex]!.status = status;
    tasks[taskIndex]!.updatedAt = new Date().toISOString();
    fs.writeFileSync(FILE_PATH, JSON.stringify(tasks, null, 2), "utf-8");
    return true;
  } catch (error) {
    // console.error("Error in updateTaskStatus:", error); // Uncomment for debugging
    return false;
  }
};

// Delete task from the JSON file
const deleteTask = (id: number): boolean => {
  try {
    const tasks = readTasks();
    const index = tasks.findIndex((task) => task.id === id);
    if (index === -1) {
      console.error(`Task with ID ${id} not found.`);
      return false;
    }
    tasks.splice(index, 1);
    fs.writeFileSync(FILE_PATH, JSON.stringify(tasks, null, 2), "utf-8");
    return true;
  } catch (error) {
    // console.error("Error in deleteTask:", error); // Uncomment for debugging
    return false;
  }
};

export {
  initializeStorage,
  readTasks,
  addTasks,
  updateTasks,
  deleteTask,
  updateTaskStatus,
};
