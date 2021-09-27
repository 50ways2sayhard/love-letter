export default (options, dayjsClass, dayjsFactory) => {
  const oldFactory = dayjsFactory;

  dayjsFactory = (...args) => {
    const d = oldFactory(args);
    const curr = oldFactory();
    d.year(curr.year());
    return d;
  };
};
