import Layout from '@/components/Layout'
import { useIsmobile } from '@/theme'
import { Link, List, ListItem, ListItemText } from '@mui/material'
import dayjs from 'dayjs'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'

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
              href: 'https://github.com/IronKinoko/e-hentai-view/blob/master/LICENSE',
              target: '_blank',
            }}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={t('About.Version')}
            secondary={`${process.env.VERSION}(${dayjs(
              process.env.BUILDTIME
            ).format()})`}
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
export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  }
}
