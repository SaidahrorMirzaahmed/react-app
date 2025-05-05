import { useActionState } from "react";
import { Button } from "../../components/Button";
import cls from "./AddQuestionPage.module.css";
import { Delay } from "../../helpers/delayFn";
import { toast } from "react-toastify";
import { API_URL } from "../../constants";
import { Loader } from "../../components/Loader";
import { QuestionForm } from "../../components/QuestionForm";

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

const AddQuestionPage = () => {
  const [formState, formAction, isPending] = useActionState(createCardAction, { clearForm: false });

  return (
    <>
      {isPending && <Loader />}

      <h1 className={cls.formTitle}>Add new question</h1>
      <div className={cls.formContainer}>
        <QuestionForm formState={formState} formAction={formAction} isPending={isPending} text="Add Question" />
      </div>
    </>
  );
};

export default AddQuestionPage;
