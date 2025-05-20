"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useEffect } from "react";
import { tabSchema } from "@/schemas/Tab.schema";
import { z } from "zod";
import { useTab } from "@/context/Tab.context";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import CURRENCY from "@/lib/currency";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";

type TabFormType = z.infer<typeof tabSchema>;

const NameAndCurrencyForm = () => {
  const { activeTab, setActiveTab } = useTab();
  const form = useForm<TabFormType>({
    resolver: zodResolver(tabSchema),
    defaultValues: {
      name: "",
      currency: "",
    },
  });

  const onSubmit: SubmitHandler<TabFormType> = (data) => {
    toast.success("Event has been created");

    setActiveTab({
      ...activeTab,
      ...data,
    });

    console.log(data, activeTab);
    // TODO: move to next Slide
  };

  useEffect(() => {
    if (form.formState.errors.name) {
      toast.error("Error on Name field", {
        description: form.formState.errors.name.message,
        duration: 5000,
      });
      return;
    }

    if (form.formState.errors.currency) {
      toast.error("Error on Currency field", {
        description: form.formState.errors.currency.message,
        duration: 5000,
      });
      return;
    }
  }, [form.formState.errors]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-row gap-4 justify-between"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  className="min-w-100"
                  placeholder="Name for the Tab"
                  aria-invalid={form.formState.errors.name ? "true" : "false"}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="currency"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a currency" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.entries(CURRENCY).map((currency) => (
                    <SelectItem key={currency[0]} value={currency[0]}>
                      {currency[1]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Send</Button>
      </form>
    </Form>
  );
};

export default NameAndCurrencyForm;
