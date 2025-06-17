<script lang="ts">
  import Icon from "@iconify/svelte";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  import { toggleMode } from "mode-watcher";
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger
    ><Icon
      id="close"
      icon="mdi:hamburger-menu"
      color="white "
    /></DropdownMenu.Trigger
  >
  <DropdownMenu.Content>
    <DropdownMenu.Group>
      <DropdownMenu.Label>Menu</DropdownMenu.Label>
      <DropdownMenu.Separator />
      <DropdownMenu.Item
        ><button onclick={toggleMode}>Dark Mode</button></DropdownMenu.Item
      >
      <DropdownMenu.Item>Item 2</DropdownMenu.Item>
    </DropdownMenu.Group>
  </DropdownMenu.Content>
</DropdownMenu.Root>
