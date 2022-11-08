module.exports = (targets) => {
  targets.declare({
    myListContent: new targets.types.SyncWaterfall(["myListContent"]),
  });
};