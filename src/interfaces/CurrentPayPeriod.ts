interface CurrentPayPeriod {
    id: number;
    startDate: Date;
    endDate: Date;

    daysTotal: number;
    daysElapsed: number;
    daysRemaining: number;

    budget: number;
    budgetPerDay: number;

    spendTotal: number;
    spendAvgPerDay: number;

    remainingBudget: number;
    remainingBudgetPerDay: number;
}

export default CurrentPayPeriod;