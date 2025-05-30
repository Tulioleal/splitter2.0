import { Action } from "@/types/Action";
import { ExpenseOBC } from "@/types/Expense";
import getObjectWithBasic from "./getObjectWithBasic";
import { getCleanSet } from "./getCleanSet";

/**
 * Calculates the optimal money transfer actions to settle expenses between multiple people.
 * 
 * This function takes a list of expenses and determines who owes money to whom by:
 * 1. Calculating each person's total share of expenses based on their participation
 * 2. Computing the average expense per person across all transactions
 * 3. Determining net balances (creditors vs debtors)
 * 4. Generating minimal transfer actions to settle all debts
 * 
 * @param expenses - Array of expense objects containing amount and list of people to split between
 * @returns Array of Action objects representing money transfers needed to settle all expenses
 * 
 * @example
 * ```typescript
 * const expenses = [
 *   { amount: 100, splitBetween: ['alice', 'bob'] },
 *   { amount: 60, splitBetween: ['bob', 'charlie'] }
 * ];
 * const actions = getActions(expenses);
 * // Returns actions like [{ from: 'alice', to: 'bob', amount: 20 }]
 * ```
 * 
 * @remarks
 * - Person names are normalized to lowercase for consistency
 * - Balances below 0.01 are considered negligible and ignored
 * - The algorithm minimizes the number of transactions needed
 * - All monetary amounts are rounded to 2 decimal places
 */

export function getActions(expenses: ExpenseOBC[]): Action[] {
  const balances: Record<string, number> = {};
  const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);
  const totalPeople = getCleanSet(
    expenses.flatMap((expense) => expense.splitBetween)
  ).length || 1; // Ensure at least one person to avoid division by zero
  const averageExpense = totalExpenses / totalPeople;

  for (const expense of expenses) {
    const { amount, splitBetween } = expense;
    const cleanSplitBetween = getCleanSet(splitBetween);
    const share = amount / cleanSplitBetween.length;

    for (const person of cleanSplitBetween) {
      const lowerCasePerson = person.toLowerCase();

      if (balances[lowerCasePerson] == undefined) {
        balances[lowerCasePerson] = 0;
      }

      balances[lowerCasePerson] = share + balances[lowerCasePerson];
    }
  }

  // Adjust balances to reflect how much each person owes or is owed
  for (const person in balances) {
    balances[person] = parseFloat((balances[person] - averageExpense).toFixed(2));
  }

  const creditors: { name: string; balance: number }[] = [];
  const debtors: { name: string; balance: number }[] = [];

  for (const [name, balance] of Object.entries(balances)) {
    if (balance > 0.01) {
      creditors.push({ name, balance });
    } else if (balance < -0.01) {
      debtors.push({ name, balance: -balance });
    }
  }

  const actions: Action[] = [];

  let i = 0;
  let j = 0;

  while (i < debtors.length && j < creditors.length) {
    const debtor = debtors[i];
    const creditor = creditors[j];

    const amount = Math.min(debtor.balance, creditor.balance);

    actions.push(getObjectWithBasic({
      from: debtor.name,
      to: creditor.name,
      amount: parseFloat(amount.toFixed(2)),
      checked: false,
    }));

    debtor.balance -= amount;
    creditor.balance -= amount;

    if (debtor.balance < 0.01) i++;
    if (creditor.balance < 0.01) j++;
  }

  return actions;
}