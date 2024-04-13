# Routes for Aziz

**GET /api/booking/request/list**:
- Get the full list of requests. 
- If you are an admin, you can manage these requests. 
- This page is only visible to admins. 
- This list is fetched from the bookingRequests collection.

**GET /api/booking/request/details?id=<request_id>**:
- If you are an admin, you have access to this page where you can see the details of a specific request and manage it.

**PATCH GET /api/booking/request/details?id=<request_id>**:
- If you are an admin, this request is sent when you hit -deny request- or -approve request-. 
- It updates the status attribute.

**GET /api/user/requests/list**:
- If you are a logged-in president, this page will display the full list of your requests, where you can click on one request and manage it. 
- This page is also visible to admins.

**GET /api/user/requests/list/details?id=<request_id>**:
- If you are a logged-in president, you have access to this page where you can see the details of a specific request of yours and manage it.

**PATCH /api/user/requests/list/details?id=<request_id>**:
- If you are a logged-in president, you can update your request.

**PATCH /api/user/requests/list/details?id=<request_id>**:
- If you are a logged-in president, you can delete your request.

**POST /api/user/requests/create**:
- If you are a logged-in president, you can create a new request.

**GET /api/users/president/list**:
- If you are an admin, then this page will be visible for you and will display the full list of registered presidents. 
- This request will communicate with the presidents collection.

**GET /api/accounts/president/details?id=<president_id>**:
- This page fetches data from the president collection and displays the details of a president. 
- If you are a logged-in president or an admin, then you can delete the account. 
- Only the account owner can update the account details.

**DELETE /api/accounts/president/details?id=<president_id>**:
- To delete the president account.

**PATCH /api/accounts/president/details?id=<president_id>**:
- To update the president account details.

**GET /api/users/signup/request/list**:
- If you are an admin, then this page will be visible for you and will display the full list of signup requests. 
- This request will communicate with the signup_requests collection.

**GET /api/users/signup/request?details=<request_id>**:
- If you are an admin, then this page will be visible for you and will display the details and the control buttons of a specific signup request. 
- This request will communicate with the signup_requests collection.

**POST /api/users/presidents**:
- When you hit -approve signup request-, this request will delete the request from the signup_requests collection and push it to the presidents collection.

**DELETE /api/users/presidents**:
- When you hit -deny signup request-, this request will delete the request from the signup_requests collection.

# Routes for Louay

**GET /dashboard/president**:
- Yaffichi l dashboard mtaa l president.

**GET /dashboard/admin**:
- Yaffichi l dashboard mtaa l admin.

# Routes for Ines

No routes specified.

# Routes for Ossama

No routes specified.
