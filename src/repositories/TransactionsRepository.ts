import Transaction from '../models/Transaction';
interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
	title: string;
	value: number;
	type: 'income' | 'outcome'
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
		this.transactions = [];
  }

  public all(): Transaction[] {
		return this.transactions;
  }

  public getBalance(): Balance {


			const findIncome = this.transactions.filter(transaction => {
				return transaction.type === 'income'
			});

			const findOutcome = this.transactions.filter(transaction => {
				return transaction.type === 'outcome'
			});

			const totalIncome = findIncome.reduce((acumulator, currentValue) => {
				return acumulator + currentValue.value;
			}, 0)

			const totalOutCome = findOutcome.reduce((acumulator, currentValue) => {
				return acumulator + currentValue.value;
			}, 0)

			const total = totalIncome - totalOutCome;

			const balance =  {
					income: totalIncome,
					outcome: totalOutCome,
					total: total
			}

			return balance;
		}

  public create({ title, type, value}: CreateTransactionDTO): Transaction {
		const transaction = new Transaction({ title, type, value})
		this.transactions.push(transaction);
		return transaction;	
  }
}

export default TransactionsRepository;
