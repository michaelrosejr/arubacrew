---
title: APIs for Everyone Workshop
description: Learning the basics of API using Aruba New Central
date: 2025-06-16
categories:
  - central
  - automation
published: true
---

## Introduction
The goal of this workshop is to provide you, the SE, with hands-on experience in getting started with RESTful API that are used in all of our products. This includes creating an API token, configuring your Postman client, creating your first API request, configuring and updating configurations in Aruba Central.

## Reminder
While this lab describes the API endpoints used in this workshop. We recommend reviewing the API docs on [DevHub](https://devhub.arubanetworks.com/get-started/new-central) for more details on each API endpoint.

## Assumptions
This lab assumes you're familiar with New Central and configuration. While you can go through this lab without knowledge of New Central, it will be easier to understand the UI if you've already configured devices and SSIDs using New Central.

## Caveats

> [!Note]
If you get the following error when making an API request:
```json 

{
   "errorCode": "HPE_GL_NETWORKING_ERROR_UNAUTHORIZED",
   "httpStatusCode": 401,
   "message": "Invalid access token",
   "debugId": "d3b9a0166c2b8a5890823dcf3f931978"
}
```

There are a few scenarios where you'll get this error:
1. This error generally means the access token you're using has expired. 
	- If this the case, then you need to request a new access token.
2. You're using the wrong access token for the wrong Central cluster. 
	- You need to change the correct Environment settings for the ClientID you're using
	- Request a new access token
3. Your Personal API token has been deleted or revoked. 
	- You'll need to create a new Personal API token
	- Enter the new ClientId and ClientSecret in the Environments section
	- Request a new access token

## Lab 1: Creating a personal API Client In GLP
[Greenlake Documentation on Personal API Tokens ](https://developer.greenlake.hpe.com/docs/greenlake/guides/public/authentication/authentication/)

By creating a personal API client, you create the client ID and client secret required to access HPE GreenLake or another HPE service's APIs. The client ID and client secret are used to generate an access token. An access token authenticates API communication between your application and the platform.

1. Login to HPE GreenLake using the credentials provided by your instructor or use your own workspace.
2. On the HPE GreenLake header, click the workspace menu and then select **Manage Workspace**.
3. Select **Personal API clients**.
4. Click **Create personal API client**.
5. In **Personal API client name**, enter a name for the API client.
6. Select the **HPE Aruba Networking Central Internal (US West)** as the **Service**.
7. Click the **Create personal API client** button to continue. The **Personal API client created** display appears and shows that your credentials were successfully created.
8. Click the **Copy** button next to **Client ID** and **Client Secret** and save both to a safe and secure location. HPE GreenLake does not store your client secret. If lost, you need to reset your client secret.
9. Click **Close** to continue. You are returned to the main **Personal API clients** page, where you can generate the access token.

![](ManageWorkspace.png)

##### Create Personal API Client

![Create Personal API Client](CreatePersonalAPI.png)

##### Personal API Client Service
![Personal API Client Service Image](APIClientService.png)

##### Save API Client ID and Client Secret
![Save API Credentials](APIid_secret.png)


### Generating an Access Token

On the **Personal API clients** page, you can view API credential details and generate access tokens. However, we'll be configuring Postman to generate the access token so it can be saved as an environment variable. The steps below are for reference if you should need to generate an access token to do a quick test.

Access tokens are small strings of code sent in the header of your API calls. Access tokens identify whether you (or your application) have the necessary permissions to access resources securely through an API call. Access tokens inherit the permissions of the user that created the personal API client.

Access tokens remain valid for limited periods. HPE GreenLake tokens stay valid for 15 minutes. Tokens for all other HPE services stay valid for 120 minutes.

> [!Danger] Security
> These tokens have full read-write permissions to your Central services. Be sure to store the tokens in a secure location


## Lab: Making your first API request

We're going to take the access token that you generated in the last lab and use it to get a list of customer sites from Aruba "New" Central. To start, in another browser, navigate to the [HPE Aruba Networking Developer Hub](https://developer.arubanetworks.com/new-central-config/reference/getsites)

DevHub API Reference tool has the ability to send API requests directly to New Central. This site is extremely useful as it's provides detailed documentation on the Request, Query Parameters and Response. In addition, it allows us to add the API access token to run the query for us. This is useful if you need to check data in Central, do a quick query/change via the API. This also makes a great demo for your customer to show them the power of Central.

#### Authenticate DevHub
You'll see a section for your credentials. You can enter your Client ID and Secret or enter the token you generated  in the previous lab. 

> [!Note]
> For security reasons, DevHub won't remember your credentials, so it's recommended you keep this information close by to re-enter the info again as your web session or access token expires.


![](Pasted%20image%2020250620110427.png)

Next, we'll be using the Internal Central cluster. Select `https://internal.api.central.arubanetworks.com` from the Base URL dropdown menu. Don't click on the above link as it is meant for API calls with parameters.

> [!Note]
> ![](Pasted%20image%2020250620110412.png)
> If you get the above error, then you need to go back to the GLP page and generate a new access token. The other option is to save your Client ID and Secret and click "Authorize" to generate a new one.

If you don't get an error and everything works correctly, you should get a response that looks similar to this screenshot.

![](Pasted%20image%2020250620110352.png)


## Lab 2: Overview of Postman

Postman is a popular API development and testing platform that helps developers build, test, and manage APIs (Application Programming Interfaces). It's widely used by software developers, testers, and API teams for working with web services and APIs.

The software is free, but requires a login to use the software.

There are two types of Postman clients:
1. As desktop version for [Windows, MacOS, and Linux](https://www.postman.com/downloads/)
2. [Web version](https://aruba-cloud-specialization.postman.co/workspace/APIs-For-Everyone~85940bcf-8319-45e8-b93e-13b04b1b2735/overview)

We **recommend** using the **desktop version** as we have seen slow performance with the web version

Once you have the desktop version installed, download the [APIs for Everyone Workshop Postman collection](https://github.com/michaelrosejr/api4everyone/archive/refs/heads/main.zip) and import it into Postman.


## Lab 3: Requesting an API key

### Configuring the environment variables
![Pasted image 20250605140601.png](./attachments/Pasted%20image%2020250605140601.png)

In Postman, navigate to the **Environments** tab on the left.
- Enter your client_id and client_secret in the value fields. 
- For each variable, be sure to the `Current value` is either blank or the same as Initial Value.
- Validate the baseUrl is set to: `https://internal.api.central.arubanetworks.com`
- The `glp_token` variable, should be blank as it will be auto populated by Postman in the next section. Remove any data that is currently in the Current Value field for the `glp_token` variable.

### Set the environment 
![SetEnv](./attachments/Pasted%20image%2020250605141119.png)

Once you have your variables set, select the Workshop environment from the drop on top right which may say `No environment`. This will tell Postman to use these environment variables for all your API requests.

### Getting your first API key

![A local image](./attachments/Pasted%20image%2020250605141837.png)

Navigate to the **Generate Access Token** API request.

**Collections** > **APIs for Everyone** > **Authentication** > **Generate Access Token**


![authtoken1](./attachments/Pasted%20image%2020250605141816.png)

You'll see under the Body of the request that the client_id and client_secret are calling the variables respectively. 

Click **Send** to send the API request

![SendReq](./attachments/Pasted%20image%2020250605142006.png)

If everything was configured correctly, you should see an access token in the Body of the response in Postman.  This access token has been saved as an environment variable in Workshop.

> [!Important]
If you receive an error that you have an invalid access token as show below, then you most likely need to refresh your token. Re-send the **Generate Access Token** in the previous lab to generate a new access token.

```json
{
   "errorCode": "HPE_GL_NETWORKING_ERROR_UNAUTHORIZED",
   "httpStatusCode": 401,
   "message": "Invalid access token",
   "debugId": "d3b9a0166c2b8a5890823dcf3f931978"
}
```


🎉 Congratulations! You have completed your first API call using Postman.

### Troubleshooting
If you ran into an error, check the following:
* Be sure you select Workshop as an environment variable. If you see No environment, then an enviornment has NOT been selected
* Be sure you have set the client_id and client_secret in the Workshop Enviornment variable.
* Double check that the `baseUrl` is set to `https://internal.api.central.arubanetworks.com` If you're using a different Central cluster, then you'll need to update this `baseUrl` for the correct Central cluster. A list of those URLs are located in the [Aruba DevHub documentation](https://developer.arubanetworks.com/new-central/docs/getting-started-with-rest-apis).

## Lab 4: Configuring your first GET request

This workshop assume the site is already created regardless if you're using a Central instance provided by the CREW team or your own environment. We highly recommend you use an existing site that has APs already configured as it will be much easier to validate the changes you make and for testing. However, due to hardware limitation the CREW central environment does not include hardware. In the CREW central instances; validation can only be done via the API and UI.

### Request a list of `sites`
![GETREQ](./attachments/Pasted%20image%2020250605163359.png)

The first GET request we're going to make is to get a list of sites in Central. 
Find the Sites folder and select List Sites. Note that the request type is <mark style="background: #BBFABBA6;">GET</mark> with the `baseUrl` variable used from the Environments section. 

Click **SEND** and to execute the API GET request.

You should get a response similar to the following:
![similar](./attachments/Pasted%20image%2020250605165908.png)

Here you see a JSON object with an items list of sites.

- Look for the `id` for the site `Mercury`.  This is the ScopeID for the site Mercury
- Save the `id` some place as we'll use it in the next step.


🎉 Congratulations! You've just sent your first API GET request.

## Lab 5: Configuring a VLAN

Before we create the SSID, we need to create a VLAN to assign that SSID. Let's get a list of VLANs first, to ensure the VLAN we need to create does not exist.

To get a list of VLANs available in the library, click

**VLANs** > **List VLANs in Library** > **Send**


![](Pasted%20image%2020250619151803.png)

Postman will return a list of VLANs in your library.

#### Create VLAN 5
To create a new VLAN, Click:

**VLANs** > **Create VLAN in Library** > **Body**

![](Pasted%20image%2020250619152314.png)

Edit JSON and change the "VLAN" id to **5**

Now we need to map this VLAN to the site Mercury. To do this, we will set the `scope_id` to the `id` of the Mercury site that we saved in the previous section.

Be sure to change the `<scope_id>` and `<vlan_id` below to match your configuration

```json

{
	"scope-map": [
		{
		"scope-name": "<scope_id>",
		"persona": "CAMPUS_AP",
		"resource": "layer2-vlan/<vlan_id>"
		}

	]
}

```

![](map_vlan.png)
Click Send to POST the request to Central to create the VLAN in the Mercury site.

### Validate the VLAN was created in Central
If you DID NOT set the `scope_id` to the site in the last exercise, then you'll see the new VLAN under Library.

**Config > Library > Profiles > VLAN & Networks > VLAN**


![](validate_vlan5.png)

After you have mapped the VLAN, it should look similar to this:
![Mapped_VLAN_2_site](Pasted%20image%2020250813145724.png)


## Lab 6: Create a WLAN SSID

### Create the WLAN SSID Request

In Postman go to the following tab:

**Collections > WLAN > List WLANs**

Click send should return a list of WLANs, which may be `None` or `{}`

Click on the `Crew WLAN` request, then `Params`.

Change the `scope_id` to your site`id` from above.



Paste the below JSON. Remember to edit the `<your_ssid_name>` and wpa_password value.

```json
{
  "wlan-ssid": {
    "essid": "<your_ssid_name>",
    "type": "employee",
    "hide_ssid": false,
    "vlan": "",
    "zone": "",
    "opmode": {
      "name": "wpa2-psk-mixed"
    },
    "wpa_passphrase": "YourSecurePassword123!",
    "wpa_passphrase_changed": true,
    "is_locked": false,
    "captive_profile_name": "",
    "bandwidth_limit_up": "",
    "bandwidth_limit_down": "",
    "bandwidth_limit_peruser_up": "",
    "bandwidth_limit_peruser_down": "",
    "access_rules": []
  }
}
```

##### Validate the WLAN SSID has been created.
![](Pasted%20image%2020250814054151.png)




## Lab 7: Auto-refreshing your GLP access token

## Internal Resources
- New Central [API Reference (Swagger)](https://developer.arubanetworks.com/new-central/reference)
- Slack Channel: [#aruba-developer-community](https://hpe.enterprise.slack.com/archives/C0257JY7VFY)
- DevHub: 
	- [New Central APIs](https://devhub.arubanetworks.com/get-started/new-central) 
	- [Postman Collection](https://developer.arubanetworks.com/new-central/docs/postman-collection)
- Python SDK: [pycentral ](https://developer.arubanetworks.com/new-central/docs/getting-started-with-python)
	- At the time of this writing, the Python SDK `pycentral`  is not available for New Central


## Extra Credit
The Postman collection includes a folder of GLP endpoints. To use these endpoints, you'll need to create a GLP API token. 

![](Pasted%20image%2020250826153551.png)

## Creating a GLP API Token

In Lab 1 we created a personal API client for Aruba Central. For this next section we'll create a personal API client for**HPE GreenLake Cloud Platform**.


1. Login to HPE GreenLake using the credentials provided by your instructor or use your own workspace.
2. On the HPE GreenLake header, click the workspace menu and then select **Manage Workspace**.
3. Select **Personal API clients**.
4. Click **Create personal API client**.
5. In **Personal API client name**, enter a name for the API client.
6. Select the **HPE GreenLake Cloud Platform as the **Service**.
7. Click the **Create personal API client** button to continue. The **Personal API client created** display appears and shows that your credentials were successfully created.
8. Click the **Copy** button next to **Client ID** and **Client Secret** and save both to a safe and secure location. HPE GreenLake does not store your client secret. If lost, you need to reset your client secret.
9. Click **Close** to continue. You are returned to the main **Personal API clients** page, where you can generate the access token.

![](Pasted%20image%2020250814073841.png)

**Save the `client_id` and `client_secret` as we'll use it in the next section**

In Postman, go to:
Environments > Workshop and enter the `client_id` and `client_secret` from the previous section.

![](Pasted%20image%2020250814074135.png)

Then go to

**Collections > GLP > Authentication > Generate GLP Token**

Click Send and you should receive a access_token for GLP

![](Pasted%20image%2020250814074350.png)

## Getting a list of Devices in GLP

Go to **Collections > GLP > Devices > List Devices**

Click on this request will show a list of devices in GLP. This will show devices for Central as well as Compute, Storage and other HPE products managed by GreenLake.

![](Pasted%20image%2020250814074734.png)

Go to **Collections > GLP > Devices > List Subscriptions**

As the name states, this will show a list of subscriptions. Refer to DevHub.arubanetworks.com for more API endpoints to manage subscriptions.

![](Pasted%20image%2020250814074808.png)



## Reference
[DevHub API Docs](https://devhub.arubanetworks.com/get-started/new-central)
[Glossary of Terms](glossary)

