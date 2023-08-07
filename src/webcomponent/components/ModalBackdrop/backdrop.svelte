<svelte:options tag="modal-backdrop" />

<script>
  export let close = () => {};
</script>

<div
  class="web-stories__backdrop"
  tabindex={-1}
  role="button"
  on:click={close}
  on:keydown
/>
