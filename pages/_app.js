import { SessionProvider } from "next-auth/react";
import { NotificationContextProvider } from "@/store/notification-store";
import FramerMotion from "@/components/framer-motion";
import Layout from "@/components/layout";
import "@/styles/globals.css";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <NotificationContextProvider>
      <SessionProvider session={session}>
        <Layout>
          <FramerMotion>
            <Component {...pageProps} />
          </FramerMotion>
        </Layout>
      </SessionProvider>
    </NotificationContextProvider>
  );
}
