import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"

const FaqAccordion = () => {
    return (
        <div className="container mt-10">
            <Accordion type="single" collapsible defaultValue="item-1" className=" rounded-4xl">
                <AccordionItem value="item-1">
                    <AccordionTrigger>Is it accessible?</AccordionTrigger>
                    <AccordionContent>
                    Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2" className="">
                    <AccordionTrigger>Is it accessible?</AccordionTrigger>
                    <AccordionContent>
                    Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

export default FaqAccordion
