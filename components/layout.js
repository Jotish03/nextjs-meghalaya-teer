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
      <div className="min-h-screen flex flex-col bg-[#FFF7F1]">
        <NavigationBar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
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
