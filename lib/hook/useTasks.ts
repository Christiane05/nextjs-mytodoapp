import { useState, useEffect } from "react";
import { getTasks } from "@/lib/queries";
import { Task } from "../type";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]); // On indique que tasks est un tableau de Task

  useEffect(() => {
    getTasks().then(setTasks);
  }, []);

  return tasks;
}
