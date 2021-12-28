import { FC } from "react"
import { Route, Routes } from "react-router-dom"
import { About } from "./components/about/About"
import { Dashboard } from "./components/dashboard/Dashboard"
import { Main } from "./components/main/Main"

export const AppRoutes: FC = () => {
    return (<Routes>
        <Route path='/' element={<Main />} />
        <Route path='about' element={<About />} />
        <Route path='dashboard/*' element={<Dashboard />} />

    </Routes>)
}