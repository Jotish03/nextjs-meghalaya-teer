import { SessionProvider } from "next-auth/react";
import { NotificationContextProvider } from "@/store/notification-store";
import FramerMotion from "@/components/framer-motion";
import Layout from "@/components/layout";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <NotificationContextProvider>
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <Layout>
            <FramerMotion>
              <Component {...pageProps} />
            </FramerMotion>
          </Layout>
        </QueryClientProvider>
      </SessionProvider>
    </NotificationContextProvider>
  );
}
