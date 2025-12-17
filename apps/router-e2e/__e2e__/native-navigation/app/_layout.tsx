import { Stack, unstable_navigationEvents } from 'expo-router';

const appStart = Date.now();

unstable_navigationEvents.addListener('linkNavigate', (event) => {
  console.log(`[${Date.now() - appStart}ms] Link navigate to:`, event.href);
});

(['pageWillRender', 'pageFocused', 'pageBlurred'] as const).forEach((eventType) => {
  unstable_navigationEvents.addListener(eventType, (event) => {
    console.log(`[${Date.now() - appStart}ms] ${eventType}:`, event.pathname);
  });
});

export default function Layout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
