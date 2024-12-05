import type { ReactNode } from 'react';
import React from 'react';
import SpinnerUi from '../SpinnerUI/Spinner';

type LoaderProps = {
  showSpinner: boolean;
  children: ReactNode;
};

export default function Loader({ showSpinner, children }: LoaderProps): React.JSX.Element {
  if (showSpinner) return <SpinnerUi />;
  return <>{children}</>;
}
