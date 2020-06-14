import React, { useState } from 'react'
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
} from '@material-ui/core'
import SlideUpDialog from 'components/SlideUpDialog'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import clsx from 'clsx'

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
const CommentListContent: React.FC<CommentListProps> = ({
  commentList,
  hidden,
}) => {
  const classes = useStyles()
  return (
    <List>
      {commentList.length === 0 ? (
        <Typography
          gutterBottom
          align="center"
          variant="subtitle1"
          component="p"
        >
          no comments
        </Typography>
      ) : (
        commentList.map((o, k) => (
          <React.Fragment key={k}>
            <ListItem>
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
            {k !== commentList.length - 1 && (
              <Divider variant="fullWidth" orientation="horizontal" />
            )}
          </React.Fragment>
        ))
      )}
    </List>
  )
}

const CommentList: React.FC<CommentListProps> = ({ commentList }) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <CommentListContent hidden commentList={commentList.slice(0, 2)} />
      {commentList.length > 0 && (
        <CardActions>
          <Button fullWidth onClick={() => setOpen(true)}>
            MORE
          </Button>
        </CardActions>
      )}
      <SlideUpDialog open={open} onClose={() => setOpen(false)} scroll="paper">
        <CommentListContent commentList={commentList} />
      </SlideUpDialog>
    </>
  )
}
export default CommentList
