export class Email {
    private constructor(private readonly value: string) {}

    public static create(emailStr: string): Email {
        if (!emailStr.includes("@")) {
            throw new Error("Invalid domain email format constraint failed.");
        }
        return new Email(emailStr.toLowerCase().trim());
    }

    public getValue(): string {
        return this.value;
    }
}