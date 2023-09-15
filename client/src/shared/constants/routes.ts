import {lazy} from "react";
const MainPage = lazy(() => import("@/pages/main"));
const VideoWordsPage = lazy(() => import("@/pages/videoWords"));
const TopWordsPage = lazy(() => import("@/pages/topWords"));
const HistoryPage = lazy(() => import("@/pages/history"));

export const routes = [
    {
        path: "/",
        component: MainPage,
    },
    {
        path: "/videoWords",
        component: VideoWordsPage,
    },
    {
        path: "/topWords",
        component: TopWordsPage,
    },
    {
        path: "/history",
        component: HistoryPage,
    }
];
