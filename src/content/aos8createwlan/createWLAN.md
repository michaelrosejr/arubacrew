---
title: Create a WLAN in Aruba Instant
description: Learn how to create a new SSID WLAN in Instant
date: '2024-02-05'
categories:
  - wireless
  - instant
published: true
---


# Creating a Wireless SSID in Aruba Instant

## Prerequisites

- Aruba Instant Access Point properly installed and powered
- Administrative access to the Aruba Instant Virtual Controller
- Network connectivity to access the web interface
- Understanding of your desired wireless network security requirements

## Accessing the Aruba Instant Interface

### Step 1: Connect to the Virtual Controller
1. Open a web browser on a device connected to the same network
2. Navigate to the Aruba Instant Virtual Controller IP address
3. Log in with your administrator credentials
4. The default credentials are typically:
   - **Username**: admin
   - **Password**: admin (change this immediately for security)

## Creating a New SSID

### Step 2: Navigate to Wireless Networks
1. From the main dashboard, click on **"Networks"** in the left navigation menu
2. Select **"Employee"** or **"Guest"** depending on your network type
3. Click the **"+"** button or **"Add Network"** to create a new SSID

### Step 3: Configure Basic SSID Settings
1. **Network Name (SSID)**: Enter the wireless network name that users will see
2. **Network Type**: Choose from:
   - **Employee**: For internal corporate use
   - **Guest**: For visitor access with potential restrictions
3. **Status**: Ensure the network is set to **"Enabled"**
4. **SSID Broadcast**: Choose whether to broadcast the SSID name
   - **Enabled**: SSID visible to users
   - **Disabled**: Hidden network (users must manually enter name)

### Step 4: Configure Security Settings
1. **Security Level**: Select appropriate security type:
   - **Open**: No password required (not recommended for most uses)
   - **Personal**: WPA/WPA2-Personal with pre-shared key
   - **Enterprise**: WPA/WPA2-Enterprise with RADIUS authentication
   - **Enhanced Open**: OWE (Opportunistic Wireless Encryption)

2. **For Personal Security**:
   - **Security Protocol**: Choose WPA2, WPA3, or Mixed
   - **Encryption Method**: AES (recommended)
   - **Passphrase**: Enter a strong password (minimum 8 characters)
   - **Passphrase Confirmation**: Re-enter the password

3. **For Enterprise Security**:
   - **Authentication Servers**: Configure RADIUS server settings
   - **Primary RADIUS Server**: Enter server IP address
   - **RADIUS Secret**: Enter shared secret
   - **Authentication Port**: Typically 1812
   - **Accounting Port**: Typically 1813

### Step 5: Configure Advanced Settings (Optional)
1. **VLAN Assignment**:
   - **VLAN ID**: Assign specific VLAN if network segmentation is required
   - **Default**: Uses the default VLAN

2. **Access Rules**:
   - **Bandwidth Limits**: Set upload/download speed restrictions if needed
   - **Session Timeout**: Configure automatic disconnection time
   - **Idle Timeout**: Set timeout for inactive connections

3. **Client Isolation**:
   - **Enable**: Prevents clients from communicating with each other
   - **Disable**: Allows normal client-to-client communication

### Step 6: Configure Captive Portal (For Guest Networks)
1. **Authentication Type**: Choose portal method:
   - **None**: Direct access
   - **Internal**: Built-in captive portal
   - **External**: Third-party captive portal
   - **Social Login**: Facebook, Google, etc.

2. **Portal Settings** (if using Internal):
   - **Welcome Message**: Customize greeting text
   - **Terms of Use**: Add acceptable use policy
   - **Session Duration**: Set connection time limits
   - **Acceptable Use Policy**: Link to company policies

### Step 7: Apply and Save Configuration
1. Review all settings for accuracy
2. Click **"Save"** or **"Apply"** to commit changes
3. The new SSID will be deployed to all Aruba Instant Access Points in the cluster
4. Wait for configuration synchronization (typically 30-60 seconds)

## Verification Steps

### Step 8: Test the New SSID
1. **Scan for Networks**: Use a wireless device to scan for available networks
2. **Verify SSID Visibility**: Confirm the new network name appears in the list
3. **Test Connection**: Connect a test device using the configured credentials
4. **Verify Internet Access**: Ensure the connected device can access required resources
5. **Test Security**: Confirm authentication is working as expected

### Step 9: Monitor Network Status
1. **Check Client Connections**: View connected devices in the dashboard
2. **Monitor Performance**: Review signal strength and throughput
3. **Review Logs**: Check for any connection issues or errors

## Best Practices

### Security Recommendations
- Always use WPA2 or WPA3 security for sensitive networks
- Use strong, complex passphrases (minimum 12 characters)
- Regularly rotate passwords for security compliance
- Enable client isolation for guest networks
- Implement VLAN separation for network segmentation

### Performance Optimization
- Use descriptive but concise SSID names
- Avoid special characters in SSID names
- Limit the number of SSIDs per access point (maximum 8 recommended)
- Configure appropriate bandwidth limits for guest networks
- Monitor client density and adjust as needed

### Guest Network Considerations
- Enable captive portal for guest access control
- Set reasonable session timeouts
- Implement bandwidth restrictions
- Consider legal disclaimer requirements
- Monitor guest usage and logs

## Troubleshooting Common Issues

### SSID Not Broadcasting
- Verify SSID broadcast is enabled
- Check that the network status is "Enabled"
- Ensure Access Points are online and synchronized

### Authentication Failures
- Verify passphrase accuracy
- Check RADIUS server connectivity (for Enterprise networks)
- Review security protocol compatibility

### Poor Performance
- Check signal strength and coverage
- Review bandwidth limitations
- Monitor client device compatibility

---

*Note: Interface details may vary slightly depending on your Aruba Instant firmware version. Always refer to the latest Aruba documentation for version-specific instructions.*