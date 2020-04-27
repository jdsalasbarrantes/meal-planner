import React, { ReactNode } from 'react';
import PropTypes from 'prop-types';
import Grid, {
    GridJustification,
    GridDirection,
    GridSize,
} from '@material-ui/core/Grid';
import { useStyles } from '../assets/styles';

interface PageContainerProps {
    children: ReactNode;
    justify?: string;
    direction?: string;
    lgSize?: number;
}

const PageContainer: React.FC<PageContainerProps> = ({
    children,
    justify,
    direction,
    lgSize,
}): JSX.Element => {
    const classes = useStyles();
    return (
        <Grid
            container
            className={classes.px2}
            justify={justify as GridJustification}
            direction={direction as GridDirection}
        >
            <Grid item xs={12} md={12} lg={lgSize as GridSize}>
                {children}
            </Grid>
        </Grid>
    );
};

PageContainer.defaultProps = {
    justify: 'center',
    direction: 'row',
    lgSize: 8,
};

PageContainer.propTypes = {
    children: PropTypes.node.isRequired,
    justify: PropTypes.string,
    direction: PropTypes.string,
    lgSize: PropTypes.number,
};

export default PageContainer;
