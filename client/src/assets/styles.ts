import { makeStyles } from '@material-ui/core/styles';
import { spacing } from './spacing';

const spacingStyles: { [field: string]: { [field: string]: string } } = {};
['margin', 'padding'].forEach((cssProperty) => {
    Object.keys(spacing).forEach((spacingVariant) => {
        const className = `${cssProperty[0]}${spacingVariant}`;
        const propertyName = `${cssProperty}`;
        spacingStyles[className] = {};
        spacingStyles[className][propertyName] = spacing[spacingVariant];
    });
    ['top', 'right', 'bottom', 'left'].forEach((side) => {
        Object.keys(spacing).forEach((spacingVariant) => {
            const className = `${cssProperty[0]}${side[0]}${spacingVariant}`;
            const propertyName = `${cssProperty}${side[0].toUpperCase()}${side.slice(
                1,
            )}`;
            spacingStyles[className] = {};
            spacingStyles[className][propertyName] = spacing[spacingVariant];
        });
    });
    ['x', 'y'].forEach((side) => {
        Object.keys(spacing).forEach((spacingVariant) => {
            const className = `${cssProperty[0]}${side}${spacingVariant}`;
            const propertyName = `${cssProperty}`;
            spacingStyles[className] = {};
            if (side === 'x') {
                spacingStyles[className][
                    propertyName
                ] = `0px ${spacing[spacingVariant]}`;
            } else if (side === 'y') {
                spacingStyles[className][
                    propertyName
                ] = `${spacing[spacingVariant]} 0px`;
            }
        });
    });
});

const generalStyles: { [field: string]: { [field: string]: string } } = {
    fullWidth: {
        width: '100%',
    },
    fullHeight: {
        height: '100%',
    },
    maxWidth200: {
        maxWidth: '200px',
    },
    maxWidth120: {
        maxWidth: '120px',
    },
    noBorder: {
        border: '0px',
    },
    greyBg: {
        backgroundColor: '#eae9e9',
    },
    whiteBg: {
        backgroundColor: 'white',
    },
};

const fontStyles: { [field: string]: { [field: string]: string } } = {
    bold: {
        fontWeight: 'bold',
    },
    textAlignLeft: {
        textAlign: 'left',
    },
};

export const useStyles = makeStyles({
    ...spacingStyles,
    ...fontStyles,
    ...generalStyles,
});
