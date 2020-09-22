import React, { useRef, useEffect } from 'react';
import { OptionTypeBase } from 'react-select';
import Select, { Props as AsyncProps } from 'react-select/async';
import { useField } from '@unform/core';
import { debounce } from 'lodash';
import PropTypes from 'prop-types';

/* eslint-disable react/jsx-props-no-spreading */
function AsyncSelect({ name, label, asyncFunc, ...rest }) {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  const loadValues = (valueLoad) => asyncFunc(valueLoad);

  const debouncedLoadOptions = debounce(loadValues, 1000, {
    leading: true,
  });

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref) => {
        if (rest.isMulti) {
          if (!ref.select.state.value) {
            return [];
          }

          return ref.select.state.value.map(
            (option) => option.value,
          );
        }
        if (!ref.select.state.value) {
          return '';
        }

        return ref.select.state.value.value;
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  return (
    <>
      <label htmlFor={fieldName}>{label}</label>

      <Select
        cacheOptions
        loadOptions={inputValue => debouncedLoadOptions(inputValue)}
        defaultValue={defaultValue}
        ref={selectRef}
        classNamePrefix="react-select"
        noOptionsMessage={() => 'Nenhum registro localizado'}
        loadingMessage={() => 'Carregando...'}
        {...rest}
      />
    </>
  );
};

AsyncSelect.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,

  asyncFunc: PropTypes.func,
}

AsyncSelect.defaultProps = {
  label: "",
  asyncFunc: () => { },

}

export default AsyncSelect;