import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    // PATIENT PROFILE
    OCM : '',
    HN : '',
    NAME : '',
    AGE : '',

    // PAGE DETAIL
    PAGE_KEY : '',
    PAGE_BACKGROUND : '',
    PATH_NAME : '',
    PAGE_TITLE : '',

    // KITCHEN DETAIL
    KITCHEN_COD : '',
    KITCHEN_NAME : '',
    MENU_NAME : '',

    // FOOD MENU RAM
    ISLAM : [],
    TYPE_ISLAM : [],

    DANEBURY : [],
    TYPE_DANEBURY : [],

    FOODHOUSE : [],
    TYPE_FOODHOUSE : [],

}


export const counterSlice = createSlice(
    {
        name: 'PageDetail',
        initialState,
        reducers: {

            // Page detail
            SetpageDetail : (state, actions) => {
                state.PAGE_KEY = actions.payload.PAGE_KEY;
                state.PAGE_BACKGROUND = actions.payload.PAGE_BACKGROUND;
                state.PATH_NAME = actions.payload.PATH_NAME;
                state.PAGE_TITLE = actions.payload.PAGE_TITLE;
            },

            // Kitchen detail
            SetKitchenState : (state, actions) => {
                state.KITCHEN_COD = actions.payload.KITCHEN_COD;
                state.KITCHEN_NAME = actions.payload.KITCHEN_NAME;
            },

            // Patient detail
            SetPatientInfo : (state, actions) => {
                state.OCM = actions.payload.OCM;
                state.HN = actions.payload.HN;
                state.NAME = actions.payload.NAME;
                state.AGE = actions.payload.AGE;
            },

            // ครัว : Islam
            SetMenu_Islam : (state, actions) => {

                state.ISLAM = actions.payload.ISLAM;
             
            },
            Set_Type_Islam : (state, actions) => {

                state.TYPE_ISLAM = actions.payload.TYPE_ISLAM;

            },
            Reset_Food_Islam : (state, actions) => {

                state.TYPE_ISLAM = [];
                state.ISLAM = [];

            },

            // ครัว : Danebury
            SetMenu_Danebury : (state, actions) => {

                state.DANEBURY = actions.payload.DANEBURY;
       
            },
            Set_Type_Danebury : (state, actions) => {

                state.TYPE_DANEBURY = actions.payload.TYPE_DANEBURY;
    
            },
            Reset_Food_Danebury : (state, actions) => {

                state.TYPE_DANEBURY = [];
                state.DANEBURY = [];

            },

            // ครัว : Foodhouse
            SetMenu_Foodhouse : (state, actions) => {

                state.FOODHOUSE = actions.payload.FOODHOUSE;

            },
            Set_Type_Foodhouse : (state, actions) => {

                state.TYPE_FOODHOUSE = actions.payload.TYPE_FOODHOUSE;

            },
            Reset_Food_Foodhouse : (state, actions) => {

                state.TYPE_FOODHOUSE = [];
                state.FOODHOUSE = [];

            },

        },
    }
)

export const { 
                SetpageDetail, 
                SetKitchenState,
                SetPatientInfo,

                SetMenu_Islam,
                Set_Type_Islam,
                Reset_Food_Islam,

                SetMenu_Danebury,
                Set_Type_Danebury,
                Reset_Food_Danebury,

                SetMenu_Foodhouse,
                Set_Type_Foodhouse,
                Reset_Food_Foodhouse
            } = counterSlice.actions;

export default counterSlice.reducer;