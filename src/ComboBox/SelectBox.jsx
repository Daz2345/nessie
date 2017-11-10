import React        from 'react';
import PropTypes    from 'prop-types';

import styles       from './comboBox.css';
import { utils }    from '../ListBox';

import { ComboBox } from './index';


const generateId = name =>
    `${name}-${Math.floor( ( Math.random() * 9e15 ) + 1e15 )}`;


const SelectBox = props =>
    <ComboBox { ...props } hasAutocomplete = { false } inputIsReadOnly />;

SelectBox.propTypes = {
    activeOption    : PropTypes.string,
    className       : PropTypes.string,
    cssMap          : PropTypes.objectOf( PropTypes.string ),
    id              : PropTypes.string,
    inputIsReadOnly : PropTypes.bool,
    isOpen          : PropTypes.bool,
    isReadOnly      : PropTypes.bool,
    isRequired      : PropTypes.bool,
    options         : PropTypes.arrayOf( PropTypes.object ),
    onBlur          : PropTypes.func,
    onClickInput    : PropTypes.func,
    onClickList     : PropTypes.func,
    onFocus         : PropTypes.func,
    onInput         : PropTypes.func,
    onKeyPress      : PropTypes.func,
    placeholder     : PropTypes.string,
    selectedOptions : PropTypes.arrayOf( PropTypes.string ),
    value           : PropTypes.string,
};

SelectBox.defaultProps = {
    activeOption    : undefined,
    className       : undefined,
    cssMap          : styles,
    id              : generateId( 'SelectBox' ),
    isOpen          : false,
    isReadOnly      : false,
    isRequired      : false,
    options         : undefined,
    onBlur          : undefined,
    onClickInput    : undefined,
    onClickList     : undefined,
    onFocus         : undefined,
    onInput         : undefined,
    onKeyPress      : undefined,
    placeholder     : undefined,
    selectedOptions : undefined,
    value           : undefined,
};

export default SelectBox;