import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(
        "mb-4 last:mb-0 rounded-2xl border data-[state=open]:bg-[#F6F6F6] data-[state=open]:border-[#018884] transition-colors px-4",
        className
      )}
      {...props}
    />
  )
}


function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        {...props}
        className={cn(
          "flex flex-1 items-center justify-between gap-4 py-4 px-4 rounded-md text-xl font-semibold text-[#0B0B0B] transition-all outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50",
          className
        )}
      >
        {children}

        <AccordionPrimitive.Trigger
          asChild
        >
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#F6F6F6] data-[state=open]:bg-[#018884] transition-colors duration-300">
            <ChevronDownIcon className="text-[#3B3B3B] data-[state=open]:text-white size-4 pointer-events-none transition-transform duration-300 data-[state=open]:rotate-180" />
          </div>
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden md:text-xl text-sm font-semibold text-[#0B0B0B]"
      {...props}
    >
      <div className={cn("pt-0 pb-4", className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
