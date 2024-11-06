import axios from "axios";

const ids = [
  "239d6260-d71f-43b0-afff-074e3619e3de",
  "789642f8-ca89-4e4e-8f7b-eee4d17ea08b",
  "0b094aab-0cfb-4837-a49b-7267bdb86bec",
  "e896c48c-3150-437d-ba57-d8567eb399ae",
  "4141c5dc-c525-4df5-afd7-cc7d192a832f",
  "296cbc31-af1a-4b5b-a34b-fee2b4cad542",
  "a2c1d849-af05-4bbc-b2a7-866ebb10331f",
  "e7eabe96-aa17-476f-b431-2497d5e9d060",
  "237d527f-adb5-420e-8e6e-b7dd006fbe47",
  "31397254-82f7-445f-a906-5405ff447b97",
];

export const getCover = async (id, mid) => {
  if (!id) {
    return "https://via.placeholder.com/100x150"; // Placeholder image
  }
  try {
    const response = await axios.get(`https://corsproxy.io/?https://api.mangadex.org/cover/${id}`);
    const manga = response.data.data;
    const cover = manga.attributes.fileName;
    return `https://corsproxy.io/?https://uploads.mangadex.org/covers/${mid}/${cover}`;
  } catch (err) {
    console.error(`Error fetching cover for id ${id}:`, err);
    return "https://corsproxy.io/?https://via.placeholder.com/100x150"; // Placeholder image
  }
};

export const getTopManga = async () => {
  try {
    const fetchedMangaData = await Promise.all(
      ids.map(async (id) => {
        try {
          const response = await axios.get(
            `https://corsproxy.io/?https://api.mangadex.org/manga/${id}`
          );
          const manga = response.data.data;
          const cover = manga.relationships.find(
            (rel) => rel.type === "cover_art"
          );

          const coverUrl =
            (await getCover(cover.id, id)) ||
            "https://via.placeholder.com/100x150";

          return {
            id,
            name: manga.attributes.title.en || "No title found",
            coverUrl,
          };
        } catch (err) {
          console.error(`Error fetching manga data for id ${id}:`, err);
          return {
            id,
            name: "Error",
            coverUrl: "https://via.placeholder.com/100x150",
          };
        }
      })
    );

    return fetchedMangaData;
  } catch (err) {
    console.error("Error fetching top manga:", err);
    return [];
  }
};

export const getManga = async (id) => {
  try {
    const response = await axios.get(`https://corsproxy.io/?https://api.mangadex.org/manga/${id}`);
    const cover = response.data.data.relationships.find(
      (rel) => rel.type === "cover_art"
    );
    const coverUrl = await getCover(cover.id, id);
    return {
      ...response.data.data,
      coverUrl
    };
  } catch (err) {
    console.error(`Error fetching manga data for id ${id}:`, err);
    return null;
  }
};


export const fetchChapters = async (mangaId) => {
  try {
    const response = await axios.get(
      `https://api.mangadex.dev/manga/${mangaId}/aggregate?translatedLanguage%5B%5D=en`
    );

    const volumes = response.data.volumes;
    const allChapters = [];

    for (const volumeKey in volumes) {
      const volume = volumes[volumeKey];
      const chapters = Object.values(volume.chapters);
      allChapters.push(...chapters);
    }

    return allChapters; // Return the chapters data
  } catch (error) {
    console.error('Error fetching chapters:', error);
    throw error; // Re-throw the error to handle it in the component
  }
};


export const fetchChapterImages = async (chapterId, imageQuality) => {
  try {
    // Fetch chapter metadata
    const response = await axios.get(
      `https://corsproxy.io/?https://api.mangadex.dev/at-home/server/${chapterId}`
    );
    const { baseUrl, chapter } = response.data;

    // Choose the appropriate array based on image quality
    const imageFiles =
      imageQuality === 'data' ? chapter.data : chapter.dataSaver;

    // Construct image URLs
    const imageUrls = imageFiles.map(
      (filename) => `${baseUrl}/${imageQuality}/${chapter.hash}/${filename}`
    );
    console.log(imageUrls);
    return {
      mangaName: chapter.mangaTitle, 
      chapterName: chapter.title, 
      imageUrls
    };
  } catch (error) {
    console.error('Error fetching chapter images:', error);
    throw error; // Re-throw the error to handle it in the component
  }
};