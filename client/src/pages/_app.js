import NotificationManager from "@/components/NotificationManager";
import "@/styles/globals.css";
import { Roboto } from "next/font/google";
import { useState } from "react";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
});

export default function App({ Component, pageProps }) {
  const [notification, setNotification] = useState({
    header: "",
    subheader: "",
    page: "",
    body: [],
    interval: 0,
    type: "",
    save: false,
    render: false,
  });
  return (
    <main className={roboto.className}>
      <Component
        {...pageProps}
        notification={notification}
        setNotification={setNotification}
      />
      <NotificationManager
        notification={notification}
        setNotification={setNotification}
      />
    </main>
  );
}
