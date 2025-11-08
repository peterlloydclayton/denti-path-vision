# Dentipay Chat Widget

This package distributes the prebuilt floating chat widget used on dentipay-chat. It contains both ES module and UMD bundles plus the required stylesheet.

## Installation

```bash
npm install @dentipay/chat-widget
# or
yarn add @dentipay/chat-widget
```

## Usage (React / ESM)

```tsx
import { useEffect } from 'react';
import { mountDentipayChatWidget, unmountAllDentipayChatWidgets } from '@dentipay/chat-widget';
import '@dentipay/chat-widget/styles.css';

export function App() {
  useEffect(() => {
    const { unmount } = mountDentipayChatWidget({ initiallyOpen: false });
    return () => unmount();
  }, []);

  return <div>Your app content</div>;
}
```

## Usage (UMD / Plain HTML)

```html
<link rel="stylesheet" href="https://cdn.example.com/dentipay-chat-widget/styles.css" />
<script src="https://cdn.example.com/dentipay-chat-widget/dentipay-chat-widget.umd.js"></script>
<script>
  window.DentipayChatWidget.mount({ initiallyOpen: false });
</script>
```

## Exports

- `mountDentipayChatWidget(options)`
- `unmountAllDentipayChatWidgets()`
- `styles.css`

The bundles expect `react` and `react-dom` ≥ 18 to be present in the host application.

