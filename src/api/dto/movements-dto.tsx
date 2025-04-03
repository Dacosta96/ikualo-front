export interface movementDTO {
  userId: string;
  type: "income" | "expense";
  amount: number;
  description: string;
  category: string;
  date: string;
}
