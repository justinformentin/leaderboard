# Score Leaderboard

Built using React, GraphQL, Apollo, and Mongo.

Add, edit, and delete players on a score leaderboard. Players are ordered by last name and by score.

## Usage

```bash
cd client && npm i # Install client dependencies
npm start # Run client

cd server && npm i # Install server dependencies
npm start # Run client

# If mongo is installed, open separate terminal and run:
mongod # Connects database
```

localhost:3000 for the client

localhost:4000 for the graphql playground

## Sorting

GraphQL makes sorting very easy, and there are many options depending on how you're using it. A simple way to sort would be to just add an orderBy argument to a client-side query such as:

```gql
	{
		players (orderBy: {field: lastname, direction: ASC}){
			id
			firstname
			lastname
    }
  }
```

I can't use that option because I'm using Apollo, and the queries through Apollo don't have access to orderBy. Fortunately there's another easy solution, and that's to just add a `.sort()` to the server-side `Query` resolver.

```js
// /server/index.js
const players = await Player.find({}).sort({score: -1, lastname: 1}).limit(n)
```

The `-1` in `score: -1` denotes sorting the scores by descending, and the `1` in `lastname: 1` denotes sorting the lastname by ascending.

The requirement mentioned score and lastname in ascending order, but the design sample showed descending score/ascending lastname, so I decided to stick with the design sample. In any case, changing the ordering is as easy as deleting or adding a `-`.

## Adding/Editing Players
I wanted to have the data inputs set so each field is required when you are creating a new player, but not required when you are editing a player. So if you want to change only the name or the score, it's possible. To do this, I set the typesDefs, resolvers, and inputs for the `Create` action as required, and set the `Update` action fields as not required:

```js
// /server/index.js
    createPlayer(
			firstname: String!,
			lastname: String!,
			score: Int!
		): Player

		updatePlayer(
			id: ID!,
			firstname: String,
			lastname: String,
			score: Int
		): Player
```

```js
// /client/gql.js
	mutation CreatePlayer($firstname: String!, $lastname: String!, $score: Int!) {

	mutation UpdatePlayer($id: ID!, $firstname: String, $lastname: String, $score: Int) {
```

To allow for the `Update` to both not require all fields, and also not save a field as null, I set the variables as:
```js
// /client/containers/EditPlayer.js
		updatePlayer({
			variables: {
				id,
				firstname: firstname || props.player.firstname,
			...
```

Which is "The set state of firstname from user input OR the existing player firstname props." This way feels kind of hackey, but adding an `||` statement was the simplest solution.

## Hooks
This project was fun for me because I dove a little deeper into hooks than I have up to this point. I actually wrote much of the app using class components, but I decided to convert everything to hooks for the learning experience.

I've never used hooks with Apollo, and unfortunately there isn't a lot out there about using hooks with `Mutation` and `Query` for example, so it was interesting to piece together bits of info from multiple sources to make it work. And it certainly felt good when it finally worked.

## Apollo
Using React-Apollo enables you to use the GraphQL client in any React component. It does this through the use of `<ApolloProvider>` which you wrap your app in similar to Redux's `<Provider>`.

## Mongo
Mongo is a NoSQL database that is great for small, proof of work application in which you just need to get your ideas out there and connect some data. It's so simple that for a dev environment, all you need to do is add the database URL to your server, and then type `mongod` in a terminal to get it running. I wish every database could be that easy, but we'll just have to fantasize about that.

I mentioned small projects, but Mongo is definitely used by many large companies and projects. The only issue is that you really need to think about your data before using Mongo for your project. Most projects actually do require relations, or will in the future, and it's always a pain to switch. So if you know 100% without a doubt know that you will never need relations, Mongo is great. For everything else, it's better to use a relational database.

## Styling
I used styled-components because I like of its extensibility, as well as the fact that the Single File Component idea compliments a smaller project such as this, even though it works well on larger projects regardless! Having few, self contained, single purpose files I believe increases maintainability (up to a certain point). That paradigm is very much "React" anyway; every component should just do one thing.

Having the styling inside the file certainly cuts down on the number of files in the project, and when opening a file it's immediately clear what it does and what it looks like. The beauty of CSS-in-JS is that it's inherently extensible. Using globalStyle, props, theming, full scss functionality, etc, are all benefits. Styled components are great for tiny projects with a few files, to giant projects where reusing theming config variables through props, as well as conditional props, makes it easy to add to, and refactor projects.
