import React from 'react'
import { Rating, RatingProps } from '@mui/material'
import useInViewportWithDistance from '@/hooks/useInViewportWithDistance'
const RatingInview: React.FC<RatingProps> = (props) => {
  const [inview, ref] = useInViewportWithDistance<HTMLDivElement>(60)

  return (
    <div ref={ref}>
      {inview && (
        <Rating
          name="rating"
          size="small"
          readOnly
          max={5}
          precision={0.5}
          {...props}
        />
      )}
    </div>
  )
}

export default RatingInview
