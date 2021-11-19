import diagnosisData from '../../data/diagnoses.json';
import { Diagnose } from '../types';

const getEntries = (): Array<Diagnose> => {
    return diagnosisData;
};

export default {
    getEntries
};