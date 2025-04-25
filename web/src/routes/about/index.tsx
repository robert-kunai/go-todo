import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <div class="container mx-auto px-4 py-8 max-w-4xl">
      <div class="card">
        <h1 class="text-3xl font-bold mb-6 text-primary-800">
          About Task Manager
        </h1>

        <div class="space-y-6">
          <section>
            <h2 class="text-xl font-semibold mb-3 text-primary-700">
              Our Application
            </h2>
            <p class="text-secondary-700">
              Task Manager is a simple yet powerful application designed to help
              you organize your tasks efficiently. Built with modern
              technologies, it provides a seamless experience for managing your
              daily activities.
            </p>
          </section>

          <section>
            <h2 class="text-xl font-semibold mb-3 text-primary-700">
              Technology Stack
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="bg-primary-50 p-4 rounded-lg">
                <h3 class="font-medium text-primary-800 mb-2">Frontend</h3>
                <ul class="list-disc pl-5 space-y-1 text-secondary-700">
                  <li>Qwik.js - for ultra-fast server-side rendering</li>
                  <li>Tailwind CSS - for beautiful, responsive design</li>
                  <li>
                    TypeScript - for type safety and better developer experience
                  </li>
                </ul>
              </div>
              <div class="bg-primary-50 p-4 rounded-lg">
                <h3 class="font-medium text-primary-800 mb-2">Backend</h3>
                <ul class="list-disc pl-5 space-y-1 text-secondary-700">
                  <li>Go - for high-performance API</li>
                  <li>Gorilla Mux - for efficient routing</li>
                  <li>RESTful API design - for seamless integration</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 class="text-xl font-semibold mb-3 text-primary-700">
              Features
            </h2>
            <ul class="list-disc pl-5 space-y-1 text-secondary-700">
              <li>Create, read, update, and delete tasks</li>
              <li>Mark tasks as completed</li>
              <li>Intuitive user interface</li>
              <li>Fast performance with server-side rendering</li>
              <li>Responsive design for all device sizes</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "About Task Manager",
  meta: [
    {
      name: "description",
      content:
        "Learn about Task Manager, a simple todo application built with Qwik and Go",
    },
  ],
};
