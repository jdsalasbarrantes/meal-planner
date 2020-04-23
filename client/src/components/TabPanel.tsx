import React from 'react';
import PropTypes from 'prop-types';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

interface TabPanelProps {
    currentTabIndex: number;
    setTabIndex: Function;
    tabLabels: string[];
}

const TabPanel: React.FC<TabPanelProps> = ({
    tabLabels,
    currentTabIndex,
    setTabIndex,
}): JSX.Element => {
    const handleChange = (
        event: React.ChangeEvent<{}>,
        newTab: number,
    ): void => {
        setTabIndex(newTab);
    };
    return (
        <Tabs
            value={currentTabIndex}
            variant="fullWidth"
            onChange={handleChange}
        >
            {tabLabels.map((tabLabel: string, index: number) => (
                <Tab key={index} label={tabLabel} />
            ))}
        </Tabs>
    );
};

TabPanel.propTypes = {
    currentTabIndex: PropTypes.number.isRequired,
    setTabIndex: PropTypes.func.isRequired,
    tabLabels: PropTypes.array.isRequired,
};

export default TabPanel;
