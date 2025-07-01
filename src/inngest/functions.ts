import { Agent, openai, createAgent } from "@inngest/agent-kit";
import { inngest } from "./client"

export const Job = inngest.createFunction(
    { id: "Job" },
    { event: "JobEvent" },
    async ({ event, step }) => {

        // Create a new agent with a system prompt (you can add optional tools, too)
        const summarizer = createAgent({
            name: "writer",
            system: "You are an expert summarizer.  You write readable, concise, simple content.",
            model: openai({ model: "gpt-4o-mini" }),
        });

        const { output } = await summarizer.run(
            `Summarize the following text: ${event.data.value}`
        )

        // Add job flow here #TODO
        await step.sleep("wait-a-moment", "10s");
        return {output}
        //return { message: `Hello ${event.data.Input}!` }
    }
)