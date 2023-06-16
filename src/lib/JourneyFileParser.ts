import {load} from "js-yaml"

export interface JourneyHeader {
    personal: string;
    scenario: string;
    goals: string;
}

interface JourneyTask {
    task: string;
    touchpoint: string;
    emotion: number;
}

export interface JourneyStage {
    stage: string;
    tasks: JourneyTask[];
}

export interface Journey {
    header?: JourneyHeader;
    stages?: JourneyStage[];
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
