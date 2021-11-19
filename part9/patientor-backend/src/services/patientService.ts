import patientData from '../../data/patients';
import { NonSensitivePatientEntry, NewPatient } from '../types';
import {v1 as uuid} from 'uuid';

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
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

export default {
    getNonSensitiveEntries,
    addPatient
};