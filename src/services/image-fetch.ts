import axios from "axios";
import {
  sfwCategories,
  nsfwCategories,
  versatile,
  nsfw,
} from "../constants/image-categories";

type Category = (typeof sfwCategories | typeof nsfwCategories)[number];

export type Options = {
  type: "sfw" | "nsfw";
  category: Category;
  images: "single" | "many";
};

export type Tag = (typeof versatile | typeof nsfw)[number];

type Params = {
  tag: Tag;
  images: "single" | "many";
  type: "sfw" | "nsfw";
};

const waifuPicsbaseUrl = "https://api.waifu.pics";

const waifuImBaseUrl = "https://api.waifu.im";
async function fetchImages(options: Options): Promise<string[]> {
  if (!options.category) {
    options.category = pickRandomCategory(options.type);
  }

  const { category, images, type = "sfw" } = options;
  const url = `${waifuPicsbaseUrl}/${
    images === "many" ? "many/" : ""
  }${type}/${category}`;

  const response =
    images === "many" ? await axios.post(url, {}) : await axios.get(url);

  const { data } = response;

  if (images === "many") {
    return data?.files?.map((url: string) => url);
  }

  return [data?.url];
}

async function fetchRandomImage({
  tag,
  images,
  type,
}: Params): Promise<string[]> {
  if (!tag) {
    tag = pickRandomTag(type);
  }

  const url = `${waifuImBaseUrl}/search?included_tags=${tag}${
    images === "many" ? "&limit=30" : ""
  }`;
  const response = await axios.get(url);

  const { data } = response;
  return data?.images?.map((item: any) => item?.url);
}

function pickRandomCategory(type: "sfw" | "nsfw") {
  const selectedCategories = type === "nsfw" ? nsfwCategories : sfwCategories;
  const randomIndex = Math.floor(Math.random() * selectedCategories.length);
  return selectedCategories[randomIndex];
}
function pickRandomTag(type: "sfw" | "nsfw") {
  const selectedCategories = type === "nsfw" ? nsfw : versatile;
  const randomIndex = Math.floor(Math.random() * selectedCategories.length);
  return selectedCategories[randomIndex];
}

export { fetchImages, fetchRandomImage };
