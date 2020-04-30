import {commonReducer} from "../../common";

export const toggleSidebar = () => dispatch => {
    dispatch(commonReducer.toggleSidebar())
};