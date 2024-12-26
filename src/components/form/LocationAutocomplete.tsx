import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import usePlacesAutocomplete from 'use-places-autocomplete';

interface LocationAutocompleteProps {
  onSelect: (location: { city: string; state: string; country: string }) => void;
}

export function LocationAutocomplete({ onSelect }: LocationAutocompleteProps) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      types: ['(cities)'],
      componentRestrictions: { country: 'us' },
    },
    debounce: 300,
  });

  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setIsOpen(true);
  };

  const handleSelect = (suggestion: google.maps.places.AutocompletePrediction) => {
    setValue(suggestion.description, false);
    clearSuggestions();
    setIsOpen(false);

    // Parse city and state from the description
    const parts = suggestion.description.split(', ');
    const city = parts[0];
    const state = parts[1];
    const country = parts[2];

    onSelect({ city, state, country });
  };

  return (
    <div ref={wrapperRef} className="relative w-full">
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Enter your city"
          className="w-full px-4 py-3 rounded-xl bg-paper/5 dark:bg-paper-dark/5 
                   backdrop-blur-md border border-ink/10 dark:border-ink-dark/10
                   focus:outline-none focus:ring-2 focus:ring-teal/20
                   placeholder:text-ink/50 dark:placeholder:text-ink-dark/50"
        />
        <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/50 dark:text-ink-dark/50" />
      </div>
      
      {isOpen && status === "OK" && (
        <ul className="absolute z-10 w-full mt-1 bg-paper dark:bg-paper-dark 
                      shadow-lg rounded-xl overflow-hidden border border-ink/10 dark:border-ink-dark/10">
          {data.map((suggestion) => (
            <li
              key={suggestion.place_id}
              onClick={() => handleSelect(suggestion)}
              className="px-4 py-3 hover:bg-ink/5 dark:hover:bg-ink-dark/5 cursor-pointer
                         transition-colors duration-200"
            >
              {suggestion.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
