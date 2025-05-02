import { Button } from "../../components/Button";
import cls from "./AddQuestionPage.module.css";

export const AddQuestionPage = () => {
  return (
    <>
      <h1 className={cls.formTitle}>Add new question</h1>
      <div className={cls.formContainer}>
        <form className={cls.form}>
          <div className={cls.formControl}>
            <label htmlFor="questionField">Question: </label>
            <textarea
              name="question"
              id="questionField"
              cols="30"
              rows="2"
              required
              placeholder="Enter Question"
              defaultValue={"defaultValue"}
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
              defaultValue={"defaultValue"}
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
              defaultValue={"defaultValue"}
            ></textarea>
          </div>
          <div className={cls.formControl}>
            <label htmlFor="resourcesField">Resources: </label>
            <textarea
              name="resources"
              id="resourcesField"
              cols="30"
              rows="5"
              required
              placeholder="Please enter resourses seperated by commas"
              defaultValue={"defaultValue"}
            ></textarea>
          </div>
          <div className={cls.formControl}>
            <label htmlFor="levelField">Level: </label>
            <select name="level" id="levelField" defaultValue={"1"}>
              <option disabled>Question level</option>
              <option value={"1"}>1- easy</option>
              <option value={"2"}>2- medium</option>
              <option value={"3"}>3- hard</option>
            </select>
          </div>

          <label htmlFor="clearFormField" className={cls.clearFormControl}>
            <input type="checkbox" className={cls.checkbox} name="clearForm" id="clearFormField" />
            <span>clear form after submitting</span>
          </label>
          <Button>Add Question</Button>
        </form>
      </div>
    </>
  );
};
