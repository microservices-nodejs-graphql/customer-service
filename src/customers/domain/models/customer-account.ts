import { Account } from "./account";
import { Customer } from "./customer";

export class CustomerAccount {
    id: number;
    customer: Customer;
    account: Account;
    mount: string;
    status: string;
}