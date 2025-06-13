import React from "react";
import { ScrollArea as UIScrollArea } from "@/components/ui/scroll-area";

export default function ScrollArea({ children, className }) {
  return (
    <UIScrollArea className={className}>
      {children}
    </UIScrollArea>
  );
}
