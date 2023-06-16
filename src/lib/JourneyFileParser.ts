import {load} from "js-yaml"

interface JourneyHeader {
    personal: string;
    scenario: string;
    goals: string;
}

interface JourneyTask {
    task: string;
    touchpoint: string;
    emotion: number;
}

interface JourneyStage {
    stage: string;
    tasks: JourneyTask[];
}

interface Journey {
    header: JourneyHeader;
    stages: JourneyStage[];
}
export class JourneyFileParser {
    private readonly journey: Journey;

    public constructor(yamlDoc: string) {
        this.journey = load(yamlDoc) as Journey;
        console.log(this.journey);
    }

    public getJourney() {
        return this.journey;
    }

}
