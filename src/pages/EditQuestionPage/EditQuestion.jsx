import { useActionState } from "react";
import cls from "./EditQuestionPage.module.css";
import { QuestionForm } from "../../components/QuestionForm";
import { API_URL } from "../../constants";
import { Delay } from "../../helpers/delayFn";
import { toast } from "react-toastify";
import { dateFormat } from "../../helpers/dateFormat";

const editCardAction = async (_prevState, formData) => {
  try {
    await Delay();

    const newQuestion = Object.fromEntries(formData);
    var resources = newQuestion.resources.trim();
    const questionId = newQuestion.questionId;
    const isClearForm = newQuestion.clearForm;

    const response = await fetch(`${API_URL}/react/${questionId}`, {
      method: "PUT",
      body: JSON.stringify({
        question: newQuestion.question,
        answer: newQuestion.answer,
        description: newQuestion.description,
        resources: resources.length ? resources.split(",") : [],
        level: Number(newQuestion.level),
        completed: false,
        editDate: dateFormat(new Date()),
      }),
    });

    if (response.status === 404) {
      throw new Error(response.statusText);
    }

    var question = response.json();
    toast.success("Question updated");

    return isClearForm ? {} : question;
  } catch (error) {
    toast.error(error.message);
    return {};
  }
};

export const EditQuestion = ({ initialState = {} }) => {
  const [formStates, formAction, isPending] = useActionState(editCardAction, { ...initialState, clearForm: false });
  return (
    <>
      {isPending && <Loader />}
      <h1 className={cls.formTitle}>Edit Question</h1>
      <div className={cls.formContainer}>
        {initialState && (
          <QuestionForm formState={formStates} formAction={formAction} isPending={isPending} text="Edit Question" />
        )}
      </div>
    </>
  );
};
