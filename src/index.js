const { GraphQLServer } = require("graphql-yoga");
const find = require("lodash.find");

let links = [
  {
    id: "link-0",
    url: "www.howtographql.com",
    description: "Fullstack tutorial for GraphQL"
  }
];

// 1
let idCount = links.length;
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
    link: (parent, args) => {
      return find(links, { id: args.id });
    }
  },
  Mutation: {
    // 2
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url
      };
      links.push(link);
      return link;
    },
    updateLink: (parent, args) => {
      let link = find(links, { id: args.id });
      link = {
        id: args.id,
        description: args.description,
        url: args.url
      };
      return link;
    },
    deleteLink: (parent, args) => {
      const link = find(links, { id: args.id });
      delete links[link];
      return `Deleted`;
    }
  }
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
