// import { useReducer } from 'react';
// import QuestionAllocatePoints from 'components/common/Questions/QuestionAllocatePoints';
// // const initialState = [
// //   {
// //     id: 1,
// //     title: "Todo 1",
// //     complete: false,
// //   },
// //   {
// //     id: 2,
// //     title: "Todo 2",
// //     complete: false,
// //   },
// // ];

// // const reducer = (state, action) => {
// //   switch (action.type) {
// //     case "COMPLETE":
// //       return state.map((todo) => {
// //         if (todo.id === action.id) {
// //           return { ...todo, complete: !todo.complete };
// //         } else {
// //           return todo;
// //         }
// //       });
// //     default:
// //       return state;
// //   }
// // };

// // text: string,
// // points: number,
// // pointsHandler: (points: number) => void,

interface IProps {
  className?: string,
  maxPoints: number,
  options: string[],
  question: string,
}

// const makeReducerForOption = () => {

// }

export default ({ className, maxPoints, options, question }: IProps) => {

  return (
    <div></div>
  )
}