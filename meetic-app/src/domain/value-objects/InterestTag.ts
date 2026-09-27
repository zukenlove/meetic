// domain/value-objects/InterestTag.ts

// Define a strict type union of your active platform matching tracks
export type AllowedTrack = "#newarrival" | "#freshman" | "#bouldering" | "#cryptodevs" | "#groupdining";

export class InterestTag {
    private static readonly VALID_TRACKS: AllowedTrack[] = ["#newarrival", "#freshman", "#bouldering", "#cryptodevs", "#groupdining"];

    private constructor(
        private readonly track: AllowedTrack,
        private readonly city: string
    ) {}

    public static create(rawTrack: string, rawCity: string): InterestTag {
        if (!rawTrack || !rawCity) {
            throw new Error("Both a tracking cluster tag and a city selection are required.");
        }

        const normalizedTrack = rawTrack.trim().toLowerCase() as AllowedTrack;
        const normalizedCity = rawCity.trim().toLowerCase().replace(/\s+/g, "_"); // e.g., "new_york"

        if (!this.VALID_TRACKS.includes(normalizedTrack)) {
            throw new Error(`The track "${rawTrack}" is not supported by our matchmaking engine.`);
        }

        return new InterestTag(normalizedTrack, normalizedCity);
    }

    /**
     * Combines track and city into a clean string for database queries (e.g., "#newarrival:new_york")
     */
    public getCombinedTag(): string {
        return `${this.track}:${this.city}`;
    }

    public getTrack(): AllowedTrack { return this.track; }
    public getCity(): string { return this.city; }

    public equals(other: InterestTag): boolean {
        return this.getCombinedTag() === other.getCombinedTag();
    }
}
