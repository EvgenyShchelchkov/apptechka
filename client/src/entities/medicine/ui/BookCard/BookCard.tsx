import {
  Delete as DeleteIcon,
  Download as DownloadIcon,
  Edit as EditIcon,
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';
import StarsIcon from '@mui/icons-material/Stars';
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  IconButton,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../shared/lib/hooks';
import { createLikeThunk, deleteLikeThunk } from '../../../like/model/likeThunks';
import { selectBook } from '../../model/medicine.slice';
import { deleteBookThunk } from '../../model/medicine.thunks';
import type { BookType } from '../../model/types';
import ModalUpdate from '../ModalUpdate';
import styles from './BookCard.module.css';

type BookCardProps = {
  book: BookType;
};

function BookCard({ book }: BookCardProps): React.JSX.Element {
  const [expanded, setExpanded] = useState(false);

  const user = useAppSelector((state) => state.auth.user);
  const likes = useAppSelector((state) =>
    state.like.items.filter((like) => like.bookId === book.id),
  );
  const isLiked = likes.some((like) => like.userId === user?.id);

  const dispatch = useAppDispatch();
  const deleteHandler = (): void => {
    void dispatch(deleteBookThunk(book.id));
  };

  const downloadHandler = (): void => {
    window.open(book.link, '_blank');
  };

  const createLike: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('bookId', book.id.toString());
    void dispatch(createLikeThunk(formData));
  };

  const deleteLike = (): void => {
    const likeId = likes.find((like) => like.userId === user?.id);
    if (!likeId) return;
    void dispatch(deleteLikeThunk(likeId.id));
  };

  const handleExpandClick = (): void => setExpanded((prev) => !prev);

  return (
    <>
      <Card className={styles.card}>
        <CardMedia
          component="img"
          height="400"
          image={book.image}
          alt={book.title}
          className={styles.media}
        />

        <CardHeader
          title={
            <Typography variant="h6" className={styles.title}>
              {book.title}
            </Typography>
          }
        />

        <CardActions disableSpacing className={styles.actions}>
          {user?.id === book.userId && (
            <>
              <IconButton
                onClick={downloadHandler}
                aria-label="download"
                className={styles.downloadButton}
              >
                <DownloadIcon />
              </IconButton>
              <IconButton
                onClick={() => void dispatch(selectBook(book))}
                className={styles.updateButton}
                aria-label="edit"
              >
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={deleteHandler}
                className={styles.deleteButton}
                aria-label="delete"
              >
                <DeleteIcon />
              </IconButton>
            </>
          )}
          <IconButton
            onClick={handleExpandClick}
            className={expanded ? styles.infoButtonExpanded : styles.infoButton}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
          {!isLiked ? (
            <IconButton onClick={createLike} className={styles.starsButton} aria-label="like">
              <StarsIcon />
            </IconButton>
          ) : (
            <IconButton onClick={deleteLike} className={styles.starsButton} aria-label="like">
              <StarsIcon />
            </IconButton>
          )}
        </CardActions>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Подробная информация:
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: 1 }}>
              Автор: {book.User?.name ?? 'Неизвестно'}
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: 1 }}>
              Описание: {book.description}
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: 1 }}>
              Лайки: {likes.length}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
      <ModalUpdate />
    </>
  );
}

export default React.memo(BookCard);
