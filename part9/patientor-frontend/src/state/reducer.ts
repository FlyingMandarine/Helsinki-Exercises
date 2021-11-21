import { State } from "./state";
import { Patient } from "../types";

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
