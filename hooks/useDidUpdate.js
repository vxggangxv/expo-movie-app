import { useRef, useEffect } from 'react';

function useDidUpdate(fn, deps) {
  const didMountRef = useRef(false);
  useEffect(() => {
    if (didMountRef.current) {
      fn();
    } else {
      didMountRef.current = true;
    }
  }, deps);
}

export default useDidUpdate;
