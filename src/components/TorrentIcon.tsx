import { SvgIcon, SvgIconProps } from '@material-ui/core'
import React from 'react'

const TorrentIcon: React.FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon viewBox="-10 -10 228 228" {...props}>
      <g>
        <path
          d="M166,128c0,0-6,18-22,26s-44,6-44,6s11.7967,26.7384,20.5935,46.6836   c37.5236-6.0196,68.344-32.1092,81.09-66.91C195.4099,139.828,188.9531,139.414,184,138C170,134,166,128,166,128z"
          fill="currentColor"
        />
        <path
          d="M104,0C46.5623,0,0,46.5624,0,104c0,46.9452,31.1055,86.6248,73.828,99.5548   C51.6171,147.5624,19.3591,64.6408,22,62c4-4,30-10,36-8s26,80,54,82s42-20,38-30s-26-60-26-60l32-8c0,0,24,58,34,70   c3.7031,4.4416,10.4179,6.418,17.4099,7.1444C207.8007,111.4844,208,107.7656,208,104C208,46.5624,161.4375,0,104,0z"
          fill="currentColor"
        />
      </g>
    </SvgIcon>
  )
}

export default TorrentIcon
