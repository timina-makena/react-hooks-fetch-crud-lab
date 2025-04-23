import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("Content");
  const [questions, setQuestions] = useState([]);
  const fetchingQuestions = () => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((questions) => setQuestions(questions));
  };

  useEffect(() => {
    fetchingQuestions();
  }, []);

  function CreateQuestion(question) {
    setPage("Content");
    setQuestions([...questions, question]);
  }

  function handleUpdate(updatedQuestion) {
    const updatedQuestions = questions.map((question) => {
      if (question.id === updatedQuestion.id) {
        return updatedQuestion;
      } else {
        return question;
      }
    });
    setQuestions(updatedQuestions);
  }

  function handleDeleteQuestion(id) {
    const updatedQuestions = questions.filter(
      (questions) => questions.id !== id
    );
    setQuestions(updatedQuestions);
  }

 

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm onAddQuestion={CreateQuestion} />
      ) : (
        <QuestionList
          questions={questions}
          onDeleteQuestion={handleDeleteQuestion}
          onUpdateQuestion={handleUpdate}
        />
      )}
    </main>
  );
}

export default App;