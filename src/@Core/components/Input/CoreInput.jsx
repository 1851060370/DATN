import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useController } from 'react-hook-form';
import { Box, TextField, Typography, FormHelperText } from '@mui/material';

const CoreInput = props => {
    const {
        label,
        name,
        control,
        required,
        readOnly,
        placeholder,
        className,
        disabled,
        defaultValue,
        rules,
        multiline,
        minRows,
        maxRows,
        InputProps,
        spacing,
        ...restProps
    } = props;

    const {
        field: { onChange, onBlur, value, ref },
        fieldState: { error }
    } = useController({
        name,
        control,
        defaultValue,
        rules
    });

    return (
        <Box className={clsx('w-full flex items-center gap-x-[4.8rem]',spacing)}>
            {label ? (
                <Typography className='text-[12px]' component='label'>
                    {label}
                </Typography>
            ) : null}
            <Box className={clsx('w-full', className)}>
                <TextField
                    fullWidth
                    onChange={onChange}
                    onBlur={onBlur}
                    inputRef={ref}
                    error={Boolean(error)}
                    disabled={disabled}
                    value={value ? value : ''}
                    placeholder={placeholder}
                    required={required}
                    multiline={multiline}
                    minRows={minRows}
                    maxRows={maxRows}
                    inputProps={{
                        readOnly
                    }}
                    InputProps={{
                        ...InputProps
                    }}
                    {...restProps}
                />
            </Box>
            {error && error.message ? <FormHelperText error>{error.message}</FormHelperText> : null}
        </Box>
    );
};

CoreInput.defaultProps = {
    label: null,
    name: null,
    required: false,
    readOnly: false,
    placeholder: null,
    className: null,
    disabled: false,
    defaultValue: '',
    multiline: false,
    minRows: 3,
    maxRows: 5,
    InputProps: {}
};

CoreInput.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    control: PropTypes.object.isRequired,
    required: PropTypes.bool,
    readOnly: PropTypes.bool,
    placeholder: PropTypes.string,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    rules: PropTypes.object,
    multiline: PropTypes.bool,
    minRows: PropTypes.number,
    maxRows: PropTypes.number,
    InputProps: PropTypes.object
};

export default React.memo(CoreInput);
