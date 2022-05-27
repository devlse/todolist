import React from "react";
import styled from "styled-components";

const TodoHeadBlock = styled.div`
    padding-top: 48px;
    padding-right: 32px;
    padding-bottom: 24px;
    padding-left: 32px;
    border-bottom: 1px solid #e9ecef;

    h1 {
        margin: 0;
        font-size: 25px;
        color: #343a40;
    }

    .day {
        margin-top: 4px;
        color: #868e96;
        font-size: 16px;
    }

    .tasks-left {
        color: #20c997;
        font-size: 16px;
        margin-top: 30px;
        font-weight: bold;
    }
`;

function TodoHead() {
    return (
        <TodoHeadBlock>
            <h1>2022년 5월 28일</h1>
            <div className="day">토요일</div>
            <div className="tasks-left">할 일 2개 남음</div>
        </TodoHeadBlock>
    );
}

export default TodoHead;
