# Blog Site

This is an intentionally vulnerable demo website to show common vulnerabilities and possible attacks like CSRF, SQL injection and XSS.

## Running the code
- make `.env` file having same parameters as `example.env`
- run `yarn start:dev` to start backend
- cd to frontend folder and run `node server.js` to start frontend server

## vulnerable code

- `login` method of `authController` is vulnerable to CSRF attack because it sets cookie as `sameSite='none'`. `change-password` api can be used by the attacker to get access to user account.
- `getBlogs` method of `blogService` is vulnerable to SQL Injection.
- `createBlog` method of `blogService` can be modified to prevent XSS attack from happening.

> [!WARNING]
> This code is written in a hurry and may not follow best practices. (especially in the case of frontend code.)