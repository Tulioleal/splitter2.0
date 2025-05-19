import { Expense as ExpenseType } from "@/types/Expense";
import { JSX } from "react";
import Text from "../ui/text";
import { Button } from "../ui/button";

const Expense = ({
  name,
  amount,
  paidBy,
  splitBetween
}:ExpenseType):JSX.Element => {
  return (
    <div className="flex flex-row justify-between gap-2 p-4 border border-gray-300 rounded-md mt-2">
      <Text>
        <span className="font-bold">{name}</span> - {amount} - {paidBy} -{" "}
        {splitBetween}
      </Text>
      <div className="flex flex-row gap-2">
        <Button>
          delete
        </Button>
        <Button>
          edit
        </Button>
      </div>
    </div>
  );
}

export default Expense;