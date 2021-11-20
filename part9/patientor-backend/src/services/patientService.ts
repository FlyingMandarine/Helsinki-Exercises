import patientData from '../../data/patients';
import { NewPatient, Patient, PublicPatient } from '../types';
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

const findById = (id: string): Patient | undefined => {
    const patient = patientData.find(p => p.id === id);
    return patient;
};

export default {
    getNonSensitiveEntries,
    addPatient,
    findById
};