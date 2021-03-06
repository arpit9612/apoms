export interface OutstandingRescue {
    latitude: number;
    location: string;
    longitude: number;
    callerName: string;
    rescuer1Id: number;
    rescuer2Id: number;
    callDateTime: string | Date;
    callerNumber: string;
    rescueStatus: number;
    callOutcomeId: number;
    rescuer1Colour: string;
    rescuer2Colour: string;
    emergencyCaseId: number;
    emergencyCodeId: number;
    emergencyNumber: number;
    rescuer1Abbreviation: string;
    rescuer2Abbreviation: string;

    moved?:boolean;
    searchCandidate?:boolean;
}



export interface RescuerGroup {
    rescuer1: number;
    rescuer1Abbreviation: string;
    rescuer2: number;
    rescuer2Abbreviation: string;
    rescues: OutstandingRescue[];
}

export interface OutstandingCase {
    rescueStatus: number;
    rescuerGroups: RescuerGroup[];
}

export interface OutstandingCaseResponse {
    outstandingRescues: OutstandingCase[];
}

export interface UpdatedRescue{
    success:number;
    emergencyCaseId:number;
    rescuer1Id:number;
    rescuer1Abbreviation:string;
    rescuer2Id:number;
    rescuer2Abbreviation:string;
    rescueStatus:number;
}
