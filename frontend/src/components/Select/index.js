import React, { useRef, useEffect } from 'react';
import ReactSelect from 'react-select';
import { useField } from '@unform/core';
import PropTypes from 'prop-types';

/* eslint-disable react/jsx-props-no-spreading */
function Select({ name, options, label, ...rest }) {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref) => {
        if (rest.isMulti) {
          if (!ref.state.value) {
            return [];
          }
          return ref.state.value.map((option) => option.value);
        }
        if (!ref.state.value) {
          return '';
        }
        return ref.state.value.value;
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  return (
    <>
      <label htmlFor={fieldName}>{label}</label>

      <ReactSelect
        name={fieldName}
        defaultValue={defaultValue}
        ref={selectRef}
        classNamePrefix="react-select"
        options={options}
        getOptionValue={option => option.value}
        getOptionLabel={option => option.label}
        noOptionsMessage={() => 'Nenhum registro localizado'}
        loadingMessage={() => 'Carregando...'}
        placeholder="Selecione..."
        {...rest}
      />
    </>
  );
};

Select.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object),
  label: PropTypes.string,
}

Select.defaultProps = {
  label: "",
  options: {},
}

export default Select;