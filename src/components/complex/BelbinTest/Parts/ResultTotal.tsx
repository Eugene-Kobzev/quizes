import { LinearProgress, Chip, Link } from '@mui/material';


export default ({ el, json, max }: { el: [name: string, points: number], json: any, max: number }) => {
  const progress = el[1] / max * 100

  return (
    <div className='result__total-item'>
      <div className='result__total-item-title'>
        <Link href={`#${el[0]}`}>
          {json[el[0]].title}
        </Link>

      </div>
      <div className='result__total-item-progress'>
        <LinearProgress variant='determinate' value={progress} />
      </div>
      <div className='result__total-item-points'>
        <Chip color='primary' label={el[1]} />
      </div>
    </div>
  )
}