"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, SubmitHandler } from "react-hook-form"
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { tabSchema } from "@/schemas/Tab.schema";
import { z } from "zod";
import { Tab } from "@/types/Tab";

type TabForm = z.infer<typeof tabSchema>

const TabForm = () => {
  const [tab, setTab] = useState<Tab | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<TabForm>({
    resolver: zodResolver(tabSchema),
  })

  const onSubmit: SubmitHandler<TabForm> = (data) => {

    toast.success("Event has been created")

    setTab({
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
      expenses: [],
    });

    console.log(data, tab)
    reset()
  }

  useEffect(() => {
    if (errors.name) {
      toast.error("Error on Name field", {
        description: "Name is required and must be less than 50 characters",
        duration: 5000,
      });
      return
    }

    if (errors.totalAmount) {
      toast.error("Error on Total Amount field", {
        description: "Total amount must be a positive number",
        duration: 5000,
      });
      return
    }

  }, [errors]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Input {...register("name")}
        type="text"
        placeholder="Name for the Tab"
        aria-invalid={errors.name ? "true" : "false"}
      />
      <Input {...register("totalAmount", { required: true, valueAsNumber: true })}
        type="number"
        placeholder="What was the total?" 
        aria-invalid={errors.totalAmount ? "true" : "false"}
      />
      <Button type="submit">Send</Button>
    </form>
  );
}

export default TabForm;