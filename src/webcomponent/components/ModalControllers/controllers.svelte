<svelte:options tag="modal-controllers" />

<script>
  export let prev = () => {};
  export let next = () => {};
  export let close = () => {};
</script>

<div class="web-stories__modal__controllers">
  <button class="web-stories__modal__controllers-prev" on:click={prev} />
  <button class="web-stories__modal__controllers-next" on:click={next} />
  <button class="web-stories__modal__controllers-close" on:click={close} />
</div>
