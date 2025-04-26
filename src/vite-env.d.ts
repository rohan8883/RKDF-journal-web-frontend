/// <reference types="vite/client" />
import 'little-state-machine';

declare module 'little-state-machine' {
  interface GlobalState {
    language: string;
  }
}

declare global {
  interface Window {
    ReactNativeWebView: {
      postMessage: (message: string) => void;
      addEventListener: (
        event: string,
        callback: (event: MessageEvent) => void
      ) => void;
    };
  }
}
