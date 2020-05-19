import React from 'react'
import { commentListItemProps } from 'apis/page'
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
  Grid,
} from '@material-ui/core'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(2, 0),
    },
    listItem: {
      margin: theme.spacing(1, 2),
    },
    listHead: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(0.5, 1),
    },
  }),
)

export interface CommentListProps {
  commentList: commentListItemProps[]
}
const CommentList: React.FC<CommentListProps> = ({ commentList }) => {
  const classes = useStyles()
  return (
    <List className={classes.root}>
      {commentList.length === 0 ? (
        <Typography
          gutterBottom
          align="center"
          variant="subtitle1"
          component="p">
          no comments
        </Typography>
      ) : (
        commentList.map((o, k) => (
          <React.Fragment key={k}>
            <Divider variant="fullWidth" component="li" />
            <ListItem>
              <ListItemText
                primary={
                  <Grid container justify="space-between">
                    <Typography>{`Posted on: ${o.time} by:${o.userName} `}</Typography>
                    <Typography>{`Score ${o.score}`}</Typography>
                  </Grid>
                }
                primaryTypographyProps={{
                  className: classes.listHead,
                  component: 'div',
                }}
                secondary={
                  <div dangerouslySetInnerHTML={{ __html: o.comment }} />
                }
                secondaryTypographyProps={{
                  className: classes.listItem,
                  component: 'div',
                }}
              />
            </ListItem>
          </React.Fragment>
        ))
      )}
    </List>
  )
}

export default CommentList
