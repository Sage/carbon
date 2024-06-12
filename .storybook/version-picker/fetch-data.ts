interface Metadata {
  versions: Record<string, string>;
}

const fetchData = async () => {
  const response = await fetch(
    "https://carbon.sage.com/metadata/metadata.json"
  );

  const metadata: Metadata = await response.json();

  return metadata;
};

export default fetchData;
