import { Form, Layout, type FormProps } from "antd";
import { useState } from "react";
import "./App.css";
import CustomForm from "./components/Form";
import Gallery from "./components/Gallery";
import {
  fetchImages,
  fetchRandomImage,
  type Options,
  type Tag,
} from "./services/image-fetch";

function App() {
  const [form] = Form.useForm();
  const [collection, setCollection] = useState<string[]>([]);
  const [source, setSource] = useState<"waifuPics" | "waifuIm">("waifuPics");

  const onFinish: FormProps<Options>["onFinish"] = async (values) => {
    console.log("Success:", values);
    if (source === "waifuIm") {
      const data = await fetchRandomImage({
        tag: values.category as Tag,
        images: values.images,
        type: values.type,
      });
      return setCollection(data);
    }

    const data = await fetchImages(values);

    setCollection(data);
  };
  return (
    <>
      <Layout className="main-layout container">
        <div className="main-container">
          <CustomForm
            source={source}
            onFinish={onFinish}
            form={form}
            setSource={setSource}
          />
          <Gallery collection={collection} />
        </div>
      </Layout>
    </>
  );
}

export default App;
