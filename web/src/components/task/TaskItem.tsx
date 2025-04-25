import { component$, useSignal, $, type PropFunction } from "@builder.io/qwik";
import type { Task } from "../models/task";
import { updateTask, deleteTask } from "../../api/taskService";

interface TaskItemProps {
  task: Task;
  onTaskUpdated$: PropFunction<(updatedTask: Task) => void>;
  onTaskDeleted$: PropFunction<(taskId: string) => void>;
}

export default component$<TaskItemProps>(
  ({ task, onTaskUpdated$, onTaskDeleted$ }) => {
    const isEditing = useSignal(false);
    const titleInput = useSignal(task.title);
    const descriptionInput = useSignal(task.description);

    const handleSave = $(async () => {
      const updatedTask = await updateTask(task.id, {
        title: titleInput.value,
        description: descriptionInput.value,
      });
      isEditing.value = false;
      onTaskUpdated$(updatedTask);
    });

    const handleCancel = $(() => {
      titleInput.value = task.title;
      descriptionInput.value = task.description;
      isEditing.value = false;
    });

    const handleToggleComplete = $(async () => {
      const updatedTask = await updateTask(task.id, {
        completed: !task.completed,
      });
      onTaskUpdated$(updatedTask);
    });

    const handleEdit = $(() => {
      isEditing.value = true;
    });

    const handleDelete = $(async () => {
      await deleteTask(task.id);
      onTaskDeleted$(task.id);
    });

    return (
      <div class="border p-4 rounded-md mb-4 bg-white shadow-sm">
        {isEditing.value ? (
          <div class="space-y-2">
            <input
              type="text"
              class="border rounded p-2 w-full"
              value={titleInput.value}
              onInput$={(e) =>
                (titleInput.value = (e.target as HTMLInputElement).value)
              }
            />
            <textarea
              class="border rounded p-2 w-full"
              value={descriptionInput.value}
              onInput$={(e) =>
                (descriptionInput.value = (
                  e.target as HTMLTextAreaElement
                ).value)
              }
            />
            <div class="flex space-x-2">
              <button
                class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick$={handleSave}
              >
                Save
              </button>
              <button
                class="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                onClick$={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div class="flex items-center mb-2">
              <input
                type="checkbox"
                checked={task.completed}
                class="mr-2 h-5 w-5"
                onClick$={handleToggleComplete}
              />
              <h3
                class={`text-lg font-semibold ${task.completed ? "line-through text-gray-500" : ""}`}
              >
                {task.title}
              </h3>
            </div>
            <p
              class={`text-gray-700 mb-3 ${task.completed ? "text-gray-400" : ""}`}
            >
              {task.description}
            </p>
            <div class="flex space-x-2">
              <button
                class="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                onClick$={handleEdit}
              >
                Edit
              </button>
              <button
                class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                onClick$={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
);
