import React                                     from 'react';
import PropTypes                                 from 'prop-types';

import { Icon, Text }                            from '../index';
import { buildClassName, eventHandler, generateId, mapAria }   from '../utils';
import styles                                    from './listBoxOption.css';

const buildLabel = ( { children, text, value } ) =>
{
    let label;

    if ( children )
    {
        label = children;
    }
    else
    {
        label = typeof text !== 'undefined' ? text : value;
        label = String( label );
    }

    label = typeof label === 'string' ? <Text>{ label }</Text> : label;

    return label;
};

const ListBoxOption = ( {
    aria,
    className,
    cssMap,
    iconType,
    id = generateId( 'ListBoxOption' ),
    isActive,
    isDisabled,
    isSelected,
    onClick,
    onMouseOut,
    onMouseOver,
    ...props
} ) => (
    <li
        { ...mapAria( {
            ...aria,
            selected : isSelected,
            role     : 'option',
        } ) }
        className = { buildClassName( className, cssMap, {
            disabled : isDisabled,
            active   : isActive,
            selected : isSelected,
        } ) }
        id          = { id }
        onClick     = { eventHandler( onClick, id ) }
        onMouseOut  = { eventHandler( onMouseOut, id ) }
        onMouseOver = { eventHandler( onMouseOver, id ) }>
        { iconType &&
            <Icon
                className = { cssMap.icon }
                type      = { iconType }
                variant   = "stroke" />
        }
        { buildLabel( props ) }
    </li>
);

ListBoxOption.propTypes = {
    aria       : PropTypes.objectOf( PropTypes.string ),
    children   : PropTypes.node,
    className  : PropTypes.string,
    cssMap     : PropTypes.objectOf( PropTypes.string ),
    isActive   : PropTypes.bool,
    id         : PropTypes.string,
    isDisabled : PropTypes.bool,
    isSelected : PropTypes.bool,
    text       : PropTypes.string,
    value      : PropTypes.string,
};

ListBoxOption.defaultProps = {
    aria       : undefined,
    children   : undefined,
    className  : undefined,
    cssMap     : styles,
    isActive   : false,
    id         : undefined,
    isDisabled : false,
    isSelected : false,
    text       : undefined,
    value      : undefined,
};

export default ListBoxOption;