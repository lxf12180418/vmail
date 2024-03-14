import { CheckIcon, CopyIcon, ExclamationCircle } from "icons";
import { ButtonHTMLAttributes, DetailedHTMLProps, useState } from "react";

interface CopyButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  content: string;
}

export default function CopyButton(props: CopyButtonProps) {
  const [status, setStatus] = useState<keyof typeof icons>("idle");

  const icons = {
    idle: <CopyIcon className="" />,
    error: <ExclamationCircle className="text-red-500" />,
    success: <CheckIcon className="text-green-500" />,
  };

  function copy() {
    navigator.clipboard
      .writeText(props.content)
      .then(() => setStatus("success"))
      .catch(() => setStatus("error"))
      .finally(() => setTimeout(() => setStatus("idle"), 1000));
  }

  return (
    <button {...props} onClick={copy}>
      {icons[status]}
    </button>
  );
}
