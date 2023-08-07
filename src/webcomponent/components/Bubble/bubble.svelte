<svelte:options tag="thumbnail-bubble" />

<script>
  export let index = 0;
  export let onClickThumbnail = () => {};
  export let thumbImage = "";
  export let altImage = "";
</script>

<button class="bubble" on:click={() => onClickThumbnail(index)}>
  <div class="thumb">
    <img
      class="thumb-img"
      src={thumbImage}
      alt={altImage ?? `Story Photo ${index}`}
    />
  </div>
</button>
