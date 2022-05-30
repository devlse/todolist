import React, { useState } from "react";
import styled, { css } from "styled-components";
import { MdAdd } from "react-icons/md";
import { useTodoDispatch, useTodoNextId } from "../TodoContext";

const CircleButton = styled.div`
    background: #38d9a9;
    &:hover {
        background: #63e6be;
    }
    &:active {
        background: #20c997;
    }

    z-index: 5;
    cursor: pointer;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;

    position: absolute;
    /* 맨 아래 가운데 정렬 */
    left: 50%;
    bottom: 0px;
    transform: translate(-50%, 50%);

    font-size: 35px;
    color: white;
    border-radius: 40px;

    border: none;
    outline: none;

    transition: 0.125s all ease-in;

    /* 버튼을 눌러서 토글 됐을 때 open 이라는 값이 들어오면 적용될 스타일*/
    ${(props) =>
        props.open &&
        css`
            background: #ff6b6b;
            &:hover {
                background: #ff8787;
            }
            &:active {
                background: #fa5252;
            }
            transform: translate(-50%, 50%) rotate(45deg);
        `}
`;

const InsertFormPositioner = styled.div`
    /* 입력할 input 창이 들어갈 위치를 정해주는 컴포넌트 */
    width: 100%;
    bottom: 0;
    left: 0;
    position: absolute;
`;

/* div로 되어있던 것을 form으로 바꿔주어, Enter 이벤트가 발생했을 때 onSubmit 할 수 있도록 바꿔 주었다. 
이때 onSubmit 시 새로고침이 되는데, 토글되었던 할 일 목록도 리셋 된다. (초기값으로)*/
const InsertForm = styled.form`
    background: #f8f9fa;
    padding: 32px;
    padding-bottom: 72px;
    border-bottom-left-radius: 16px; /* TodoTemplate 가장자리가 둥글게 마무리 되어있으므로, input 이 삐져나오지 않게 둥글게 해주는 작업 */
    border-bottom-right-radius: 16px;
    border-top: 1px solid #e9ecef;
`;

const Input = styled.input`
    padding: 12px;
    border-radius: 4px;
    border: 1px solid #dee2e6;
    width: 100%;
    outline: none;
    font-size: 16px;
    box-sizing: border-box;
`;

function TodoCreate() {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");
    const dispatch = useTodoDispatch();
    const nextId = useTodoNextId();

    const onToggle = () => setOpen(!open);
    const onChange = (e) => setValue(e.target.value);
    const onSubmit = (e) => {
        /* onSubmit 시 새로고침 되는 것을 방지하기 위해서 e.prevenDefault() 함수 실행 */
        e.preventDefault();
        dispatch({
            type: "CREATE",
            todo: {
                id: nextId.current,
                text: value,
                done: false,
            },
        });
        setValue("");
        setOpen(false);
        nextId.current += 1;
    };

    return (
        <>
            {open && (
                <InsertFormPositioner>
                    <InsertForm onSubmit={onSubmit}>
                        <Input
                            placeholder="할 일을 입력 후, Enter 를 누르세요"
                            autoFocus
                            onChange={onChange}
                            value={value}
                        />
                    </InsertForm>
                </InsertFormPositioner>
            )}
            <CircleButton onClick={onToggle} open={open}>
                <MdAdd />
            </CircleButton>
        </>
    );
}

export default React.memo(TodoCreate);
