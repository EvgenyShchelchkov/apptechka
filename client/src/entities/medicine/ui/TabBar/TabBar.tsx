import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import React from 'react';
import styles from './TabBar.module.css';

type TabBarProps = {
  seasons: string[];
  selectedSeason: string;
  // eslint-disable-next-line no-unused-vars
  getEpisodesBySeason: (season: string) => void;
};

export default function TabBar({
  seasons,
  selectedSeason,
  getEpisodesBySeason,
}: TabBarProps): React.JSX.Element {
  return (
    <Box className={styles.tabBarContainer}>
      <Tabs
        value={selectedSeason}
        onChange={(_event, value: string) => getEpisodesBySeason(value)}
        centered
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        className={styles.tabs}
      >
        <Tab label="All Seasons" value="all" className={styles.tab} />
        {seasons.map((seasonNumber) => (
          <Tab
            key={seasonNumber}
            label={`Season ${seasonNumber.slice(1)}`}
            value={seasonNumber}
            className={styles.tab}
          />
        ))}
      </Tabs>
    </Box>
  );
}
