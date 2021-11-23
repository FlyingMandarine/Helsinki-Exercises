import { Discharge, Entry, EntryWithoutId, Gender, HealthCheckRating, NewPatient } from './types';

type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown, entries: unknown };
type HospitalFields = { type: unknown, description: unknown, date: unknown, specialist: unknown, diagnosisCodes?: unknown, discharge: unknown };
type OccupationalHealthcareFields = { type: unknown, description: unknown, date: unknown, specialist: unknown, diagnosisCodes?: unknown, employerName: unknown };
type HealthCheckFields = { type: unknown, description: unknown, date: unknown, specialist: unknown, diagnosisCodes?: unknown, healthCheckRating: unknown };

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled case: ${JSON.stringify(value)}`
    )
};

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (dateOfBirth: string): boolean => {
    return Boolean(Date.parse(dateOfBirth));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(param);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isDischarge = (param: any): param is Discharge => {
    return param instanceof Object;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntries = (param: any): param is Entry[] => {
    return param instanceof Array;
};

const isDiagnosisCodes = (param: any): param is string[] => {
    // return param.every((i: any) => (typeof i === "string"));
    return param instanceof Array;
};

const parseEntries = (entries: unknown): Entry[] => {
    if (!entries || !isEntries(entries)) {
        throw new Error('Incorrect or missing entries: ' + entries);
    }

    return entries;
};

const parseDiagnosisCodes = (diagnosisCodes: unknown): Array<string> | undefined => {
    if (!diagnosisCodes) {
        return undefined;
    } else if (!isDiagnosisCodes(diagnosisCodes)) {
        throw new Error('Incorrect diagnosis codes: ' + diagnosisCodes);
    }

    return diagnosisCodes;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(HealthCheckRating).includes(param);
};

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name');
    }

    return name;
};

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }

    return date;
};

const parseSsn = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn: ' + ssn);
    }

    return ssn;
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }

    return gender;
};

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation: ' + occupation);
    }

    return occupation;
};

const parseDescription = (description: unknown): string => {
    if (!description || !isString(description)) {
        throw new Error('Incorrect or missing description');
    }

    return description;
};

const parseSpecialist = (specialist: unknown): string => {
    if (!specialist || !isString(specialist)) {
        throw new Error('Incorrect or missing specialist');
    }

    return specialist;
};

const parseDischarge = (discharge: unknown): Discharge => {
    if (!discharge || !isDischarge(discharge)) {
        throw new Error('Incorrect or missing discharge: ' + discharge);
    }

    return discharge;
};



const parseEmployerName = (employerName: unknown): string => {
    if (!employerName || !isString(employerName)) {
        throw new Error('Incorrect or missing employer name');
    }

    return employerName;
};

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
    if (!healthCheckRating || !isHealthCheckRating(healthCheckRating)) {
        throw new Error('Incorrect or missing health check rating: ' + healthCheckRating);
    }

    return healthCheckRating;
};

export const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation, entries }: Fields): NewPatient => {
    const newPatient: NewPatient = {
        name: parseName(name),
        dateOfBirth: parseDate(dateOfBirth),
        ssn: parseSsn(ssn),
        gender: parseGender(gender),
        occupation: parseOccupation(occupation),
        entries: parseEntries(entries),
    };

    return newPatient;
};

export const toNewEntry = (data: EntryWithoutId) => {
    switch (data.type) {
        case 'Hospital':
            return toNewHospitalEntry(data);
        case 'OccupationalHealthcare':
            return toNewOccupationalHealthcareEntry(data);
        case 'HealthCheck':
            return toNewHealthCheckEntry(data);
        default:
            return assertNever(data);
    }
};

const toNewHospitalEntry = (data: HospitalFields) => {
    const newEntry: EntryWithoutId = {
        type: 'Hospital',
        description: parseDescription(data.description),
        date: parseDate(data.date),
        specialist: parseSpecialist(data.specialist),
        diagnosisCodes: parseDiagnosisCodes(data.diagnosisCodes),
        discharge: parseDischarge(data.discharge)
    };

    return newEntry;
};

const toNewOccupationalHealthcareEntry = (data: OccupationalHealthcareFields) => {
    const newEntry: EntryWithoutId = {
        type: 'OccupationalHealthcare',
        description: parseDescription(data.description),
        date: parseDate(data.date),
        specialist: parseSpecialist(data.specialist),
        diagnosisCodes: parseDiagnosisCodes(data.diagnosisCodes),
        employerName: parseEmployerName(data.employerName)
    };

    return newEntry;
};

const toNewHealthCheckEntry = (data: HealthCheckFields) => {
    const newEntry: EntryWithoutId = {
        type: 'HealthCheck',
        description: parseDescription(data.description),
        date: parseDate(data.date),
        specialist: parseSpecialist(data.specialist),
        diagnosisCodes: parseDiagnosisCodes(data.diagnosisCodes),
        // ...(data.diagnosisCodes && { diagnosisCodes: parseDiagnosisCodes(data.diagnosisCodes) }),
        healthCheckRating: parseHealthCheckRating(data.healthCheckRating)
    };

    return newEntry;
};