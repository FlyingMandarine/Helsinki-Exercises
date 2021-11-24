import patientData from '../../data/patients';
import { EntryWithoutId, NewPatient, Patient, PublicPatient } from '../types';
import {v1 as uuid} from 'uuid';

const getNonSensitiveEntries = (): PublicPatient[] => {
    return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatient = (patient: NewPatient) => {
    const id = uuid();

    const newPatient = {
        id: id,
        ...patient
    };

    patientData.push(newPatient);
    return newPatient;
};

const addEntry = (patientId: string, entry: EntryWithoutId) => {
    const patient: Patient | undefined = patientData.find(patient => patient.id === patientId);
    const id = uuid();

    const newEntry = {
        id: id,
        ...entry
    };

    if (patient === undefined) {
        throw new Error('Patient not found.');
    }

    patient.entries.push(newEntry);    
    return patient;
};

const findById = (id: string): Patient | undefined => {
    const patient = patientData.find(p => p.id === id);
    return patient;
};

export default {
    getNonSensitiveEntries,
    addPatient,
    addEntry,
    findById
};