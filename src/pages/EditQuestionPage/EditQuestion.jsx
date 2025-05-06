import { useActionState } from "react";
import cls from "./EditQuestionPage.module.css";
import { QuestionForm } from "../../components/QuestionForm";
import { API_URL } from "../../constants";
import { Delay } from "../../helpers/delayFn";
import { toast } from "react-toastify";
import { dateFormat } from "../../helpers/dateFormat";
import { useFetch } from "../../hooks/useFetch";
import { useNavigate, useParams } from "react-router-dom";
import { Loader } from "../../components/Loader";

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
  const navigate = useNavigate();
  const [formStates, formAction, isPending] = useActionState(editCardAction, { ...initialState, clearForm: false });
  const { id } = useParams();

  const [removeQuestion, isQuestionRemoving] = useFetch(async () => {
    await fetch(`${API_URL}/react/${id}`, {
      method: "DELETE",
    });

    toast.success("The question has been successfully removed!");
    navigate("/");
  });

  const onRemoveQuestionHandler = () => {
    const isRemove = confirm("Are you sure?");

    isRemove && removeQuestion();
  };

  return (
    <>
      {(isPending || isQuestionRemoving) && <Loader />}
      <h1 className={cls.formTitle}>Edit Question</h1>
      <div className={cls.formContainer}>
        <button className={cls.removeBtn} disabled={isPending || isQuestionRemoving} onClick={onRemoveQuestionHandler}>
          X
        </button>
        {initialState && (
          <QuestionForm
            formState={formStates}
            formAction={formAction}
            isPending={isPending || isQuestionRemoving}
            text="Edit Question"
          />
        )}
      </div>
    </>
  );
};
