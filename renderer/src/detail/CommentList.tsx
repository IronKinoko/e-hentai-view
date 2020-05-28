import React, { useState } from 'react'
import { commentListItemProps } from 'apis/page'
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

const useStyles = makeStyles((theme: Theme) => createStyles({}))

export interface CommentListProps {
  commentList: commentListItemProps[]
}
const CommentListContent: React.FC<CommentListProps> = ({ commentList }) => {
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
                    dangerouslySetInnerHTML={{
                      __html: `${o.comment}<span> ${o.score}</span>`,
                    }}
                  />
                }
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
      <Card>
        <CommentListContent commentList={commentList.slice(0, 2)} />
        {commentList.length > 0 && (
          <CardActions>
            <Button fullWidth onClick={() => setOpen(true)}>
              MORE
            </Button>
          </CardActions>
        )}
      </Card>
      <SlideUpDialog open={open} onClose={() => setOpen(false)} scroll="paper">
        <CommentListContent commentList={commentList} />
      </SlideUpDialog>
    </>
  )
}
export default CommentList
