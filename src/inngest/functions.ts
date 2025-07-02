import { Sandbox } from "@e2b/code-interpreter";
import { openai, createAgent } from "@inngest/agent-kit";
import { inngest } from "./client"
import { getSandbox } from "./utils";

export const Job = inngest.createFunction(
    { id: "Job" },
    { event: "SandboxDeploy" },
    async ({ event, step }) => {
        const sandboxId = await step.run("get-sandbox-id", async () =>{
            const sandbox = await Sandbox.create("boilerai-nextjs-dev")
            return sandbox.sandboxId;
        })
        // Create a new agent with a system prompt (you can add optional tools, too)
        const codeAgent = createAgent({
            name: "code-agent",
            system: "You are an expert next.js developer & programmer. You write readable, maintainable code. You write simple Next.js & React Snippets.",
            model: openai({ model: "gpt-4o" }),
        });

        const { output } = await codeAgent.run(
        `Generate code based on: ${event.data.value}`
        )

        // Add job flow here #TODO
        const sandboxUrl = await step.run("get-sandbox-url", async () =>{
            const sandbox = await getSandbox(sandboxId);
             const host = sandbox.getHost(3000);
            return `https://${host}`;
        })
        return {output, sandboxUrl}
        //return { message: `Hello ${event.data.Input}!` }
    }
)