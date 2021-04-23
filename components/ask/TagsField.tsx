import React, { useState } from "react";
import Autosuggest from "react-autosuggest";

interface Suggestion {
  name: string;
}

// Imagine you have a list of languages that you'd like to autosuggest.
const languages = [
  {
    name: "cse-005",
  },
  {
    name: "cse-015",
  },
  {
    name: "cse-021",
  },
  {
    name: "cse-022",
  },
  {
    name: "cse-024",
  },
  {
    name: "cse-030",
  },
];

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = (value: string): Array<Suggestion> => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : languages.filter(
        (lang) => lang.name.toLowerCase().slice(0, inputLength) === inputValue
      );
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = (suggestion: Suggestion) => suggestion.name;

// Use your imagination to render suggestions.
const renderSuggestion = (suggestion: Suggestion) => (
  <span>{suggestion.name}</span>
);

interface TagsFieldProps {
  value: string;
  onChange: (event: any, { newValue }: { newValue: string }) => void;
}

export default function TagsField({ value, onChange }: TagsFieldProps) {
  const [suggestions, setSuggestions] = useState<Array<Suggestion>>([]);

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  const onSuggestionsFetchRequested = ({ value }: { value: string }) => {
    setSuggestions(getSuggestions(value));
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const inputProps = {
    placeholder: "Enter class",
    value,
    onChange: onChange,
  };

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
    />
  );
}
