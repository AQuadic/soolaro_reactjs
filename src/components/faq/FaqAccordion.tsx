import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { Skeleton } from "../ui/skeleton";
import { getFaqs } from "@/lib/api/faq";

const FaqAccordion = () => {
  const { i18n } = useTranslation();

  const { data, isLoading } = useQuery({
    queryKey: ["faqs"],
    queryFn: () => getFaqs(),
  });

  if (isLoading) {
    return (
      <div className="container mt-10 space-y-4">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border p-4"
          >
            <Skeleton className="h-5 w-3/4" />
            <div className="mt-3 space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  const faqs = data?.data ?? [];

    return (
        <div className="container mt-10">
            <Accordion type="single" collapsible className="rounded-4xl">
                {faqs.map((faq) => (
                <AccordionItem
                    key={faq.id}
                    value={`item-${faq.id}`}
                >
                <AccordionTrigger>
                    {faq.question[i18n.language as "ar" | "en"]}
                    </AccordionTrigger>

                    <AccordionContent>
                    {faq.answer[i18n.language as "ar" | "en"]}
                    </AccordionContent>
                </AccordionItem>
                ))}
            </Accordion>
        </div>
    )
}

export default FaqAccordion
