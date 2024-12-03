import React, { ReactNode, ElementType } from 'react';

type ProvidersWrapperProps = {
  providers: ElementType[];  // Cambié de ReactNode[] a ElementType[]
  children: ReactNode;
};

const ProvidersWrapper = ({ providers, children }: ProvidersWrapperProps) => {
  return (
    <>
      {providers.reduce(
        (acc, Provider) => <Provider>{acc}</Provider>, 
        children
      )}
    </>
  );
};

export default ProvidersWrapper;