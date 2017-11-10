import React                        from 'react';
import PropTypes                    from 'prop-types';

import { ListBox, ScrollBox, Text } from '../index';
import ListBoxOption                from '../ListBox/ListBoxOption';
import ListBoxOptionGroup           from '../ListBox/ListBoxOptionGroup';
import TextInputWithIcon            from '../TextInputWithIcon';
import withDropdown                 from '../Dropdown/withDropdown';
import { generateId }               from '../utils';

const InputWithDropdown = withDropdown( TextInputWithIcon );

const addPrefix    = ( str = '', prefix ) => `${prefix}-${str}`;
const removePrefix = ( str = '', prefix ) => str.replace( `${prefix}-`, '' );

const createHandler = ( func, comboId ) => func && (
    ( e, optId ) => func( e, removePrefix( optId, comboId ) )
);

const buildListBoxOptions = ( options = [], prefix = '' ) =>
    options.map( ( option = {} ) =>
    {
        if ( option.header )
        {
            const { options: groupOptions, ...groupProps } = option;

            return (
                <ListBoxOptionGroup { ...groupProps }>
                    { buildListBoxOptions( groupOptions, prefix ) }
                </ListBoxOptionGroup>
            );
        }

        return (
            <ListBoxOption
                { ...option }
                id = { option.id && addPrefix( option.id, prefix ) } />
        );
    } );

const ComboBox = function ComboBox( {
    activeOption,
    dropdownPlaceholder,
    forceHover,
    hasError,
    iconType,
    id = generateId( 'ComboBox' ),
    inputRef,
    inputType,
    inputValue,
    isDisabled,
    isMultiselect,
    isOpen,
    inputIsReadOnly,
    name,
    onBlur,
    onChangeInput,
    onClickInput,
    onClickOption,
    onFocus,
    onKeyDown,
    onKeyPress,
    onKeyUp,
    onMouseOut,
    onMouseOutOption,
    onMouseOver,
    onMouseOverOption,
    onScroll,
    options = [],
    inputPlaceholder,
    selection,
} )
{
    const dropdownContent = options.length ? (
        <ScrollBox
            height   = "50vh"
            onScroll = { onScroll }>
            <ListBox
                activeOption      = { addPrefix( activeOption, id ) }
                id                = { addPrefix( 'listbox', id ) }
                isMultiselect     = { isMultiselect }
                isFocusable       = { false }
                onClickOption     = { createHandler( onClickOption, id ) }
                onMouseOutOption  = { createHandler( onMouseOutOption, id ) }
                onMouseOverOption = { createHandler( onMouseOverOption, id ) }
                selection         = { selection &&
                    Array.isArray( selection ) ?
                        selection.map( opt => addPrefix( opt, id ) ) :
                        addPrefix( selection, id )
                }>
                { buildListBoxOptions( options, id ) }
            </ListBox>
        </ScrollBox>
    ) : <Text noWrap role = "subtle">{ dropdownPlaceholder }</Text>;

    return (
        <InputWithDropdown
            aria           = { {
                activeDescendant :
                    activeOption && addPrefix( activeOption, id ),
                expanded : isOpen,
                hasPopup : 'listbox',
                owns     : addPrefix( 'listbox', id ),
                role     : 'combobox',
            } }
            forceHover     = { forceHover || isOpen }
            hasError       = { hasError }
            iconType       = { iconType }
            id             = { id }
            inputRef       = { inputRef }
            inputType      = { inputType }
            isDisabled     = { isDisabled }
            isReadOnly     = { inputIsReadOnly }
            dropdownIsOpen = { isOpen }
            dropdownProps  = { {
                children : dropdownContent,
                hasError,
                padding  : options.length ? 'none' : 'S',
            } }
            name           = { name }
            onBlur         = { onBlur }
            onChange       = { onChangeInput }
            onClick        = { onClickInput }
            onFocus        = { onFocus }
            onKeyDown      = { onKeyDown }
            onKeyPress     = { onKeyPress }
            onKeyUp        = { onKeyUp }
            onMouseOut     = { onMouseOut }
            onMouseOver    = { onMouseOver }
            placeholder    = { inputPlaceholder }
            value          = { inputValue } />
    );
};

ComboBox.propTypes =
{
    /*
     * Active option in dropdown list
     */
    activeOption        : PropTypes.string,
    /**
     * Placeholder text to show when no dropdown list options
     */
    dropdownPlaceholder : PropTypes.string,
    /**
     * Display as hover when required from another component
     */
    forceHover          : PropTypes.bool,
    /**
     *  Display as error/invalid
     */
    hasError            : PropTypes.bool,
    /**
     *  Icon type to display
     */
    iconType            : PropTypes.oneOf( [
        'account',
        'add',
        'calendar',
        'close',
        'delete',
        'down',
        'download',
        'duplicate',
        'edit',
        'info',
        'hide',
        'inspect',
        'left',
        'link',
        'preview',
        'reset',
        'right',
        'search',
        'show',
        'up',
        'upload',
        'validation',
        'none',
    ] ),
    /**
     *  HTML id attribute (overwrite default)
     */
    id                : PropTypes.string,
    /**
     *  Dropdown list allows multiple selection
     */
    isMultiselect     : PropTypes.bool,
    /**
     *  Display as read-only
     */
    inputIsReadOnly   : PropTypes.bool,
    /**
     * Callback that receives the native <input>: ( ref ) => { ... }
     */
    inputRef          : PropTypes.func,
    /**
     * HTML type attribute for input
     */
    inputType         : PropTypes.string,
    /*
     * Input field value
     */
    inputValue        : PropTypes.string,
    /**
     *  Display as disabled
     */
    isDisabled        : PropTypes.bool,
    /*
     * Dropdown is open
     */
    isOpen            : PropTypes.bool,
    /**
     *  HTML name attribute
     */
    name              : PropTypes.string,
    /**
     *  blur callback function
     */
    onBlur            : PropTypes.func,
    /**
     *  Input change callback function
     */
    onChangeInput     : PropTypes.func,
    /**
     * key down callback function
     */
    onKeyDown         : PropTypes.func,
    /**
     * key press callback function
     */
    onKeyPress        : PropTypes.func,
    /**
     * key up callback function
     */
    onKeyUp           : PropTypes.func,
    /**
     *  focus callback function
     */
    onFocus           : PropTypes.func,
    /**
     *  mouseOver callback function
     */
    onMouseOver       : PropTypes.func,
    /**
     *  mouseOut callback function
     */
    onMouseOut        : PropTypes.func,
    /**
     *  Placeholder text
     */
    inputPlaceholder  : PropTypes.string,
    /*
     * On click callback funciton for input
     */
    onClickInput      : PropTypes.func,
    /*
     * On click callback function for doropdown option
     */
    onClickOption     : PropTypes.func,
    /*
     * On mouse out callback function for dropdown option
     */
    onMouseOutOption  : PropTypes.func,
    /*
     * On mouse over callback function for dropdown option
     */
    onMouseOverOption : PropTypes.func,
    /*
     * On scroll dropdown list
     */
    onScroll          : PropTypes.func,
    /*
     * Dropdown list options
     */
    options           : PropTypes.arrayOf( PropTypes.object ),
    /*
     * Selected option(s) from dropdown list
     */
    selection         : PropTypes.oneOfType( [
        PropTypes.string,
        PropTypes.objectOf( PropTypes.string ),
    ] ),
};

ComboBox.defaultProps = {
    activeOption        : undefined,
    dropdownPlaceholder : undefined,
    forceHover          : false,
    inputPlaceholder    : undefined,
    hasError            : false,
    iconType            : 'none',
    id                  : undefined,
    inputIsReadOnly     : false,
    inputRef            : undefined,
    inputType           : 'text',
    inputValue          : undefined,
    isDisabled          : false,
    isOpen              : false,
    isMultiselect       : false,
    name                : undefined,
    noOptiosText        : undefined,
    onChangeInput       : undefined,
    onBlur              : undefined,
    onClickInput        : undefined,
    onKeyDown           : undefined,
    onKeyPress          : undefined,
    onKeyUp             : undefined,
    onFocus             : undefined,
    onClickOption       : undefined,
    onMouseOut          : undefined,
    onMouseOutOption    : undefined,
    onMouseOver         : undefined,
    onMouseOverOption   : undefined,
    onScroll            : undefined,
    options             : undefined,
    selection           : undefined,
};

export default ComboBox;