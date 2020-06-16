import React from 'react'
import {
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  Link,
  Paper,
} from '@material-ui/core'

import { useTheme } from '@material-ui/core/styles'
import Layout from 'components/Layout'

const About = () => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('xs'))
  return (
    <Layout title="About" noContainer={matches}>
      <List>
        <ListItem divider>
          <ListItemText
            primary="EhentaiView"
            secondary="EhentaiView is not affiliated with E-hentai.org in any way"
          />
        </ListItem>
        <ListItem divider>
          <ListItemText
            primary="Author"
            secondary="IronKinoko <kinoko.main@gmail.com>"
            secondaryTypographyProps={{
              component: Link,
              href: 'https://github.com/IronKinoko',
              target: '_blank',
            }}
          />
        </ListItem>
        <ListItem divider>
          <ListItemText
            primary="Source"
            secondary="https://github.com/IronKinoko/e-hentai-view"
            secondaryTypographyProps={{
              component: Link,
              href: 'https://github.com/IronKinoko/e-hentai-view.git',
              target: '_blank',
            }}
          />
        </ListItem>
        <ListItem divider>
          <ListItemText primary="License" secondary="MIT" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Version" secondary={process.env.VERSION} />
        </ListItem>
      </List>
    </Layout>
  )
}

export default About
