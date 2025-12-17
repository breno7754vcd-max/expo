"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unstable_navigationEvents = void 0;
exports.emit = emit;
const availableEvents = [
    'linkNavigate',
    'pageWillRender',
    'pageWillShow',
    'pageDidShow',
    'pageWillDisappear',
    'pageDidDisappear',
    'pageFocused',
    'pageBlurred',
];
const subscribers = {};
function addListener(eventType, callback) {
    if (isAfterInitialRender) {
        console.warn('[expo-router] unstable_analytics.addListener was called after the initial render. Analytics listeners should be added in the global scope before first render of your app, preferably in a root _layout.tsx');
        return () => { };
    }
    if (!availableEvents.includes(eventType)) {
        throw new Error(`Unsupported event type: ${eventType}`);
    }
    if (!subscribers[eventType]) {
        subscribers[eventType] = new Set();
    }
    subscribers[eventType].add(callback);
    return () => {
        subscribers[eventType].delete(callback);
        if (subscribers[eventType].size === 0) {
            delete subscribers[eventType];
        }
    };
}
function emit(type, event) {
    const subscribersForEvent = subscribers[type];
    if (subscribersForEvent) {
        for (const callback of subscribersForEvent) {
            callback(event);
        }
    }
}
let isAfterInitialRender = false;
exports.unstable_navigationEvents = {
    addListener,
    emit,
    hasAnyListener() {
        return Object.keys(subscribers).length > 0;
    },
    markInitialRender() {
        isAfterInitialRender = true;
    },
};
//# sourceMappingURL=index.js.map