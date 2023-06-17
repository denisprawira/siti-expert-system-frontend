import { useEffect, useState } from "react";
import SymptomService from "../services/SymptomService";
import { experimental_useFormStatus } from "react-dom";
import DiseaseService from "../services/DiseaseService";
import { data } from "autoprefixer";

export const Diagnose = () => {
    const [patient, setPatient] = useState<any>(undefined);
    const [diagnose, setDiagnose] = useState<any>(undefined);
    const [diseaseList, setDiseaseList] = useState<any>([]);
    const [symptomList, setSymptomList] = useState<any>([]);
    const [selectedSymptoms, setSelectedSymptoms] = useState<number[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9; // Number of items to display per page
    const [pageType, setPageType] = useState(1);

    // Calculate the index range for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const addSymptom = (id: number) => {
        setSelectedSymptoms((symptomData) => [...symptomData, id]);
    };

    const removeSymptom = (id: number) => {
        setSelectedSymptoms((symptomData) =>
            symptomData.filter((symptomId) => symptomId !== id)
        );
    };

    const checkIfSymptomExist = (id: number) => {
        return selectedSymptoms.includes(id);
    };

    const toggleSymptom = (id: number) => {
        if (checkIfSymptomExist(id)) {
            removeSymptom(id);
        } else {
            addSymptom(id);
        }
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setPageType(2);
        setCurrentPage(1);

        var formData = new FormData(e.target);
        const formValues = Object.fromEntries(formData);
        setPatient(formValues);
    };

    const getDiagnose = (patient: any, symptom: any) => {
        const fetchData = async () => {
            const diseaseService = new DiseaseService();
            try {
                const response = await diseaseService.getDiagnose(
                    patient,
                    symptom
                );
                // setDianose(response.result.original);
                setDiagnose(response.data.original);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    };

    useEffect(() => {
        const fetchDataSymptom = async () => {
            const symptomService = new SymptomService();
            try {
                const response = await symptomService.getSymptoms();
                setSymptomList(response);
            } catch (error) {
                console.error(error);
            }
        };
        const fetchDataDisease = async () => {
            const diseaseService = new DiseaseService();
            try {
                const response = await diseaseService.getDiseases();
                setDiseaseList(response);
            } catch (error) {
                console.error(error);
            }
        };
        fetchDataDisease();
        fetchDataSymptom();
        // if (diagnose && diagnose.result && diagnose.result['1']) {
        //     console.log(diagnose.result['1']);
        //   }
        // var str = JSON.stringify(diagnose, null, 4);
        // var ptn = JSON.stringify(patient, null, 4);
        // console.log("diagnose: " + str);
        // console.log("patient: " + ptn);
        var str = JSON.stringify(diagnose, null, 4);
        console.log("this is diagnose" + str);
    }, [selectedSymptoms, diagnose, patient]);

    const currentItems: any = symptomList.slice(startIndex, endIndex);

    if (pageType == 1) {
        return (
            <>
                <div className="h-full flex flex-col justify-center max-sm:mx-4">
                    <form
                        className="flex flex-col items-center gap-2"
                        onSubmit={handleSubmit}
                    >
                        <div className="form-control w-full max-w-lg">
                            <label className="label">
                                <span className="label-text">
                                    Masukkan Nama Anda
                                </span>
                            </label>
                            <input
                                name="name"
                                type="text"
                                placeholder="Nama"
                                className="input input-bordered w-full max-w-lg"
                            />
                        </div>

                        <div className="form-control w-full max-w-lg">
                            <label className="label">
                                <span className="label-text">
                                    Pilih Jenis Kelamin Anda
                                </span>
                            </label>
                            <select
                                name="sex"
                                className="select select-bordered"
                            >
                                <option disabled selected>
                                    --jenis kelamin--
                                </option>
                                <option value="male">Pria</option>
                                <option value="female">Wanita</option>
                            </select>
                        </div>

                        <div className="form-control w-full max-w-lg">
                            <label className="label">
                                <span className="label-text">
                                    Masukkan Umur Anda
                                </span>
                            </label>
                            <input
                                name="age"
                                type="number"
                                placeholder="Umur"
                                className="input input-bordered w-full max-w-lg"
                            />
                        </div>

                        <div className="form-control w-full max-w-lg">
                            <label className="label">
                                <span className="label-text">
                                    Masukkan Alamat Tempat Tinggal Anda
                                </span>
                            </label>
                            <input
                                name="address"
                                type="text"
                                placeholder="Alamat"
                                className="input input-bordered w-full max-w-lg"
                            />
                        </div>

                        <div className="form-control w-full max-w-lg">
                            <label className="label">
                                <span className="label-text">
                                    Masukkan Alamat Email Anda
                                </span>
                            </label>
                            <input
                                name="email"
                                type="text"
                                placeholder="Email"
                                className="input input-bordered w-full max-w-lg"
                            />
                        </div>

                        <div className="flex justify-start w-full max-w-lg mt-2">
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </>
        );
        //disabled={currentPage === 1}
    } else if (pageType === 2) {
        return (
            <>
                <div className="h-full flex justify-center items-center flex-col">
                    <h1 className="text-2xl mb-12">
                        Silahkan Pilih Gejala yang Dirasakan:{" "}
                    </h1>
                    <div className="grid lg:grid-rows-4 lg:grid-cols-3 gap-4 max-sm:grid-rows-9 max-sm:grid-cols-1 sm:grid-rows-4 sm:grid-cols-2">
                        {currentItems.map((symptom: any, index: any) => {
                            let id = symptom["id"];
                            return (
                                <button
                                    key={id}
                                    className={`btn btn-wide ${
                                        checkIfSymptomExist(id)
                                            ? "btn-primary"
                                            : ""
                                    }`}
                                    onClick={() => toggleSymptom(id)}
                                >
                                    {symptom["name"]}
                                </button>
                            );
                        })}
                    </div>
                    <div className="divider"></div>
                    <div className="flex flex-row max-sm:flex-col gap-4 mt-10">
                        <button
                            id="btnDiagnose"
                            className="btn btn-wide btn-success"
                            onClick={() => {
                                setCurrentPage(currentPage - 1);
                                currentPage == 1 ? setPageType(1) : "dfdfd";
                            }}
                        >
                            Sebelumnya
                        </button>
                        <div className="divider divider-horizontal max-sm:hidden "></div>
                        <button
                            id="btnDiagnose"
                            className="btn btn-wide btn-success"
                            onClick={() => {
                                if (endIndex >= symptomList.length) {
                                    getDiagnose(patient, selectedSymptoms);

                                    setPageType(3);
                                } else {
                                    setCurrentPage(currentPage + 1);
                                }
                            }}
                        >
                            {endIndex >= symptomList.length
                                ? "Diagnose"
                                : "Lanjutkan"}
                        </button>
                    </div>
                </div>
            </>
        );
    } else {
        if (typeof diagnose === "undefined") {
            return (
                <>
                    <svg
                        className="animate-spin h-5 w-5 mr-3 ..."
                        viewBox="0 0 24 24"
                    ></svg>
                </>
            );
        } else if (diagnose !== null) {
            const keys = Object.keys(diagnose.result);
            const sortedKeys = Array.from(Object.keys(diagnose.result)).sort(
                (a, b) =>
                    diagnose.result[b].percentage -
                    diagnose.result[a].percentage
            );
            const resultElements = sortedKeys.map((key) => {
                const resultObject = diagnose.result[key];
                const percentage = resultObject.percentage;
                const symptoms = resultObject.symptoms;
                const disease = diseaseList.find((item: any) => item.id == key);
                return (
                    <>
                        <div
                            key={key}
                            className="card w-96 bg-base-100 shadow-xl mb-4 w-full "
                        >
                            <div className="card-body">
                                <div className="flex flex-col gap-2">
                                    <h1 className="text-rose-800 text-lg">
                                        <b>{disease.name}</b>
                                    </h1>
                                    <p>
                                        <b>Percentage:</b>{" "}
                                        <b className="text-lime-500">
                                            {percentage.toFixed(2)} %
                                        </b>
                                    </p>
                                    <p>
                                        <b>
                                            Definisi: <br></br>
                                        </b>
                                        {disease.definition}
                                    </p>
                                    <p>
                                        <b>Initial Symptom:</b>{" "}
                                    </p>
                                    <div className="flex flex-row flex-wrap gap-2">
                                        {symptoms.map(
                                            (symptom: any, index: number) => {
                                                const symp = symptomList.find(
                                                    (item: any) =>
                                                        item.id === symptom
                                                );
                                                return (
                                                    <div className="badge badge-md h-fit">
                                                        {symptom
                                                            ? symp.name
                                                            : "Symptom not found"}
                                                    </div>
                                                );
                                            }
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                );
            });
            const [firstElement, secondElement, ...remainingElements] =
                resultElements;

            return (
                <>
                    <div className="flex flex-col max-lg:m-4 max-lg:mb-4">
                        {patient !== null && patient !== undefined ? (
                            <div className="card w-96 bg-base-100 shadow-xl mb-4 w-full ">
                                <div className="card-body">
                                    <div className="flex flex-col gap-2">
                                        <h1 className="text-rose-800 text-lg">
                                            <b>Data Pasien</b>
                                        </h1>
                                        <p>
                                            <b>Nama Pasien : </b> {patient.name}
                                        </p>
                                        <p>
                                            <b>Umur : </b>
                                            {patient.age}
                                        </p>
                                        <p>
                                            <b>Jenis Kelamin : </b>{" "}
                                            {patient.sex}
                                        </p>
                                        <p>
                                            <b>alamat : </b>
                                            {patient.address}
                                        </p>
                                        <p>
                                            <b>Email : </b> {patient.email}
                                        </p>
                                        <h1>
                                            <b>Gejala Awal: </b>
                                        </h1>

                                        <div className="flex flex-row flex-wrap gap-2">
                                            {diagnose.initial_symptoms.map(
                                                (item: any) => {
                                                    const symptom =
                                                        symptomList.find(
                                                            (symptom: any) =>
                                                                symptom.id ===
                                                                item
                                                        );
                                                    return (
                                                        <>
                                                            {" "}
                                                            <div className="badge badge-md gap-2">
                                                                {symptom
                                                                    ? symptom.name
                                                                    : "Symptom not found"}
                                                            </div>
                                                        </>
                                                    );
                                                }
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <h1>there is no patient data</h1>
                        )}

                        <div className="grid grid-cols-2 grid-rows-auto gap-4 max-md:grid-cols-1">
                            {firstElement}
                            {secondElement}
                        </div>

                        <div
                            tabIndex={0}
                            className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box mb-4"
                        >
                            <input type="checkbox" />

                            <div className="collapse-title text-xl font-medium">
                                Lihat Hasil Diagnosa Hepatitis Lainnya
                            </div>
                            <div className="collapse-content">
                                <div className="grid grid-cols-2 grid-rows-auto gap-4 max-md:grid-cols-1">
                                    {remainingElements.map((item) => {
                                        return item;
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            );
        } else {
            return (
                <>
                    <h1>Variable is null</h1>
                </>
            );
        }
    }
};
