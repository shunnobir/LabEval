import React from "react";
import Button from "./Button";
import Loader from "./Loader";

export default function LoaderButton() {
  return (
    <Button>
      <Loader className="border-slate-100" />
    </Button>
  );
}
