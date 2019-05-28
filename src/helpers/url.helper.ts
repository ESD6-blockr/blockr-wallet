export const getIdFromURL = (pathName: string): number => {
    return Number(window.location.pathname.split(pathName)[1]);
};
