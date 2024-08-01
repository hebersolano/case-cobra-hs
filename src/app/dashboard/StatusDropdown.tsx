"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { OrderStatus } from "@prisma/client";
import { Check, ChevronsUpDown } from "lucide-react";
import useSWR from "swr";
import { changeOrderStatus } from "./actions";
import { useState, useTransition } from "react";

function StatusDropdown({ id, orderStatus }: { id: string; orderStatus: OrderStatus }) {
  const [activeStatus, setActiveStatus] = useState(orderStatus);
  const [isLoading, startTransition] = useTransition();
  const LABEL_MAP: Record<keyof typeof OrderStatus, string> = {
    awaiting_shipment: "Awaiting Shipment",
    fulfilled: "Fulfilled",
    shipped: "Shipped",
  };

  function handleChangeStatus(newStatus: OrderStatus) {
    startTransition(() => changeOrderStatus({ id, newStatus }));
    setActiveStatus(newStatus);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          disabled={isLoading}
          variant="outline"
          className="w-52 flex justify-between items-center "
        >
          {LABEL_MAP[activeStatus]}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0">
        {Object.keys(OrderStatus).map((status) => (
          <DropdownMenuItem
            key={status}
            className={cn(
              "flex text-sm gap-1 items-center p-2.5 cursor-default hover:bg-muted",
              activeStatus === status && "bg-muted border border-primary"
            )}
            onClick={handleChangeStatus.bind(null, status as OrderStatus)}
          >
            <Check
              className={cn(
                "mr-2 h-4 w-4 text-primary opacity-0",
                activeStatus === status && "opacity-100"
              )}
            />
            {LABEL_MAP[status as OrderStatus]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default StatusDropdown;
