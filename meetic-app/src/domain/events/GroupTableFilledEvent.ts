// domain/events/GroupTableFilledEvent.ts
import { IDomainEvent } from "./IDomainEvent";

export class GroupTableFilledEvent implements IDomainEvent {
    public readonly dateTimeOccurred: Date;
    
    constructor(
        public readonly groupId: string,
        public readonly locationTag: string // Carries the location string (e.g., "#newarrival:new_york")
    ) {
        this.dateTimeOccurred = new Date();
    }

    public getAggregateId(): string {
        return this.groupId;
    }
}
