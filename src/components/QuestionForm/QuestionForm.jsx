import { Button } from "../Button";
import cls from "./QuestionForm.module.css";

export const QuestionForm = ({ formState, isPending, formAction, text }) => {
  console.log({ formState, isPending, formAction, text });

  return (
    <form className={cls.form} action={formAction}>
      <div className={cls.formControl}>
        <label htmlFor="questionField">Question: </label>
        <textarea
          name="question"
          id="questionField"
          cols="30"
          rows="2"
          required
          placeholder="Enter Question"
          defaultValue={formState.question}
        ></textarea>
      </div>
      <div className={cls.formControl}>
        <label htmlFor="answerField">Short Answer: </label>
        <textarea
          name="answer"
          id="answerField"
          cols="30"
          rows="2"
          required
          placeholder="Enter a short answer"
          defaultValue={formState.answer}
        ></textarea>
      </div>
      <div className={cls.formControl}>
        <label htmlFor="descriptionField">Description: </label>
        <textarea
          name="description"
          id="descriptionField"
          cols="30"
          rows="5"
          required
          placeholder="Enter a full description"
          defaultValue={formState.description}
        ></textarea>
      </div>
      <div className={cls.formControl}>
        <label htmlFor="resourcesField">Resources: </label>
        <textarea
          name="resources"
          id="resourcesField"
          cols="30"
          rows="5"
          placeholder="Please enter resourses seperated by commas"
          defaultValue={formState.resources}
        ></textarea>
      </div>
      <div className={cls.formControl}>
        <label htmlFor="levelField">Level: </label>
        <select name="level" id="levelField" defaultValue={formState.level}>
          <option disabled>Question level</option>
          <option value={"1"}>1- easy</option>
          <option value={"2"}>2- medium</option>
          <option value={"3"}>3- hard</option>
        </select>
      </div>

      <label htmlFor="clearFormField" className={cls.clearFormControl}>
        <input
          type="checkbox"
          className={cls.checkbox}
          name="clearForm"
          id="clearFormField"
          defaultChecked={formState.clearForm}
        />
        <span>clear form after submitting</span>
      </label>
      <Button isDisabled={isPending}>{text}</Button>
    </form>
  );
};
