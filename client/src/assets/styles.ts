import { makeStyles } from '@material-ui/core/styles';

const spacing: { [field: string]: string } = {
    0: '0px',
    1: '5px',
    2: '10px',
    3: '15px',
    4: '20px',
    5: '25px',
};

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

export const useStyles = makeStyles({
    ...spacingStyles,
});
