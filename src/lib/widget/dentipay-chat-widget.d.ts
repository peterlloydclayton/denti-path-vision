export interface MountOptions {
  initiallyOpen?: boolean;
}

export interface MountResult {
  unmount: () => void;
}

export function mountDentipayChatWidget(options?: MountOptions): MountResult;
export function unmountAllDentipayChatWidgets(): void;
