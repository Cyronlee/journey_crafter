import {load} from "js-yaml"

export interface PersonInfo {
    name?: string;
    role?: string;
    isSingle?: boolean;
    age?: number;
    address?: string;
}

export interface JourneyHeader {
    personal?: PersonInfo;
    scenario?: string;
    goals?: string;
}

interface JourneyTask {
    task: string;
    touchpoint: string;
    emotion: number | string;
}

export interface JourneyStage {
    stage: string;
    tasks: JourneyTask[];
}

export interface Journey {
    header: JourneyHeader;
    stages: JourneyStage[];
}
export class JourneyFileParser {
    private readonly journey: Journey;

    public constructor(yamlDoc: string) {
        this.journey = load(yamlDoc) as Journey;
    }

    public getJourney() {
        return this.journey;
    }

}
