import { useEffect, useState } from "react";

import { ErrorIcon, InfoIcon, TipsIcon } from "@/icons.js";

export default function NotificationManager({ notification, setNotification }) {
  const [show, setShow] = useState(notification.render);
  let icon;
  let topColor;

  switch (notification.type) {
    case "error":
      icon = <ErrorIcon height="28" width="28" color="#f8fafc" />;
      topColor = "red";
      break;
    case "info":
      icon = <InfoIcon height="28" width="28" color="#f8fafc" />;
      topColor = "blue";
      break;
    case "tips":
      icon = <TipsIcon height="28" width="28" color="#f8fafc" />;
      topColor = "green";
      break;
  }

  const handleClose = () => {
    let elem = document.querySelector(".notification-manager");
    if (elem) {
      setNotification({
        header: "",
        subheader: "",
        page: "",
        body: [],
        interval: 0,
        type: "",
        save: false,
        render: false,
      });
      setShow(false);
    }
  };

  useEffect(() => {
    if (notification.interval !== 0) {
      setTimeout(() => {
        handleClose();
      }, notification.interval);
    }
  }, [notification.body, notification.interval]);

  useEffect(() => {
    setShow(notification.render);
  }, [notification, notification.render]);

  return show ? (
    <div
      className={
        "notification-manager animate-popup fixed right-20 bottom-16 bg-opacity-90 backdrop-blur-md bg-slate-50 text-slate-900 w-[30rem] min-h-[10rem] max-h-[15rem] flex flex-col gap-4 shadow-[0_0_16px_rgba(0,0,0,0.15)] rounded-[5px]"
      }
    >
      <div
        className={
          "top flex flex-row items-center justify-between px-4 py-3 text-slate-50 rounded-t-[5px] bg-opacity-90" +
          " bg-" +
          topColor +
          "-500"
        }
      >
        <div className="left flex flex-row items-center gap-2">
          {icon}
          <span className="font-medium"> {notification.header} </span>
        </div>
        <button
          className="hover:bg-[rgba(0,0,0,0.1)] w-8 h-8 text-2xl text-slate-50 rounded-full"
          onClick={() => handleClose()}
        >
          &times;
        </button>
      </div>
      <div className="body flex flex-col gap-2 pl-4 pr-8 pb-4">
        {...notification.body}
      </div>
    </div>
  ) : null;
}
