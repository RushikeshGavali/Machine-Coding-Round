import { Link, Route, Routes } from 'react-router-dom'
import './App.css'
import TicTacToe from './pages/TickTacToe/TicTacToe'

const questions = [
  {
    path: '/tic-tac-toe',
    title: 'Tic Tac Toe',
    description: 'Play a game of Tic Tac Toe.',
    element: <TicTacToe size={3}/>,
  },
]

function HomePage() {
  return (
    <main className="page-shell">
      <header className="page-header">
        <p className="eyebrow">Practice workspace</p>
        <h1>Machine coding questions</h1>
        <p>Select a question to view its implementation.</p>
      </header>

      <nav aria-label="Question list">
        <ul className="exercise-list">
          {questions.map((question, index) => (
            <li key={question.path}>
              <Link className="exercise-link" to={question.path}>
                <span>
                  <strong>{index + 1}. {question.title}</strong>
                  <small>{question.description}</small>
                </span>
                <span aria-hidden="true">View</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {questions.map((question) => (
        <Route
          key={question.path}
          path={question.path}
          element={question.element}
        />
      ))}
      <Route
        path="*"
        element={
          <main className="page-shell">
            <h1>Page not found</h1>
            <Link className="back-link" to="/">Back to questions</Link>
          </main>
        }
      />
    </Routes>
  )
}

export default App
