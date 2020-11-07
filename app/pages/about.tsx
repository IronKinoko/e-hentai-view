import React from 'react'
import {
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  Link,
  Paper,
} from '@material-ui/core'

import Layout from 'components/Layout'
import { useIsmobile } from '@/theme'
import { useTranslation } from 'i18n'

const About = () => {
  const matches = useIsmobile()
  const [t] = useTranslation()
  return (
    <Layout title={t('About')} showBack noContainer={Boolean(matches)}>
      <List>
        <ListItem divider>
          <ListItemText
            primary="EhentaiView"
            secondary={t('About.EhentaiViewDesc')}
          />
        </ListItem>
        <ListItem divider>
          <ListItemText
            primary={t('About.Author')}
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
            primary={t('About.Source')}
            secondary="https://github.com/IronKinoko/e-hentai-view"
            secondaryTypographyProps={{
              component: Link,
              href: 'https://github.com/IronKinoko/e-hentai-view',
              target: '_blank',
            }}
          />
        </ListItem>
        <ListItem divider>
          <ListItemText
            primary={t('About.License')}
            secondary="MIT"
            secondaryTypographyProps={{
              component: Link,
              href:
                'https://github.com/IronKinoko/e-hentai-view/blob/master/LICENSE',
              target: '_blank',
            }}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={t('About.Version')}
            secondary={process.env.VERSION}
            secondaryTypographyProps={{
              component: Link,
              href: 'https://github.com/IronKinoko/e-hentai-view/releases',
              target: '_blank',
            }}
          />
        </ListItem>
      </List>
    </Layout>
  )
}

export default About
