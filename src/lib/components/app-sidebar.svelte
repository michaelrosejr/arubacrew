<script lang="ts">
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import HPElogo from "$lib/assets/HPE_NewElement.png";
  import { page } from "$app/state";
  import Icon from "@iconify/svelte";

  const props = $props();
  let headings = props.headings || [];
  //   $: active_class = active ? page.url.hash === `#${heading.sectionId}` : '';
</script>

{#snippet lablink(heading: { sectionId: string; title: string })}
  <lablink>
    <Sidebar.MenuItem>
      <div
        class={page.url.hash === `#${heading.sectionId}`
          ? "bg-hpe py-1 hover:bg-hpe focus:bg-hpe active:bg-hpe "
          : ""}
      >
        <Sidebar.MenuButton
          class="flex h-12  {page.url.hash === `#${heading.sectionId}`
            ? 'bg-hpe py-1 hover:bg-hpe focus:bg-hpe active:bg-hpe dark:text-white'
            : ''}"
        >
          <a
            class="flex {page.url.hash === `#${heading.sectionId}`
              ? 'text-white bg-hpe hover:underline hover:decoration-white hover:decoration-1 '
              : 'hover:decoration-hpe hover:decoration-1 hover:underline'}"
            class:is-active={page.url.hash === `#${heading.sectionId}`}
            href={`#${heading.sectionId}`}
          >
            <div class="mr-1 items-center justify-center">
              <Icon
                class={page.url.hash === `#${heading.sectionId}`
                  ? "text-white dark:text-black"
                  : "text-hpe"}
                icon="mdi:book-open-page-variant"
                style="font-size: 12px;"
              />
            </div>
            <div class="text-xs dark:text-white">{heading.title}</div></a
          >
        </Sidebar.MenuButton>
      </div>
    </Sidebar.MenuItem>
  </lablink>
{/snippet}

<Sidebar.Root>
  <Sidebar.Header class="rounded-none  m-0 p-0 h-auto bg-black">
    <div class="flex items-center justify-center h-full">
      <img alt="HPELogo" src={HPElogo} class="p-2" width="50%" />
    </div>
  </Sidebar.Header>
  <Sidebar.Content>
    <Sidebar.Group />
    <Sidebar.GroupLabel></Sidebar.GroupLabel>
    <Sidebar.GroupContent>
      <Sidebar.Menu>
        <Sidebar.MenuItem
          ><Sidebar.MenuButton class=""
            ><a
              class="flex flex-row hover:decoration-hpe hover:decoration-1 hover:underline"
              href="/"
              ><div class="mr-0.5">
                <Icon
                  class="text-hpe"
                  icon="mdi:home"
                  style="font-size: 16px;"
                />
              </div>
              <div class="text-xs dark:text-white">Home</div></a
            ></Sidebar.MenuButton
          ></Sidebar.MenuItem
        >
        {#each headings as heading}
          {#if heading.level === 2}
            {@render lablink(heading)}
          {/if}
        {:else}
          {#if headings.length === 0}
            <Sidebar.MenuItem>
              <Sidebar.MenuButton>.</Sidebar.MenuButton>
            </Sidebar.MenuItem>
          {/if}
        {/each}
      </Sidebar.Menu>
    </Sidebar.GroupContent>
    <Sidebar.Group />
  </Sidebar.Content>
  <Sidebar.Footer />
</Sidebar.Root>
