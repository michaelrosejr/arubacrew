<script lang="ts">
  import "../app.css";

  import { ModeWatcher } from "mode-watcher";
  let { children } = $props();
</script>

<svelte:head>
  <link
    rel="preload"
    href="/src/lib/assets/fonts/inter-roman-latin.Di8DUHzh.woff2"
    as="font"
    type="font/woff2"
    crossorigin="anonymous"
  />
</svelte:head>
<ModeWatcher />
{@render children()}
