// domain/value-objects/PhoneNumber.ts

export class PhoneNumber {
    // Private constructor blocks bypassing validation rules via 'new PhoneNumber()'
    private constructor(private readonly value: string) {}

 
    public static create(rawPhone: string): PhoneNumber {
        if (!rawPhone || rawPhone.trim() === "") {
            throw new Error("Phone number field cannot be empty.");
        }

        // 1. Strip out common formatting artifacts like spaces, dashes, parentheses, and dots
        const cleaned = rawPhone.replace(/[\s\-\(\)\.]/g, "");

        const phoneRegex = /^\+?[1-9]\d{6,14}\$/;
        if (!phoneRegex.test(cleaned)) {
            throw new Error("Invalid phone number format. Please provide a valid country code (e.g., +1234567890).");
        }

        // 3. Normalize: Ensure the resulting string safely prefixes with a '+' character
        const normalizedValue = cleaned.startsWith("+") ? cleaned : `+${cleaned}`;

        return new PhoneNumber(normalizedValue);
    }


    public getValue(): string {
        return this.value;
    }

    public equals(other: PhoneNumber): boolean {
        return this.value === other.getValue();
    }
}
