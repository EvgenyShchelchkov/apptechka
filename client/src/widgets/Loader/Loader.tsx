import React from 'react';
import { ClimbingBoxLoader } from 'react-spinners';
import { useAppSelector } from '../../shared/lib/hooks';
import styles from './Loader.module.css';

type LoaderProps = {
  children?: React.ReactNode;
};

export default function Loader({ children }: LoaderProps): React.JSX.Element {
  const isLoading = useAppSelector((state) => state.medicine.isLoading);

  return (
    <>
      {isLoading ? (
        <div className={styles.loader}>
          <ClimbingBoxLoader loading size={20} />
        </div>
      ) : (
        children
      )}
    </>
  );
}
