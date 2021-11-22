import diagnosisData from '../../data/diagnoses.json';
import { Diagnosis } from '../types';

const getEntries = (): Array<Diagnosis> => {
    return diagnosisData;
};

export default {
    getEntries
};