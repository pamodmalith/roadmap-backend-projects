// 1. Define the Task Interface
interface TTask {
  id: number;
  description: string;
  status: TStatus;
  createdAt: string;
  updatedAt: string;
}

type TStatus = "done" | "todo" | "in-progress";
