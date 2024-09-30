import mockData from "./mock-data/metadata.json";

interface Metadata {
  versions: Record<string, string>;
}

const fetchData = async (): Promise<Metadata | null> => {
  try {
    const response = await fetch(
      "https://carbon.sage.com/metadata/metadata.json"
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const metadata: Metadata = await response.json();

    return metadata;
  } catch (error) {
    console.error("Failed to fetch metadata:", error);

    console.log("Returning mock data as fallback");
    return mockData as Metadata;
  }
};

export default fetchData;
