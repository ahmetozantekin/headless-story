# Headless Story

Headless Story is a super simple, interoperable, framework-free web component of the popular story format, allowing present content easily.

### Usage

```html
<head>
  <script defer src="https://www.unpkg.com/headless-story"></script>
</head>

<body>
  <headless-story duration="5" source="./path/to/source/json" />
</body>
```

### Story Format

```json
{
  "title": "",
  "version": "1.0",
  "author": {
    "name": "",
    "url": ""
  },
  "items": [
    {
      "type": "image",
      "story_image": "",
      "thumb_image": "",
      "story_caption": "",
      "external_link": {
        "url": "",
        "text": "",
        "position": ""
      },
    },
    ...
  ]
}
```

### Design Tokens & Customization

Design tokens with default values.

```css
:root {
  --story-background: rgb(0 0 0 / 85%);
  --story-aspect-ratio: 9/16;
  --story-height: 90vh;
  --story-blur: 3px;
  --story-border-radius: 16px;
  --story-caption-color: #ffffff;
  --story-caption-text-shadow: rgba(0, 0, 0, 0.94);
  --story-caption-font-size: 1.55vh;
  --story-caption-font-weight: 300;
  --story-caption-font-family: sans-serif;
  --story-progress-background-color: rgb(227 227 227 / 40%);
  --story-progress-fill-color: #ffffff;

  --thumbnail-bubble-width: 100px;
  --thumbnail-bubble-height: 100px;
  --thumbnail-bubble-background: transparent;
  --thumbnail-bubble-gradient-background: linear-gradient(
    185deg,
    transparent 20%,
    transparent 90%
  );
  --thumbnail-bubble-border-radius: 100%;
  --thumbnail-bubble-gap: 3px;
  --thumbnail-bubble-border-size: 2px;
  --loader-text: "Loading...";
  --loader-color: #a8a8a8;
  --loader-font-size: 14px;
  --loader-font-weight: 400;
  --loader-font-family: sans-serif;
}
```

### Custom Events

| Event Name  | Return Parameters       |
| ----------- | ----------------------- |
| StoryChange | currentIndex, direction |
| StoryOpen   | currentIndex            |
| StoryClose  | currentIndex            |
| StoryLoaded | loaded                  |

**Example usage:**

```js
window.addEventListener("StoryChange", (e) => {
    // e.detail returns {currentIndex, direction}
  }, () => window.removeEventListener("StoryChange");
);
```

```js
window.addEventListener("StoryOpen", (e) => {
    // e.detail returns {currentIndex}
  }, () => window.removeEventListener("StoryOpen");
);
```

```js
window.addEventListener("StoryLoaded", (e) => {
    // e.detail returns {loaded}
  }, () => window.removeEventListener("StoryLoaded");
);
```

### Contributing

To improve and contribute: fork, branch, pr <3

### License

This project is licensed under the [WTFPL License](LICENSE).

### Preview

[Demo](https://t.ly/VyX8E)
