import { useNavigate } from "react-router-dom";
import { Button } from "../Button";
import cls from "./QuestionCard.module.css";

const QuestionCard = ({ card }) => {
  const navigate = useNavigate();

  return (
    <div className={cls.card}>
      <div>
        <div>Level: {card.Level}</div>
        <div>{card.completed ? "Completed" : "Not Completed"}</div>
      </div>

      <h5 className={cls.cardTitle}>{card.question}</h5>

      <div className={cls.cardAnswers}>
        <label>short answer:</label>
        <p className={cls.cardAnswer}>{card.answer}</p>
      </div>

      <Button onClick={() => navigate(`/question/${card.id}`)}>View</Button>
    </div>
  );
};

export default QuestionCard;
