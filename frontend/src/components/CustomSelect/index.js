import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { useField } from '@rocketseat/unform';

import { Container } from './styles';

/* eslint-disable react/jsx-props-no-spreading */
export default function ReactSelect({ name, label, options, multiple, ...rest }) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  function parseSelectValue(selectRef) {
    // const selectValue = selectRef.state.value;
    const selectValue = selectRef.props.value;
    if (!multiple) {
      return selectValue ? selectValue.id : '';
    }

    return selectValue ? selectValue.map(option => option.id) : [];
  }

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'state.value.id',
      parseValue: parseSelectValue,
      clearValue: selectRef => {
        selectRef.select.clearValue();
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  function getDefaultValue() {
    if (!defaultValue) return null;

    if (!multiple) {
      return options.find(option => option.id === defaultValue);
    }

    return options.filter(option => defaultValue.includes(option.id));
  }

  return (
    <>
      <label htmlFor={fieldName}>{label}</label>

      <Select
        name={fieldName}
        aria-label={fieldName}
        options={options}
        isMulti={multiple}
        defaultValue={getDefaultValue()}
        ref={ref}
        classNamePrefix="react-select"
        getOptionValue={option => option.value}
        getOptionLabel={option => option.label}
        noOptionsMessage={() => 'Nenhum registro localizado'}
        loadingMessage={() => 'Carregando...'}
        placeholder="Selecione..."
        {...rest}
      />

      {error && <span>{error}</span>}
    </>
  );
}

ReactSelect.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  multiple: PropTypes.bool,
  label: PropTypes.string,
};

ReactSelect.defaultProps = {
  multiple: false,
  label: "",
};