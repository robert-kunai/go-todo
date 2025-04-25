import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import TaskList from "~/components/task/TaskList";

export default component$(() => {
  return (
    <div>
      <TaskList />
    </div>
  );
});

export const head: DocumentHead = {
  title: "Todo List App",
  meta: [
    {
      name: "description",
      content: "A simple todo list application built with Qwik and Go",
    },
  ],
};
