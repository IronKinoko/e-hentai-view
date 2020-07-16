import React, { useState, useRef, forwardRef } from 'react'
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
import HideOnScroll from 'components/HideOnScroll'
import { useTranslation } from 'i18n'
import { useRouter } from 'next/router'

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
            <ListItem key={k} divider={k !== commentList.length - 1}>
              <ListItemText
                primary={
                  <Grid container justify="space-between">
                    <Typography component="span">{o.userName}</Typography>
                    <Typography component="span">{o.time}</Typography>
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
  const [t] = useTranslation()
  return (
    <>
      <CommentListContent hidden commentList={commentList.slice(0, 2)} />
      {commentList.length > 0 && (
        <CardActions>
          <Button
            fullWidth
            onClick={() =>
              router.push(
                router.pathname + '?showPage=comments',
                router.asPath + '?showPage=comments'
              )
            }
          >
            {t('More')}
          </Button>
        </CardActions>
      )}
      <SlideUpDialog
        fullScreen={Boolean(matches)}
        fullWidth={!Boolean(matches)}
        open={showPage === 'comments'}
        onClose={() => router.back()}
        scroll="paper"
      >
        {matches && (
          <AppBar position="sticky">
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={() => router.back()}
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
