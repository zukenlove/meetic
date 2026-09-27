import { Email } from "../value-objects/Email";

export type UserPersistenceRow = {
    id: string;
    first_name: string;
    last_name: string;
    user_name: string;
    phone: string;
    email_string: string;
};

export class User {
    private readonly id: string;
    private readonly firstName: string;
    private readonly lastName: string;
    private readonly userName: string;
    private readonly phone: string;
    private readonly email: Email;
    
    constructor(id: string, firstName: string, phone: string, email: Email, lastName: string, userName: string) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.userName = userName;
        this.phone = phone;
        this.email = email;
    }

    public static createNewRegistration(params: { 
        firstName: string; 
        lastName: string;
        userName: string;
        phone: string; 
        rawEmail: string; 
    }, generatedId: string): User {
        const emailVO = Email.create(params.rawEmail);
        
        return new User(
            generatedId, 
            params.firstName, 
            params.phone, 
            emailVO,
            params.lastName,  
            params.userName
        );
    }

    public toPersistence(): UserPersistenceRow {
        return {
            id: this.id,
            first_name: this.firstName,
            last_name: this.lastName,
            user_name: this.userName,
            phone: this.phone,
            email_string: this.email.getValue() 
        };
    }

    public static toDomain(row: UserPersistenceRow): User {
        const emailVO = Email.create(row.email_string);
        
        return new User(
            row.id,
            row.first_name,
            row.phone,
            emailVO,
            row.last_name,
            row.user_name
        );
    }

    public getId(): string { return this.id; }
    public getFirstName(): string { return this.firstName; }
    public getLastName(): string { return this.lastName; }
    public getUserName(): string { return this.userName; }
    public getPhone(): string { return this.phone; }
    public getEmail(): Email { return this.email; }
}
