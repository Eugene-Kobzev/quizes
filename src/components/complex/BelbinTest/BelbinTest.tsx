import { useReducer, useMemo, useState, useEffect } from 'react';
import { Button } from '@mui/material';
import QuestionAllocatePoints from 'components/common/Questions/QuestionAllocatePoints';
import ResultTotal from './Parts/ResultTotal';
import ResultInfo from './Parts/ResultInfo';
import './style.scss'
import json from './data.json'
import questions from './questions.json'

interface IProps {
  className?: string,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'changePoints': {
      const { questionIndex, optionIndex, pointsToChange } = action.payload
      const question = state.get(questionIndex)
      const option = question.options[optionIndex]
      question.pointsLeft -= pointsToChange
      option.points += pointsToChange
      return new Map(state)
    }

    default: return state
  }
}

const makeQuestion = (val: any, key: number, dispatcher: any): any => (
  <QuestionAllocatePoints
    pointsLeft={val.pointsLeft}
    options={val.options}
    question={val.question}
    dispatcher={dispatcher}
    key={key}
  />
)

const countPoints = (data, optionIndexes) => {
  let result = 0

  data.forEach((el, i) => result += parseInt(el.options[optionIndexes[i]].points))

  return result
}

const questionsData = new Map()
questions.forEach((el, i) => {
  questionsData.set(i, {
    pointsLeft: 10,
    question: el.question,
    options: el.options.map((option, j) => {
      return {
        text: option,
        points: 0,
        questionIndex: i,
        optionIndex: j,
      }
    })
  })
})

export default ({ className }: IProps) => {

  const [state, dispatch] = useReducer(reducer, questionsData);

  const questions: any[] = useMemo(() => {
    const arr: any[] = []
    state.forEach((val, key) => {
      const el = makeQuestion(val, key, dispatch)
      arr.push(el)
    })
    return arr
  }, [state])

  const [showResult, setshowResult] = useState(false)
  const [btnDisabled, setbtnDisabled] = useState(true)
  const [result, setresult] = useState<any>([])

  const handleClick = () => {

    /**
     * im Implementer - Исполнитель 
     * co Coordinator - Председатель 
     * sh Shaper - Формирователь 
     * pl Plant - Мыслитель (генератор идей)
     * ri Resource Investigator - Разведчик (Исследователь ресурсов) 
     * me Monitor Evaluator - Оценщик 
     * tw Team Worker - Коллективист 
     * cf Completer Finisher - Доводчик (Завершающий работу) 
     */

    const result = {
      im: countPoints(state, [6, 0, 7, 3, 1, 5, 4]),
      co: countPoints(state, [3, 1, 0, 7, 5, 2, 6]),
      sh: countPoints(state, [5, 4, 2, 1, 3, 6, 0]),
      pl: countPoints(state, [2, 6, 3, 4, 7, 0, 5]),
      ri: countPoints(state, [0, 2, 5, 6, 4, 7, 3]),
      me: countPoints(state, [7, 3, 6, 2, 0, 4, 1]),
      tw: countPoints(state, [1, 5, 4, 0, 2, 1, 7]),
      cf: countPoints(state, [4, 7, 1, 5, 6, 3, 2]),
    }

    const arr: any[] = []

    for (const el in result) {
      arr.push([el, result[el]])
    }

    arr.sort((a, b) => b[1] - a[1])

    setresult(arr)
    setshowResult(true)
  }

  useEffect(() => {
    let enableBtn = true
    state.forEach(el => {
      if (el.pointsLeft > 0) enableBtn = false
    });

    if (enableBtn) setbtnDisabled(false)

  }, [state])


  return (
    <div className={className}>
      {
        !showResult
          ? <section className='questions'>
            {questions}
          </section>
          : null
      }
      <section className='result'>
        <Button
          onClick={handleClick}
          disabled={btnDisabled}
        >
          See Result
        </Button>
        {
          showResult
            ?
            <div className='result__block'>
              <div className='result__total'>
                {result.map((el, i) => <ResultTotal el={el} key={i} max={result[0][1]} json={json} />)}
              </div>
              <div className='result__info'>
                {result.map((el, i) => <ResultInfo el={el} key={i} json={json} />)}
              </div>
            </div>
            : null
        }
      </section >
    </div >
  )
}