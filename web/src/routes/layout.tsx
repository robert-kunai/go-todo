import { component$, Slot } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { RequestHandler } from "@builder.io/qwik-city";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this layout
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 minutes, revalidate on the server to get a fresh version of this page
    maxAge: 60 * 5,
  });
};

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  };
});

export default component$(() => {
  return (
    <>
      <header class="bg-primary-700 text-white py-4 shadow-md">
        <div class="container mx-auto px-4">
          <div class="flex justify-between items-center">
            <h1 class="text-2xl font-bold">Task Manager</h1>
            <nav>
              <ul class="flex space-x-4">
                <li>
                  <a href="/" class="hover:text-primary-200 transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/about"
                    class="hover:text-primary-200 transition-colors"
                  >
                    About
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <main>
        <Slot />
      </main>
      <footer class="bg-secondary-800 text-white py-6 mt-12">
        <div class="container mx-auto px-4">
          <div class="flex flex-col md:flex-row justify-between items-center">
            <div>
              <p class="text-secondary-400">Built with Qwik and Go</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
});
