// domain/value-objects/Password.ts

export class Password {
    private constructor(private readonly plainValue: string) {}

    public static create(rawPassword: string): Password {
        if (!rawPassword) {
            throw new Error("Password field cannot be empty.");
        }

        // Business Constraint: Enforce minimal security strength thresholds
        if (rawPassword.length < 8) {
            throw new Error("Password must be at least 8 characters long.");
        }

        // Optional Business Constraint: Ensure it contains at least one numeric character
        const hasNumber = /\d/;
        if (!hasNumber.test(rawPassword)) {
            throw new Error("Password must contain at least one numeric digit.");
        }

        return new Password(rawPassword);
    }

    // Exposes the value purely for the one-time registration pipeline transmission to Supabase
    public getPlainValue(): string {
        return this.plainValue;
    }
}
