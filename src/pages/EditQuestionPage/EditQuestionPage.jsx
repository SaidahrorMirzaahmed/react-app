import { useParams } from "react-router-dom";
import { API_URL } from "../../constants";
import { useEffect, useState } from "react";
import { QuestionForm } from "../../components/QuestionForm";
import { Loader } from "../../components/Loader";
import { useFetch } from "../../hooks/useFetch";
import { EditQuestion } from "./EditQuestion";

const EditQuestionPage = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);

  const [fetchQuestion, isQuestionLoading] = useFetch(async () => {
    const response = await fetch(`${API_URL}/react/${id}`);
    const data = await response.json();
    setQuestion(data);
  });

  useEffect(() => {
    fetchQuestion();
  }, []);

  if (isQuestionLoading || !question) return <Loader />;

  return (
    <>
      {isQuestionLoading && <Loader />}
      {question && <EditQuestion initialState={question} />}
    </>
  );
};

export default EditQuestionPage;
