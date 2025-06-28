import React, { useState, useRef, useEffect, useCallback } from "react";
import { DropdownProps, DropdownOption } from "./dropdown.types";

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  value: controlledValue,
  onChange,
  placeholder = "Select an option",
  label,
  required = false,
  error,
  helperText,
  disabled = false,
  size = "md",
  searchable = false,
  maxHeight = 250,
  width,
  className = "",
  dropUp = false,
  noOptionsMessage = "No options found",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [internalValue, setInternalValue] = useState(controlledValue);

  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const value = controlledValue !== undefined ? controlledValue : internalValue;
  const selectedOption = options.find((option) => option.value === value);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getFirstEnabledIndex = useCallback(() => {
    return filteredOptions.findIndex(option => !option.disabled);
  }, [filteredOptions]);

  const getLastEnabledIndex = useCallback(() => {
    for (let i = filteredOptions.length - 1; i >= 0; i--) {
      if (!filteredOptions[i].disabled) return i;
    }
    return -1;
  }, [filteredOptions]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setSearchTerm("");
    setHighlightedIndex(-1);
  }, []);
  
  const handleToggle = () => {
    if (disabled) return;
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    if (!newIsOpen) {
      handleClose();
    } else {
      setHighlightedIndex(getFirstEnabledIndex());
    }
  };

  const handleOptionClick = useCallback((option: DropdownOption) => {
    if (!option.disabled) {
      if (onChange) {
        onChange(option.value);
      }
      if (controlledValue === undefined) {
        setInternalValue(option.value);
      }
      handleClose();
    }
  }, [onChange, controlledValue, handleClose]);

  const getNextEnabledIndex = useCallback((start: number, direction: 'up' | 'down') => {
    if (!filteredOptions.length) return -1;
    let idx = start;
    let count = 0;
    do {
      if (direction === 'down') {
        idx = (idx + 1) % filteredOptions.length;
      } else {
        idx = (idx - 1 + filteredOptions.length) % filteredOptions.length;
      }
      count++;
    } while (filteredOptions[idx]?.disabled && count < filteredOptions.length);
    return filteredOptions[idx]?.disabled ? start : idx;
  }, [filteredOptions]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (disabled) return;
      switch (e.key) {
        case "Escape":
          handleClose();
          break;
        case "ArrowDown":
          e.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
            setHighlightedIndex(getFirstEnabledIndex());
          } else {
            setHighlightedIndex(prev => {
              if (prev === -1) return getFirstEnabledIndex();
              const next = getNextEnabledIndex(prev, 'down');
              if (prev === getLastEnabledIndex() && next === prev) return getFirstEnabledIndex();
              return next;
            });
          }
          break;
        case "ArrowUp":
          e.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
            setHighlightedIndex(getLastEnabledIndex());
          } else {
            setHighlightedIndex(prev => {
              if (prev === -1) return getLastEnabledIndex();
              const next = getNextEnabledIndex(prev, 'up');
              if (prev === getFirstEnabledIndex() && next === prev) return getLastEnabledIndex();
              return next;
            });
          }
          break;
        case "Enter":
          e.preventDefault();
          if (isOpen && highlightedIndex !== -1) {
            const option = filteredOptions[highlightedIndex];
            if (option && !option.disabled) {
              handleOptionClick(option);
            }
          } else if (!isOpen) {
            handleToggle();
          }
          break;
        case "Tab":
          handleClose();
          break;
      }
    },
    [disabled, isOpen, highlightedIndex, filteredOptions, handleClose, handleOptionClick, handleToggle, getFirstEnabledIndex, getLastEnabledIndex, getNextEnabledIndex]
  );
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, handleClose]);
  
  useEffect(() => {
    if (controlledValue !== undefined) {
      setInternalValue(controlledValue);
    }
  }, [controlledValue]);

  useEffect(() => {
    if (!isOpen) {
      setSearchTerm("");
      setHighlightedIndex(-1);
    }
  }, [isOpen]);

  // Remove duplicate focus logic and use a single effect for focusing the search input
  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      requestAnimationFrame(() => {
        searchInputRef.current?.focus();
      });
    }
  }, [isOpen, searchable, filteredOptions.length]);

  // Reset highlighted index to first enabled filtered option when search term changes
  useEffect(() => {
    if (isOpen && searchable) {
      setHighlightedIndex(filteredOptions.length > 0 ? filteredOptions.findIndex(o => !o.disabled) : -1);
    }
  }, [searchTerm, isOpen, searchable, filteredOptions]);

  const sizeClasses = { sm: "h-8 text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-1.5", md: "h-10 text-sm sm:text-base px-3 py-2 sm:px-4 sm:py-2", lg: "h-12 text-base sm:text-lg px-4 py-2.5 sm:px-6 sm:py-3" };

  const buttonClasses = [
    "w-full flex items-center justify-between border rounded-md shadow-sm bg-white text-left",
    "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
    sizeClasses[size],
    error ? "border-red-700 text-red-900" : "border-gray-300 text-gray-900",
    disabled ? "bg-gray-100 cursor-not-allowed text-gray-500" : "cursor-pointer",
  ].join(" ");

  const containerStyle = {
    width: width ? (typeof width === 'number' ? `${width}px` : width) : 'auto'
  };

  const dropdownMenuStyles = {
    maxHeight: maxHeight ? `${maxHeight}px` : 'none',
    overflowY: 'auto' as const,
  };

  return (
    <div ref={containerRef} className={`relative ${className}`} style={containerStyle} data-testid="dropdown-container">
      <div
        className="relative"
        onKeyDown={handleKeyDown}
      >
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
            {required && <span className="text-red-700 ml-1">*</span>}
          </label>
        )}
        <button type="button" className={buttonClasses} onClick={handleToggle} aria-haspopup="listbox" aria-expanded={isOpen} disabled={disabled} onKeyDown={handleKeyDown}>
          <div className="flex items-center justify-between w-full">
            <span className={selectedOption ? "text-gray-900" : "text-gray-500"}>{selectedOption?.label || placeholder}</span>
            <svg
              className={`ml-2 h-5 w-5 text-gray-400 transition-transform duration-200 ${isOpen ? "transform rotate-180" : ""}`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </button>

        {isOpen && (
          <div
            className={`absolute z-10 w-full mt-1 bg-white shadow-lg rounded-md border border-gray-200 ${dropUp ? "bottom-full mb-1" : "top-full"}`}
            style={dropdownMenuStyles}
          >
             {searchable && (
              <div className="p-2 sm:p-3">
                <input
                  className="w-full px-2 py-1 sm:px-3 sm:py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs sm:text-sm md:text-base"
                  placeholder="Search..."
                  type="text"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  ref={searchInputRef}
                />
              </div>
            )}
            <ul
              className="py-1 overflow-auto text-xs sm:text-sm md:text-base"
              role="listbox"
              style={dropdownMenuStyles}
            >
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option, index) => (
                  <li
                    key={option.value + "-" + index}
                    role="option"
                    aria-selected={highlightedIndex === index ? "true" : "false"}
                    className={[
                      option.className,
                      "px-4 py-2",
                      option.disabled ? "text-gray-500 bg-gray-50 cursor-not-allowed" : "text-gray-900 hover:bg-blue-100 cursor-pointer",
                      highlightedIndex === index ? "bg-blue-200" : "",
                      option.value === value ? "font-semibold bg-blue-50" : "",
                    ].filter(Boolean).join(" ")}
                    onClick={() => handleOptionClick(option)}
                    onMouseEnter={() => !option.disabled && setHighlightedIndex(index)}
                  >
                    <div className="flex items-center">
                      {option.icon && <span className="mr-2">{option.icon}</span>}
                      <div>
                        {option.label}
                        {option.description && <div className="text-sm text-gray-500">{option.description}</div>}
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <li className="px-4 py-2 text-gray-500">{noOptionsMessage}</li>
              )}
            </ul>
          </div>
        )}

        {error && (
          <p className="mt-1 text-sm text-red-700" role="alert">
            {typeof error === 'string' ? error : ''}
          </p>
        )}
        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    </div>
  );
}; 