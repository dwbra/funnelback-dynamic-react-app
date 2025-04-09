import { useEffect, useRef } from "react";
import { useDataState } from "../context/DataState";

const useFavouritesUpdater = () => {
  const { favourites } = useDataState();

  // Store previous state for each favourite keyed by its unique key
  const previousDataRef = useRef(new Map());

  useEffect(() => {
    if (!favourites.length) return;

    // Create a set of keys currently in the favourites array
    const currentKeys = new Set(favourites.map(({ key }) => key));

    // Remove keys from localStorage (and ref) that no longer exist in the current state
    for (const key of previousDataRef.current.keys()) {
      if (!currentKeys.has(key)) {
        localStorage.removeItem(key);
        previousDataRef.current.delete(key);
      }
    }

    // Iterate over the favourites array
    favourites.forEach(({ key, data }) => {
      const serializedData = JSON.stringify(data);
      const previousSerializedData = previousDataRef.current.get(key);

      // Compare current data with the stored snapshot
      if (previousSerializedData !== serializedData) {
        // Update localStorage for the changed item
        localStorage.setItem(key, serializedData);
        // Update the reference with the new serialized data
        previousDataRef.current.set(key, serializedData);
      }
    });
  }, [favourites]);
};

export default useFavouritesUpdater;
