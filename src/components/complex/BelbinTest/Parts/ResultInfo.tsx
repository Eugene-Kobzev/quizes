import { Alert } from '@mui/material';

export default ({ el, json }: { el: [name: string, points: number], json: any }) => (
  <div className='result__info-item' id={el[0]}>
    <h3 className='result__info-item-title' >
      {json[el[0]].title} - {el[1]}
    </h3>
    <div className='result__info-item-desc'>
      {json[el[0]].description}
    </div>
    <div className='result__info-item-additional'>
      <Alert severity="info" className='result__info-item-additional-item'>
        {json[el[0]].character}
      </Alert>
      <Alert severity="success" className='result__info-item-additional-item'>
        {json[el[0]].positives}
      </Alert>
      <Alert severity="warning" className='result__info-item-additional-item'>
        {json[el[0]].negatives}
      </Alert>
    </div>
  </div>
)