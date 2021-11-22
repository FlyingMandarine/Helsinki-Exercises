import { State } from "./state";
import { Diagnosis, Patient } from "../types";

export const setPatientList = (data: Patient[]) => {
  return {
    type: "SET_PATIENT_LIST" as const,
    payload: data
  };
};

export const addPatient = (data: Patient) => {
  return {
    type: "ADD_PATIENT" as const,
    payload: data
  };
};

export const setPatientDetails = (data: Patient) => {
  return {
    type: "SET_PATIENT_DETAILS" as const,
    payload: data
  };
};

export const setDiagnosesList = (data: Diagnosis[]) => {
  return {
    type: "SET_DIAGNOSES" as const,
    payload: data
  };
};

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_PATIENT_DETAILS";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSES";
      payload: Diagnosis[];
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
      case "SET_DIAGNOSES":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnoses
        }
      };
    case "SET_PATIENT_DETAILS":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    default:
      return state;
  }
};
