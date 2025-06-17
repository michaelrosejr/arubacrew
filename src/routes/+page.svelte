<script lang="ts">
  import { formatDate } from "$lib/utils";
  import * as config from "$lib/config";
  import * as Card from "$lib/components/ui/card/index.js";
  import Icon from "@iconify/svelte";
  import CrewImage from "$lib/assets/crew_row_team.jpeg";
  let { data } = $props();
</script>

<svelte:head>
  <title>{config.title}</title>
</svelte:head>
<div>
  <img
    src={CrewImage}
    alt=""
    class="w-full h-48 object-cover"
    aria-hidden="true"
  />
</div>
<div class="flex flex-col items-center justify-center">
  <h1 class="text-4xl font-bold mt-4">{config.title}</h1>
  <p class="text-lg text-gray-600 mt-2">{config.description}</p>
</div>
<section class="mt-4 h-screen bg-[#0B273B]">
  <div class="flex flex-wrap justify-center mx-1 mt-2">
    {#each data.posts as post}
      <div class="p-2 w-80">
        <a href="{post.folder}/{post.slug}">
          <div style="flex: 1; margin: 10px;">
            <Card.Root class="@container/card ">
              <div>
                <div class="flex flex-row pl-2 -mt-5">
                  <Icon id="close" icon="mdi:circle" color="#FE5657" />
                  <Icon id="minimize" icon="mdi:circle" color="#FFDF59" />
                  <Icon id="fullscreen" icon="mdi:circle" color="#7ED957" />
                </div>
                <div class="mt-1"><hr /></div>
              </div>
              <Card.Header>
                <Card.Title class="h-[32px] overflow-hidden"
                  >{post.title}</Card.Title
                >
                <Card.Description class="line-clamp-2">
                  {post.description}
                </Card.Description>
              </Card.Header>

              <Card.Footer>
                <p class="text-xs">Created: {formatDate(post.date)}</p>
              </Card.Footer>
            </Card.Root>
          </div></a
        >
      </div>
    {/each}
  </div>
</section>
