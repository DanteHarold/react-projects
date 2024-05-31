import { ReactNode, createContext, useMemo, useReducer } from "react";
import {
  BudgetActions,
  BudgetReducer,
  BudgetState,
  inititalState,
} from "../reducers/budget-reducer";
type BudgetContextProps = {
  state: BudgetState;
  dispatch: React.Dispatch<BudgetActions>;
  totalExpenses: number;
  remainingBudget: number;
};
type BudgetProviderPros = {
  children: ReactNode;
};
export const BudgetContext = createContext<BudgetContextProps>(null!);

export const BudgetProvider = ({ children }: BudgetProviderPros) => {
  const [state, dispatch] = useReducer(BudgetReducer, inititalState);

  const totalExpenses = useMemo(
    () => state.expenses.reduce((total, expense) => expense.amount + total, 0),
    [state.expenses]
  );

  const remainingBudget = state.budget - totalExpenses;

  return (
    <BudgetContext.Provider
      value={{ state, dispatch, totalExpenses, remainingBudget }}
    >
      {children}
    </BudgetContext.Provider>
  );
};
