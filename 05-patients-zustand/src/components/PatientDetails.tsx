import { toast } from "react-toastify";

import { usePatientStore } from "../store/store";
import { Patient } from "../types/index";
import PatientDetailsItem from "./PatientDetailsItem";
type PatientDetaildProps = {
  patient: Patient;
};

export default function PatientDetails({ patient }: PatientDetaildProps) {
  const deletePatient = usePatientStore((state) => state.deletePatient);
  const getPatientById = usePatientStore((state) => state.getPatientById);
  const handleClick = () => {
    deletePatient(patient.id);
    toast.error("Paciente Eliminado");
  };
  return (
    <div className="mx-5 my-10 px-5 py-10 bg-white shadow-md rounded-xl">
      <PatientDetailsItem label="ID" data={patient.id} />
      <PatientDetailsItem label="NOMBRE" data={patient.name} />
      <PatientDetailsItem label="PROPIETARIO" data={patient.caretaker} />
      <PatientDetailsItem label="EMAIL" data={patient.email} />
      <PatientDetailsItem label="FECHA ALTA" data={patient.date.toString()} />
      <PatientDetailsItem label="SINTOMAS" data={patient.symptoms} />
      <div className="flex flex-col lg:flex-row gap-2 justify-between  mt-10">
        <button
          type="button"
          className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase rounded-lg"
          onClick={() => getPatientById(patient.id)}
        >
          {"EDITAR"}
        </button>
        <button
          type="button"
          className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white font-bold uppercase rounded-lg"
          onClick={handleClick}
        >
          {"ELIMINAR"}
        </button>
      </div>
    </div>
  );
}
