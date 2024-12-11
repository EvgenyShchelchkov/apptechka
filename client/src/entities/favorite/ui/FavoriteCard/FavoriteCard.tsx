import { Badge, Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useAppSelector } from '../../../../shared/lib/hooks';
import type { FavoriteType } from '../../model/types';

type FavoriteCardProps = {
  medicineInstanceId: FavoriteType['medicine_instance_id'];
};

export default function FavoriteCard({ medicineInstanceId }: FavoriteCardProps): React.JSX.Element {
  const [isHovered, setIsHovered] = useState(false);

  const medicineFavorites = useAppSelector((state) =>
    state.medicine.items.find((el) => el.id === medicineInstanceId),
  );

  const isAvailableInMedkits = useAppSelector((state) =>
    state.medicine.items.some((el) => el.id === medicineInstanceId),
  );

  return (
    <Card
      elevation={isHovered ? 12 : 4}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        maxWidth: 'var(--card-width)',
        height: 'var(--card-height)',
        borderRadius: '20px',
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--card-bg)',
        backdropFilter: 'blur(10px)',
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: isHovered ? 'translateY(-12px)' : 'none',
        border: '1px solid rgba(185, 30, 30, 0.15)',
        boxShadow: isHovered
          ? `0 20px 40px rgba(185, 30, 30, 0.15),
           0 0 20px rgba(255, 75, 75, 0.1),
           0 0 40px rgba(255, 75, 75, 0.05)`
          : '0 8px 16px rgba(185, 30, 30, 0.1)',
        '&:before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 75, 75, 0.05) 100%)',
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.5s ease',
          zIndex: 1,
        },
      }}
    >
      <Badge
        color={isAvailableInMedkits ? 'success' : 'error'}
        variant="dot"
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
          zIndex: 2,
          '& .MuiBadge-badge': {
            width: 12,
            height: 12,
            borderRadius: '50%',
            boxShadow: isAvailableInMedkits
              ? '0 0 10px rgba(46, 213, 115, 0.6)'
              : '0 0 10px rgba(255, 75, 75, 0.6)',
            border: '2px solid rgba(255, 255, 255, 0.9)',
          },
        }}
      />

      <CardMedia
        component="img"
        alt={medicineFavorites?.name || 'Medicine'}
        height="280"
        image={medicineFavorites?.image || '/WomanFromTheEast.jpg'}
        sx={{
          transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: isHovered ? 'scale(1.15) translateY(-10px)' : 'scale(1)',
          filter: isHovered ? 'brightness(0.7) contrast(1.2)' : 'none',
        }}
      />

      <CardContent
        sx={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          zIndex: 2,
          padding: '24px !important',
          background: isHovered
            ? 'linear-gradient(180deg, transparent 0%, rgba(28, 27, 34, 0.95) 40%)'
            : 'none',
          transform: isHovered ? 'translateY(0)' : 'translateY(70px)',
          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: '#B91E1E',
            fontWeight: 700,
            marginBottom: 2,
            textShadow: '0 1px 2px rgba(185, 30, 30, 0.1)',
            position: 'relative',
            '&:after': {
              content: '""',
              position: 'absolute',
              bottom: -8,
              left: 0,
              width: isHovered ? '40%' : '0%',
              height: '2px',
              background: 'linear-gradient(90deg, #FF4B4B, transparent)',
              transition: 'width 0.5s ease',
            },
          }}
        >
          {medicineFavorites?.name || 'Unknown Medicine'}
        </Typography>

        <Box
          sx={{
            height: isHovered ? 'auto' : 0,
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            overflow: 'hidden',
          }}
        >
          <Typography
            variant="body1"
            sx={{
              color: '#2D0A0A',
              lineHeight: 1.6,
              fontSize: '0.95rem',
              fontWeight: 400,
              letterSpacing: '0.3px',
            }}
          >
            {medicineFavorites?.description || 'No description available.'}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
