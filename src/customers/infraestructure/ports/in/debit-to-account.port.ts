import { CustomerAccount } from "src/customers/domain/models/customer-account";

export interface DebitToAccountPort {
    debitToAccount(customerAccount: CustomerAccount): Promise<CustomerAccount>;
}