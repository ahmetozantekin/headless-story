export default class EventBus {
  StoryChange(direction, currentIndex) {
    const StoryChange = new CustomEvent("StoryChange", {
      detail: { direction, currentIndex },
    });
    window.dispatchEvent(StoryChange);
  }

  StoryOpen(currentIndex) {
    const StoryOpen = new CustomEvent("StoryOpen", {
      detail: { currentIndex },
    });
    window.dispatchEvent(StoryOpen);
  }

  StoryClose(currentIndex) {
    const StoryClose = new CustomEvent("StoryClose", {
      detail: { currentIndex },
    });
    window.dispatchEvent(StoryClose);
  }

  StoryLoaded(loaded) {
    const StoryLoaded = new CustomEvent("StoryLoaded", {
      detail: { loaded },
    });
    window.dispatchEvent(StoryLoaded);
  }
}
