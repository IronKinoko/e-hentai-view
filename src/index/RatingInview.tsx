import React from 'react'
import { Rating, RatingProps } from '@material-ui/lab'
import { useInViewport } from '@umijs/hooks'
const RatingInview: React.FC<RatingProps> = (props) => {
  const [inview, ref] = useInViewport<HTMLDivElement>()

  return (
    <div ref={ref}>
      {inview && (
        <Rating
          name="rating"
          size="small"
          readOnly
          max={5}
          precision={0.2}
          {...props}
        />
      )}
    </div>
  )
}

export default RatingInview
