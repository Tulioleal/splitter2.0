import { Action } from "@/types/Action";
import { Expense } from "@/types/Expense";

export const getActions = (expenses: Expense[]): Action[] => {
  return expenses.flatMap((expense) => {
    const { amount, paidBy, splitBetween } = expense;
    const splitAmount = amount / splitBetween;

    return Array.from({ length: splitBetween }, (_, index) => {
      const to = index === 0 ? paidBy : `User${index + 1}`; // Assuming users are named User1, User2, etc.
      const from = index === 0 ? `User${index + 1}` : paidBy; // The first user pays, others owe

      return {
        id: `${expense.id}-${index}`, // Unique ID for each action
        from,
        to,
        amount: splitAmount,
      } as Action;
    });
  }
  );
}