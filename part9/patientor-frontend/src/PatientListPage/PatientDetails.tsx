import React from "react";
import axios from "axios";
import { useParams } from "react-router";

import { useStateValue } from "../state/state";
import { apiBaseUrl } from "../constants";
import { Patient } from "../types";
import { setPatientDetails } from "../state";

import EntryDetails from "./EntryDetails";
import { HospitalEntryFormValues } from "../AddEntryModal/AddEntryForm";
import AddEntryModal from "../AddEntryModal";
import { Button } from "semantic-ui-react";

const PatientDetails = () => {
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();

    const patientId: string = useParams<{ id: string }>().id;
    const [{ patients }, dispatch] = useStateValue();

    const patient: Patient = patients[patientId];

    React.useEffect(() => {
        const fetchPatientDetails = async () => {
            try {
                const { data: patientDetailsFromApi } = await axios.get<Patient>(
                    `${apiBaseUrl}/patients/${patientId}`
                );
                dispatch(setPatientDetails(patientDetailsFromApi));
            } catch (e) {
                console.error(e);
            }
        };

        if (patients[patientId]['ssn'] === undefined) {
            void fetchPatientDetails();
        }
    }, []);

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const submitNewEntry = async (values: HospitalEntryFormValues) => {
        try {
            const { data: updatedPatient } = await axios.post<Patient>(
                `${apiBaseUrl}/patients/${patientId}/entries`,
                values
            );
            dispatch(setPatientDetails(updatedPatient));
            closeModal();
        } catch (e) {
            console.error(e.response?.data || 'Unknown Error');
            setError(e.response?.data?.error || 'Unknown error');
        }
    };

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

            <h2>entries</h2>
            {
                patient.entries &&
                patient.entries.map(entry =>
                    <EntryDetails key={ entry.id } entry={ entry } />
                )
            }

            <AddEntryModal
                modalOpen={modalOpen}
                onSubmit={submitNewEntry}
                error={error}
                onClose={closeModal}
            />
            <Button onClick={() => openModal()}>Add Hospital Entry</Button>
        </>
    );
};

export default PatientDetails;