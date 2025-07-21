import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { authApi } from "@/features/api/authApi";
import { messageApi } from "@/features/api/messageApi";

export const appStore = configureStore({
    reducer: rootReducer,//instead of having multiple reducers from different slices we have merged all of them in the root reducer
    middleware:(defaultMiddleware)=> defaultMiddleware().concat(authApi.middleware, messageApi.middleware)
})

const initialiseApp = async ()=>{
    await appStore.dispatch(authApi.endpoints.loadUser.initiate({},
        {forceRefetch:true}
    ))
}

initialiseApp();