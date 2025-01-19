export function onCustomEvent<T>(page: T) {
    window.dispatchEvent(new CustomEvent('navigate', { detail: { page } }));
}
