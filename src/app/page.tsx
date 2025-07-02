"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTRPC } from "@/trpc/client";
import {useMutation, useQuery} from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

const Page = () => {
  const [value, setValue] = useState("");
  const tRpc = useTRPC();
  const {data: messages } = useQuery(tRpc.messages.getMany.queryOptions())
  const createMessage = useMutation(tRpc.messages.create.mutationOptions({
    onSuccess: () => {
      toast.success("Message successfully created!");
    }
  }))

  return (
    <div className="p4 max-w-7xl mx-auto">
      <Input value={value} onChange={(e) => setValue(e.target.value)}/>
    <Button disabled={createMessage.isPending} onClick={() => createMessage.mutate({value: value})}>
        invoke background job
      </Button>
      {JSON.stringify(messages, null, 2)}
    </div>
  );
};

export default Page;