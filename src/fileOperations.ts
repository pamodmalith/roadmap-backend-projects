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
const readTasks = (status: TStatus = "all"): TTask[] => {
  try {
    const data = fs.readFileSync(FILE_PATH, "utf-8");
    const tasks: TTask[] = JSON.parse(data) as TTask[];
    if (status === "all") {
      return tasks;
    }
    return tasks.filter((task) => task.status === status);
  } catch (error) {
    console.error("Error reading tasks:", error);
    return [];
  }
};

// Add tasks to the JSON file
function addTasks(task: string): number {
  return -1;
}

export { initializeStorage, readTasks, addTasks };
