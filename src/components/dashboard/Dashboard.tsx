import { Grid } from "@material-ui/core";
import { FC, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import CalendarView from "../../views/dashboard/calendar/calendar-view";
import ProductListView from "../../views/dashboard/product/ProductListView";
import { DashboardDefaultContent } from "./dashboard-default-content";
import { DashboardSidebarNavigation } from "./dashboard-sidebar-navigation";


const SettingsAndPrivacy = lazy(() => import('./settings-and-privacy'))

export const Dashboard: FC = () => {
    return (
        <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
        >
            <DashboardSidebarNavigation />
            <Routes>
                <Route path='settings-and-privacy' element={<Suspense fallback={<>...</>}><SettingsAndPrivacy /></Suspense>} />
                <Route path='list-products' element={<ProductListView />} />
                <Route path="calendar-view" element={<CalendarView />} />
                <Route index element={<DashboardDefaultContent />} />

            </Routes>
        </Grid>
    )
}