import { Route, Routes, Navigate } from "react-router-dom";
import {routes} from "@/shared/constants/routes";
import NavigateBar from "@/widgets/navigateBar/ui";

export const Routing = () => {
    return (<>
            <NavigateBar/>
            <Routes>
                {routes.map((route, index) => (
                    <Route key={index} path={route.path} element={<route.component/>}/>
                ))}
                <Route path="*" element={<Navigate to="/" replace/>}/>
            </Routes>
        </>
    );
};
