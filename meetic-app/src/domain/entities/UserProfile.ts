import { Email } from "../value-objects/Email";
import { UserName } from "../value-objects/UserName";
import { PhoneNumber } from "../value-objects/PhoneNumber";
import { Password } from "../value-objects/Password";
import { InterestTag } from "../value-objects/InterestTag";

// This mirrors your Supabase public.profiles PostgreSQL table row exactly
export type ProfilePersistenceRow = {
    id: string;
    user_name: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    email_address: string;
    account_status: "IDLE" | "IN_QUEUE" | "MATCHED" | "SUSPENDED";
    location_tag: string; 
};

export class UserProfile {
    private readonly id: string;
    private readonly userName: UserName;
    private readonly firstName: string;
    private readonly lastName: string;
    private readonly phoneNumber: PhoneNumber;
    private readonly emailAddress: Email;
    private accountStatus: "IDLE" | "IN_QUEUE" | "MATCHED" | "SUSPENDED";
    private readonly locationTag: InterestTag; 

    // Transitionally stores the plain password string strictly during the registration workflow
    private readonly registrationPassword?: Password;

    private constructor(
        id: string,
        userName: UserName,
        firstName: string,
        lastName: string,
        phoneNumber: PhoneNumber,
        emailAddress: Email,
        accountStatus: "IDLE" | "IN_QUEUE" | "MATCHED" | "SUSPENDED",
        locationTag: InterestTag,
        password?: Password
    ) {
        this.id = id;
        this.userName = userName;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.emailAddress = emailAddress;
        this.accountStatus = accountStatus;
        this.locationTag = locationTag;
        this.registrationPassword = password;
    }

    /**
     * FACTORY 1: Assembles a fresh registration snapshot directly from your multi-step onboarding wizard.
     * Validates every single rule simultaneously before instantiating the class wrapper.
     */
    public static createNewRegistration(params: {
        rawUserName: string;
        firstName: string;
        lastName: string;
        rawPhone: string;
        rawEmail: string;
        rawPassword: string;
        rawTrack: string; // Added parameter to handle the onboarding cluster category
        rawCity: string;  // Added parameter to handle the matching target city
    }, generatedId: string): UserProfile {
        return new UserProfile(
            generatedId,
            UserName.create(params.rawUserName),
            params.firstName,
            params.lastName,
            PhoneNumber.create(params.rawPhone),
            Email.create(params.rawEmail),
            "IDLE", // Fresh user accounts initialize as IDLE by default
            InterestTag.create(params.rawTrack, params.rawCity), // Instantiates InterestTag validation
            Password.create(params.rawPassword)
        );
    }

    /**
     * FACTORY 2: Reconstitutes an existing record fetched from Supabase database storage back into our clean Domain Entity layer.
     */
    public static toDomain(row: ProfilePersistenceRow): UserProfile {
        // Parse the database tracking string back into structural fields
        const [track, city] = row.location_tag.split(":");

        return new UserProfile(
            row.id,
            UserName.create(row.user_name),
            row.first_name,
            row.last_name,
            PhoneNumber.create(row.phone_number),
            Email.create(row.email_address),
            row.account_status,
            InterestTag.create(track, city)
        );
    }

    /**
     * PERSISTENCE MAPPER: Flattens local class properties into primitive string types matching database table formats.
     */
    public toPersistence(): ProfilePersistenceRow {
        return {
            id: this.id,
            user_name: this.userName.getValue(),
            first_name: this.firstName,
            last_name: this.lastName,
            phone_number: this.phoneNumber.getValue(),
            email_address: this.emailAddress.getValue(),
            account_status: this.accountStatus,
            location_tag: this.locationTag.getCombinedTag() // Flattens to primitive string for DB
        };
    }

    /**
     * DOMAIN STATE TRANSITIONS
     */
    public joinMatchingQueue(): void {
        if (this.accountStatus === "SUSPENDED") {
            throw new Error("Action denied. This user profile is currently SUSPENDED.");
        }
        this.accountStatus = "IN_QUEUE";
    }

    public leaveQueue(): void {
        this.accountStatus = "IDLE";
    }

    public finalizeMatch(): void {
        this.accountStatus = "MATCHED";
    }

    // Strongly-Typed Structural Getters
    public getId(): string { return this.id; }
    public getUserName(): UserName { return this.userName; }
    public getFirstName(): string { return this.firstName; }
    public getLastName(): string { return this.lastName; }
    public getPhoneNumber(): PhoneNumber { return this.phoneNumber; }
    public getEmailAddress(): Email { return this.emailAddress; }
    public getAccountStatus(): "IDLE" | "IN_QUEUE" | "MATCHED" | "SUSPENDED" { return this.accountStatus; }
    public getLocationTag(): InterestTag { return this.locationTag; }
    
    // Safely reads the plain password value for single-use Auth API submissions
    public getPlainRegistrationPassword(): string | undefined {
        return this.registrationPassword?.getPlainValue();
    }
}
