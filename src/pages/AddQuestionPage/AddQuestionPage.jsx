import { useActionState } from "react";
import { Button } from "../../components/Button";
import cls from "./AddQuestionPage.module.css";
import { Delay } from "../../helpers/delayFn";
import { toast } from "react-toastify";
import { API_URL } from "../../constants";

const createCardAction = async (_prevState, formData) => {
  try {
    await Delay();

    const newQuestion = Object.fromEntries(formData);
    var resources = newQuestion.resources.trim();
    const isClearForm = newQuestion.clearForm;

    const response = await fetch(`${API_URL}/react`, {
      method: "POST",
      body: JSON.stringify({
        question: newQuestion.question,
        answer: newQuestion.answer,
        description: newQuestion.description,
        resources: resources.length ? resources.split(",") : [],
        level: Number(newQuestion.level),
        completed: false,
      }),
    });

    if (response.status === 404) {
      throw new Error(response.statusText);
    }

    var question = response.json();
    toast.success("New question added");

    return isClearForm ? {} : question;
  } catch (error) {
    toast.error(error.message);
    return {};
  }
};

export const AddQuestionPage = () => {
  const [formState, formAction, isPending] = useActionState(createCardAction, { clearForm: false });

  return (
    <>
      <h1 className={cls.formTitle}>Add new question</h1>
      <div className={cls.formContainer}>
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
              required
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
          <Button isDisabled={isPending}>Add Question</Button>
        </form>
      </div>
    </>
  );
};
