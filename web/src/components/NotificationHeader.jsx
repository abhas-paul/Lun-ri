import { BellIcon } from "lucide-react";

export default function NotificationHeader() {
  return (
    <header>
      <h1 style={{
        fontFamily: "CalSans",
        fontWeight: "400",
      }}
        className="text-2xl sm:text-3xl font-bold tracking-wide flex items-center gap-2">
        <BellIcon className="w-6 h-6" />
        Notifications
      </h1>
    </header>
  );
}