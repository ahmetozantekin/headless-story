<svelte:options tag="headless-story" />

<script>
  /** Dependencies */
  import { onMount, onDestroy } from "svelte";

  /** Local Components */
  import Controllers from "./components/ModalControllers/controllers.svelte";
  import Backdrop from "./components/ModalBackdrop/backdrop.svelte";
  import Loader from "./components/Loader/loader.svelte";
  import Bubble from "./components/Bubble/bubble.svelte";

  /** Utils */
  import Config from "../utils/config";

  /** Events */
  import EventBus from "../utils/events";

  /** Component Props */
  export let duration = Config.delay(duration);
  export let source;

  /** Constants */
  const DURATION = duration;
  let timer;

  /** Reactive Constants */
  $: activeSlide = 0;
  $: show = false;
  $: loading = false;
  $: story = [];

  /** Methods */
  const nextStory = () => {
    next();
    clearInterval(timer);
    timer = setInterval(next, DURATION * 1000);
  };

  const prevStory = () => {
    prev();
    clearInterval(timer);
    timer = setInterval(next, DURATION * 1000);
  };

  const closeStory = () => {
    new EventBus().StoryClose(activeSlide);
    show = false;
    activeSlide = 0;
    clearInterval(timer);
  };

  const next = () => {
    if (activeSlide !== story.length - 1) {
      activeSlide += 1;
      new EventBus().StoryChange("next", activeSlide);
    }
  };

  const prev = () => {
    if (activeSlide > 0) {
      activeSlide -= 1;
      new EventBus().StoryChange("previous", activeSlide);
    }
  };

  const handleClickThumbnail = (i) => {
    new EventBus().StoryOpen(i);
    activeSlide = i;
    show = true;
    clearInterval(timer);
    timer = setInterval(next, DURATION * 1000);
  };

  onMount(async () => {
    loading = true;
    const sourceRoot = source
      ? await Config.getSource(source).finally(() => {
          new EventBus().StoryLoaded(true);
          loading = false;
        })
      : (loading = false);
    story = sourceRoot?.items ?? [];
    clearInterval(timer);
    timer = setInterval(next, DURATION * 1000);
  });

  onDestroy(() => {
    clearInterval(timer);
  });
</script>

<div class="web-stories__thumbnails">
  {#if !loading}
    <div class="story-bubbles">
      <div class="bubbles">
        {#each story as photo, i}
          {#if story[i]?.thumb_image}
            <Bubble
              index={i}
              onClickThumbnail={handleClickThumbnail}
              thumbImage={story[i]?.thumb_image}
              altImage={story[i]?.image_alt}
            />
          {/if}
        {/each}
      </div>
    </div>
  {:else}
    <Loader />
  {/if}
</div>

{#if show}
  <div class="web-stories">
    <div class="web-stories__modal">
      <div class="web-stories__modal__progress" style={`--delay:${DURATION}s;`}>
        {#each story as photo, i}
          <div
            class={`web-stories__modal__progress__bar 
            ${
              i === activeSlide
                ? `animation-start`
                : i <= activeSlide
                ? "animation-filled"
                : ""
            }`}
          />
        {/each}
      </div>

      <div class="web-stories__modal__list">
        <div class="web-stories__modal__list__gallery">
          {#if story[activeSlide]?.story_image}
            {#if story[activeSlide]?.type === "video"}
              <video autoplay loop>
                <track kind="captions" />
                <source
                  src={story[activeSlide]?.story_image}
                  type="video/mp4"
                />
                Your browser does not support HTML video.
              </video>
            {:else}
              <img
                data-src=""
                src={story[activeSlide]?.story_image}
                alt={story[activeSlide]?.alt_text ??
                  `Story Photo ${activeSlide}`}
              />
            {/if}
          {/if}
        </div>

        {#if story[activeSlide]?.story_caption}
          <div class="web-stories__modal__list__subtext">
            <span>{story[activeSlide]?.story_caption}</span>
          </div>
        {/if}

        {#if story[activeSlide]?.external_link?.url}
          <div
            class={`web-stories__modal__list__external-link ${
              story[activeSlide]?.external_link?.position ?? ""
            }`}
          >
            <a href={story[activeSlide]?.external_link?.url} target="_blank">
              {story[activeSlide]?.external_link?.text}
            </a>
          </div>
        {/if}
      </div>
      <Controllers prev={prevStory} next={nextStory} close={closeStory} />
    </div>
    <Backdrop close={closeStory} />
  </div>
{/if}

<style lang="scss">
  @import "../style/style.scss";
</style>
