import QuestionCard from "../QuestionCard/QuestionCard";
import cls from "./QuestionCardList.module.css";

const QuestionCardList = ({ cards }) => {
  return (
    <div className={cls.cardList}>
      {cards.map((card, index) => {
        return <QuestionCard card={card} key={index} />;
      })}
    </div>
  );
};

export default QuestionCardList;
