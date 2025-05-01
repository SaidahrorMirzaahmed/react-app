import { useNavigate, useParams } from "react-router-dom";
import cls from "./QuestionPage.module.css";
import { Badge } from "../../components/Badge";
import { Button } from "../../components/Button";
import { useEffect, useId, useState } from "react";
import { API_URL } from "../../constants";
import { useFetch } from "../../hooks/useFetch";
import { Loader, SmallLoader } from "../../components/Loader";

export const QuestionPage = () => {
  const checkboxId = useId();
  const navigate = useNavigate();
  const params = useParams();
  const [isChecked, setIsChecked] = useState();
  const [card, setCard] = useState(null);

  console.log(params);

  const [fetchCard, isLoading] = useFetch(async () => {
    const response = await fetch(`${API_URL}/react/${params.id}`);
    const question = await response.json();

    setCard(question);
  });

  const [updateCard, isCardUpdating] = useFetch(async () => {
    const response = await fetch(`${API_URL}/react/${params.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !isChecked }),
    });
    const data = await response.json();
    setCard(data); // update UI
  });

  const levelVariant = () => (card.level == 1 ? "primary" : card.level == 2 ? "warning" : "alert");
  const completedVariant = () => (card.completed ? "success" : "primary");

  const onChangeCheckboxHandler = () => {
    setIsChecked(!isChecked);
    updateCard(!isChecked);
  };

  useEffect(() => {
    card !== null && setIsChecked(card.completed); //no
  }, [card]);

  useEffect(() => {
    fetchCard();
  }, []);

  return (
    <>
      {isLoading && <Loader />}

      {card !== null && (
        <div className={cls.container}>
          <div className={cls.cardLabels}>
            <Badge variant={levelVariant()}>Level: {card.level}</Badge>
            <Badge variant={completedVariant()}>{card.completed ? "Completed" : "Not Completed"}</Badge>
            {card?.editDate && <p className={cls.editDate}>Edited: {card.editDate}</p>}
          </div>

          <h5 className={cls.cardTitle}>{card.question}</h5>
          <p className={cls.cardDescription}>{card.description}</p>

          <div className={cls.cardAnswers}>
            <label>short answer:</label>
            <p className={cls.cardAnswer}>{card.answer}</p>
          </div>

          <ul className={cls.cardLinks}>
            Resources:
            {card.resources.map((resourse, index) => {
              return (
                <li key={index}>
                  <a href={resourse}>{resourse}</a>
                </li>
              );
            })}
          </ul>

          <label htmlFor={checkboxId} className={cls.checkboxWrapper}>
            <input
              type="checkbox"
              id={checkboxId}
              className={cls.checkbox}
              checked={isChecked}
              onChange={onChangeCheckboxHandler}
              disabled={isCardUpdating}
            />
            <span>mark question as completed</span>
            {isCardUpdating && <SmallLoader />}
          </label>

          <Button onClick={() => navigate(`/editquestion/${card.id}`)} isDisabled={isCardUpdating}>
            Edit Question
          </Button>
          <Button onClick={() => navigate("/")} isDisabled={isCardUpdating}>
            Back
          </Button>
        </div>
      )}
    </>
  );
};
