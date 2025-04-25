import { component$, useSignal, $, type PropFunction } from "@builder.io/qwik";
import { createTask } from "../../api/taskService";
import type { Task } from "../models/task";

interface TaskFormProps {
  onTaskCreated$: PropFunction<(task: Task) => void>;
}

export default component$<TaskFormProps>(({ onTaskCreated$ }) => {
  const title = useSignal("");
  const description = useSignal("");
  const isSubmitting = useSignal(false);
  const errorMessage = useSignal("");

  const handleSubmit = $(async () => {
    if (!title.value.trim()) {
      errorMessage.value = "Title is required";
      return;
    }

    try {
      isSubmitting.value = true;
      errorMessage.value = "";

      const newTask = await createTask({
        title: title.value,
        description: description.value,
      });

      title.value = "";
      description.value = "";

      onTaskCreated$(newTask);
    } catch (error) {
      errorMessage.value = "Failed to create task";
      console.error(error);
    } finally {
      isSubmitting.value = false;
    }
  });

  return (
    <div class="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 class="text-2xl font-bold mb-4">Add New Task</h2>

      {errorMessage.value && (
        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {errorMessage.value}
        </div>
      )}

      <form preventdefault:submit onSubmit$={handleSubmit} class="space-y-4">
        <div>
          <label
            for="title"
            class="block text-sm font-medium text-gray-700 mb-1"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            class="w-full p-2 border rounded-md"
            value={title.value}
            onInput$={(e) =>
              (title.value = (e.target as HTMLInputElement).value)
            }
          />
        </div>

        <div>
          <label
            for="description"
            class="block text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            class="w-full p-2 border rounded-md"
            rows={3}
            value={description.value}
            onInput$={(e) =>
              (description.value = (e.target as HTMLTextAreaElement).value)
            }
          />
        </div>

        <button
          type="submit"
          class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md disabled:opacity-50"
          disabled={isSubmitting.value}
        >
          {isSubmitting.value ? "Adding..." : "Add Task"}
        </button>
      </form>
    </div>
  );
});
