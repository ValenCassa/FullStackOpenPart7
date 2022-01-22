import { blogsReducer, filterReducer, loginReducer, showReducer, usersReducer } from "../reducers/blogReducer";
import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk'

const reducer = combineReducers({
    blogs: blogsReducer,
    filter: filterReducer,
    show: showReducer,
    user: loginReducer,
    users: usersReducer
})

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)

export default store