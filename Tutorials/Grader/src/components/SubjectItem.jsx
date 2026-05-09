import { createSignal } from "solid-js";

export default function SubjectItem(props) {
  const [subject, setSubject] = createSignal(props.subject);
  const [gradeValue, setGradeValue] = createSignal(props.subject?.gradeValue ?? "");

  const handleNameChange = (e) => {
    props.onChange?.({
      ...props.subject,
      name: e.currentTarget.value,
    });
    setSubject((prev) => ({
      ...prev,
      name: e.currentTarget.value,
    }));
  };

  const handleGradeValueChange = (e) => {
    const value = e.currentTarget.value;
    props.onChange?.({
      ...props.subject,
      gradeValue: value === "" ? "" : Number(value),
    });
    setGradeValue((prev) => value === "" ? "" : Number(value));
  };

  return (
    <div class="flex justify-center space-x-4 items-center mb-2">
      <p class="font-bold">{props.subject?.code || "Subject Code"}</p>
      <input
        type="text"
        value={props.subject?.name || ""}
        placeholder="Subject name"
        onInput={handleNameChange}
        class="border border-gray-300 rounded-md px-4 py-2 flex-1 max-w-sm"
      />
      <input
        type="number"
        min="0"
        max="100"
        value={props.subject?.gradeValue ?? ""}
        placeholder="% grade"
        onInput={handleGradeValueChange}
        class="border border-gray-300 rounded-md px-4 py-2 w-32"
      />
    </div>
  );
}