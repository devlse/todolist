import React, { createContext, useReducer, useContext, useRef } from "react";

/* 1. 초기상태(initialState)을 설정해준다. */
const initialTodos = [
    {
        id: 1,
        text: "프로젝트 생성하기",
        done: true,
    },
    {
        id: 2,
        text: "컴포넌트 스타일링하기",
        done: true,
    },
    {
        id: 3,
        text: "Context 만들기",
        done: false,
    },
    {
        id: 4,
        text: "기능 구현하기",
        done: false,
    },
];

/* 
2. reducer 함수를 생성한다.
    CREATE
    TOGGLE
    REMOVE
*/
function todoReducer(state, action) {
    switch (action.type) {
        case "CREATE":
            return state.concat(action.todo);
        case "TOGGLE":
            return state.map((todo) =>
                todo.id === action.id ? { ...todo, done: !todo.done } : todo
            );
        case "REMOVE":
            return state.filter((todo) => todo.id !== action.id);
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

/* 4. Context를 통해 전달해줄 값을 생성한다. */
const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();

export function TodoProvider({ children }) {
    /* 3. useReducer를 사용하여 reducer 함수와 초기상태를 받아온다. */
    const [state, dispatch] = useReducer(todoReducer, initialTodos);
    const nextId = useRef(5);

    /* 5. 사용할 때 Provider 컴포넌트(공통 부모 컴포넌트에 사용)를 이용하여 value에 전달해줄 값을 지정해준다. */
    return (
        <TodoStateContext.Provider value={state}>
            <TodoDispatchContext.Provider value={dispatch}>
                <TodoNextIdContext.Provider value={nextId}>
                    {children}
                </TodoNextIdContext.Provider>
            </TodoDispatchContext.Provider>
        </TodoStateContext.Provider>
    );
}

/* 6. 커스텀Hooks // 
useContext를 이용하여 createContext 로 생성한 전역 데이터 값을 조회하여 사용할 수 있다. 
이렇게 Provider에 의하여 감싸진 컴포넌트는 어디서든지 Context 값을 다른 곳에서 조회해서 사용할 수 있다.*/
export function useTodoState() {
    const context = useContext(TodoStateContext);
    if (!context) {
        throw new Error("Cannot find TodoProvider");
    }
    return context;
}

export function useTodoDispatch() {
    const context = useContext(TodoDispatchContext);
    if (!context) {
        throw new Error("Cannot find TodoProvider");
    }
    return context;
}

export function useTodoNextId() {
    const context = useContext(TodoNextIdContext);
    if (!context) {
        throw new Error("Cannot find TodoProvider");
    }
    return context;
}
