// components/UserInfo.js
import React, { useEffect, useState } from 'react';
import UAParser from 'ua-parser-js';

const UserInfo = () => {
  const [userInfo, setUserInfo] = useState({});
  const [ipAddress, setIpAddress] = useState("");
  const [referer, setReferer] = useState("");

  useEffect(() => {
    // Get browser and OS information using UAParser
    const parser = new UAParser();
    const result = parser.getResult();

    setUserInfo({
      browser: `${result.browser.name} ${result.browser.version}`,
      os: `${result.os.name} ${result.os.version}`,
      device: result.device.model || 'Desktop',
    });

    // Get the referer from the document.referrer
    setReferer(document.referrer || 'No Referer');

    // Fetch IP address using a public IP API
    const fetchIpAddress = async () => {
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        setIpAddress(data.ip);
      } catch (error) {
        console.error('Error fetching IP address:', error);
      }
    };

    fetchIpAddress();
  }, []);

  return (
    <div className='p-8 flex-col font-lato'>
      <h1 className='text-2xl'>User Information</h1>
      <p><strong>Browser:</strong> {userInfo.browser}</p>
      <p><strong>Operating System:</strong> {userInfo.os}</p>
      <p><strong>Device:</strong> {userInfo.device}</p>
      <p><strong>IP Address:</strong> {ipAddress}</p>
      <p><strong>Referer:</strong> {referer}</p>
    </div>
  );
};

export default UserInfo;

