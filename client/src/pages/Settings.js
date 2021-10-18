import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ProfileEdit from '../components/Settings/Profile-Edit';
import PasswordChange from '../components/Settings/PasswordChange';
import { me } from '../api';

import { Box } from '@mui/material';
import VerticalTabs from '../components/Settings/VeritcalTabs';

function Settings() {
  const [user, setUser] = useState();
  const [tab, setTab] = useState('Account');

  useEffect(() => {
    me().then((res) => setUser(res));
  }, []);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar active="Settings" />
      <Box
        sx={{
          display: 'flex',
          flexGrow: { xs: 0, sm: 1 },
          justifyContent: 'center',
          background: '#F7F7F7',
          height: '100vh',
        }}
      >
        {user !== undefined && (
          <Box
            sx={{
              display: 'flex',
              width: { sm: '80vw', xl: '60vw' },
              flexDirection: 'column',
              padding: '10%',
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <VerticalTabs
                tabs={[
                  { key: 'Account', panel: <ProfileEdit user={user} /> },
                  { key: 'Password', panel: <PasswordChange /> },
                ]}
                tab={tab}
                handleTabChange={handleTabChange}
              />
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default Settings;
