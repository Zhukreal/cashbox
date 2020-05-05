import {commonReducer} from "../../common";

export const toggleSidebar = () => dispatch => {
    dispatch(commonReducer.toggleSidebar())
};
export const showSidebar = (param) => dispatch => {
    dispatch(commonReducer.showSidebar(param))
};