import { BrowserRouter, Routes, Route } from "react-router"
import Portfolio from './Portfolio/Portfolio'
import Preview from "./Preview"

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/preview" element={<Preview><Portfolio /></Preview>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
