import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
	title: string;
	value: number;
	type: 'income' | 'outcome'
}
class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({title, type, value }: Request): Transaction {
		const transaction = this.transactionsRepository.create({
			title,
			type,
			value
		})
		const balance = this.transactionsRepository.getBalance();
		console.log(balance.total)
		if (balance.total < 0) {
			throw Error('Operation not allowed')
		} else {
			return transaction;
		}
  }
}

export default CreateTransactionService;
