"use client"

import { Expense as ExpenseType } from "@/types/Expense";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { z } from "zod";
import { expenseSchema } from "@/schemas/Expense";
import Expense from "./Expense";
import { Separator } from "../ui/separator";

type ExpenseForm = z.infer<typeof expenseSchema>

const Expenses = () => {
  const [expenses, setExpenses] = useState<ExpenseType[]>([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ExpenseForm>()
  
  function onSubmit(data: ExpenseForm) {
    console.log(data);
    // Add the expense to the list of expenses
    setExpenses([
      ...expenses,
      {
        ...data,
        id: crypto.randomUUID(),
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ])
    console.log("Expenses: ", expenses);
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

    if (errors.amount) {
      toast.error("Error on Amount field", {
        description: "Amount must be a positive number",
        duration: 5000,
      });
      return
    }

    if (errors.paidBy) {
      toast.error("Error on Paid By field", {
        description: "Paid by is required and must be less than 50 characters",
        duration: 5000,
      });
      return
    }

    if (errors.splitBetween) {
      toast.error("Error on Split Between field", {
        description: "Split between must be a positive number",
        duration: 5000,
      });
      return
    }
  }, [errors]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-row gap-4 mb-4">
        <Input
          {...register("name")}
          type="text"
          placeholder="Name for the Expense"
          aria-invalid={errors.name ? "true" : "false"}
        />
        <Input
          {...register("paidBy", { required: true})}
          type="text"
          placeholder="Who paid?"
          aria-invalid={errors.paidBy ? "true" : "false"}
        />
        <Input
          {...register("splitBetween", { required: true, valueAsNumber: true })}
          type="number"
          placeholder="How many people?"
          aria-invalid={errors.splitBetween ? "true" : "false"}
        />
        <Input
          {...register("amount", { required: true, valueAsNumber: true })}
          type="number"
          placeholder="What was the amount?"
          aria-invalid={errors.amount ? "true" : "false"}
        />
        <Button type="submit">Add</Button>
      </form>
      <Separator />
      {
        <ul>
          {expenses.map((expense, index) => (
            <li key={index}>
              <Expense {...expense}/>
            </li>
          ))}
        </ul>
      }
    </div>
  );
}

export default Expenses;