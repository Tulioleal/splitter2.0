import { Expense as ExpenseType } from "@/types/Expense";
import { JSX } from "react";
import { useTab } from "@/context/Tab.context";
import { TableCell } from "../ui/table";

const Expense = ({
  name,
  splitBetween,
  paidBy,
  amount,
}: ExpenseType): JSX.Element => {
  const { activeTab } = useTab();
  return (
    <>
      <TableCell className="font-medium text-center">{name}</TableCell>
      <TableCell className="text-center">{paidBy}</TableCell>
      <TableCell className="text-center">
        {splitBetween} {splitBetween > 1 ? "people" : "person"}
      </TableCell>
      <TableCell className="text-center">
        {amount} {activeTab.currency}
      </TableCell>
    </>
  );
};

export default Expense;
