import { createSignal } from "solid-js";

export default function SubjectItem(props) {
  const handleNameChange = (e) => {
    props.onChange?.({
      ...props.subject,
      name: e.currentTarget.value,
    });
  };

  const handleGradeValueChange = (e) => {
    const value = e.currentTarget.value;
    props.onChange?.({
      ...props.subject,
      gradeValue: value === "" ? "" : Number(value),
    });
  };

  return (
    <div class="subject-item-row">
      <input
        type="text"
        class="subject-item-name"
        value={props.subject?.name || ""}
        placeholder="Subject name or code"
        onInput={handleNameChange}
      />
      <input
        type="number"
        class="subject-item-grade-value"
        min="0"
        max="100"
        value={props.subject?.gradeValue ?? ""}
        placeholder="% grade"
        onInput={handleGradeValueChange}
      />
    </div>
  );
}