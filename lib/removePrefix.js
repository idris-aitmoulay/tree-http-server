module.exports = removePrefix;

function removePrefix(value, prefix) {
  return  value.startsWith(prefix) ? value.slice(prefix.length) : value;
}
