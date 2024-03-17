import { useContext } from "react";

import NavigationBar from "./navigation/header";

import { Toaster } from "@/components/ui/toaster";
import NotificationContext from "@/store/notification-store";
import Notification from "./notification";
import Head from "next/head";
import Footer from "./footer";

export default function Layout({ children }) {
  const notificationctx = useContext(NotificationContext);
  const activeNotification = notificationctx.notification;
  return (
    <>
      <Head>
        <link rel="icon" href="./favicon.ico" sizes="any" />
      </Head>
      {/* <ThemeProvider attribute="class" disableTransitionOnChange> */}
      <main className="bg-[#FFF7F1]">
        <NavigationBar />

        {children}
        <Footer />
      </main>
      <Toaster />
      {activeNotification && (
        <Notification
          variant={activeNotification.variant}
          title={activeNotification.title}
          description={activeNotification.description}
        />
      )}
      {/* </ThemeProvider> */}
    </>
  );
}
