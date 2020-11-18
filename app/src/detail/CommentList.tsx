import React, { useState, useRef, forwardRef, useEffect } from 'react'
import { commentListItemProps } from 'interface/gallery'
import {
  Button,
  Card,
  CardContent,
  CardActions,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  AppBar,
  Toolbar,
  IconButton,
  DialogTitle,
  ListSubheader,
} from '@material-ui/core'
import SlideUpDialog from 'components/SlideUpDialog'
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from '@material-ui/core/styles'
import clsx from 'clsx'
import { useIsmobile } from '@/theme'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { useTranslation, Router } from 'i18n'
import { useRouter } from 'next/router'
import ArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import dayjs from 'dayjs'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    comment: {
      wordBreak: 'break-word',
      breakWord: 'word-break',
    },
    hidden: { maxHeight: 80, overflow: 'hidden' },
  })
)

export interface CommentListProps {
  commentList: commentListItemProps[]
  hidden?: boolean
}
const CommentListContent = forwardRef<HTMLUListElement, CommentListProps>(
  ({ commentList, hidden }, ref) => {
    const classes = useStyles()
    const [t] = useTranslation()
    const router = useRouter()
    useEffect(() => {
      if (typeof window !== 'undefined') {
        // 监听链接，跳转到自己的详情页
        document
          .querySelectorAll<HTMLAnchorElement>(
            '.MuiDialog-root a[href^="https://exhentai.org/g"]'
          )
          .forEach((a) => {
            a.onclick = (e) => {
              e.preventDefault()
              let path = a.href.replace('https://exhentai.org/g', '')
              Router.push('/[gid]/[token]', path)
            }
          })
      }
    }, [])
    return (
      <List ref={ref}>
        {commentList.length === 0 ? (
          <Typography
            gutterBottom
            align="center"
            variant="subtitle1"
            component="p"
          >
            {t('G.noComments')}
          </Typography>
        ) : (
          commentList.map((o, k) => (
            <ListItem
              key={k}
              divider={k !== commentList.length - 1}
              disableGutters={hidden}
            >
              <ListItemText
                primary={
                  <Grid container justify="space-between">
                    <Typography component="span">{o.userName}</Typography>
                    <Typography component="span">
                      {dayjs(o.time).format('YYYY-MM-DD HH:mm')}
                    </Typography>
                  </Grid>
                }
                secondary={
                  <div
                    className={clsx(classes.comment, {
                      [classes.hidden]: hidden,
                    })}
                    dangerouslySetInnerHTML={{
                      __html: `${o.comment}<span> ${o.score}</span>`,
                    }}
                  />
                }
                secondaryTypographyProps={{ component: 'div' }}
              />
            </ListItem>
          ))
        )}
      </List>
    )
  }
)
const CommentList: React.FC<CommentListProps> = ({ commentList }) => {
  const theme = useTheme()
  const matches = useIsmobile()
  const router = useRouter()
  const showPage = router.query.showPage as string
  const gid = router.query.gid as string
  const token = router.query.token as string
  const [t] = useTranslation()
  return (
    <>
      {commentList.length > 0 && (
        <Grid container alignItems="center" style={{ marginBlock: -10 }}>
          <Grid item xs>
            <Typography variant="subtitle1">{t('G.Comments')}</Typography>
          </Grid>
          <Grid item>
            <IconButton
              onClick={() =>
                Router.push(
                  '/[gid]/[token]?showPage=comments',
                  `/${gid}/${token}?showPage=comments`
                )
              }
            >
              <ArrowRightIcon />
            </IconButton>
          </Grid>
        </Grid>
      )}
      <CommentListContent hidden commentList={commentList.slice(0, 2)} />

      <SlideUpDialog
        fullScreen={Boolean(matches)}
        fullWidth={!Boolean(matches)}
        open={showPage === 'comments'}
        onClose={() => Router.back()}
        scroll="paper"
      >
        {matches && (
          <AppBar position="sticky">
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={() => Router.back()}
              >
                <ArrowBackIcon />
              </IconButton>
              <Typography style={{ marginLeft: theme.spacing(2) }} variant="h6">
                {t('G.Comments')}
              </Typography>
            </Toolbar>
          </AppBar>
        )}
        {!matches && (
          <DialogTitle style={{ padding: theme.spacing(2, 2, 0) }}>
            {t('G.Comments')}
          </DialogTitle>
        )}

        <CommentListContent commentList={commentList} />
      </SlideUpDialog>
    </>
  )
}
export default CommentList
