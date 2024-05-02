import { useEffect, useState } from "react";
import patientService from "../../services/patients";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import { PatientEntry } from '../../types';

interface PatientIdProps {
  setPatient: React.Dispatch<React.SetStateAction<PatientEntry | null>>;
}

const PatientId: React.FC<PatientIdProps> = ({ setPatient }) => {
  const [patientData, setPatientData] = useState<PatientEntry | null>(null);
  const patientId = window.location.pathname.split("/")[2];
  // console.log(window.location);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const patient = await patientService.getById(patientId);
        if (patient) {
          setPatientData(patient);
          console.log(patient);          
        } else {
          console.error("No patient data found"); 
        }
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    };

    fetchPatientData();
  }, [patientId]);

  useEffect(() => {
    setPatient(patientData);
    return () => {
      setPatient(null);
    };
  }, [patientData, setPatient]);

  if (!patientData) {
    return <div>Loading patient data...</div>;
  }

  return (
    <div>
      <h2>{patientData.name}{" "}
      {patientData.gender === "male" ? (
        <MaleIcon />
      ) : patientData.gender === "female" ? (
        <FemaleIcon />
      ) : null}</h2>
      <p>ssn: {patientData.ssn}</p>
      <p>occupation: {patientData.occupation}</p>
      <h2>entries</h2>
      {patientData.entries.map(entry => 
        <div key={entry.id}>
          <p>{entry.date} {entry.description}</p>
          {entry.diagnosisCodes?.map(code =>
            <li key={code}>{code}</li>
          )}
        </div>
      )}
    </div>
  );
};

export default PatientId;