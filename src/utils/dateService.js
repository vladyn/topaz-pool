const dateFUT = function dateFUT(unixStamp) {
  const stampToMs = new Date(unixStamp * 1000);
  return stampToMs.toLocaleString();
};

export default dateFUT;
