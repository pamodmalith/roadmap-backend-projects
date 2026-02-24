// 1. Define the Task Interface
interface TTask {
  id: number;
  description: string;
  status: "todo" | "in-progress" | "done";
  createdAt: string;
  updatedAt: string;
}

type TStatus = "done" | "todo" | "in-progress";
