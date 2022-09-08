import { useState } from 'react'
import { Button, Box, TextField, Chip } from '@mui/material'
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import './style.scss'

export interface IOption {
  text: string,
  points: number,
  questionIndex: number,
  optionIndex: number,
}

export interface IOptionEl {
  el: IOption,
  blockClassname: string,
  pointsLeft: number,
  dispatcher: ({ type, payload }) => any
}

interface IProps {
  className?: string,
  pointsLeft: number,
  options: IOption[],
  question: string,
  dispatcher: ({ type, payload }) => any
}

const OptionEl = ({ el, blockClassname, pointsLeft, dispatcher }: IOptionEl): JSX.Element => {

  const addPoint = () => {
    dispatcher({
      type: 'changePoints',
      payload: {
        questionIndex: el.questionIndex,
        optionIndex: el.optionIndex,
        pointsToChange: 1,
      }
    })
  }

  const removePoint = () => {
    dispatcher({
      type: 'changePoints',
      payload: {
        questionIndex: el.questionIndex,
        optionIndex: el.optionIndex,
        pointsToChange: -1,
      }
    })
  }

  // const handleChange = (e): void => {
  //   const newValue: number = e.target.value - el.points

  //   dispatcher({
  //     type: 'changePoints',
  //     payload: {
  //       questionIndex: el.questionIndex,
  //       optionIndex: el.optionIndex,
  //       pointsToChange: newValue,
  //     }
  //   })
  // }

  return (
    <li className={`${blockClassname}__options-item`}>
      <div className={`${blockClassname}__options-item-points-area`}>
        <Button
          onClick={removePoint}
          disabled={pointsLeft > 9}
        ><RemoveIcon /></Button>
        <TextField
          className={`${blockClassname}__options-item-input`}
          variant="outlined"
          type="number"
          value={el.points}
          inputProps={{
            min: 0,
            max: pointsLeft,
            disabled: true
          }}
        />
        <Button
          onClick={addPoint}
          disabled={pointsLeft < 1}
        ><AddIcon /></Button>
      </div>
      <div className={`${blockClassname}__options-item-el`}>
        {el.text}
      </div>
    </li>
  )
}

export default ({ className, pointsLeft, options, question, dispatcher }: IProps): JSX.Element => {
  const blockClassname = 'allocate-points-question'
  const [showOptions, setshowOptions] = useState(true)

  const handleClick = () => setshowOptions(!showOptions)

  return (
    <div className={`${blockClassname} ${className || ''} `}>
      <div className={`${blockClassname}__question-area`}>
        <div className={`${blockClassname}__question`}>
          <Button
            onClick={handleClick}
          >
            {
              showOptions
                ? <ExpandMoreOutlinedIcon />
                : <KeyboardArrowRightOutlinedIcon />
            }
          </Button>
          {question}
        </div>
        <div className={`${blockClassname}__points-left`}>
          Points left: <Chip color={`${pointsLeft > 0 ? 'primary' : 'default'}`} label={pointsLeft} />
        </div>
      </div>
      {
        showOptions
          ? <ul className={`__options`}>
            {options.map((el, i) => (
              <OptionEl
                el={el}
                blockClassname={blockClassname}
                dispatcher={dispatcher}
                pointsLeft={pointsLeft}
                key={i}
              />
            ))}
          </ul>
          : null
      }

    </div>
  )
}