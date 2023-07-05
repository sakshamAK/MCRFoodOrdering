import { Route, Routes } from "react-router-dom"
import { Landing } from "./pages"
import "./App.css"
import { Reviews } from "./pages/components/Reviews/Reviews"

export const App = () => {
  return (
    <Routes>
        <Route path = "/" element = {<Landing />} />
        <Route path = "/restaurant/:id" element = {<Reviews />} />
    </Routes>
  )
}
