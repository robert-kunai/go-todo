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
      <div class="card mb-4">
        {isEditing.value ? (
          <div class="space-y-4">
            <input
              type="text"
              class="form-control"
              value={titleInput.value}
              onInput$={(e) =>
                (titleInput.value = (e.target as HTMLInputElement).value)
              }
            />
            <textarea
              class="form-control"
              value={descriptionInput.value}
              onInput$={(e) =>
                (descriptionInput.value = (
                  e.target as HTMLTextAreaElement
                ).value)
              }
            />
            <div class="flex space-x-2">
              <button class="btn btn-primary" onClick$={handleSave}>
                Save
              </button>
              <button class="btn btn-secondary" onClick$={handleCancel}>
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
                class="h-5 w-5 mr-2 text-primary-600 rounded"
                onClick$={handleToggleComplete}
              />
              <h3
                class={`text-lg font-semibold ${task.completed ? "line-through text-gray-500" : ""}`}
              >
                {task.title}
              </h3>
            </div>
            <p
              class={`mb-4 ${task.completed ? "text-gray-400" : "text-gray-700"}`}
            >
              {task.description}
            </p>
            <div class="flex space-x-2">
              <button class="btn btn-secondary" onClick$={handleEdit}>
                Edit
              </button>
              <button class="btn btn-danger" onClick$={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
);
