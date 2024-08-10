export interface Task {
    id: string;
    name: string;
    status: string;
}

export enum TaskStatus {
    OPEN="OPEN",
    CLOSED="CLOSED",
    IN_PROGRESS="IN_PROGRESS"
}