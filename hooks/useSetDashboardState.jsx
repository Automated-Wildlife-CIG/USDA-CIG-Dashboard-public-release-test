import { useState, useEffect } from 'react';
import {updateDashboardStateStorage} from '@/lib/localStorageDashboardStates';

export default function useSetDashboardState(key) {
//  const [value, setValue] = useState(() => {
//    if (typeof window !== 'undefined') {
//      const item = getDashboardStatesStorageByState(key);
//      return item !== null ? item : null;
//    }
//    return null;
//  });
 const [value, setValue] = useState();

 useEffect(() => {
   if (typeof window !== 'undefined') {
    updateDashboardStateStorage(key, value);
   }
 }, [key, value]);

 return [value, setValue]; 
}
