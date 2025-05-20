"use client";

import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { z } from "zod";
import { expenseSchema } from "@/schemas/Expense.schema";
import Expense from "./Expense";
import { useTab } from "@/context/Tab.context";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

type ExpenseForm = z.infer<typeof expenseSchema>;

const Expenses = () => {
  const { activeTab, setActiveTab } = useTab();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExpenseForm>({
    resolver: zodResolver(expenseSchema),
  });

  const getTotal = useMemo((): number => {
    if (!activeTab.expenses) return 0;
    return parseFloat(
      activeTab.expenses
        .reduce((curr, next) => curr + next.amount, 0)
        .toFixed(2),
    );
  }, [activeTab.expenses]);

  const getTotalPeople = useMemo((): number => {
    if (!activeTab.expenses) return 0;
    return parseFloat(
      activeTab.expenses
        .reduce((curr, next) => curr + next.splitBetween, 0)
        .toFixed(2),
    );
  }, [activeTab.expenses]);

  function onSubmit(data: ExpenseForm) {
    console.log(data);
    // Add the expense to the list of expenses
    setActiveTab({
      ...activeTab,
      expenses: [
        ...(activeTab?.expenses || []),
        {
          ...data,
          id: crypto.randomUUID(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    });
    reset();
  }

  useEffect(() => {
    if (errors.name) {
      toast.error("Error on Name field", {
        description: errors.name.message,
        duration: 5000,
      });
      return;
    }

    if (errors.amount) {
      toast.error("Error on Amount field", {
        description: errors.amount.message,
        duration: 5000,
      });
      return;
    }

    if (errors.paidBy) {
      toast.error("Error on Paid By field", {
        description: errors.paidBy.message || "This field is required",
        duration: 5000,
      });
      return;
    }

    if (errors.splitBetween) {
      toast.error("Error on Split Between field", {
        description: errors.splitBetween.message,
        duration: 5000,
      });
      return;
    }
  }, [errors]);

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-row gap-4">
        <Input
          {...register("name")}
          type="text"
          placeholder="Name for the Expense"
          aria-invalid={errors.name ? "true" : "false"}
        />
        <Input
          {...register("paidBy", { required: true })}
          type="text"
          placeholder="Who paid?"
          aria-invalid={errors.paidBy ? "true" : "false"}
        />
        <Input
          {...register("splitBetween", { required: true, valueAsNumber: true })}
          type="number"
          placeholder="How many people?"
          aria-invalid={errors.splitBetween ? "true" : "false"}
          required
          min={1}
          max={20}
        />
        <Input
          {...register("amount", { required: true, valueAsNumber: true })}
          type="number"
          placeholder="What was the amount?"
          aria-invalid={errors.amount ? "true" : "false"}
          required
        />
        <Button type="submit">Add</Button>
      </form>
      {activeTab.expenses && (
        <Table>
          <TableCaption>List of all the expenses</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Name</TableHead>
              <TableHead className="text-center">Paid by</TableHead>
              <TableHead className="text-center">Between</TableHead>
              <TableHead className="text-center">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activeTab.expenses.map((expense, key) => (
              <TableRow key={key}>
                <Expense {...expense} />
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell className="font-bold text-center">Total</TableCell>
              <TableCell colSpan={1} />
              <TableCell className="font-bold text-center">
                {getTotalPeople} {getTotalPeople > 1 ? `people` : "person"}
              </TableCell>
              <TableCell className="font-bold text-center">
                {getTotal.toFixed(2)} {`${activeTab.currency}`}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-bold text-center">
                Total each
              </TableCell>
              <TableCell colSpan={2} />
              <TableCell className="font-bold text-center">
                {(getTotal / getTotalPeople).toFixed(2)}{" "}
                {`${activeTab.currency}`}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      )}
    </div>
  );
};

export default Expenses;
