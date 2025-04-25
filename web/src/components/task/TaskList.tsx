import { component$, useSignal, useStore, useTask$, $ } from "@builder.io/qwik";
import { getAllTasks } from "../../api/taskService";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";
import type { Task } from "../models/task";

export default component$(() => {
  const tasks = useStore<Task[]>([]);
  const isLoading = useSignal(true);
  const error = useSignal<string | null>(null);

  // This function properly captures the task update in the local state
  const handleTaskUpdated = $((updatedTask: Task) => {
    const index = tasks.findIndex((task) => task.id === updatedTask.id);
    if (index !== -1) {
      tasks[index] = updatedTask;
    }
  });

  // This function properly captures task deletion in the local state
  const handleTaskDeleted = $((taskId: string) => {
    const index = tasks.findIndex((task) => task.id === taskId);
    if (index !== -1) {
      tasks.splice(index, 1);
    }
  });

  // This function properly captures task creation in the local state
  const handleTaskCreated = $((newTask: Task) => {
    tasks.unshift(newTask);
  });

  // Load tasks on component mount
  useTask$(async () => {
    try {
      isLoading.value = true;
      error.value = null;
      const fetchedTasks = await getAllTasks();
      tasks.length = 0; // Clear the array
      tasks.push(...fetchedTasks);
    } catch (err) {
      error.value = "Failed to load tasks. Please try again later.";
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  });

  return (
    <div class="container mx-auto px-4 py-8 max-w-4xl">
      <h1 class="text-3xl font-bold mb-8 text-center">Todo List App</h1>

      <TaskForm onTaskCreated$={handleTaskCreated} />

      {isLoading.value ? (
        <div class="flex justify-center my-12">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error.value ? (
        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error.value}
        </div>
      ) : tasks.length === 0 ? (
        <div class="text-center p-8 bg-gray-50 rounded-lg">
          <p class="text-gray-600 text-lg">
            No tasks yet. Add your first task above!
          </p>
        </div>
      ) : (
        <div>
          <h2 class="text-xl font-semibold mb-4">
            Your Tasks ({tasks.length})
          </h2>
          <div>
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onTaskUpdated$={handleTaskUpdated}
                onTaskDeleted$={handleTaskDeleted}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
});
