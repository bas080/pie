## Badminton team

The reason why I made this tool is to split a bill with my badminton team.
Every now and then we have a competition and after having played a competition
it's customary to sit down and have a drink and snacks together.

For convenience one of us pays the bill. At a later point we split the bill.
I have taken the responsibility of calculating "the splitting".

So let's see this real world example and how I have structured the code.

First I define all the players. This also includes the place where we have the
drinks.

```js
require ./src/badminton-users.js
```

We export and use these users to define the `from` and `to` in the
transactions.

```js
require ./src/badminton-transactions.js
```

These transactions might be confusing. So what is a transaction, and what
effect does splitting a transaction have?

Looking at split's function signature we can learn the following.

`User[] -> Transaction -> Transaction[]`

- The first argument is the list of users I want to split the "bill" with.
- The second is the bill which is represented by an instance of a transaction

Most importantly it returns one or more transactions. It basically splits one
transaction into multiple. For more clarity we will look at another example.

