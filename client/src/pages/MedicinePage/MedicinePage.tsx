import { Box, Typography, TextField, ToggleButtonGroup, ToggleButton } from '@mui/material';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks';
import AllMedicineCard from '../../entities/medicine/ui/AllMedicineCard/AllMedicineCard';
import {
  setFilter,
  setSortKey,
  reverseSortOrder,
} from '../../entities/medicine/model/medicine.slice';
import type { SortableKeysType } from '../../entities/medicine/model/types';

export default function MedicinePage(): React.JSX.Element {
  const dispatch = useAppDispatch();

  const medicines = useAppSelector((state) => state.medicine.items);
  const filter = useAppSelector((state) => state.medicine.filter);
  const sortKey = useAppSelector((state) => state.medicine.sort.key);
  const sortOrder = useAppSelector((state) => state.medicine.sort.order);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(setFilter(e.target.value));
  };

  const handleSortChange = (key: SortableKeysType): void => {
    if (sortKey === key) {
      dispatch(reverseSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'));
    } else {
      dispatch(setSortKey(key));
    }
  };

  const filteredMedicines = medicines.filter((medicine) =>
    [medicine.name, medicine.category, medicine.description]
      .join(' ')
      .toLowerCase()
      .includes(filter.toLowerCase()),
  );

  const sortedMedicines = filteredMedicines.sort((a, b) => {
    const aQuantity =
      a.MedicineInstances && a.MedicineInstances.length > 0 ? a.MedicineInstances[0].quantity : 0;
    const bQuantity =
      b.MedicineInstances && b.MedicineInstances.length > 0 ? b.MedicineInstances[0].quantity : 0;

    const aExpiration =
      a.MedicineInstances && a.MedicineInstances.length > 0
        ? new Date(a.MedicineInstances[0].expiration).getTime()
        : 0;
    const bExpiration =
      b.MedicineInstances && b.MedicineInstances.length > 0
        ? new Date(b.MedicineInstances[0].expiration).getTime()
        : 0;

    switch (sortKey) {
      case 'category':
        return sortOrder === 'asc'
          ? a.category.localeCompare(b.category)
          : b.category.localeCompare(a.category);
      case 'quantity':
        return sortOrder === 'asc' ? aQuantity - bQuantity : bQuantity - aQuantity;
      case 'expiration':
        return sortOrder === 'asc' ? aExpiration - bExpiration : bExpiration - aExpiration;
      case 'createdAt':
        return sortOrder === 'asc'
          ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      default:
        return 0;
    }
  });

  return (
    <Box sx={{ padding: 2, position: 'relative' }}>
      <Typography variant="h4" gutterBottom>
        Мои лекарства
      </Typography>

      <Box sx={{ marginBottom: 2 }}>
        <TextField
          label="Фильтр по названию, категории или описанию"
          variant="outlined"
          value={filter}
          onChange={handleFilterChange}
          fullWidth
        />
      </Box>

      {/* Кнопки для сортировки */}
      <Box sx={{ marginBottom: 2 }}>
        <ToggleButtonGroup value={sortKey} exclusive aria-label="Сортировка">
          <ToggleButton
            value="category"
            aria-label="Сортировка по категории"
            onClick={() => handleSortChange('category')}
          >
            По категории
          </ToggleButton>
          <ToggleButton
            value="quantity"
            aria-label="Сортировка по количеству"
            onClick={() => handleSortChange('quantity')}
          >
            По количеству
          </ToggleButton>
          <ToggleButton
            value="expiration"
            aria-label="Сортировка по сроку годности"
            onClick={() => handleSortChange('expiration')}
          >
            По сроку годности
          </ToggleButton>
          <ToggleButton
            value="createdAt"
            aria-label="Сортировка по дате создания"
            onClick={() => handleSortChange('createdAt')}
          >
            По дате создания
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Отображение лекарств */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          justifyContent: 'space-around',
        }}
      >
        {sortedMedicines.map((el) => (
          <AllMedicineCard key={el.id} medicine={el} />
        ))}
      </Box>
    </Box>
  );
}
