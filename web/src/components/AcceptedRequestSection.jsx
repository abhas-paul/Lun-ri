import { BellIcon } from "lucide-react";
import AcceptedRequestCard from "./AcceptedRequestCard";

export default function AcceptedRequestSection({ requests }) {
  if (!requests.length) return null;

  return (
    <section className="space-y-4">

      <div className="flex items-center gap-2">
        <BellIcon className="w-5 h-5 text-success" />
        <h2 className="text-xl font-semibold">
          New Connections
        </h2>
      </div>

      <div className="space-y-3">
        {requests.map((item) => (
          <AcceptedRequestCard
            key={item._id}
            item={item}
          />
        ))}
      </div>

    </section>
  );
}