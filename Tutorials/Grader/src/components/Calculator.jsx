import { createSignal, createEffect } from "solid-js";
import Selector from "./Selector";
import CSVTable from "./CSVTable";
import SubjectItem from "./SubjectItem";
import ResultItem from "./ResultItem";

export default function Calculator() {
    const [data, setData] = createSignal(null);
    const [selectedTable, setSelectedTable] = createSignal(0);
    const [subjects, setSubjects] = createSignal([{ code: "", name: "", points: 0, grade: "N/A" }]);
    const [results, setResults] = createSignal([]);

    const tableDirectory = '/data/boundaries';
    const availableTables = ["AQA_06_2025_ALevel", "AQA_06_2025_ASLevel", "AQA_06_2025_GCSE"];
    createEffect(async () => {
        const response = await fetch(`${tableDirectory}/${availableTables[selectedTable()]}.csv`);
        const csv = await response.text();
        setData(csv);
    });

    createEffect(() => {
        selectedTable();
        subjects();
    });

    return (
        <div class="calculator-container">
            <Selector
                name="subjects"
                item={availableTables}
                onSelect={setSelectedTable}
            />
            <CSVTable data={data()}/>

            <div class="subjects-container">
                <h2>Subjects and Grades</h2>
                {subjects().map((subject, index) => (
                    <SubjectItem
                        key={index}
                        subject={subject}
                        onChange={(updatedSubject) => {
                            setSubjects((prev) => {
                                const newSubjects = [...prev];
                                newSubjects[index] = updatedSubject;
                                return newSubjects;
                            });
                            calculateGrades();
                        }}
                    />
                ))}
                <button onClick={() => setSubjects((prev) => [...prev, { code: "", name: "", points: 0, grade: "N/A" }])}
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mt-4">
                    Add Subject</button>
                <button onClick={() => setSubjects((prev) => prev.slice(0, -1))}
                    class="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md mt-4">
                    Remove Subject</button>
            </div>

            {results() && (
                <div class="results-container">
                    <h2>Results</h2>
                    {results().map((result, index) => (
                        <ResultItem
                            key={index}
                            subject={result.name}
                            grade={result.grade}
                        />
                    ))}
                </div>)
            }
        </div>
    );
}