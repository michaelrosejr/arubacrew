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

[Glossary of Terms](glossary)


> [!Note]
If you get the following error when making an API request:
```
{
   "errorCode": "HPE_GL_NETWORKING_ERROR_UNAUTHORIZED",
   "httpStatusCode": 401,
   "message": "Invalid access token",
   "debugId": "d3b9a0166c2b8a5890823dcf3f931978"
}
```

There are a few scenarios where you'll get this error:
1. This error generally means the access token you're using has expired. If this the case, then you need to request a new access token.
2. You're using the wrong access token for the wrong Central cluster. 
	- You need to change the correct Environment settings for the ClientID you're using
	- Request a new access token
3. Your Personal API token has been deleted or revoked. 
	- You'll need to create a new Personal API token
	- Enter the new ClientId and ClientSecret in the Environments section
	- Request a new access token

## Lab 1: Creating a personal API Client In GLP
[Greenlake Documentation ](https://developer.greenlake.hpe.com/docs/greenlake/guides/public/authentication/authentication/)

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


### Generating An Access Token

On the **Personal API clients** page, you can view API credential details and generate access tokens. However, we'll be configuring Postman to generate the access token so it can be saved as an environment variable. The steps below are for reference if you should need to generate an access token to do a quick test.

Access tokens are small strings of code sent in the header of your API calls. Access tokens identify whether you (or your application) have the necessary permissions to access resources securely through an API call. Access tokens inherit the permissions of the user that created the personal API client.

Access tokens remain valid for limited periods. HPE GreenLake tokens stay valid for 15 minutes. Tokens for all other HPE services stay valid for 120 minutes.


## Lab 2: Overview of Postman

Postman is a popular API development and testing platform that helps developers build, test, and manage APIs (Application Programming Interfaces). It's widely used by software developers, testers, and API teams for working with web services and APIs.

The software is free, but requires a login to use the software.

There are two types of Postman clients:
1) As desktop version for [Windows, MacOS, and Linux](https://www.postman.com/downloads/)
2) [Web version](https://aruba-cloud-specialization.postman.co/workspace/APIs-For-Everyone~85940bcf-8319-45e8-b93e-13b04b1b2735/overview)

We **recommend** using the **desktop version** as we have seen slow performance with the web version

Once you have the desktop version installed, download the<mark style="background: #FFF3A3A6;"> (Need Link)</mark> **APIs for Everyone Workshop** Postman collection and import it into Postman.


## Lab 3: Requesting an API key

### Configuring the environment variables
![Pasted image 20250605140601.png](./attachments/Pasted%20image%2020250605140601.png)

In Postman, navigate to the Environments tab on the left.
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
Collections > APIs for Everyone > Authentication > Generate Access Token


![authtoken1](./attachments/Pasted%20image%2020250605141816.png)

You'll see under the Body of the request that the client_id and client_secret are calling the variables respectively. 

Click Send to send the API request

![SendReq](./attachments/Pasted%20image%2020250605142006.png)

If everything was configured correctly, you should see an access token in the Body of the response in Postman.  This access token has been saved as an environment variable in Workshop.

Congratulations! You have completed your first API call using Postman.

### Troubleshooting
If you ran into an error, check the following:
* Be sure you select Workshop as an environment variable. If you see No environment, then an enviornment has NOT been selected
* Be sure you have set the client_id and client_secret in the Workshop Enviornment variable.
* Double check that the `baseUrl` is set to `https://internal.api.central.arubanetworks.com` If you're using a different Central cluster, then you'll need to update this `baseUrl` for the correct Central cluster. A list of those URLs are located in the [Aruba DevHub documentation](https://developer.arubanetworks.com/new-central/docs/getting-started-with-rest-apis).

## Lab 4: Configuring your first GET request

![GETREQ](./attachments/Pasted%20image%2020250605163359.png)

The first GET request we're going to make is to get a list of sites in Central. 
Find the Sites folder and select List Sites. Note that the request type is <mark style="background: #BBFABBA6;">GET</mark> with the `baseUrl` variable used from the Environments section. 

Click **SEND** and to execute the API GET request.

You should get a response similar to the following:
![similar](./attachments/Pasted%20image%2020250605165908.png)

Here you see a JSON object with an items list of sites.

Congratulations! You've just sent your first API GET request.

## Lab 5: Configuring a VLAN

Test image.
![](Pasted%20image%2020250618134814.png)


## Lab 6: Configuring a SSID
## Lab 7: Auto-refreshing your GLP access token

## Internal Resources
- New Central [API Reference (Swagger)](https://developer.arubanetworks.com/new-central/reference)
- Slack Channel: [#aruba-developer-community](https://hpe.enterprise.slack.com/archives/C0257JY7VFY)
- DevHub: 
	- [New Central APIs](https://devhub.arubanetworks.com/get-started/new-central) 
	- [Postman Collection](https://developer.arubanetworks.com/new-central/docs/postman-collection)
- Python SDK: [pycentral ](https://developer.arubanetworks.com/new-central/docs/getting-started-with-python)
