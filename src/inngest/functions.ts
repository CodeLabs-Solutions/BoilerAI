import { inngest } from "./client"

export const Job = inngest.createFunction(
    {id: "Job"},
    {event: "JobEvent"},
    async ({event, step}) => {

        // Add job flow here #TODO
        await step.sleep("wait-a-moment", "10s");
        return {message: `Hello ${event.data.email}!`}
    }
)