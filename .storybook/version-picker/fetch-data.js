const fetchData = async () => {
  const response = await fetch(
    "https://carbon.sage.com/metadata/metadata.json"
  );

  const versions = await response.json();

  return versions;
};

export default fetchData;
