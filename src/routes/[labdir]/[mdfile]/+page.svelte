<script lang="ts">
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import AppSidebar from "$lib/components/app-sidebar.svelte";
  import HPElogo from "$lib/assets/HPE_NewElement.png";
  import { formatDate } from "$lib/utils";
  import AccountDropDown from "./AccountDropDown.svelte";
  let {
    data,
  }: {
    data: any;
    headings: Array<{ level: string; title: number; sectionId: string }>;
  } = $props();
</script>

<div
  class="flex flex-row justify-between sticky top-0 z-50 h-8.5 bg-black w-full"
>
  <div class="flex items-start justify-start h-8.5">
    <img alt="HPELogo" src={HPElogo} class="p-2 ml-10" width="15%" />
  </div>
  <div class="flex items-center justify-center -ml-96 h-8.5 text-white">
    Aruba CREW Labs
  </div>
  <div class="flex justify-end mx-3"><AccountDropDown /></div>
</div>
<Sidebar.Provider
  style="--sidebar-width: 10rem; --sidebar-width-mobile: 10rem;"
>
  <AppSidebar headings={data.meta.headings} />
  <main class="relative">
    <Sidebar.Trigger />

    <div class="m-4 md:m-8 lg:m-12 xl:m-16 2xl:m-20">
      <article
        class="prose prose-h1:dark:text-white
         prose-h3:dark:text-white
         prose-h2:dark:text-white
         prose-p:dark:text-white
         prose-a:dark:text-blue-300
         prose-strong:dark:text-yellow-300
         prose-code:dark:text-shadow-orange-400
         prose-img:dark:text-white
         prose-ol:dark:text-white
         prose-li:dark:text-white
         prose-code:dark:text-white
         prose-pre:dark:text-white
         prose-blockquote:dark:text-white"
      >
        <hgroup>
          <h1 class="my-2 text-4xl font-semibold">{data.meta.title}</h1>
          <p class="my-2 text-gray-500">
            Published at {formatDate(data.meta.date)}
          </p>
        </hgroup>

        <div class="tags">
          {#each data.meta.categories as category}
            <span
              class="mr-2 inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/20 ring-inset"
              >&num;{category}</span
            >
          {/each}
        </div>

        <div class="prose">
          <data.content />
        </div>
      </article>
    </div>
  </main>
</Sidebar.Provider>

<style>
  :global(.callout) {
    border-radius: 5px;
    background-color: #e9f1fc;
    margin-bottom: 1rem;
    padding: 1rem 1rem 1rem 1rem;
    color: #222222;
  }

  :global(.callout-content > p) {
    color: black;
  }

  :global(.callout-title) {
    display: flex;
    align-items: center;
    color: #0a6ddd;
  }
  :global(.callout-title-text) {
    margin-left: 5px;
  }
</style>
