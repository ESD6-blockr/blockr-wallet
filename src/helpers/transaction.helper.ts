import { TransactionType } from "@blockr/blockr-models";

export const getTransactionTypeOptions = (): any[] => {
    const options: any[] = [];
    for (const item in TransactionType) {
        if (isNaN(Number(item))) {
            options.push({
                key: TransactionType[item],
                text: item.replace("_", " "),
                value: TransactionType[item],
            });
        }
    }
    return options;
};
