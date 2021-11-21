import React from "react";
import axios from "axios";
import { useParams } from "react-router";

import { useStateValue } from "../state/state";
import { apiBaseUrl } from "../constants";
import { Patient } from "../types";

const PatientDetails = () => {
    const patientId: string = useParams<{ id: string }>().id;
    const [{ patients }, dispatch] = useStateValue();

    const patient: Patient = patients[patientId];

    React.useEffect(() => {
        const fetchPatientDetails = async () => {
            try {
                const { data: patientDetailsFromApi } = await axios.get<Patient>(
                    `${apiBaseUrl}/patients/${patientId}`
                );
                dispatch({ type: 'SET_PATIENT_DETAILS', payload: patientDetailsFromApi });
            } catch (e) {
                console.error(e);
            }
        };

        if (patients[patientId]['ssn'] === undefined) {
            void fetchPatientDetails();
        }
    }, []);

    return (
        <>
            <h1>
                {patient.name}{" "}
                { patient.gender === 'male' && <i className="mars icon"></i> }
                { patient.gender === 'female' && <i className="venus icon"></i> }
                { patient.gender === 'other' && <i className="genderless icon"></i> }
            </h1>
            ssn: {patient.ssn}<br />
            occupation: {patient.occupation}
        </>
    );
};

export default PatientDetails;