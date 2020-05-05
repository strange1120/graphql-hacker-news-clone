function postedBy(parent, args, context) {
  return context.prisma.link({ id: userId }).postedBy();
}

module.exports = {
  postedBy
};
