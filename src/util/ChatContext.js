import React, {useState, createContext, useContext, useReducer} from 'react'
import { reducerCases } from './Constant'
import { useAuthContext } from './AuthContext'

const ChatContext = createContext()



 export const ChatContextProvider = ({children}) => {

     const {user} = useAuthContext()
    

const initialState = {
    chatId: null,
    theUser: {}
}

const reducer = (state, action) => {
    switch(action.type) {
        case reducerCases.change_user : 
            return {
                 theUser: action.payload,
                chatId: user.uid > action.payload.uid 
                ? user.uid + action.payload.uid
                : action.payload.uid + user.uid
            
                }
                default:
                return state
        

    }
}


const [state,dispatch] = useReducer(reducer ,initialState)




    return (
        <ChatContext.Provider value={{data:state, dispatch}}>
            {children}
        </ChatContext.Provider>
    )
}

export const useChatContext = () => useContext(ChatContext)
