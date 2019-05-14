import { createBrowserHistory } from "history";

const routerHistory = createBrowserHistory();

// Created function because push function wouldn't redirect to URL
export const goToUrl = (url: string) => {
    routerHistory.push(url);
    routerHistory.go(routerHistory.length - 1);
};

export default routerHistory;
