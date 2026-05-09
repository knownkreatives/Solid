import { createSignal, createEffect } from "solid-js";
import Selector from "./Selector";
import Table from "./CSVTable";
import SubjectItem from "./SubjectItem";
import ResultItem from "./ResultItem";

export default function Calculator(props) {
    const availableTables = props.tables || [];
    const [selectedTable, setSelectedTable] = createSignal(0);
    const [subjects, setSubjects] = createSignal([]);
    const [results, setResults] = createSignal([]);

    createEffect(() => {
        selectedTable();
        subjects();
        calculateGrades();
    });

    function calculateGrades() {
        // tableHeader[0][0] is the subject code, tableHeader[0][1] is the subject name, tableHeader[0][2] is the maximum points awarded
        // tableHeader[1][3...n] are the grading scheme A, B, C, D, F etc.
        const currentSubjects = subjects();
        const updatedSubjects = currentSubjects.map(subject => {
            const tableHeader = availableTables[selectedTable()].headers;
            const tableRow = availableTables[selectedTable()].rows.find((row) => row[0] === subject?.code || row[1] === subject?.name);

            if (tableRow) {
                const gradingScheme = tableHeader[1].slice(3);
                const gradeBoundaries = tableRow.slice(3).map(parseFloat);
                const gradeIndex = gradeBoundaries.findIndex(boundary => subject.points >= boundary);
                const grade = gradeIndex >= 0 ? gradingScheme[gradeIndex] : "U"; // U for ungraded if below lowest boundary
                return { ...subject, grade };
            } else {
                return { ...subject, grade: "N/A" };
            }
        });
        setResults(updatedSubjects);
    }

    return (
        <div class="calculator-container">
            <Selector
                name="table"
                group="Table"
                item={availableTables}
                onSelect={setSelectedTable}
            />
            {availableTables[selectedTable()] && (
                <Table csv={availableTables[selectedTable()].csv} />
            )}

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
                <button onClick={() => setSubjects((prev) => [...prev, { code: "", name: "", points: 0, grade: "N/A" }])}>Add Subject</button>
                <button onClick={() => setSubjects((prev) => prev.slice(0, -1))}>Remove Subject</button>
            </div>

            {results() && (
                <div class="results-container">
                    <h2>Results</h2>
                    {subjects().map((subject, index) => (
                        <ResultItem
                            key={index}
                            subject={results.name}
                            grade={results.grade}
                        />
                    ))}
                </div>)
            }
        </div>
    );
}