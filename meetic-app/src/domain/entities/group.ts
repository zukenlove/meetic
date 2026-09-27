import { IDomainEvent } from "../events/IDomainEvent";
import { GroupTableFilledEvent } from "../events/GroupTableFilledEvent";
import { UserProfile } from "./UserProfile";

export type GroupStatus = "FORMING" | "LOCKED" | "ACTIVE";

export class Group {
  // Array tracking local events that have fired during this lifecycle tick
  private domainEvents: IDomainEvent[] = [];

  private constructor(
    private readonly id: string,
    private readonly members: UserProfile[],
    private status: GroupStatus,
    private readonly locationTag: string,
    private readonly maxCapacity: number = 6
  ) {}

  public static createNewLobby(groupId: string, locationTag: string): Group {
    return new Group(groupId, [], "FORMING", locationTag);
  }

  public addMember(user: UserProfile): void {
    if (this.status !== "FORMING") {
      throw new Error("Cannot join this group; the table is already locked.");
    }
    if (this.members.length >= this.maxCapacity) {
      throw new Error("Table is completely full. Maximum 6 members allowed.");
    }

    this.members.push(user);

    // Business Rule Evaluation
    if (this.members.length === this.maxCapacity) {
      this.status = "LOCKED";
      
      // 1. Record the Domain Event locally
      this.recordEvent(new GroupTableFilledEvent(this.id, this.locationTag));
    }
  }

  // Event infrastructure helper methods
  private recordEvent(event: IDomainEvent): void {
      this.domainEvents.push(event);
  }

  public pullEvents(): IDomainEvent[] {
      const recorded = [...this.domainEvents];
      this.domainEvents = []; // Clears the queue so events aren't processed twice
      return recorded;
  }

  public getId(): string { return this.id; }
  public getStatus(): GroupStatus { return this.status; }
  public getMembers(): UserProfile[] { return [...this.members]; }
}
