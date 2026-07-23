import { Wallet } from "lucide-react";
import { APP_NAME } from "@/lib/config";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-(--color-primary) shrink-0">
        <Wallet size={16} className="text-(--color-primary-foreground)" />
      </span>
      <span className="font-bold text-(--color-text-main) tracking-tight">
        {APP_NAME}
      </span>
    </span>
  );
}
