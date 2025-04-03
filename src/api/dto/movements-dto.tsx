export interface movementDTO {
  emailUser: string;
  type: "income" | "expense";
  amount: number;
  description: string;
  date: string;
}

export interface EditMovementDTO {
  _id: string;
  type: "income" | "expense";
  amount?: number;
  description?: string;
  date?: string;
}
