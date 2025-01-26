interface Transaction {
    id: number;
    date: Date;
    accountId: number;
    amount: string; // TODO Fix this to be a number
    merchant: string;
    transactionCategoryId: number;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}

export default Transaction;